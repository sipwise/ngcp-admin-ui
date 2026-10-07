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
            root: true
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
        name: 'invoiceTemplateContext',
        path: '/invoicetemplate/:id(\\d+)',
        redirect: (to) => {
            return { name: 'invoiceTemplateEdit', params: to.params }
        },
        component: () => import('pages/invoice-templates/AuiInvoiceTemplatesContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.invoicetemplates'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return resourceObject.reseller_id_expand?.name
                    ? `${resourceObject.reseller_id_expand.name}/${resourceObject.name}`
                    : resourceObject.name
            },
            licenses: [LICENSES.invoice],
            parentPath: 'invoiceTemplateList'
        },
        children: [
            {
                name: 'invoiceTemplateEdit',
                path: 'edit',
                component: () => import('pages/invoice-templates/AuiInvoiceTemplatesEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.invoicetemplates'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    licenses: [LICENSES.invoice],
                    hideFromPageMenu: true,
                    parentPath: 'invoiceTemplateList.invoiceTemplateContext'
                }
            }
        ]
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
        component: () => import('pages/invoice-templates/AuiInvoiceTemplatesCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.invoicetemplates'
            },
            get label () {
                return i18n.global.t('Add Invoice Template')
            },
            icon: 'add',
            licenses: [LICENSES.invoice],
            parentPath: 'invoiceTemplateList'
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
