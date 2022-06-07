import { i18n } from 'boot/i18n'

export default [
    {
        name: 'billingProfilePackageList',
        path: '/package',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.profilepackages'
            },
            get label () {
                return i18n.t('Profile Packages')
            },
            icon: 'fas fa-cubes',
            proxy: true
        }
    },
    {
        name: 'billingProfilePackageCreation',
        path: '/package/create',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.profilepackages'
            },
            proxy: true
        }
    },
    {
        name: 'billingProfilePackageCatchAll',
        path: '/package/*',
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
