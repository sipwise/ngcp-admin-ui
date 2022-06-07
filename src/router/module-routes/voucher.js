import { i18n } from 'boot/i18n'

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
                return i18n.t('Billing Vouchers')
            },
            icon: 'fas fa-money-check-alt',
            proxy: true,
            platformInfo: 'voucher'
        }
    },
    {
        name: 'voucherCatchAll',
        path: '/voucher/*',
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
