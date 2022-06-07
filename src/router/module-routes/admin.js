import { i18n } from 'boot/i18n'

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
            root: true
        }
    },
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
        component: () => import('pages/admins/AuiAdminContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'page.administrator.edit'
            },
            parentPath: 'adminList',
            contextRoot: true
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
            {
                name: 'adminJournal',
                path: 'journal',
                component: () => import('pages/admins/AuiAdminJournal'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.admins'
                    },
                    get label () {
                        return i18n.t('Journal')
                    },
                    icon: 'list',
                    parentPath: 'adminList.adminContext',
                    menu: true
                }
            }
        ]
    }
]
