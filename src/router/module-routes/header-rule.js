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
            },
            {
                name: 'headerRuleSetRules',
                path: 'rules',
                component: () => import('pages/header-manipulations-rules/AuiHeaderManipulationsRulesList'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.headerrules'
                    },
                    get label () {
                        return i18n.global.tc('Rules')
                    },
                    parentPath: 'headerRuleSetList.headerRuleSetContext',
                    icon: 'article'
                }
            },
            {
                name: 'headerRuleSetRulesCreate',
                path: 'rules/create',
                component: () => import('pages/header-manipulations-rules/AuiHeaderManipulationsRulesCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.headerrules'
                    },
                    get label () {
                        return i18n.global.tc('Add')
                    },
                    parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules',
                    icon: 'add'
                }
            },
            {
                name: 'headerRuleSetRulesContext',
                path: 'rules/:headeruleId',
                redirect: (to) => {
                    return {
                        name: 'headerRuleSetRulesEdit',
                        params: to.params
                    }
                },
                component: () => import('pages/header-manipulations-rules/AuiHeaderManipulationsRulesContext'),
                props: true,
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.headerrules'
                    },
                    contextRoot: true,
                    contextLabel: ({ resourceObject }) => {
                        return '#' + resourceObject.id + '-' + resourceObject.name
                    },
                    parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules'
                },
                children: [
                    {
                        name: 'headerRuleSetRulesEdit',
                        path: '/header/:id/rules/:headeruleId/edit',
                        component: () => import('pages/header-manipulations-rules/AuiHeaderManipulationsRulesEdit'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.headerrules'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext',
                            icon: 'edit',
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'headerRuleSetRulesConditions',
                        path: '/header/:id/rules/:headeruleId/conditions',
                        component: () => import('pages/header-manipulations-conditions/AuiHeaderManipulationsRulesConditionsList'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.headerruleconditions'
                            },
                            get label () {
                                return i18n.global.tc('Conditions')
                            },
                            icon: 'filter_alt',
                            parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext',
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'headerRulesConditionsCreate',
                        path: '/header/:id/rules/:headeruleId/conditions/create',
                        component: () => import('pages/header-manipulations-conditions/AuiHeaderManipulationsRulesConditionsCreation'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.headerruleconditions'
                            },
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            icon: 'add',
                            parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext.headerRuleSetRulesConditions',
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'headerRuleConditionContext',
                        path: 'conditions/:headerulecondtionsId',
                        redirect: (to) => {
                            return { name: 'headerRulesConditionsEdit', params: to.params }
                        },
                        component: () => import('pages/header-manipulations-conditions/AuiHeaderManipulationsRulesConditionsContext'),
                        props: true,
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.headerruleconditions'
                            },
                            contextRoot: true,
                            contextLabel: ({ resourceObject }) => {
                                return '#' + resourceObject.id + ' - ' + resourceObject.match_name
                            },
                            parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext.headerRuleSetRulesConditions'
                        },
                        children: [
                            {
                                name: 'headerRulesConditionsEdit',
                                path: '/header/:id/rules/:headeruleId/conditions/:headerulecondtionsId/edit',
                                component: () => import('pages/header-manipulations-conditions/AuiHeaderManipulationsRulesConditionsEdit'),
                                meta: {
                                    $p: {
                                        operation: 'create',
                                        resource: 'entity.headerruleconditions'
                                    },
                                    get label () {
                                        return i18n.global.tc('Edit')
                                    },
                                    icon: 'edit',
                                    parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext.headerRuleSetRulesConditions.headerRuleConditionContext',
                                    proxy: true,
                                    hideFromPageMenu: true
                                }
                            }
                        ]
                    },
                    {
                        name: 'headerRuleSetRulesActions',
                        path: '/header/:id/rules/:headeruleId/actions',
                        component: () => import('pages/header-manipulations-actions/AuiHeaderManipulationsRulesActionsList'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.headerruleactions'
                            },
                            get label () {
                                return i18n.global.tc('Actions')
                            },
                            icon: 'play_arrow',
                            parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext',
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'headerRulesActionsCreate',
                        path: '/header/:id/rules/:headeruleId/actions/create',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.headerruleactions'
                            },
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            icon: 'add',
                            parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext.headerRuleSetRulesActions',
                            hideFromPageMenu: true,
                            proxy: true
                        }
                    },
                    {
                        name: 'headerRulesActionsEdit',
                        path: '/header/:id/rules/:headeruleId/conditions/:headeruleactionsId/edit',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.headerruleactions'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext.headerRuleSetRulesActions',
                            proxy: true,
                            hideFromPageMenu: true
                        }
                    }

                ]
            }
        ]
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
