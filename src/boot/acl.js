import {
    aclCan,
    aclReset,
    aclSet
} from 'src/acl'
import {
    PATH_ERROR_403
} from 'src/router/common'
import _ from 'lodash'

export default ({ Vue, router, store }) => {
    router.beforeEach((to, from, next) => {
        if (to.meta.$p) {
            if (to.meta.$p && aclCan(to.meta.$p.operation, to.meta.$p.resource)) {
                const requiredPlatformInfo = to.meta.platformInfo
                const hasRequiredPlatformInfo = _.get(store.state.user.platformInfo, requiredPlatformInfo, true)
                if (requiredPlatformInfo) {
                    if (hasRequiredPlatformInfo) {
                        next()
                    } else {
                        next(PATH_ERROR_403)
                    }
                } else {
                    next()
                }
            } else {
                next(PATH_ERROR_403)
            }
        } else {
            next()
        }
    })
    Vue.prototype.$aclCan = aclCan
    Vue.prototype.$aclSet = aclSet
    Vue.prototype.$aclReset = aclReset
    store.$aclCan = aclCan
    store.$aclSet = aclSet
    store.$aclReset = aclReset
    aclSet(store.getters['user/permissions'])
    Vue.prototype.$capability = (capability) => {
        return store.getters['user/hasCapability'](capability)
    }
}
