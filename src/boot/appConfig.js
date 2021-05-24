
import appConfig from '../config/app'

export default async ({ Vue, store, router }) => {
    Vue.prototype.$appConfig = appConfig
    store.$appConfig = appConfig

    window.addEventListener('message', (event) => {
        if (event.data.origin && event.data.origin === 'ngcp-panel') {
            store.commit('user/trackIframePath', {
                type: event.data.origin,
                path: event.data.path,
                error: event.data.error
            })
        }
    }, false)

    router.afterEach((to, from) => {
        store.commit('user/trackPath', { path: to.path })
    })
}
