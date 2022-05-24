import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'invoiceList',
        path: '/invoice',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.invoices'
            },
            get label () {
                return i18n.t('Invoices')
            },
            icon: 'fas fa-file-invoice-dollar',
            proxy: true
        },
        children: [
            {
                name: 'invoiceDownload',
                path: '/invoice/:id/download',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.invoices'
                    },
                    get label () {
                        return i18n.t('Download')
                    },
                    icon: 'fas fa-file-invoice-dollar',
                    proxy: true
                }
            }
        ]
    },
    createAdvancedJournalRoute({
        name: 'invoiceJournalAdvanced',
        path: '/invoice/journal',
        resource: 'invoices',
        parentPath: 'invoiceList'
    }),
    {
        name: 'invoiceCatchAll',
        path: '/invoice/*',
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
