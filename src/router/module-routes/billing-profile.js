import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'billingProfileList',
        path: '/billing',
        component: () => import('pages/billing-profiles/AuiBillingProfilesList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.billingprofiles'
            },
            get label () {
                return i18n.t('Billing Profiles')
            },
            icon: 'fas fa-hand-holding-usd',
            root: true,
            journalRouteName: 'billingProfileJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'billingProfileJournalAdvanced',
        path: '/billing/journal',
        resource: 'billingprofiles',
        parentPath: 'billingProfileList'
    }),
    {
        name: 'billingProfileDuplicate',
        path: '/billing/:id/duplicate',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.billingprofiles'
            },
            get label () {
                return i18n.t('Duplicate')
            },
            icon: 'content_copy',
            proxy: true
        }
    },
    {
        name: 'billingProfileCreation',
        path: '/billing/create',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.billingprofiles'
            },
            proxy: true
        }
    },
    {
        name: 'billingProfileEdit',
        path: '/billing/:id/edit',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.billingprofiles'
            },
            get label () {
                return i18n.t('Edit')
            },
            icon: 'edit',
            proxy: true
        }
    },
    {
        name: 'billingProfileFees',
        path: '/billing/:id/fees',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.billingprofiles'
            },
            get label () {
                return i18n.t('Fees')
            },
            icon: 'fas fa-shopping-cart',
            proxy: true
        }
    },
    {
        name: 'billingProfilePeaktimes',
        path: '/billing/:id/peaktimes',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.billingprofiles'
            },
            get label () {
                return i18n.t('Off-peaktimes')
            },
            icon: 'fas fa-clock',
            proxy: true
        }
    },
    {
        name: 'billingProfileCatchAll',
        path: '/billing/*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.billingprofiles'
            },
            proxy: true
        }
    }
]
