import { i18n } from 'boot/i18n'

export const PATH_LOGIN = '/login/admin'
export const PATH_CHANGE_PASSWORD = '/changepassword'
export const PATH_RECOVER_PASSWORD = '/recoverpassword'
export const PATH_ENTRANCE = '/dashboard'
export const PATH_ERROR_404 = '/error404'
export const PATH_ERROR_403 = '/error403'

export const QUERY_PARAM_AUTH_V1 = 'v1_auth'

export const getToken = (route) => {
    return {
        token: route.query.token
    }
}

export function detailsPagePathRewrite ({ route, url }) {
    url.pathname = route.path.split('/').slice(0, -1).join('/')
    if (route?.meta?.v1DetailsPageSectionId) {
        url.hash = '#' + route.meta.v1DetailsPageSectionId
    }
    return url
}

export function detailsPageToPreferencesPagePathRewrite ({ route, url }) {
    url = detailsPagePathRewrite({ route, url })
    url.pathname = url.pathname.replace('details', 'preferences')
    return url
}

export function proxyRewriteGrafanaBase ({ route, url }) {
    url.searchParams.set('kiosk', 'tv')
    return url
}

export function getProxyRewriteFor (pathname) {
    const url = new URL(pathname, location.origin)
    return (config) => {
        const newConfig = { ...config, url }
        return proxyRewriteGrafanaBase(newConfig)
    }
}

export function subscriberCallDetailsPathRewrite ({ route, url }) {
    url.pathname = `/subscriber/${route.params.id}/calls`
    url.searchParams.set('callid', route.params.callId)
    return url
}

export function createAdvancedJournalRoute ({ name, path, resource, parentPath, useV2 = false, licenses = false }) {
    return {
        name: name,
        path: path,
        component: () => import('pages/AuiJournalListPage'),
        props: {
            resource: resource,
            useV2: useV2
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.' + resource
            },
            get label () {
                return i18n.global.tc('Journal')
            },
            icon: 'list_alt',
            licenses,
            parentPath
        }
    }
}

export function createJournalRoute ({ name, resource, parentPath, useV2 = false, licenses = false, resourceId = null }) {
    return {
        name: name,
        path: 'journal',
        component: () => import('pages/AuiJournalSubContext'),
        props: (route) => {
            const resourceIdParam = resourceId === null ? route.params.id : route.params[resourceId]
            return {
                resource,
                resourceId: resourceIdParam,
                useV2
            }
        },
        meta: {
            $p: {
                operation: 'read',
                resource: ['entity.' + resource, 'entity.journals']
            },
            get label () {
                return i18n.global.tc('Journal')
            },
            icon: 'list_alt',
            licenses,
            parentPath,
            menu: true
        }
    }
}
