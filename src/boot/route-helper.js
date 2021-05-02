
import _ from 'lodash'

export default ({ Vue, router }) => {
    Vue.prototype.$routeMeta = {
        $label (route) {
            const routeData = router.resolve(route)
            if (routeData) {
                return _.get(routeData, 'route.meta.label')
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
