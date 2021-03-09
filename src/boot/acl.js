import {
    changePermissions,
    checkPermission,
    clearPermissions
} from 'src/acl'
import {
    PATH_ERROR_403
} from 'src/router/common'

export default ({ Vue, router, store }) => {
    router.beforeEach((to, from, next) => {
        if (checkPermission(to.meta.permission)) {
            next()
        } else {
            next(PATH_ERROR_403)
        }
    })
    Vue.prototype.$acl = {
        check (perm) {
            return checkPermission(perm)
        }
    }
    store.$acl = {
        reset () {
            clearPermissions()
        },
        change (perms) {
            changePermissions(perms)
        }
    }
    changePermissions(store.getters['user/permissions'])
}
