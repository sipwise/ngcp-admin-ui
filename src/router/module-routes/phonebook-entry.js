import { i18n } from 'boot/i18n'
import { LICENSES, PLATFORM_CARRIER, PLATFORM_PRO } from 'src/constants'
import { createAdvancedJournalRoute } from 'src/router/common'

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
                return i18n.global.t('Phonebook')
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
                return i18n.global.t('Add')
            },
            icon: 'add',
            licenses: [LICENSES.phonebook],
            parentPath: 'phonebookEntryList',
            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
        }
    },
    {
        name: 'phonebookEntryContext',
        path: '/phonebook/:id/reseller/:resellerId',
        redirect: (to) => {
            return { name: 'phonebookEntryEdit', params: to.params }
        },
        component: () => import('pages/AuiPhonebookEntryContext'),
        props: true,
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.resellerphonebookentries'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return `#${resourceObject.id} - ${resourceObject.name}`
            },
            parentPath: 'phonebookEntryList'
        },
        children: [
            {
                name: 'phonebookEntryEdit',
                path: 'edit',
                component: () => import('pages/AuiPhonebookEntryEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.resellerphonebookentries'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    menu: true,
                    licenses: [LICENSES.phonebook],
                    parentPath: 'phonebookEntryList.phonebookEntryContext',
                    platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                }
            }
        ]
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
                return i18n.global.t('Upload')
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
