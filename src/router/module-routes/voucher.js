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
        name: 'billingVouchersCreation',
        path: '/voucher/create',
        component: () => import('pages/Proxy'),
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
            proxy: true,
            parentPath: 'voucherList'
        }
    },
    {
        name: 'billingVoucherEdit',
        path: '/voucher/:id/edit',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.vouchers'
            },
            get label () {
                return i18n.global.tc('Edit')
            },
            icon: 'edit',
            licenses: [LICENSES.billing],
            proxy: true,
            parentPath: 'voucherList'
        }
    },
    {
        name: 'billingVoucherUpload',
        path: '/voucher/upload',
        component: () => import('pages/Proxy'),
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
            proxy: true,
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
