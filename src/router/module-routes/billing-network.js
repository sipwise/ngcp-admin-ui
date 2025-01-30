import { i18n } from 'boot/i18n'
import { LICENSES } from 'src/constants'
import { createAdvancedJournalRoute } from 'src/router/common'

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
                return i18n.global.tc('Billing Networks')
            },
            icon: 'fas fa-credit-card',
            licenses: [LICENSES.billing],
            root: true
        }
    },
    createAdvancedJournalRoute({
        name: 'billingNetworkJournalAdvanced',
        path: '/network/journal',
        resource: 'billingnetworks',
        parentPath: 'billingNetworkList',
        licenses: [LICENSES.billing]
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
                return i18n.global.tc('Add Billing Network')
            },
            icon: 'add',
            licenses: [LICENSES.billing],
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
                        return i18n.global.tc('Edit')
                    },
                    icon: 'edit',
                    licenses: [LICENSES.billing],
                    parentPath: 'billingNetworkList.billingNetworkContext'
                }
            }
        ]
    },
    {
        name: 'billingNetworkCatchAll',
        path: '/network/:pathMatch(.*)',
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
