import { i18n } from 'boot/i18n'
import { LICENSES } from 'src/constants'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'voucherList',
        path: '/voucher',
        component: () => import('pages/billing-vouchers/AuiBillingVouchersList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.vouchers'
            },
            get label () {
                return i18n.global.tc('Billing Vouchers')
            },
            icon: 'fas fa-money-check-alt',
            licenses: [LICENSES.billing],
            root: true,
            platformInfo: 'voucher'
        }
    },
    createAdvancedJournalRoute({
        name: 'voucherJournalAdvanced',
        path: '/voucher/journal',
        resource: 'vouchers',
        parentPath: 'voucherList',
        licenses: [LICENSES.billing]
    }),
    {
        name: 'billingVoucherCreation',
        path: '/voucher/create',
        component: () => import('pages/billing-vouchers/AuiBillingVoucherCreation'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.vouchers'
            },
            get label () {
                return i18n.global.tc('Add')
            },
            icon: 'add',
            licenses: [LICENSES.billing],
            parentPath: 'voucherList'
        }
    },
    {
        name: 'billingVoucherContext',
        path: '/voucher/:id',
        redirect: (to) => {
            return { name: 'billingVoucherEdit', params: to.params }
        },
        component: () => import('pages/billing-vouchers/AuiBillingVoucherContext'),
        props: true,
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.vouchers'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return `#${resourceObject.id} - ${resourceObject.code}`
            },
            icon: 'edit',
            licenses: [LICENSES.billing],
            parentPath: 'voucherList'
        },
        children: [
            {
                name: 'billingVoucherEdit',
                path: 'edit',
                component: () => import('pages/billing-vouchers/AuiBillingVoucherEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.vouchers'
                    },
                    get label () {
                        return i18n.global.tc('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'voucherList.billingVoucherContext',
                    menu: true
                }
            }
        ]
    },
    {
        name: 'billingVoucherUpload',
        path: '/voucher/upload',
        component: () => import('pages/billing-vouchers/AuiBillingVoucherUpload'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.vouchers'
            },
            get label () {
                return i18n.global.tc('Upload')
            },
            icon: 'fas fa-upload',
            licenses: [LICENSES.billing],
            parentPath: 'voucherList',
            platformInfo: 'voucher'
        }
    },
    {
        name: 'voucherCatchAll',
        path: '/voucher/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.vouchers'
            },
            proxy: true
        }
    }
]
