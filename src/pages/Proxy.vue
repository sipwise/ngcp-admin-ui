<template>
    <div
        class="proxy-iframe-wrapper flex flex-center"
    >
        <iframe
            v-show="loaded"
            ref="proxyIframe"
            class="proxy-iframe"
            :src="finalSrc"
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
import { i18n } from 'boot/i18n'
export default {
    name: 'Proxy',
    data () {
        return {
            loaded: false
        }
    },
    computed: {
        ...mapState('user', [
            'currentPathIframe'
        ]),
        language () {
            return i18n.locale === 'en-us' ? 'en' : i18n.locale
        },
        finalSrc () {
            let url = null
            if (_.isString(this.$appConfig.ngcpPanelUrl) && _.trim(this.$appConfig.ngcpPanelUrl) !== '') {
                url = new URL(this.$appConfig.ngcpPanelUrl)
            } else {
                url = new URL(location.origin)
            }
            url.searchParams.set('framed', '1')
            url.searchParams.set('lang', this.language)
            if (this.$route?.meta?.proxyRewrite) {
                return this.$route?.meta?.proxyRewrite({
                    route: this.$route,
                    url: url
                }).toString()
            } else {
                url.pathname = this.$route.path
                return url.toString()
            }
        }
    },
    watch: {
        currentPathIframe (path) {
            const components = this.$router.getMatchedComponents(path)
            const routeData = this.$router.resolve(path)
            const lastComponent = (components && components.length > 1) ? components[components.length - 1] : null
            if (lastComponent && lastComponent.name !== 'Proxy' && !routeData?.route?.meta?.proxyReverseInvisible) {
                this.$router.push({
                    path: path
                })
            }
        }
    },
    methods: {
        loadedEvent () {
            try {
                const domEl = this.$refs.proxyIframe.contentWindow.document.getElementById('login_page_v1')
                if (domEl !== null) {
                    this.logout()
                }
            } catch (err) {
                console.debug('Session expiration detection is disabled')
                console.debug(err)
            } finally {
                this.loaded = true
            }
        },
        ...mapActions('user', [
            'logout'
        ])
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
