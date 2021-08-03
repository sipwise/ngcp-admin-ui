<template>
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
        <q-spinner
            v-if="!loaded"
            color="primary"
            size="xl"
        />
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
            pageTitle: 'v1 page'
        }
    },
    computed: {
        ...mapState('user', [
            'proxyForwarded',
            'previousPath'
        ]),
        language () {
            return getCurrentLangAsV1Format()
        }
    },
    watch: {
        $route () {
            this.loadProxy()
        },
        language () {
            this.loadProxy()
        }
    },
    mounted () {
        this.currentIframeSrc = this.getFinalSrc()
        window.addEventListener('message', this.trackMessagesFromV1, false)
    },
    beforeDestroy () {
        window.removeEventListener('message', this.trackMessagesFromV1, false)
    },
    methods: {
        trackMessagesFromV1 (event) {
            if (event?.data?.origin === 'ngcp-panel') {
                if (event?.data?.error) {
                    showGlobalErrorMessage(event.data.error)
                }

                const iframePath = event?.data?.path
                const iframePathProxy = '/proxy' + iframePath
                const routeData = this.$router.resolve(iframePath)
                this.$store.commit('user/trackIframePath', {
                    type: event.data.origin,
                    path: event.data.path
                })
                const requestedPath = new URL(this.getFinalSrc()).pathname
                if (requestedPath !== iframePath) {
                    if (!routeData?.route?.meta?.proxy &&
                        !routeData?.route?.meta?.proxyReverseInvisible) {
                        this.$router.replace({
                            path: iframePath
                        })
                    } else if (this.$router.currentRoute.path !== iframePathProxy) {
                        this.$store.commit('user/proxyForward')
                        this.$router.replace({
                            path: iframePathProxy
                        })
                    }
                }

                this.$emit('loaded', {
                    route: this.$router.currentRoute,
                    url: iframePath || this.getFinalSrc(),
                    iframeWindow: this.$refs?.proxyIframe?.contentWindow
                })
            }
            if (event?.data?.origin === 'ngcp-panel-beforeunload') {
                /* Note: it will hide from the user some underlying processes.
                 * For example double redirect for Customer page: old(Subscribers) -> old(Customer) -- auto redirect--> new(Customer)
                 */
                this.loaded = false
            }
        },
        loadedEvent () {
            try {
                const domEl = this.$refs?.proxyIframe?.contentWindow?.document?.getElementById('login_page_v1')
                if (domEl) {
                    this.logout()
                }
            } catch (err) {
                console.debug('Session expiration detection is disabled')
                console.debug(err)
            } finally {
                this.loaded = true
            }
            this.pageTitle = this.$refs.proxyIframe.contentWindow.document.title || 'v1 page'
            this.injectNormalizeCSS(this.$refs?.proxyIframe)
        },
        ...mapActions('user', [
            'logout'
        ]),
        createBaseUrl () {
            if (_.isString(this.$appConfig.ngcpPanelUrl) && _.trim(this.$appConfig.ngcpPanelUrl) !== '') {
                return new URL(this.$appConfig.ngcpPanelUrl)
            } else {
                return new URL(location.origin)
            }
        },
        createPreviousUrl () {
            if (this.previousPath) {
                let url = this.createBaseUrl()
                const prevPathNormalized = this.previousPath.replace(/^\/proxy/, '')
                url.pathname = prevPathNormalized

                const prevRoute = this.$router.resolve(prevPathNormalized)?.route
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
        getFinalSrc () {
            const url = this.createBaseUrl()
            url.searchParams.set('framed', '1')
            url.searchParams.set('lang', this.language)
            const previousUrl = this.createPreviousUrl()
            if (previousUrl !== null) {
                url.searchParams.set('back', encodeURI(previousUrl.toString()))
            }
            if (this.$route?.meta?.proxyRewrite) {
                return this.$route?.meta?.proxyRewrite({
                    route: this.$route,
                    url: url
                }).toString()
            } else {
                url.pathname = this.$route.path
                return url.toString()
            }
        },
        loadProxy () {
            if (!this.proxyForwarded) {
                const finalSrc = this.getFinalSrc()
                if (this.currentIframeSrc === finalSrc) {
                    this.iframeKey = Math.random()
                } else {
                    this.currentIframeSrc = this.getFinalSrc()
                }
            } else {
                this.$store.commit('user/proxyForwardReset')
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
                $(`<style>${uiNormalizeCSS}</style>`).appendTo(iframeWindow.document.head)
            }
        }
    }
}
</script>

<style lang="sass" rel="stylesheet/sass">
    .proxy-iframe-wrapper
        height: calc(100vh - 100px)
        width: 100%
        .proxy-iframe
            border: none
            height: calc(100vh - 100px)
            width: 100%
</style>
