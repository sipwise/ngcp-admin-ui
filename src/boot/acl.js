import {
    aclCan,
    aclCanResource,
    aclCanResourceColumn,
    aclReset,
    aclSet
} from 'src/acl'
import { store } from 'src/boot/store'
import { PATH_ERROR_403 } from 'src/router/common'

export default ({ app, router }) => {
    router.beforeEach((to, from, next) => {
        if (store.$routeMeta.$isRouteAccessible(to, store.state.user.user)) {
            next()
        } else {
            next(PATH_ERROR_403)
        }
    })
    app.config.globalProperties.$aclCan = aclCan
    app.config.globalProperties.$aclSet = aclSet
    app.config.globalProperties.$aclReset = aclReset
    app.config.globalProperties.$aclResource = aclCanResource
    app.config.globalProperties.$aclColumn = aclCanResourceColumn
    store.$aclCan = aclCan
    store.$aclSet = aclSet
    store.$aclReset = aclReset
    aclSet(store.getters['user/permissions'])
    app.config.globalProperties.$capability = (capability) => {
        return store.getters['user/hasCapability'](capability)
    }
}
