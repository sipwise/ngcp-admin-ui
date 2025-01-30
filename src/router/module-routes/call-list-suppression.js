import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'callListSuppressionList',
        path: '/calllistsuppression',
        component: () => import('pages/AuiCallListSuppressionList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.calllistsuppressions'
            },
            get label () {
                return i18n.global.tc('Call List Suppressions')
            },
            icon: 'far fa-list-alt',
            root: true
        }
    },
    createAdvancedJournalRoute({
        name: 'callListSuppressionJournalAdvanced',
        path: '/calllistsuppression/journal',
        resource: 'calllistsuppressions',
        parentPath: 'callListSuppressionList'
    }),
    {
        name: 'callListSuppressionCreation',
        path: '/calllistsuppression/create',
        component: () => import('pages/AuiCallListSuppressionCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.calllistsuppressions'
            },
            get label () {
                return i18n.global.tc('Add')
            },
            icon: 'add',
            parentPath: 'callListSuppressionList'
        }
    },
    {
        name: 'callListSuppressionContext',
        path: '/calllistsuppression/:id',
        component: () => import('pages/AuiCallListSuppressionContext'),
        redirect: (to) => {
            return { name: 'callListSuppressionEdit', params: to.params }
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.calllistsuppressions'
            },
            contextRoot: true,
            parentPath: 'callListSuppressionList'
        },
        children: [
            {
                name: 'callListSuppressionEdit',
                path: 'edit',
                component: () => import('pages/AuiCallListSuppressionEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.calllistsuppressions'
                    },
                    get label () {
                        return i18n.global.tc('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'callListSuppressionList.callListSuppressionContext',
                    menu: true
                }
            }
        ]
    },
    {
        name: 'callListSuppressionUpload',
        path: '/calllistsuppression/upload',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.calllistsuppressions'
            },
            proxy: true
        }
    },
    {
        name: 'callListSuppressionCatchAll',
        path: '/calllistsuppression/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.calllistsuppressions'
            },
            proxy: true
        }
    }
]
