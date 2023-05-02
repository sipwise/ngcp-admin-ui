import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'voucherList',
        path: '/voucher',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.vouchers'
            },
            get label () {
                return i18n.global.tc('Billing Vouchers')
            },
            icon: 'fas fa-money-check-alt',
            proxy: true,
            platformInfo: 'voucher'
        }
    },
    createAdvancedJournalRoute({
        name: 'voucherJournalAdvanced',
        path: '/voucher/journal',
        resource: 'vouchers',
        parentPath: 'voucherList'
    }),
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
