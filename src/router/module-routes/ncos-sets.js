import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute, createJournalRoute } from 'src/router/common'

export default [
    {
        name: 'ncosSetsList',
        path: '/ncossets',
        component: () => import('pages/ncos-sets/AuiNCOSSetsList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.ncos'
            },
            get label () {
                return i18n.global.t('NCOS Sets')
            },
            icon: 'fas fa-object-group',
            root: true,
            journalRouteName: 'ncosSetsJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'ncosSetsJournalAdvanced',
        path: '/ncossets/journal',
        resource: 'ncos',
        parentPath: 'ncosSetsList',
        useV2: true
    }),
    {
        name: 'ncosSetsCreate',
        path: '/ncossets/create',
        component: () => import('pages/ncos-sets/AuiNCOSSetsCreation'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.ncos'
            },
            get label () {
                return i18n.global.t('Add NCOS Set')
            },
            icon: 'add',
            parentPath: 'ncosSetsList'
        }
    },
    {
        name: 'ncosSetsContext',
        path: '/ncossets/:id',
        redirect: (to) => {
            return { name: 'ncosSetsEdit', params: to.params }
        },
        component: () => import('pages/ncos-sets/AuiNCOSSetsContext'),
        props: true,
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.ncos'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return `#${resourceObject.id} - ${resourceObject.name}`
            },
            parentPath: 'ncosSetsList'
        },
        children: [
            {
                name: 'ncosSetsEdit',
                path: 'edit',
                component: () => import('pages/ncos-sets/AuiNCOSSetsEdit'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.ncos'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'ncosSetsList.ncosSetsContext',
                    menu: true
                }
            },
            {
                name: 'ncosSetLevelsList',
                path: 'levels',
                component: () => import('pages/ncos-sets/AuiNCOSSetLevelsLists'),
                props: true,
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.ncos'
                    },
                    get label () {
                        return i18n.global.t('Levels')
                    },
                    icon: 'fas fa-layer-group',
                    parentPath: 'ncosSetsList.ncosSetsContext',
                    menu: true
                }
            },
            createJournalRoute({
                name: 'ncosSetsJournal',
                resource: 'ncos',
                parentPath: 'ncosSetsList.ncosSetsContext',
                useV2: true
            })
        ]
    },
    {
        name: 'ncosSetCatchAll',
        path: '/ncossets/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.ncos'
            },
            proxy: true
        }
    }
]
