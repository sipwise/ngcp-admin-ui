import { i18n } from 'boot/i18n'

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
                return i18n.t('Call List Suppressions')
            },
            icon: 'far fa-list-alt',
            root: true
        }
    },
    {
        name: 'callListSupressionCreation',
        path: '/calllistsuppression/create',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.calllistsuppressions'
            },
            proxy: true
        }
    },
    {
        name: 'callListSuppressionEdit',
        path: '/calllistsuppression/:id/edit',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.calllistsuppressions'
            },
            get label () {
                return i18n.t('Edit')
            },
            icon: 'edit',
            parentPath: 'callListSuppressionList',
            proxy: true
        }
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
        path: '/calllistsuppression/*',
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
