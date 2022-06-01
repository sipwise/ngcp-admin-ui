import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute, createJournalRoute } from 'src/router/common'

export default [
    {
        name: 'billingNetworkList',
        path: '/network',
        component: () => import('pages/billing-networks/AuiBillingNetworkList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.billingnetworks'
            },
            get label () {
                return i18n.t('Billing Networks')
            },
            icon: 'fas fa-credit-card',
            root: true
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
        component: () => import('pages/billing-networks/AuiBillingNetworkCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.billingnetworks'
            },
            get label () {
                return i18n.t('Add Billing Network')
            },
            icon: 'add',
            parentPath: 'billingNetworkList'
        }
    },
    {
        name: 'billingNetworkContext',
        path: '/network/:id',
        component: () => import('pages/billing-networks/AuiBillingNetworkContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.billingnetworks'
            },
            parentPath: 'billingNetworkList',
            contextRoot: true
        },
        children: [
            {
                name: 'billingNetworkEdit',
                path: 'edit',
                component: () => import('pages/billing-networks/AuiBillingNetworkEdit'),
                props: {
                    id: null
                },
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingnetworks'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'billingNetworkList.billingNetworkContext'
                }
            },
            createJournalRoute({
                name: 'billingNetworkJournal',
                resource: 'billingnetworks',
                parentPath: 'billingNetworkList.billingNetworkContext'
            })
        ]
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
