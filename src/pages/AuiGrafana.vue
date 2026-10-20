<template>
    <div class="aui-grafana-wrapper flex flex-center">
        <iframe
            v-if="iframeSrc"
            v-show="loaded"
            :key="iframeSrc"
            class="aui-grafana-iframe"
            :src="iframeSrc"
            @load="loaded = true"
        />
        <q-spinner
            v-if="!loaded"
            color="primary"
            size="xl"
        />
    </div>
</template>

<script setup>
import { getJwt } from 'src/auth'
import { useUser } from 'src/composables/useUser'
import {
    GRAFANA_COOKIE_REFRESH_INTERVAL,
    buildGrafanaUrl,
    getGrafanaRequestBaseUrl,
    setGrafanaAuthCookies
} from 'src/helpers/grafana'
import {
    computed,
    onBeforeUnmount,
    onMounted,
    ref,
    watch
} from 'vue'
import { useRoute } from 'vue-router'

defineOptions({ name: 'AuiGrafana' })

const GRAFANA_KIOSK_PARAMS = { kiosk: 'tv' }

const route = useRoute()
const { user } = useUser()

const loaded = ref(false)

const username = computed(() => user.value?.login)
const grafanaPath = computed(() => route.meta.grafanaPath ?? route.params.pathMatch)
const grafanaAdmin = computed(() => route.meta.grafanaAdmin === true)
const iframeSrc = computed(() => {
    if (grafanaPath.value === undefined || !username.value) {
        return null
    }
    const baseUrl = getGrafanaRequestBaseUrl()
    return buildGrafanaUrl(baseUrl, grafanaPath.value, GRAFANA_KIOSK_PARAMS).href
})

function refreshCookie () {
    setGrafanaAuthCookies({
        jwt: getJwt(),
        isAdminPage: grafanaAdmin.value
    })
}

watch(iframeSrc, () => {
    refreshCookie()
    loaded.value = false
})

refreshCookie()
let cookieTimer = null

onMounted(() => {
    cookieTimer = setInterval(refreshCookie, GRAFANA_COOKIE_REFRESH_INTERVAL)
})

onBeforeUnmount(() => {
    clearInterval(cookieTimer)
})
</script>

<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'

.aui-grafana-wrapper
    height: calc(100vh - 2 * #{$toolbar-min-height})
    width: 100%
    .aui-grafana-iframe
        border: none
        height: 100%
        width: 100%
</style>
