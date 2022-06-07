import { i18n } from 'boot/i18n'

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
                return i18n.t('Invoice Templates')
            },
            icon: 'fas fa-file-invoice',
            root: true
        }
    },
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
                return i18n.t('Edit')
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
                return i18n.t('Edit Template')
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
        path: '/invoicetemplate/*',
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
