import { i18n } from 'boot/i18n'
import { LICENSES } from 'src/constants'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'invoiceTemplateList',
        path: '/invoicetemplate',
        component: () => import('pages/AuiInvoiceTemplatesList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.invoicetemplates'
            },
            get label () {
                return i18n.global.t('Invoice Templates')
            },
            icon: 'fas fa-file-invoice',
            licenses: [LICENSES.invoice],
            root: true,
            journalRouteName: 'invoiceTemplateJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'invoiceTemplateJournalAdvanced',
        path: '/invoicetemplate/journal',
        resource: 'invoicetemplates',
        parentPath: 'invoiceTemplateList',
        licenses: [LICENSES.invoice]
    }),
    {
        name: 'invoiceTemplateEditInfo',
        path: '/invoicetemplate/:id/editinfo',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.invoicetemplates'
            },
            get label () {
                return i18n.global.t('Edit')
            },
            icon: 'fas fa-file-invoice',
            licenses: [LICENSES.invoice],
            proxy: true
        }
    },
    {
        name: 'invoiceTemplateEditContent',
        path: '/invoicetemplate/:id/editcontent',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.invoicetemplates'
            },
            get label () {
                return i18n.global.t('Edit Template')
            },
            icon: 'fas fa-file-invoice',
            licenses: [LICENSES.invoice],
            proxy: true
        }
    },
    {
        name: 'invoiceTemplateCreation',
        path: '/invoicetemplate/create',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.invoicetemplates'
            },
            licenses: [LICENSES.invoice],
            proxy: true
        }
    },
    {
        name: 'invoiceTemplateCatchAll',
        path: '/invoicetemplate/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.invoicetemplates'
            },
            proxy: true
        }
    }
]
