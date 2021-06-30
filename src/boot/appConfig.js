
import appConfig from '../config/app'

export default async ({ Vue, store, router }) => {
    Vue.prototype.$appConfig = appConfig
    store.$appConfig = appConfig

    window.addEventListener('message', (event) => {
        if (event?.data?.origin === 'ngcp-panel') {
            const iframePath = event?.data?.path
            const iframePathProxy = '/proxy' + iframePath
            const routeData = router.resolve(iframePath)
            store.commit('user/trackIframePath', {
                type: event.data.origin,
                path: event.data.path,
                error: event.data.error
            })
            if (router.currentRoute.path !== iframePath &&
                !routeData?.route?.meta?.proxy &&
                !routeData?.route?.meta?.proxyReverseInvisible) {
                router.push({
                    path: iframePath
                })
            } else if (router.currentRoute.path !== iframePath &&
                router.currentRoute.path !== iframePathProxy) {
                store.commit('user/proxyForward')
                router.push({
                    path: iframePathProxy
                })
            }
        }
    }, false)

    router.afterEach((to, from) => {
        store.commit('user/trackPath', {
            path: to.path,
            previousPath: from.path
        })
    })
}
