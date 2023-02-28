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
        path: '/rewrite/:rewriteRuleSetId',
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
                component: () => import('pages/Proxy'),
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
                    proxy: true,
                    menu: true
                }
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
