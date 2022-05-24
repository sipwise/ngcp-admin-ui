import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'billingNetworkList',
        path: '/network',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.billingnetworks'
            },
            get label () {
                return i18n.t('Billing Networks')
            },
            icon: 'fas fa-credit-card',
            proxy: true
        }
    },
    createAdvancedJournalRoute({
        name: 'billingNetworkJournalAdvanced',
        path: '/network/journal',
        resource: 'billingnetworks',
        parentPath: 'billingNetworkList'
    }),
    {
        name: 'billingNetworkCreation',
        path: '/network/create',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.billingnetworks'
            },
            proxy: true
        }
    },
    {
        name: 'billingNetworkEdit',
        path: '/network/:id/edit',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.billingnetworks'
            },
            get label () {
                return i18n.t('Edit')
            },
            icon: 'edit',
            proxy: true
        }
    },
    {
        name: 'billingNetworkCatchAll',
        path: '/network/*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.billingnetworks'
            },
            proxy: true
        }
    }
]
