import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'ncosLevelList',
        path: '/ncos',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.ncoslevels'
            },
            get label () {
                return i18n.t('NCOS Levels')
            },
            icon: 'fas fa-layer-group',
            proxy: true
        }
    },
    createAdvancedJournalRoute({
        name: 'ncosLevelJournalAdvanced',
        path: '/ncos/journal',
        resource: 'ncoslevels',
        parentPath: 'ncosLevelList'
    }),
    {
        name: 'ncosLevelCreate',
        path: '/ncos/create',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.ncoslevels'
            },
            proxy: true
        }
    },
    {
        name: 'ncosLevelPattern',
        path: '/ncos/:id/pattern',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.ncoslevels'
            },
            proxy: true
        }
    },
    {
        name: 'ncosLevelCatchAll',
        path: '/ncos/*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.ncoslevels'
            },
            proxy: true
        }
    }
]