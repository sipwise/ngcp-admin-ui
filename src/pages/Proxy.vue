<template>
    <div
        class="proxy-iframe-wrapper flex flex-center"
    >
        <iframe
            v-show="loaded"
            ref="proxyIframe"
            class="proxy-iframe"
            :src="$appConfig.ngcpPanelUrl + $route.path + '?framed=1&lang=' + language"
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
import {
    mapActions,
    mapMutations,
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
        }
    },
    watch: {
        currentPathIframe (path) {
            const components = this.$router.getMatchedComponents(path)
            const lastComponent = (components && components.length > 1) ? components[components.length - 1] : null
            if (lastComponent && lastComponent.name !== 'Proxy') {
                this.$router.push({
                    path: path
                })
            }
        }
    },
    methods: {
        loadedEvent (event, data) {
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
        ...mapMutations('user', [
            'trackPath'
        ]),
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
