import { i18n } from 'boot/i18n'
import { LICENSES } from 'src/constants'
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
            licenses: [LICENSES.billing],
            root: true
        }
    },
    createAdvancedJournalRoute({
        name: 'billingProfilePackageJournalAdvanced',
        path: '/package/journal',
        resource: 'profilepackages',
        parentPath: 'billingProfilePackageList',
        licenses: [LICENSES.billing]
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
            licenses: [LICENSES.billing],
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
                return `#${resourceObject.id} - ${resourceObject.name}`
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
                    licenses: [LICENSES.billing],
                    parentPath: 'billingProfilePackageList.billingProfilePackageContext',
                    menu: true
                }
            },
            {
                name: 'billingProfilePackageDetails',
                path: 'details',
                component: () => import('pages/profile-packages-details/AuiProfilePackagesDetailsPage'),
                props: {
                    detailsPageRouteName: 'billingProfilePackageDetails',
                    redirectToSubpageRoute: { name: 'profilePackagesDetailsBilling' }
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.profilepackages'
                    },
                    get label () {
                        return i18n.global.tc('Details')
                    },
                    icon: 'article',
                    licenses: [LICENSES.billing],
                    parentPath: 'billingProfilePackageList.billingProfilePackageContext',
                    menu: true,
                    goToPathRewrite: ({ route, url }) => {
                        url.pathname = `/package/${route.params.id}/details`
                        return url
                    }
                },
                children: [
                    {
                        name: 'profilePackagesDetailsBilling',
                        path: 'billing',
                        component: () => import('pages/profile-packages-details/AuiProfilePackagesDetailsBilling'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Initial Billing Profiles/Networks')
                            },
                            parentPath: 'billingProfilePackageList.billingProfilePackageContext.billingProfilePackageDetails',
                            icon: 'fas fa-hand-holding-usd',
                            licenses: [LICENSES.billing],
                            v1DetailsPageSectionId: 'collapse_initial_profile_set'
                        }
                    },
                    {
                        name: 'profilePackagesDetailsTopup',
                        path: 'top-up',
                        component: () => import('pages/profile-packages-details/AuiProfilePackagesDetailsTopup'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Top-up Billing Profiles/Networks')
                            },
                            parentPath: 'billingProfilePackageList.billingProfilePackageContext.billingProfilePackageDetails',
                            icon: 'fas fa-credit-card',
                            licenses: [LICENSES.billing],
                            v1DetailsPageSectionId: 'collapse_topup_profile_set'
                        }
                    },
                    {
                        name: 'profilePackagesDetailsUnderrun',
                        path: 'underrun',
                        component: () => import('pages/profile-packages-details/AuiProfilePackagesDetailsUnderrun'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Underrun Billing Profiles/Networks')
                            },
                            parentPath: 'billingProfilePackageList.billingProfilePackageContext.billingProfilePackageDetails',
                            icon: 'fas fa-credit-card',
                            licenses: [LICENSES.billing],
                            v1DetailsPageSectionId: 'collapse_underrun_profile_set'
                        }
                    },
                    {
                        name: 'profilePackagesDetailsCustomerContracts',
                        path: 'customer_contracts',
                        component: () => import('pages/profile-packages-details/AuiProfilePackagesDetailsCustomers'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Customer Contracts')
                            },
                            parentPath: 'billingProfilePackageList.billingProfilePackageContext.billingProfilePackageDetails',
                            icon: 'fas fa-handshake',
                            licenses: [LICENSES.billing],
                            v1DetailsPageSectionId: 'collapse_customers'
                        }
                    },
                    {
                        name: 'profilePackagesDetailsVouchers',
                        path: 'customer_vouchers',
                        component: () => import('pages/profile-packages-details/AuiProfilePackagesDetailsVouchers'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Vouchers')
                            },
                            parentPath: 'billingProfilePackageList.billingProfilePackageContext.billingProfilePackageDetails',
                            icon: 'fas fa-money-check-alt',
                            licenses: [LICENSES.billing],
                            v1DetailsPageSectionId: 'collapse_vouchers'
                        }
                    }
                ]
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
