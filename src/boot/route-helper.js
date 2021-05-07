
import _ from 'lodash'

export default ({ Vue, router, app }) => {
    Vue.prototype.$routeMeta = {
        $label (route) {
            const routeData = router.resolve(route)
            const i18nKey = _.get(routeData, 'route.meta.labelI18nKey')
            if (routeData && i18nKey) {
                return app.i18n.t(i18nKey)
            } else {
                return null
            }
        },
        $icon (route) {
            const routeData = router.resolve(route)
            if (routeData) {
                return _.get(routeData, 'route.meta.icon')
            } else {
                return null
            }
        },
        $aclCan (route) {
            const routeData = router.resolve(route)
            const $p = _.get(routeData, 'route.meta.$p', null)
            if ($p) {
                return Vue.prototype.$aclCan($p.operation, $p.resource)
            } else {
                return false
            }
        }
    }
}
