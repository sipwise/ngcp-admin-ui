import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'
import { PLATFORM_CARRIER, PLATFORM_PRO } from 'src/constants'

export default [
    {
        name: 'headerRuleSetList',
        path: '/header',
        component: () => import('pages/header-manipulations/AuiHeaderManipulationsList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.headerrulesets'
            },
            get label () {
                return i18n.global.tc('Header Manipulations')
            },
            icon: 'fas fa-edit',
            root: true,
            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
        }
    },
    createAdvancedJournalRoute({
        name: 'headerRuleSetJournalAdvanced',
        path: '/header/journal',
        resource: 'headerrulesets',
        parentPath: 'headerRuleSetList'
    }),
    {
        name: 'headerRuleSetCreation',
        path: '/header/create',
        component: () => import('pages/header-manipulations/AuiHeaderManipulationsCreation'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.headerrulesets'
            },
            get label () {
                return i18n.global.tc('Add')
            },
            icon: 'add',
            parentPath: 'headerRuleSetList'
        }
    },
    {
        name: 'headerRuleSetContext',
        path: '/header/:id',
        redirect: (to) => {
            return { name: 'headerRuleSetEdit', params: to.params }
        },
        component: () => import('pages/header-manipulations/AuiHeaderManipulationsContext'),
        props: true,
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.headerrulesets'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return '#' + resourceObject.id + ' - ' + resourceObject.name
            },
            parentPath: 'headerRuleSetList'
        },
        children: [
            {
                name: 'headerRuleSetEdit',
                path: 'edit',
                component: () => import('pages/header-manipulations/AuiHeaderManipulationsEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.headerrulesets'
                    },
                    get label () {
                        return i18n.global.tc('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'headerRuleSetList.headerRuleSetContext',
                    menu: true
                }
            }
        ]
    },
    {
        name: 'headerRuleSetRules',
        path: '/header/:id/rules',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.headerrulesets'
            },
            get label () {
                return i18n.global.tc('Rules')
            },
            icon: 'article',
            proxy: true
        }
    },
    {
        name: 'headerRuleSetCatchAll',
        path: '/header/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.headerrulesets'
            },
            proxy: true,
            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
        }
    }
]
