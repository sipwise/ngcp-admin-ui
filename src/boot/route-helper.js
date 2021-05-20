
import _ from 'lodash'
import {
    routes
} from 'src/router/routes'

const logicalRouteTree = {}
function buildLogicalRouteTree (routes) {
    routes.forEach((route) => {
        if (route.name && route.meta && route.meta.parentPath) {
            const children = _.get(logicalRouteTree, route.meta.parentPath + '.$children', [])
            children.push(route)
            _.set(logicalRouteTree, route.meta.parentPath + '.$children', children)
            _.set(logicalRouteTree, route.meta.parentPath + '.' + route.name + '.$route', route)
        } else if (route.name && route.meta && route.meta.root) {
            _.set(logicalRouteTree, route.name + '.$route', route)
        }
        if (route.children) {
            buildLogicalRouteTree(route.children)
        }
    })
}

export default ({ Vue, router, app }) => {
    buildLogicalRouteTree(routes)
    Vue.prototype.$routeMeta = {
        $rootRoute (route) {
            if (route.meta && route.meta.parentPath) {
                const parentPathParts = route.meta.parentPath.split('.')
                if (parentPathParts.length > 0) {
                    return { name: parentPathParts[0] }
                }
            }
        },
        $routePath (route) {
            const finalRoutes = []
            if (route && route.name && route.meta && route.meta.parentPath) {
                const path = route.meta.parentPath + '.' + route.name
                const pathParts = path.split('.')
                pathParts.forEach((pathPart, index) => {
                    const pathPartsClone = [...pathParts]
                    const routePath = pathPartsClone.splice(0, index + 1).join('.')
                    finalRoutes.push(_.get(logicalRouteTree, routePath + '.$route'))
                })
            } else if (route && route.name && route.meta && route.meta.root) {
                finalRoutes.push(_.get(logicalRouteTree, route.name + '.$route'))
            }
            return finalRoutes
        },
        $routeChildren (route) {
            if (route && route.name && route.meta && route.meta.parentPath) {
                const path = route.meta.parentPath + '.' + route.name
                return _.get(logicalRouteTree, path + '.$children', [])
            } else if (route && route.name && route.meta && route.meta.root) {
                return _.get(logicalRouteTree, route.name + '.$children', [])
            } else {
                return []
            }
        },
        $routeSiblings (route) {
            if (route?.meta?.parentPath) {
                return _.get(logicalRouteTree, route.meta.parentPath + '.$children', [])
            } else {
                return []
            }
        },
        $label (route) {
            const routeData = router.resolve(route)
            if (_.isString(routeData?.route?.meta?.label)) {
                return routeData.route.meta.label
            }
            return ''
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
