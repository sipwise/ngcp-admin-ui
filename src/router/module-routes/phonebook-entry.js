import { i18n } from 'boot/i18n'

export default [
    {
        name: 'phonebookEntryList',
        path: '/phonebook',
        component: () => import('pages/AuiPhonebookEntryList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.phonebookentries'
            },
            get label () {
                return i18n.t('Phonebook')
            },
            icon: 'fas fa-address-book',
            root: true
        }
    },
    {
        name: 'phonebookEntryCreation',
        path: '/phonebook/create',
        component: () => import('pages/AuiPhonebookEntryCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.phonebookentries'
            },
            get label () {
                return i18n.t('Add')
            },
            icon: 'add',
            parentPath: 'phonebookEntryList'
        }
    },
    {
        name: 'phonebookEntryEdit',
        path: '/phonebook/:id/edit',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.phonebookentries'
            },
            get label () {
                return i18n.t('Edit')
            },
            icon: 'edit',
            parentPath: 'phonebookEntryList',
            proxy: true
        }
    },
    {
        name: 'phonebookUpload',
        path: '/phonebook/upload_csv',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.phonebookentries'
            },
            proxy: true
        }
    },
    {
        name: 'phonebookEntryCatchAll',
        path: '/phonebook/*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.phonebookentries'
            },
            proxy: true
        }
    }
]
