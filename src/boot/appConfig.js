
import appConfig from '../config/app'

export default async ({ Vue, store, router }) => {
    Vue.prototype.$appConfig = appConfig
    store.$appConfig = appConfig

    router.afterEach((to, from) => {
        store.commit('user/trackPath', { // TODO: why do we need that? Is that only for the Proxy ?
            path: to.path,
            previousPath: from.path
        })
    })
}
