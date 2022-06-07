import { i18n } from 'boot/i18n'

export default [
    {
        name: 'billingProfileList',
        path: '/billing',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.billingprofiles'
            },
            get label () {
                return i18n.t('Billing Profiles')
            },
            icon: 'fas fa-hand-holding-usd',
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
