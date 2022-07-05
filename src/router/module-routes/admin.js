import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute, createJournalRoute } from 'src/router/common'

export default [
    {
        name: 'adminList',
        path: '/administrator',
        component: () => import('pages/admins/AuiAdminList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.admins'
            },
            get label () {
                return i18n.t('Administrators')
            },
            icon: 'fas fa-user-cog',
            root: true,
            journalRouteName: 'adminJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'adminJournalAdvanced',
        path: '/administrator/journal',
        resource: 'admins',
        parentPath: 'adminList'
    }),
    {
        name: 'adminCreation',
        path: '/administrator/create',
        component: () => import('pages/admins/AuiAdminCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.admins'
            },
            get label () {
                return i18n.t('Add Administrator')
            },
            icon: 'add',
            parentPath: 'adminList'
        }
    },
    {
        name: 'adminContext',
        path: '/administrator/:id',
        redirect: '/administrator/:id/edit',
        component: () => import('pages/admins/AuiAdminContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'page.administrator.edit'
            },
            parentPath: 'adminList',
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return '#' + resourceObject.id + ' - ' + resourceObject.login
            }
        },
        children: [
            {
                name: 'adminEdit',
                path: 'edit',
                component: () => import('pages/admins/AuiAdminEdit'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'page.administrator.edit'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'adminList.adminContext',
                    menu: true
                }
            },
            createJournalRoute({
                name: 'adminJournal',
                resource: 'admins',
                parentPath: 'adminList.adminContext'
            })
        ]
    }
]
