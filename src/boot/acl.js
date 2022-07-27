import {
    aclCan,
    aclCanResource,
    aclCanResourceColumn,
    aclReset,
    aclSet
} from 'src/acl'
import {
    PATH_ERROR_403
} from 'src/router/common'

export default ({ Vue, router, store }) => {
    router.beforeEach((to, from, next) => {
        if (store.$routeMeta.$isRouteAccessible(to, store.state.user.user)) {
            next()
        } else {
            next(PATH_ERROR_403)
        }
    })
    Vue.prototype.$aclCan = aclCan
    Vue.prototype.$aclSet = aclSet
    Vue.prototype.$aclReset = aclReset
    Vue.prototype.$aclResource = aclCanResource
    Vue.prototype.$aclColumn = aclCanResourceColumn
    store.$aclCan = aclCan
    store.$aclSet = aclSet
    store.$aclReset = aclReset
    aclSet(store.getters['user/permissions'])
    Vue.prototype.$capability = (capability) => {
        return store.getters['user/hasCapability'](capability)
    }
}
