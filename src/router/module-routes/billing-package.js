import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

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
    createAdvancedJournalRoute({
        name: 'billingProfilePackageJournalAdvanced',
        path: '/package/journal',
        resource: 'profilepackages',
        parentPath: 'billingProfilePackageList'
    }),
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
