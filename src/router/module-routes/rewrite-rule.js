import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'rewriteRuleSetList',
        path: '/rewrite',
        component: () => import('pages/rewrite-rule-sets/AuiRewriteRuleSetsList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.rewriterulesets'
            },
            get label () {
                return i18n.t('Rewrite Rule Sets')
            },
            icon: 'fas fa-file-alt',
            root: true,
            journalRouteName: 'rewriteRuleSetJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'rewriteRuleSetJournalAdvanced',
        path: '/rewrite/journal',
        resource: 'rewriterulesets',
        parentPath: 'rewriteRuleSetList'
    }),
    {
        name: 'rewriteRuleSetCreate',
        path: '/rewrite/create',
        component: () => import('pages/rewrite-rule-sets/AuiRewriteRuleSetsCreation'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.rewriterulesets'
            },
            get label () {
                return i18n.t('Add')
            },
            icon: 'add',
            parentPath: 'rewriteRuleSetList'
        }
    },
    {
        name: 'rewriteRuleSetContext',
        path: '/rewrite/:id',
        redirect: (to) => {
            return { name: 'rewriteRuleSetsEdit', params: to.params }
        },
        component: () => import('pages/rewrite-rule-sets/AuiRewriteRuleSetsContext'),
        props: true,
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.rewriterulesets'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return '#' + resourceObject.id + ' - ' + resourceObject.name
            },
            parentPath: 'rewriteRuleSetList'
        },
        children: [
            {
                name: 'rewriteRuleSetsEdit',
                path: 'edit',
                component: () => import('pages/rewrite-rule-sets/AuiRewriteRuleSetsEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.rewriterulesets'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'rewriteRuleSetList.rewriteRuleSetContext',
                    menu: true
                }
            },
            {
                name: 'rewriteRuleSetRules',
                path: 'rules',
                component: () => import('pages/rewrite-rule-set-rules/AuiRewriteRuleSetRulesPage'),
                props: {
                    detailsPageRouteName: 'rewriteRuleSetRules',
                    redirectToSubpageRoute: { name: 'inboundRewriteRulesCallee' }
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.rewriterulesets'
                    },
                    get label () {
                        return i18n.t('Rules')
                    },
                    icon: 'article',
                    parentPath: 'rewriteRuleSetList.rewriteRuleSetContext',
                    menu: true
                },
                children: [
                    {
                        name: 'inboundRewriteRulesCaller',
                        path: 'inbound-caller',
                        component: () => import('pages/rewrite-rule-set-rules/AuiRewriteRuleSetRulesList'),
                        props: {
                            direction: 'in',
                            field: 'caller'
                        },
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.rewriterules'
                            },
                            get label () {
                                return i18n.t('Inbound for Caller')
                            },
                            parentPath: 'rewriteRuleSetList.rewriteRuleSetContext.rewriteRuleSetRules',
                            icon: 'fas fa-sign-in-alt',
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/rewrite/' + route.params.id + '/rules'
                                return url
                            }
                        }
                    },
                    {
                        name: 'inboundRewriteRulesCallee',
                        path: 'inbound-callee',
                        component: () => import('pages/rewrite-rule-set-rules/AuiRewriteRuleSetRulesList'),
                        props: {
                            direction: 'in',
                            field: 'callee'
                        },
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.rewriterules'
                            },
                            get label () {
                                return i18n.t('Inbound for Callee')
                            },
                            parentPath: 'rewriteRuleSetList.rewriteRuleSetContext.rewriteRuleSetRules',
                            icon: 'fas fa-sign-in-alt',
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/rewrite/' + route.params.id + '/rules'
                                return url
                            }
                        }
                    },
                    {
                        name: 'outboundRewriteRulesCaller',
                        path: 'outbound-caller',
                        component: () => import('pages/rewrite-rule-set-rules/AuiRewriteRuleSetRulesList'),
                        props: {
                            direction: 'out',
                            field: 'caller'
                        },
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.rewriterules'
                            },
                            get label () {
                                return i18n.t('Outbound for Caller')
                            },
                            parentPath: 'rewriteRuleSetList.rewriteRuleSetContext.rewriteRuleSetRules',
                            icon: 'fas fa-sign-out-alt',
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/rewrite/' + route.params.id + '/rules'
                                return url
                            }
                        }
                    },
                    {
                        name: 'outboundRewriteRulesCallee',
                        path: 'outbound-callee',
                        component: () => import('pages/rewrite-rule-set-rules/AuiRewriteRuleSetRulesList'),
                        props: {
                            direction: 'out',
                            field: 'callee'
                        },
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.rewriterules'
                            },
                            get label () {
                                return i18n.t('Outbound for Callee')
                            },
                            parentPath: 'rewriteRuleSetList.rewriteRuleSetContext.rewriteRuleSetRules',
                            icon: 'fas fa-sign-out-alt',
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/rewrite/' + route.params.id + '/rules'
                                return url
                            }
                        }
                    },
                    {
                        name: 'lnpRewriteRulesCaller',
                        path: 'lnp-caller',
                        component: () => import('pages/rewrite-rule-set-rules/AuiRewriteRuleSetRulesList'),
                        props: {
                            direction: 'lnp',
                            field: 'caller'
                        },
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.rewriterules'
                            },
                            get label () {
                                return i18n.t('LNP for Caller')
                            },
                            parentPath: 'rewriteRuleSetList.rewriteRuleSetContext.rewriteRuleSetRules',
                            icon: 'fas fa-table',
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/rewrite/' + route.params.id + '/rules'
                                return url
                            }
                        }
                    },
                    {
                        name: 'lnpRewriteRulesCallee',
                        path: 'lnp-callee',
                        component: () => import('pages/rewrite-rule-set-rules/AuiRewriteRuleSetRulesList'),
                        props: {
                            direction: 'lnp',
                            field: 'callee'
                        },
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.rewriterules'
                            },
                            get label () {
                                return i18n.t('LNP for Callee')
                            },
                            parentPath: 'rewriteRuleSetList.rewriteRuleSetContext.rewriteRuleSetRules',
                            icon: 'fas fa-table',
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/rewrite/' + route.params.id + '/rules'
                                return url
                            }
                        }
                    },
                    {
                        name: 'rewriteRulesCreation',
                        path: 'create',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.rewriterules'
                            },
                            get label () {
                                return i18n.t('Add')
                            },
                            parentPath: 'rewriteRuleSetList.rewriteRuleSetContext.rewriteRuleSetRules',
                            icon: 'add',
                            hideFromPageMenu: true,
                            proxy: true
                        }
                    },
                    {
                        name: 'rewriteRulesEdit',
                        path: ':rewriteRuleId/edit',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.rewriterules'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'rewriteRuleSetList.rewriteRuleSetContext.rewriteRuleSetRules',
                            hideFromPageMenu: true,
                            proxy: true
                        }
                    }
                ]
            },
            {
                name: 'rewriteRuleSetClone',
                path: 'clone',
                component: () => import('pages/rewrite-rule-sets/AuiRewriteRuleSetsClone'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.rewriterulesets'
                    },
                    get label () {
                        return i18n.t('Clone')
                    },
                    icon: 'content_copy',
                    parentPath: 'rewriteRuleSetList.rewriteRuleSetContext',
                    menu: true
                }
            }
        ]
    },
    {
        name: 'rewriteRuleSetCatchAll',
        path: '/rewrite/*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.rewriterulesets'
            },
            proxy: true
        }
    }
]
