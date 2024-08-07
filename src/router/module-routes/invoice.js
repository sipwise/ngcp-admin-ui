import { i18n } from 'boot/i18n'
import { LICENSES } from 'src/constants'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'invoiceList',
        path: '/invoice',
        component: () => import('pages/invoices/AuiInvoiceList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.invoices'
            },
            get label () {
                return i18n.global.tc('Invoices')
            },
            icon: 'fas fa-file-invoice-dollar',
            licenses: [LICENSES.invoice],
            root: true,
            journalRouteName: 'invoiceJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'invoiceJournalAdvanced',
        path: '/invoice/journal',
        resource: 'invoices',
        parentPath: 'invoiceList',
        licenses: [LICENSES.invoice]
    }),
    {
        name: 'invoiceCreation',
        path: '/invoice/create',
        component: () => import('pages/invoices/AuiInvoiceCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.invoices'
            },
            get label () {
                return i18n.global.tc('Add Invoice')
            },
            icon: 'add',
            licenses: [LICENSES.invoice],
            root: true,
            parentPath: 'invoiceList'
        }
    },
    {
        name: 'invoiceCatchAll',
        path: '/invoice/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.invoices'
            },
            proxy: true
        }
    }
]
