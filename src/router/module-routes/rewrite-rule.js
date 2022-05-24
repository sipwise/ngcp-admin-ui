import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'rewriteRuleSetList',
        path: '/rewrite',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.rewriterulesets'
            },
            get label () {
                return i18n.t('Rewrite Rule Sets')
            },
            icon: 'fas fa-file-alt',
            proxy: true
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
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.rewriterulesets'
            },
            proxy: true
        }
    },
    {
        name: 'rewriteRuleSetRules',
        path: '/rewrite/:id/rules',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.rewriterulesets'
            },
            proxy: true
        }
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
