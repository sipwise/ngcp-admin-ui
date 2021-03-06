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
export default {
    name: 'Proxy',
    meta () {
        return {
            title: this.pageTitle
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
    },
    methods: {
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
                const url = this.createBaseUrl()
                url.pathname = this.previousPath.replace(/^\/proxy/, '')
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
