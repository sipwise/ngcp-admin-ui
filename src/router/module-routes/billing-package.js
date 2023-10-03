import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'billingProfilePackageList',
        path: '/package',
        component: () => import('pages/profile-packages/AuiProfilePackageList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.profilepackages'
            },
            get label () {
                return i18n.global.tc('Profile Packages')
            },
            icon: 'fas fa-cubes',
            root: true
        }
    },
    createAdvancedJournalRoute({
        name: 'billingProfilePackageJournalAdvanced',
        path: '/package/journal',
        resource: 'profilepackages',
        parentPath: 'billingProfilePackageList'
    }),
    {
        name: 'billingProfilePackageCreation',
        path: '/package/create',
        component: () => import('pages/profile-packages/AuiProfilePackageCreation'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.profilepackages'
            },
            get label () {
                return i18n.global.tc('Add')
            },
            icon: 'add',
            root: true,
            parentPath: 'billingProfilePackageList'
        }
    },
    {
        name: 'billingProfilePackageContext',
        path: '/package/:id',
        redirect: (to) => {
            return { name: 'billingProfilePackageEdit', params: to.params }
        },
        component: () => import('pages/profile-packages/AuiProfilePackageContext'),
        props: true,
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.profilepackages'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return '#' + resourceObject.id + ' - ' + resourceObject.name
            },
            parentPath: 'billingProfilePackageList'
        },
        children: [
            {
                name: 'billingProfilePackageEdit',
                path: 'edit',
                component: () => import('pages/profile-packages/AuiProfilePackageEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.profilepackages'
                    },
                    get label () {
                        return i18n.global.tc('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'billingProfilePackageList.billingProfilePackageContext',
                    menu: true
                }
            }
        ]
    },
    {
        name: 'billingProfilePackageCatchAll',
        path: '/package/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.profilepackages'
            },
            proxy: true
        }
    }
]
