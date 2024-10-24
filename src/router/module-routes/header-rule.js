import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'
import { LICENSES, PLATFORM_CARRIER, PLATFORM_PRO } from 'src/constants'

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
            licenses: [LICENSES.header_manipulation],
            root: true,
            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
        }
    },
    createAdvancedJournalRoute({
        name: 'headerRuleSetJournalAdvanced',
        path: '/header/journal',
        resource: 'headerrulesets',
        parentPath: 'headerRuleSetList',
        licenses: [LICENSES.header_manipulation]
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
            licenses: [LICENSES.header_manipulation],
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
                    licenses: [LICENSES.header_manipulation],
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
                    icon: 'article',
                    licenses: [LICENSES.header_manipulation]
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
                    icon: 'add',
                    licenses: [LICENSES.header_manipulation]
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
                            licenses: [LICENSES.header_manipulation],
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
                            licenses: [LICENSES.header_manipulation],
                            parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext',
                            menu: true
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
                            licenses: [LICENSES.header_manipulation],
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
                                    licenses: [LICENSES.header_manipulation],
                                    parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext.headerRuleSetRulesConditions.headerRuleConditionContext',
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
                            licenses: [LICENSES.header_manipulation],
                            parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext',
                            menu: true
                        }
                    },
                    {
                        name: 'headerRulesActionsCreate',
                        path: '/header/:id/rules/:headeruleId/actions/create',
                        component: () => import('pages/header-manipulations-actions/AuiHeaderManipulationsRulesActionsCreation'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.headerruleactions'
                            },
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            icon: 'add',
                            licenses: [LICENSES.header_manipulation],
                            parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext.headerRuleSetRulesActions',
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'headerRuleActionContext',
                        path: 'actions/:headeruleactionsId',
                        redirect: (to) => {
                            return { name: 'headerRulesActionsEdit', params: to.params }
                        },
                        component: () => import('pages/header-manipulations-actions/AuiHeaderManipulationsRulesActionsContext'),
                        props: true,
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.headerruleactions'
                            },
                            contextRoot: true,
                            contextLabel: ({ resourceObject }) => {
                                return '#' + resourceObject.id + ' - ' + resourceObject.header
                            },
                            parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext.headerRuleSetRulesActions'
                        },
                        children: [
                            {
                                name: 'headerRulesActionsEdit',
                                path: '/header/:id/rules/:headeruleId/actions/:headeruleactionsId/edit',
                                component: () => import('pages/header-manipulations-actions/AuiHeaderManipulationsRulesActionsEdit'),
                                meta: {
                                    $p: {
                                        operation: 'create',
                                        resource: 'entity.headerruleactions'
                                    },
                                    get label () {
                                        return i18n.global.tc('Edit')
                                    },
                                    icon: 'edit',
                                    licenses: [LICENSES.header_manipulation],
                                    parentPath: 'headerRuleSetList.headerRuleSetContext.headerRuleSetRules.headerRuleSetRulesContext.headerRuleSetRulesActions.headerRuleActionContext',
                                    hideFromPageMenu: true
                                }
                            }
                        ]
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
