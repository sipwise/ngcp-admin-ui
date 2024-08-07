import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'
import { LICENSES, PLATFORM_CARRIER, PLATFORM_PRO } from 'src/constants'

export default [
    {
        name: 'phonebookEntryList',
        path: '/phonebook',
        component: () => import('pages/AuiPhonebookEntryList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.resellerphonebookentries'
            },
            get label () {
                return i18n.global.tc('Phonebook')
            },
            icon: 'fas fa-address-book',
            licenses: [LICENSES.phonebook],
            root: true,
            journalRouteName: 'phonebookEntryJournalAdvanced',
            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
        }
    },
    createAdvancedJournalRoute({
        name: 'phonebookEntryJournalAdvanced',
        path: '/phonebook/journal',
        resource: 'resellerphonebookentries',
        parentPath: 'phonebookEntryList',
        licenses: [LICENSES.phonebook]
    }),
    {
        name: 'phonebookEntryCreation',
        path: '/phonebook/create',
        component: () => import('pages/AuiPhonebookEntryCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.resellerphonebookentries'
            },
            get label () {
                return i18n.global.tc('Add')
            },
            icon: 'add',
            licenses: [LICENSES.phonebook],
            parentPath: 'phonebookEntryList',
            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
        }
    },
    {
        name: 'phonebookEntryEdit',
        path: '/phonebook/:id/edit',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.resellerphonebookentries'
            },
            get label () {
                return i18n.global.tc('Edit')
            },
            icon: 'edit',
            licenses: [LICENSES.phonebook],
            parentPath: 'phonebookEntryList',
            proxy: true,
            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
        }
    },
    {
        name: 'phonebookUpload',
        path: '/phonebook/upload_csv',
        component: () => import('pages/AuiPhonebookEntryUpload'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.resellerphonebookentries'
            },
            get label () {
                return i18n.global.tc('Upload')
            },
            icon: 'fas fa-upload',
            licenses: [LICENSES.phonebook],
            parentPath: 'phonebookEntryList',
            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
        }
    },
    {
        name: 'phonebookEntryCatchAll',
        path: '/phonebook/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.resellerphonebookentries'
            },
            proxy: true,
            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
        }
    }
]
