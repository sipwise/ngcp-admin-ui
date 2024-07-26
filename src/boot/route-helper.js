
import _ from 'lodash'
import routes from '../router/routes'
import { aclCan } from 'src/acl'
import { setSessionStorage } from 'src/local-storage'
import { PATH_CHANGE_PASSWORD, PATH_ERROR_403, PATH_ERROR_404, PATH_LOGIN, PATH_RECOVER_PASSWORD } from 'src/router/common'

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

export default ({ app, router, store }) => {
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
        if (![PATH_LOGIN, PATH_ERROR_404, PATH_ERROR_403, PATH_RECOVER_PASSWORD, PATH_CHANGE_PASSWORD].includes(to.path)) {
            setSessionStorage('last_page', to.path)
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
            const route = router.resolve($route)
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
                icon = route.icon
                label = route.label
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
            if (_.isString(routeData?.meta?.label)) {
                return routeData.meta.label
            }
            return ''
        },
        $icon (route) {
            const routeData = router.resolve(route)
            if (routeData) {
                return _.get(routeData, 'meta.icon')
            } else {
                return null
            }
        },
        $aclCan (route) {
            const routeData = router.resolve(route)
            const $p = _.get(routeData, 'meta.$p', null)
            if ($p) {
                return app.config.globalProperties.$aclCan($p.operation, $p.resource)
            } else {
                return false
            }
        },
        $isRouteAccessible ($route, user) {
            const route = router.resolve($route)

            let hasRequiredPermissions = true
            let hasRequiredPlatformInfo = true
            let hasRequiredCapability = true
            let hasRequiredPlatformVersions = true

            const requirePermissions = route.meta?.$p?.operation && route.meta?.$p?.resource
            if (requirePermissions) {
                hasRequiredPermissions = aclCan(route.meta.$p.operation, route.meta.$p.resource)
                if (user && $route.params.id && route.meta.$p.resource === 'entity.admins') {
                    hasRequiredPermissions = hasRequiredPermissions ||
                        aclCan(route.meta.$p.operation, route.meta.$p.resource,
                            { id: $route.params.id }, user)
                }
            }

            const requiredPlatformInfo = route.meta?.platformInfo
            if (requiredPlatformInfo) {
                hasRequiredPlatformInfo = _.get(store.state.user.platformInfo, requiredPlatformInfo, false)
            }

            const requiredCapability = route.meta?.capability
            if (requiredCapability) {
                hasRequiredCapability = hasCapability(requiredCapability)
            }

            const requiredPlatformVersions = route.meta?.platformVersions
            if (requiredPlatformVersions && _.isArray(requiredPlatformVersions) && requiredPlatformVersions.length > 0) {
                hasRequiredPlatformVersions = requiredPlatformVersions.includes(_.get(store.state.user.platformInfo, 'type'))
            }

            return hasRequiredPermissions && hasRequiredPlatformInfo && hasRequiredCapability && hasRequiredPlatformVersions
        }
    }
    app.config.globalProperties.$routeMeta = $routeMeta
    store.$routeMeta = $routeMeta

    app.config.globalProperties.$goBack = async function $goBack (path) {
        if (path) {
            await this.$router.push({ name: path })
        } else {
            this.$router.back()
        }
    }

    function hasCapability (capability) {
        return store.getters['user/hasCapability'](capability)
    }
}
