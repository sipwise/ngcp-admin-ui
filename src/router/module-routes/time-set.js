import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'timeSetList',
        path: '/timeset',
        component: () => import('pages/timesets/AuiTimeSetList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.timesets'
            },
            get label () {
                return i18n.global.t('Time Set')
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
        component: () => import('pages/timesets/AuiTimeSetCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.timesets'
            },
            get label () {
                return i18n.global.t('Add')
            },
            icon: 'add',
            parentPath: 'timeSetList'
        }
    },
    {
        name: 'timeSetContext',
        path: '/timeset/:id',
        component: () => import('pages/timesets/AuiTimeSetContext'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.timesets'
            },
            contextRoot: true,
            parentPath: 'timeSetList'
        },
        children: [
            {
                name: 'timeSetEdit',
                path: '/timeset/:id/edit',
                component: () => import('pages/timesets/AuiTimeSetEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.timesets'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'timeSetList.timeSetContext',
                    menu: true
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
                        return i18n.global.t('Events')
                    },
                    icon: 'far fa-calendar-alt',
                    parentPath: 'timeSetList.timeSetContext',
                    menu: true,
                    proxy: true
                }
            }
        ]
    },
    {
        name: 'timeSetCatchAll',
        path: '/timeset/:pathMatch(.*)',
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
