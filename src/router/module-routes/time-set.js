import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'timeSetList',
        path: '/timeset',
        component: () => import('pages/AuiTimeSetList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.timesets'
            },
            get label () {
                return i18n.t('Time Set')
            },
            icon: 'fas fa-clock',
            root: true,
            journalRouteName: 'timeSetJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'timeSetJournalAdvanced',
        path: '/timeset/journal',
        resource: 'timesets',
        parentPath: 'timeSetList'
    }),
    {
        name: 'timeSetCreation',
        path: '/timeset/create',
        component: () => import('pages/AuiTimeSetCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.timesets'
            },
            get label () {
                return i18n.t('Add')
            },
            icon: 'add',
            parentPath: 'timeSetList'
        }
    },
    {
        name: 'timeSetEdit',
        path: '/timeset/:id/edit',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.timesets'
            },
            get label () {
                return i18n.t('Edit')
            },
            icon: 'edit',
            parentPath: 'timeSetList',
            proxy: true
        }
    },
    {
        name: 'timeSetEvents',
        path: '/timeset/:id/event',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.timesets'
            },
            get label () {
                return i18n.t('Events')
            },
            icon: 'far fa-calendar-alt',
            parentPath: 'timeSetList',
            proxy: true
        }
    }, {
        name: 'timeSetResellerEdit',
        path: '/reseller/:resellerId/details/timeset/:id/edit',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.timesets'
            },
            get label () {
                return i18n.t('Edit')
            },
            icon: 'edit',
            proxy: true
        }
    },
    {
        name: 'timeSetCatchAll',
        path: '/timeset/*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.timesets'
            },
            proxy: true
        }
    }
]
