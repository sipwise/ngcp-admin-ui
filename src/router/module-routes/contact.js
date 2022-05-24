import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute, createJournalRoute } from 'src/router/common'

export default [
    {
        name: 'contactList',
        path: '/contact',
        component: () => import('pages/contacts/AuiContactList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.customercontacts'
            },
            get label () {
                return i18n.t('Contacts')
            },
            icon: 'fas fa-address-card',
            root: true,
            journalRouteName: 'contactJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'contactJournalAdvanced',
        path: '/contact/journal',
        resource: 'customercontacts',
        parentPath: 'contactList'
    }),
    {
        name: 'contactCreateCustomer',
        path: '/contact/create',
        component: () => import('pages/contacts/AuiContactCreation'),
        props: {
            hasReseller: true
        },
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.customercontacts'
            },
            get label () {
                return i18n.t('Add Customer Contact')
            },
            icon: 'add',
            parentPath: 'contactList'
        }
    },
    {
        name: 'contactCreateSystem',
        path: '/contact/create/noreseller',
        component: () => import('pages/contacts/AuiContactCreation'),
        props: {
            hasReseller: false
        },
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.customercontacts'
            },
            get label () {
                return i18n.t('Add System Contact')
            },
            icon: 'add',
            parentPath: 'contactList'
        }
    },
    {
        name: 'contactContext',
        path: '/contact/:id',
        component: () => import('pages/contacts/AuiContactContext'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.customercontacts'
            },
            contextRoot: true,
            parentPath: 'contactList'
        },
        children: [
            {
                name: 'contactEditCustomer',
                path: 'edit',
                redirect: { name: 'contactEdit', query: { resource: 'customercontacts' } }
            },
            {
                name: 'contactEditSystem',
                path: 'edit/noreseller',
                redirect: { name: 'contactEdit', query: { resource: 'systemcontacts' } }
            },
            {
                name: 'contactEdit',
                path: 'edit',
                component: () => import('pages/contacts/AuiContactEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.customercontacts'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'contactList.contactContext',
                    menu: true
                }
            },
            createJournalRoute({
                name: 'contactJournal',
                resource: 'contacts',
                parentPath: 'contactList.contactContext'
            })
        ]
    },
    {
        name: 'contactCatchAll',
        path: '/contact/*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.customercontacts'
            },
            proxy: true
        }
    }
]
