import { i18n } from 'boot/i18n'
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
                return i18n.global.tc('Invoice Templates')
            },
            icon: 'fas fa-file-invoice',
            root: true,
            journalRouteName: 'invoiceTemplateJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'invoiceTemplateJournalAdvanced',
        path: '/invoicetemplate/journal',
        resource: 'invoicetemplates',
        parentPath: 'invoiceTemplateList'
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
                return i18n.global.tc('Edit')
            },
            icon: 'fas fa-file-invoice',
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
                return i18n.global.tc('Edit Template')
            },
            icon: 'fas fa-file-invoice',
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
