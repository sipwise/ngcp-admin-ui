import { i18n } from 'boot/i18n'
import { LICENSES, PLATFORM_CARRIER, PLATFORM_PRO } from 'src/constants'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'headerSetList',
        path: '/header',
        component: () => import('pages/header-manipulations/AuiHeaderManipulationsList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.headerrulesets'
            },
            get label () {
                return i18n.global.t('Header Manipulations')
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
        parentPath: 'headerSetList',
        licenses: [LICENSES.header_manipulation]
    }),
    {
        name: 'headerSetCreation',
        path: '/header/create',
        component: () => import('pages/header-manipulations/AuiHeaderManipulationsCreation'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.headerrulesets'
            },
            get label () {
                return i18n.global.t('Add')
            },
            icon: 'add',
            licenses: [LICENSES.header_manipulation],
            parentPath: 'headerSetList'
        }
    },
    {
        name: 'headerSetContext',
        path: '/header/:id',
        redirect: (to) => {
            return { name: 'headerSetEdit', params: to.params }
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
                return `#${resourceObject.id} - ${resourceObject.name}`
            },
            parentPath: 'headerSetList'
        },
        children: [
            {
                name: 'headerSetWizard',
                path: 'rules-wizard',
                component: () => import('pages/header-manipulations-wizard/AuiHeaderManipulationsWizard'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.headerrulesets'
                    },
                    get label () {
                        return i18n.global.t('Wizard')
                    },
                    // TODO: verify breadcrumb behavior and new header id injection
                    parentPath: 'headerSetList.headerSetContext',
                    icon: 'help',
                    licenses: [LICENSES.header_manipulation],
                    hideFromPageMenu: true
                }
            },
            {
                name: 'headerSetEdit',
                path: 'edit',
                component: () => import('pages/header-manipulations/AuiHeaderManipulationsEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.headerrulesets'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    licenses: [LICENSES.header_manipulation],
                    parentPath: 'headerSetList.headerSetContext',
                    menu: true
                }
            },
            {
                name: 'headerRules',
                path: 'rules',
                component: () => import('pages/header-manipulations-rules/AuiHeaderManipulationsRulesList'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.headerrules'
                    },
                    get label () {
                        return i18n.global.t('Rules')
                    },
                    parentPath: 'headerSetList.headerSetContext',
                    icon: 'article',
                    licenses: [LICENSES.header_manipulation]
                }
            },
            {
                name: 'headerRuleCreate',
                path: 'rules/create',
                component: () => import('pages/header-manipulations-rules/AuiHeaderManipulationsRuleCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.headerrules'
                    },
                    get label () {
                        return i18n.global.t('Add')
                    },
                    parentPath: 'headerSetList.headerSetContext.headerRules',
                    icon: 'add',
                    licenses: [LICENSES.header_manipulation]
                }
            },
            {
                name: 'headerRuleContext',
                path: 'rules/:headerRuleId',
                redirect: (to) => {
                    return {
                        name: 'headerRuleEdit',
                        params: to.params
                    }
                },
                component: () => import('pages/header-manipulations-rules/AuiHeaderManipulationsRuleContext'),
                props: true,
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.headerrules'
                    },
                    contextRoot: true,
                    contextLabel: ({ resourceObject }) => {
                        return `#${resourceObject.id}-${resourceObject.name}`
                    },
                    parentPath: 'headerSetList.headerSetContext.headerRules'
                },
                children: [
                    {
                        name: 'headerRuleEdit',
                        path: '/header/:id/rules/:headerRuleId/edit',
                        component: () => import('pages/header-manipulations-rules/AuiHeaderManipulationsRuleEdit'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.headerrules'
                            },
                            get label () {
                                return i18n.global.t('Edit')
                            },
                            parentPath: 'headerSetList.headerSetContext.headerRules.headerRuleContext',
                            icon: 'edit',
                            licenses: [LICENSES.header_manipulation],
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'headerRuleConditions',
                        path: '/header/:id/rules/:headerRuleId/conditions',
                        component: () => import('pages/header-manipulations-rules-conditions/AuiHeaderManipulationsRuleConditionsList'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.headerruleconditions'
                            },
                            get label () {
                                return i18n.global.t('Conditions')
                            },
                            icon: 'filter_alt',
                            licenses: [LICENSES.header_manipulation],
                            parentPath: 'headerSetList.headerSetContext.headerRules.headerRuleContext',
                            menu: true
                        }
                    },
                    {
                        name: 'headerRuleConditionCreate',
                        path: '/header/:id/rules/:headerRuleId/conditions/create',
                        component: () => import('pages/header-manipulations-rules-conditions/AuiHeaderManipulationsRuleConditionCreation'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.headerruleconditions'
                            },
                            get label () {
                                return i18n.global.t('Add')
                            },
                            icon: 'add',
                            licenses: [LICENSES.header_manipulation],
                            parentPath: 'headerSetList.headerSetContext.headerRules.headerRuleContext.headerRuleConditions',
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'headerRuleConditionContext',
                        path: 'conditions/:headerRuleConditionId',
                        redirect: (to) => {
                            return { name: 'headerRuleConditionEdit', params: to.params }
                        },
                        component: () => import('pages/header-manipulations-rules-conditions/AuiHeaderManipulationsRuleConditionContext'),
                        props: true,
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.headerruleconditions'
                            },
                            contextRoot: true,
                            contextLabel: ({ resourceObject }) => {
                                return `#${resourceObject.id} - ${resourceObject.match_name}`
                            },
                            parentPath: 'headerSetList.headerSetContext.headerRules.headerRuleContext.headerRuleConditions'
                        },
                        children: [
                            {
                                name: 'headerRuleConditionEdit',
                                path: '/header/:id/rules/:headerRuleId/conditions/:headerRuleConditionId/edit',
                                component: () => import('pages/header-manipulations-rules-conditions/AuiHeaderManipulationsRuleConditionEdit'),
                                meta: {
                                    $p: {
                                        operation: 'create',
                                        resource: 'entity.headerruleconditions'
                                    },
                                    get label () {
                                        return i18n.global.t('Edit')
                                    },
                                    icon: 'edit',
                                    licenses: [LICENSES.header_manipulation],
                                    parentPath: 'headerSetList.headerSetContext.headerRules.headerRuleContext.headerRuleConditions.headerRuleConditionContext',
                                    hideFromPageMenu: true
                                }
                            }
                        ]
                    },
                    {
                        name: 'headerRuleActions',
                        path: '/header/:id/rules/:headerRuleId/actions',
                        component: () => import('pages/header-manipulations-rules-actions/AuiHeaderManipulationsRuleActionsList'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.headerruleactions'
                            },
                            get label () {
                                return i18n.global.t('Actions')
                            },
                            icon: 'play_arrow',
                            licenses: [LICENSES.header_manipulation],
                            parentPath: 'headerSetList.headerSetContext.headerRules.headerRuleContext',
                            menu: true
                        }
                    },
                    {
                        name: 'headerRuleActionCreate',
                        path: '/header/:id/rules/:headerRuleId/actions/create',
                        component: () => import('pages/header-manipulations-rules-actions/AuiHeaderManipulationsRuleActionCreation'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.headerruleactions'
                            },
                            get label () {
                                return i18n.global.t('Add')
                            },
                            icon: 'add',
                            licenses: [LICENSES.header_manipulation],
                            parentPath: 'headerSetList.headerSetContext.headerRules.headerRuleContext.headerRuleActions',
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'headerRuleActionContext',
                        path: 'actions/:headerRuleActionId',
                        redirect: (to) => {
                            return { name: 'headerRuleActionEdit', params: to.params }
                        },
                        component: () => import('pages/header-manipulations-rules-actions/AuiHeaderManipulationsRuleActionContext'),
                        props: true,
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.headerruleactions'
                            },
                            contextRoot: true,
                            contextLabel: ({ resourceObject }) => {
                                return `#${resourceObject.id} - ${resourceObject.header}`
                            },
                            parentPath: 'headerSetList.headerSetContext.headerRules.headerRuleContext.headerRuleActions'
                        },
                        children: [
                            {
                                name: 'headerRuleActionEdit',
                                path: '/header/:id/rules/:headerRuleId/actions/:headerRuleActionId/edit',
                                component: () => import('pages/header-manipulations-rules-actions/AuiHeaderManipulationsRuleActionEdit'),
                                meta: {
                                    $p: {
                                        operation: 'create',
                                        resource: 'entity.headerruleactions'
                                    },
                                    get label () {
                                        return i18n.global.t('Edit')
                                    },
                                    icon: 'edit',
                                    licenses: [LICENSES.header_manipulation],
                                    parentPath: 'headerSetList.headerSetContext.headerRules.headerRuleContext.headerRuleActions.headerRuleActionContext',
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
