
import _ from 'lodash'
import {
    routes
} from 'src/router/routes'
import { aclCan } from 'src/acl'

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

export default ({ Vue, router, store }) => {
    router.afterEach((to, from) => {
        // provides necessary data for Proxy component and for "GoTo old Admin Panel" button component
        store.commit('user/trackPath', {
            to,
            currentPath: to.path,
            previousPath: from.path
        })

        // provides more accurate information about "previous path" for the Proxy component
        if (history?.state && typeof history?.replaceState === 'function') {
            // note: waiting that vue-router really apply route change
            setTimeout(() => {
                // if "prevPath" is already filled it means we are moving back and force in history, but it will be empty for a new forward navigation
                if (!history.state.prevPath) {
                    history.replaceState({
                        ...history.state,
                        prevPath: from.path
                    }, null)
                }
            }, 0)
        }
    })

    buildLogicalRouteTree(routes)
    const $routeMeta = {
        $rootRoute (route) {
            if (route.meta && route.meta.parentPath) {
                const parentPathParts = route.meta.parentPath.split('.')
                if (parentPathParts.length > 0) {
                    return { name: parentPathParts[0] }
                } else {
                    return { name: route.name }
                }
            } else {
                return { name: route.name }
            }
        },
        $routePathMeta ($route) {
            let label = ''
            let icon = ''
            const route = router.resolve($route).route
            const routePath = this.$routePath(route)
            if (routePath.length > 0) {
                icon = routePath[0].meta.icon
                routePath.forEach(($route, index) => {
                    if (index > 0) {
                        label = label + ' / '
                    }
                    if ($route.meta.label) {
                        label = label + $route.meta.label
                    } else if ($route.meta.contextRoot) {
                        label = label + '#' + route.params.id
                    }
                })
            } else {
                icon = route.meta.icon
                label = route.meta.label
            }
            return {
                icon,
                label
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
        },
        $isRouteAccessible ($route) {
            const route = router.resolve($route).route

            let hasRequiredPermissions = true
            let hasRequiredPlatformInfo = true
            let hasRequiredCapability = true

            const requirePermissions = route.meta?.$p?.operation && route.meta?.$p?.resource
            if (requirePermissions) {
                hasRequiredPermissions = aclCan(route.meta.$p.operation, route.meta.$p.resource)
            }

            const requiredPlatformInfo = route.meta?.platformInfo
            if (requiredPlatformInfo) {
                hasRequiredPlatformInfo = _.get(store.state.user.platformInfo, requiredPlatformInfo, false)
            }

            const requiredCapability = route.meta?.capability
            if (requiredCapability) {
                hasRequiredCapability = hasCapability(requiredCapability)
            }
            return hasRequiredPermissions && hasRequiredPlatformInfo && hasRequiredCapability
        }
    }
    Vue.prototype.$routeMeta = $routeMeta
    store.$routeMeta = $routeMeta

    Vue.prototype.$goBack = async function $goBack () {
        this.$router.back()
    }

    function hasCapability (capability) {
        return store.getters['user/hasCapability'](capability)
    }
}
