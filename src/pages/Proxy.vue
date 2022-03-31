<template>
    <div>
        <div
            class="proxy-iframe-wrapper flex flex-center"
        >
            <iframe
                v-show="loaded"
                :key="iframeKey"
                ref="proxyIframe"
                class="proxy-iframe"
                :src="currentIframeSrc"
                @load="loadedEvent"
            />
            <!-- TODO: it will be nice to use "sandbox" attribute for iframe
                 sandbox="allow-same-origin allow-forms allow-scripts allow-downloads"
                  need more investigation because it might fails on v1 session timeout -->
            <q-spinner
                v-if="!loaded"
                color="primary"
                size="xl"
            />
        </div>
        <div
            class="proxy-warning q-pa-xs text-right q-pr-lg"
        >
            <q-icon
                name="info"
                size="xs"
            />
            {{ $t('This page is not yet migrated to the new WEB interface, please use the old version for the moment') }}
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
import {
    mapActions,
    mapState
} from 'vuex'
import { getCurrentLangAsV1Format } from 'src/i18n'
import { showGlobalErrorMessage } from 'src/helpers/ui'

/**
 * @see {@link doc/proxy-component.md} for further information.
 */
export default {
    name: 'Proxy',
    meta () {
        return {
            title: (this.proxyPageTitle) ? this.pageTitle : undefined
        }
    },
    props: {
        proxyPageTitle: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            iframeKey: Math.random(),
            loaded: false,
            currentIframeSrc: null,
            pageTitle: 'v1 page',
            replaceRouteSilently: false,
            destroying: false,
            pendingUnloadTimeout: null
        }
    },
    computed: {
        ...mapState('user', [
            'previousPath'
        ]),
        language () {
            return getCurrentLangAsV1Format()
        }
    },
    watch: {
        iframeKey (value) {
            this.loaded = false
        },
        currentIframeSrc (value) {
            this.loaded = false
        },
        $route (to, from) {
            if (!this.replaceRouteSilently && to?.meta?.proxy) {
                this.loadProxy()
            }
        },
        language () {
            this.loadProxy()
        }
    },
    mounted () {
        window.addEventListener('message', this.trackMessagesFromV1, false)
        this.loadProxy()
    },
    beforeDestroy () {
        this.destroying = true
        clearTimeout(this.pendingUnloadTimeout)
        window.removeEventListener('message', this.trackMessagesFromV1, false)
    },
    methods: {
        ...mapActions('user', [
            'logout'
        ]),
        trackMessagesFromV1 (event) {
            if (event?.data?.type === 'aui-navigate-to') {
                const navigateTo = event?.data?.url
                if (navigateTo) {
                    let path = new URL(navigateTo, document.location).pathname
                    if (event?.data?.navigationSource === 'popup-close') {
                        // when we are closing popup in V1 in most cases it means to load a page from previous history item.
                        //   "history.back" does not work in this case because can use cached page state
                        const prevPath = window.history?.state?.prevPath
                        if ((!path || path === '/') && prevPath) {
                            path = prevPath
                        }
                    }
                    this.$router.push(path)
                }
            }
        },
        attachBeforeUnloadEventHandler (iframe) {
            // NOTE: based on a nice idea from https://gist.github.com/hdodov/a87c097216718655ead6cf2969b0dcfa
            // Remove the unloadHandler in case it was already attached.
            iframe.contentWindow.removeEventListener('beforeunload', this.beforeUnloadEvent)
            iframe.contentWindow.addEventListener('beforeunload', this.beforeUnloadEvent)

            iframe.contentWindow.removeEventListener('unload', this.unloadEvent)
            iframe.contentWindow.addEventListener('unload', this.unloadEvent)
        },

        beforeUnloadEvent () {
            /* Note: showing loading indicator will hide from the user some underlying processes.
             * For example double redirect for Customer page: old(Subscribers) -> old(Customer) -- auto redirect--> new(Customer)
             */
            this.loaded = false
            // in normal situation "unload" event follows the "before unload" event, but in case the server response
            // contains not a new page but a download file the "unload" will not happen, and we will stay on the same page
            this.pendingUnloadTimeout = setTimeout(() => {
                // we are assuming that we did not leave the page, so the page is loaded, and we have to show current page
                this.loaded = true
            }, 2000)
        },
        unloadEvent () {
            clearTimeout(this.pendingUnloadTimeout)
        },
        async loadedEvent () {
            clearTimeout(this.pendingUnloadTimeout)
            const iframe = this.$refs?.proxyIframe

            // skip event from "about:blank" page which will be fired before the iFrame load your requested URL. Usually fires before "mounted" event
            if (iframe?.src === '' || this.destroying) {
                return
            }
            // showing the page instantly if we do not have an access to it because of CrossOrigin URL there
            //      OR because of some browser message (like when we trying to back + force a page with POST request)
            if (!iframe?.contentDocument) {
                this.loaded = true
                showGlobalErrorMessage(this.$t('It looks like you are trying to "go forward" to the page with a partially filled form. It requires to enter some missed data on that form. So please press back button and fill all required fields on the form and submit it.'))
                return
            }

            // Detect that V1 session is expired or invalid
            if (!this.isV1SessionValid(iframe)) {
                this.logout()
                return
            }

            this.attachBeforeUnloadEventHandler(iframe)

            const pageInfo = this.getProxyPageInfo(iframe)
            this.pageTitle = pageInfo.title
            if (pageInfo.errorMessage) {
                showGlobalErrorMessage(pageInfo.errorMessage)
            }

            const iframePath = pageInfo.path
            // Note: updating GoTo path manually with URL-path from the iFrame itself because the iFrame might
            //       have rewritten URL or URL was changed inside the iFrame
            this.$store.commit('user/updateGoToPath', { path: iframePath })

            const stateUpdateStatus = await this.updateRoutingState({ iframePath })
            if (stateUpdateStatus.navigateToAnotherPage) {
                return
            }

            if (!pageInfo.isNgcpPage) {
                // Note: showing proxied page instantly if it is not ngcpPanel. For example embedded Grafana metrics page.
                this.loaded = true
            }

            // Note: after $router.replace\push the entire Proxy component might be removed and recreated because
            //       we have to change the parent component basing on the route
            if (!this.destroying) {
                if (pageInfo.isNgcpPage) {
                    this.injectNormalizeCSS(iframe)
                    this.emulateFramedModeIfNeeded(iframe)
                    this.injectNavigationInterceptor(iframe)
                }

                this.$emit('loaded', {
                    route: this.$router.currentRoute,
                    url: pageInfo.path || this.getIFrameSrc(),
                    iframeWindow: iframe?.contentWindow,
                    pageInfo
                })

                this.loaded = true
            }
        },
        async updateRoutingState ({ iframePath }) {
            let navigateToAnotherPage = false
            const routeData = this.$router.resolve(iframePath)
            const requestedPath = new URL(this.getIFrameSrc()).pathname
            if (requestedPath !== iframePath) {
                if (!routeData?.route?.meta?.proxy) {
                    // TODO: push OR replace - it might depend on what is the root component for the Proxy on next
                    //       route AND from where the URL change request. Is it is from vue-router OR URL changed from
                    //       iFrame internal navigation ??? It requires additional investigation.
                    this.$router.replace({
                        path: iframePath
                    })
                    navigateToAnotherPage = true
                } else {
                    try {
                        this.replaceRouteSilently = true
                        await this.$router.replace({
                            path: iframePath
                        })
                    } catch (e) {
                        // TODO: might happened if the navigation is canceled by ACL (boot/acl.js)
                        console.error(e)
                    } finally {
                        this.replaceRouteSilently = false
                    }
                }
            }

            return {
                navigateToAnotherPage
            }
        },
        isV1SessionValid (iframe) {
            try {
                // TODO: sometimes it doesn't work for DEV-proxied mode. We need to fix it.
                const domEl = iframe?.contentWindow?.document?.getElementById('login_page_v1')
                if (domEl) {
                    return false
                }
            } catch (err) {
                console.debug('Session expiration detection is disabled')
                console.debug(err)
            }
            return true
        },
        getProxyPageInfo (iframe) {
            const iframeWindow = iframe?.contentWindow

            const title = this.getV1Title(iframe)
            const path = iframeWindow?.document.location.pathname

            const errorNode = iframeWindow?.document.querySelector('#content .alert.alert-error')
            let errorMessage = null
            if (errorNode !== null) {
                errorMessage = errorNode.innerText
            }

            // Detecting ngcpPanel page in our iFrame. We are trying to find special signs of ngcpPanel pages
            // Note: it will not detect ngcp Login page
            const isNgcpPage =
                typeof iframe.contentWindow?.mainWrapperInit === 'function' &&
                typeof iframe.contentWindow?.addConsoleNoOp === 'function'

            return {
                path,
                title,
                errorMessage,
                isNgcpPage
            }
        },
        createBaseUrl () {
            if (_.isString(this.$appConfig.ngcpPanelUrl) && _.trim(this.$appConfig.ngcpPanelUrl) !== '') {
                return new URL(this.$appConfig.ngcpPanelUrl)
            } else {
                return new URL(document.location.origin)
            }
        },
        createBackUrl () {
            // Note: "history.state.prevPath" might be more accurate than data from the store.
            //     More accurate prevPath required to fix case like:
            //     * V1 popup (create ... button) -> migrated V2 creation form --"close button"-> automatic back to V1 -> trying to close V1 popup
            let url = this.createBaseUrl()
            if (this.$store.state.creationSession.active) {
                const fromPath = this.$store.getters['creationSession/previousForm']?.fromPath
                const originPath = this.$store.state.creationSession.originPath
                url.pathname = fromPath || originPath
                return url
            } else if (this.previousPath || window.history?.state?.prevPath) {
                const prevPath = window.history?.state?.prevPath || this.previousPath
                url.pathname = prevPath
                const prevRoute = this.$router.resolve(prevPath)?.route
                if (prevRoute) {
                    const proxyUrlRewriteFn = prevRoute?.meta?.proxyRewrite
                    if (typeof proxyUrlRewriteFn === 'function') {
                        url = proxyUrlRewriteFn({
                            backUrlRewrite: true,
                            route: prevRoute,
                            url: url
                        })
                    }
                }
                return url
            }
            return null
        },
        getIFrameSrc () {
            let url = this.createBaseUrl()
            url.searchParams.set('lang', this.language)
            url.searchParams.set('framed', '1')
            const backUrl = this.createBackUrl()
            if (backUrl !== null) {
                url.searchParams.set('back', encodeURI(backUrl.toString()))
            }

            url.pathname = this.$route.path

            const proxyUrlRewriteFn = this.$route?.meta?.proxyRewrite
            if (typeof proxyUrlRewriteFn === 'function') {
                url = proxyUrlRewriteFn({
                    route: this.$route,
                    url: url
                })
            }

            return url.toString()
        },
        loadProxy () {
            /* IMPORTANT: We should always change "iframeKey" when changing iFrame.src or want to reload it, otherwise
                     you will get doubling history items in some cases. It will affect browser back button behaviour.

               @see {@link doc/proxy-component.md} for further information.
             */
            this.iframeKey = Math.random()
            this.currentIframeSrc = this.getIFrameSrc()
        },
        getV1Title (iframe) {
            const iframeWindow = iframe.contentWindow
            let title = iframeWindow.document.title || ''

            // trying to find an opened popup dialog on ngcpPanel page
            const $ = iframeWindow.$
            if (typeof $ === 'function') {
                const popupWindowTitle = $('.modal-header h3')
                    .filter(function () { return iframeWindow.getComputedStyle($(this).parents('.modal:first')[0]).display === 'block' })
                    .first().text()
                title += popupWindowTitle ? ' - ' + popupWindowTitle : ''
            }

            title = title || 'v1 page'
            return title
        },
        emulateFramedModeIfNeeded (iframe) {
            const iframeWindow = iframe.contentWindow
            const $ = iframeWindow.$
            if (typeof $ === 'function') {
                // in some rare cases with back button + historyAPI the iFrame does not send Referrer header
                // so V1 will ignore Framed mode and show all headers. Here is a JS implemented emulation\workaround for such case.
                if ($('#footer, #topbar, #header').length > 0) {
                    $('.masthead-text h2').prependTo('#wrapper')
                    $('#footer, #topbar, #header, #masthead').remove()
                    $('#wrapper').prop('style', 'padding: 14px 24px 24px;')
                }

                // remove "Back" buttons
                const $backButtons = $('.row a.btn > .icon-arrow-left, span a.btn > .icon-arrow-left')
                if ($backButtons.length > 0) {
                    $backButtons.parent().remove()
                }
            }
        },
        injectNavigationInterceptor (iframe) {
            const iframeWindow = iframe.contentWindow
            if (typeof iframeWindow?.$ === 'function') {
                // IMPORTANT: this code (auiNavigationTracking function) will be injected to ngcp-panel V1 frame as-is (see injection code below).
                //   so, you CANNOT use here any variable from current Vue component or Vue application!!!
                //   ES5 syntax allowed only!!!
                const auiNavigationTrackingFn = function auiNavigationTrackingFn () {
                    const $ = window.$
                    function getNormalizedHref (href) {
                        return new URL(href, document.location).toString()
                    }

                    function sendNavigateToMessage (navigationSource, value, url) {
                        if (window.parent) {
                            window.parent.postMessage({
                                type: 'aui-navigate-to',
                                navigationSource: navigationSource,
                                value: value,
                                url: url
                            }, '*')
                        }
                    }

                    // standard buttons.
                    // Except with "data-confirm" attr (like "Delete" buttons) OR links with JS code in "href" attr
                    $('body').on('click', 'a[href]:not([data-confirm]):not([target]):not([href^=javascript])', function () {
                        const btnHref = $(this).attr('href')

                        // adjusting buttons leading to files downloading, like CSV files etc
                        const isDownloadButton = String(btnHref).split('?').shift().indexOf('download') > -1
                        if (isDownloadButton) {
                            $(this).attr('target', '_blank')
                            return
                        }

                        // detecting action buttons which change state of the application without forms and POST requests.
                        // Like "activate\deactivate\delete" buttons on the edit form on "Subscriber Preference \ Access restrictions \ Allowed CLIs..." page
                        const actionBtnURL = new URL(btnHref, document.location)
                        actionBtnURL.searchParams.delete('lang')
                        actionBtnURL.searchParams.delete('framed')
                        actionBtnURL.searchParams.delete('back')
                        if (actionBtnURL.search) {
                            // if we have something valuable in the search params it's highly likely an action button,
                            // so we just allowing internal navigation inside the iFrame
                            return
                        }

                        // skip links with anchors. like accordion titles or similar
                        const isNewPageNavigation = String(btnHref).indexOf('#') !== 0
                        if (isNewPageNavigation) {
                            const normalizedHref = getNormalizedHref(btnHref)
                            sendNavigateToMessage('direct-link', btnHref, normalizedHref)

                            // prevents default behaviour/navigation
                            return false
                        }
                    })

                    // modal popup "close" button
                    $('.mod_close')
                        .off('click')
                        .click(function () {
                            let backURL = '/'
                            let normalizedHref = '/'
                            if (window.modalFormScript) {
                                backURL = window.modalFormScript.toString()
                                    .split(';').filter(function (s) { return s.indexOf('window.location.href') > -1 })[0]
                                    .trim().split('"')[1]
                                normalizedHref = getNormalizedHref(backURL)
                            }
                            sendNavigateToMessage('popup-close', backURL, normalizedHref)

                            // prevents default behaviour/navigation
                            return false
                        })

                    // "create ..." or similar buttons on popup windows
                    $('#mod_edit form')
                        .off('click', 'input[type=button]') // prevents default behaviour/navigation
                        .on('click', 'input[type=button]', function () {
                            if ($(this).hasClass('btn-primary')) {
                                // restore original behaviour for "save" buttons on popups like CallForwarding
                                $(this).parents('form').find('#submitid').attr('value', $(this).attr('name'))
                                $(this).parents('form').submit()
                                return
                            }

                            const redirectName = $(this).attr('name')
                            const href = [''].concat(redirectName.split('.')).join('/')
                            const normalizedHref = getNormalizedHref(href)

                            if (typeof fetch === 'function') {
                                // trying to get correct redirect URL from the backend by emulating UI behaviour
                                const $form = $(this).parents('form:first')
                                const data = new URLSearchParams(new FormData($form[0]))
                                data.set('submitid', redirectName)
                                fetch(document.location, {
                                    method: 'post',
                                    body: data,
                                    redirect: 'follow'
                                })
                                    .then(response => {
                                        const newUrl = response.url
                                        sendNavigateToMessage('form-button', redirectName, newUrl)
                                    })
                                    .catch(function (error) { console.error(error) })
                            } else {
                                sendNavigateToMessage('form-button', redirectName, normalizedHref)
                            }

                            // prevents default behaviour/navigation
                            return false
                        })
                }

                // injecting our tracking JS to the iframe
                // Note: using here native JS instead of jQuery to prevent some scripts-preprocessing inside the jQuery
                const navigationTrackingJS = '$(' + auiNavigationTrackingFn.toString() + ')'
                const iScript = iframeWindow.document.createElement('script')
                iScript.setAttribute('data-info', 'aui-injected')
                iScript.text = navigationTrackingJS
                iframeWindow.document.body.appendChild(iScript)
            }
        },
        injectNormalizeCSS (iframe) {
            const iframeWindow = iframe?.contentWindow
            const $ = iframeWindow?.$
            if (typeof $ === 'function') {
                const uiNormalizeCSS = `
                    body {
                        overflow: auto;
                    }
                `
                $('<' + 'style' + '>') // Note: strange concatenation "'<' + 'style'..." is a workaround to overcome JS compiler issue
                    .attr('data-info', 'aui-injected').text(uiNormalizeCSS)
                    .appendTo(iframeWindow.document.head)
            }
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.proxy-warning
    width: 100%
    height: #{$aui-proxy-warning-pnl-height}
.proxy-iframe-wrapper
    height: calc(100vh - 2 * #{$toolbar-min-height} - #{$aui-proxy-warning-pnl-height})
    width: 100%
    .proxy-iframe
        border: none
        height: calc(100vh - 2 * #{$toolbar-min-height} - #{$aui-proxy-warning-pnl-height})
        width: 100%
</style>
