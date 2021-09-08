import {
    PATH_ERROR_403,
    PATH_RECOVER_PASSWORD
} from 'src/router/common'
import {
    i18n
} from 'boot/i18n'

const getToken = (route) => {
    return {
        token: route.query.token
    }
}

function proxyRewriteDetailPage ({ route, url }) {
    // removing the last URL path element because in V1 the Details page doesn't have subpages
    url.pathname = route.path.split('/').slice(0, -1).join('/')
    return url
}

export const routes = [
    {
        name: 'root',
        path: '/',
        component: () => import('layouts/MainLayout'),
        children: [
            {
                name: 'dashboard',
                path: '/dashboard',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'page.dashboard'
                    },
                    get label () {
                        return i18n.t('Dashboard')
                    },
                    icon: 'fas fa-tachometer-alt',
                    proxy: true
                }
            },
            {
                name: 'adminList',
                path: '/administrator',
                component: () => import('pages/AuiAdminList'),
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
                component: () => import('pages/AuiAdminCreation'),
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
                component: () => import('pages/AuiAdminContext'),
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
                        path: '/administrator/:id/edit',
                        component: () => import('pages/AuiAdminEdit'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'page.administrator.edit'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'adminList.adminContext'
                        }
                    }
                ]
            },
            {
                name: 'resellerList',
                path: '/reseller',
                component: () => import('pages/AuiResellerList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.resellers'
                    },
                    get label () {
                        return i18n.t('Resellers')
                    },
                    icon: 'fas fa-users',
                    root: true
                }
            },
            {
                name: 'resellerCreation',
                path: '/reseller/create',
                component: () => import('pages/AuiResellerCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.resellers'
                    },
                    get label () {
                        return i18n.t('Add Reseller')
                    },
                    icon: 'add',
                    parentPath: 'resellerList'
                }
            },
            {
                name: 'resellerContext',
                path: '/reseller/:id',
                component: () => import('pages/AuiResellerContext'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.resellers'
                    },
                    parentPath: 'resellerList',
                    contextRoot: true
                },
                children: [
                    {
                        name: 'resellerEdit',
                        path: '/reseller/:id/edit',
                        component: () => import('pages/AuiResellerEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'resellerList.resellerContext',
                            menu: true
                        }
                    },
                    {
                        name: 'resellerDetails',
                        path: '/reseller/:id/details',
                        component: () => import('pages/AuiDetailsPage'),
                        props: {
                            detailsPageRouteName: 'resellerDetails',
                            redirectToSubpageRoute: { name: 'resellerDetailsBaseInformation' }
                        },
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Details')
                            },
                            icon: 'article',
                            parentPath: 'resellerList.resellerContext',
                            menu: true
                        },
                        children: [{
                            name: 'resellerDetailsBaseInformation',
                            path: 'base-information',
                            component: () => import('pages/AuiResellerBaseInformation'),
                            meta: {
                                get label () {
                                    return i18n.t('Reseller Base Information')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fa fa-info'
                            }
                        }, {
                            name: 'resellerDetailsContract',
                            path: 'contract',
                            component: () => import('pages/AuiResellerDetailsContract'),
                            meta: {
                                get label () {
                                    return i18n.t('Reseller Contract')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-handshake'
                            }
                        }, {
                            name: 'resellerDetailsContact',
                            path: 'contact',
                            component: () => import('pages/AuiResellerDetailsContact'),
                            meta: {
                                get label () {
                                    return i18n.t('Reseller Contact')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-address-card'
                            }
                        }, {
                            name: 'resellerDetailsAdminLogins',
                            path: 'admin-logins',
                            component: () => import('pages/AuiResellerDetailsAdmin'),
                            meta: {
                                get label () {
                                    return i18n.t('Administrator Logins')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-sign-in-alt',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_admin'
                            }
                        }, {
                            name: 'resellerDetailsDomains',
                            path: 'domains',
                            component: () => import('pages/AuiResellerDetailsDomain'),
                            meta: {
                                get label () {
                                    return i18n.t('Domains')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-network-wired'
                            }
                        }, {
                            name: 'resellerDetailsBillingProfiles',
                            path: 'billing-profiles',
                            component: () => import('pages/AuiResellerDetailsBillingProfiles'),
                            meta: {
                                get label () {
                                    return i18n.t('Billing Profiles')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-hand-holding-usd',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_profile'
                            }
                        }, {
                            name: 'resellerDetailsBillingNetworks',
                            path: 'billing-networks',
                            component: () => import('pages/AuiResellerDetailsBillingNetworks'),
                            meta: {
                                get label () {
                                    return i18n.t('Billing Networks')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-credit-card',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_network'
                            }
                        }, {
                            name: 'resellerDetailsProfilePackages',
                            path: 'profile-packages',
                            component: () => import('pages/AuiResellerDetailsProfilePackages'),
                            meta: {
                                get label () {
                                    return i18n.t('Profile Packages')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-cubes',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_package'
                            }
                        }, {
                            name: 'resellerDetailsCustomers',
                            path: 'customers',
                            component: () => import('pages/AuiResellerDetailsCustomers'),
                            meta: {
                                get label () {
                                    return i18n.t('Customers')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-user'
                            }
                        }, {
                            name: 'resellerDetailsBranding',
                            path: 'branding',
                            component: () => import('pages/AuiResellerDetailsBranding'),
                            meta: {
                                get label () {
                                    return i18n.t('Branding')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-palette'
                            }
                        }, {
                            name: 'resellerDetailsInvoiceTemplates',
                            path: 'invoice-templates',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Invoice Templates')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-file-invoice',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_intemplate'
                            }
                        }, {
                            name: 'resellerDetailsPhoneBook',
                            path: 'phone-book',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Phonebook')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-address-book',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_phonebook'
                            }
                        }, {
                            name: 'resellerDetailsTimeSets',
                            path: 'time-sets',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Time Sets')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-clock',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_timeset'
                            }
                        }]
                    },
                    {
                        name: 'resellerPreferences',
                        path: '/reseller/:id/preferences',
                        component: () => import('pages/AuiResellerPreferences'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'page.reseller.preferences'
                            },
                            get label () {
                                return i18n.t('Preferences')
                            },
                            icon: 'settings_applications',
                            parentPath: 'resellerList.resellerContext',
                            menu: true
                        }
                    }
                ]
            },
            {
                name: 'resellerPanelBrandingOverview',
                path: '/reseller/:id/css',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'page.panelBranding'
                    },
                    proxy: true
                }
            },
            {
                name: 'resellerPanelBrandingUpdate',
                path: '/reseller/:id/css/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'page.panelBranding'
                    },
                    proxy: true
                }
            },
            {
                name: 'resellerCatchAll',
                path: '/reseller/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.resellers'
                    },
                    proxy: true
                }
            },
            {
                name: 'customerList',
                path: '/customer',
                component: () => import('pages/AuiCustomerList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.customers'
                    },
                    get label () {
                        return i18n.t('Customers')
                    },
                    icon: 'fas fa-user-tie',
                    root: true
                }
            },
            {
                name: 'customerCreation',
                path: '/customer/create',
                component: () => import('pages/AuiCustomerCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.customers'
                    },
                    get label () {
                        return i18n.t('Add Customer')
                    },
                    icon: 'add',
                    parentPath: 'customerList'
                }
            },
            {
                name: 'customerContext',
                path: '/customer/:id',
                component: () => import('pages/AuiCustomerContext'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.customers'
                    },
                    contextRoot: true,
                    parentPath: 'customerList'
                },
                children: [
                    {
                        name: 'customerEdit',
                        path: '/customer/:id/edit',
                        component: () => import('pages/AuiCustomerEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.customers'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'customerList.customerContext',
                            menu: true
                        }
                    },
                    {
                        name: 'customerDetails',
                        path: '/customer/:id/details',
                        component: () => import('pages/AuiCustomerDetailsPage'),
                        props: {
                            detailsPageRouteName: 'customerDetails',
                            redirectToSubpageRoute: { name: 'customerDetailsReseller' }
                        },
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.customers'
                            },
                            get label () {
                                return i18n.t('Details')
                            },
                            icon: 'article',
                            parentPath: 'customerList.customerContext',
                            menu: true
                        },
                        children: [{
                            name: 'customerDetailsReseller',
                            path: 'reseller',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Reseller')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-users',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_reseller'
                            }
                        }, {
                            name: 'customerDetailsContact',
                            path: 'contact',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Contact Details')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-address-card',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_contact'
                            }
                        }, {
                            name: 'customerDetailsBillingProfileSch',
                            path: 'billing-profile-sch',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Billing Profile Schedule')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fa fa-calendar-alt',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_bilprofs'
                            }
                        }, {
                            name: 'customerDetailsSubscribers',
                            path: 'subscribers',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Subscribers')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-user',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_subs'
                            }
                        }, {
                            name: 'customerDetailsPBXGroups',
                            path: 'pbx-groups',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('PBX Groups')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'group',
                                visibleOnlyForCustomerType: 'pbxaccount',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_pbxgroups'
                            }
                        }, {
                            name: 'customerDetailsPBXDevices',
                            path: 'pbx-devices',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('PBX Devices')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'devices',
                                visibleOnlyForCustomerType: 'pbxaccount',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_pbxdevs'
                            }
                        }, {
                            name: 'customerDetailsSoundSets',
                            path: 'sound-sets',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Sound Sets')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-music',
                                visibleOnlyForCustomerType: 'pbxaccount',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_soundsets'
                            }
                        }, {
                            name: 'customerDetailsContractBalance',
                            path: 'contract-balance',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Contract Balance')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fa fa-hand-holding-usd',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_balance'
                            }
                        }, {
                            name: 'customerDetailsBalanceIntervals',
                            path: 'balance-intervals',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Balance Intervals')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fa fa-money-check-alt',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_balanceintervals'
                            }
                        }, {
                            name: 'customerDetailsTopUpLog',
                            path: 'top-up-log',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Top-up Log')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fa fa-file-contract',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_topuplog'
                            }
                        }, {
                            name: 'customerDetailsFraudLimits',
                            path: 'fraud-limits',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Fraud Limits')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-mask',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_fraud'
                            }
                        }, {
                            name: 'customerDetailsInvoices',
                            path: 'invoices',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Invoices')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-file-invoice-dollar',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_invoices'
                            }
                        }, {
                            name: 'customerDetailsLocations',
                            path: 'locations',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Locations')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-map-marker-alt',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_locations'
                            }
                        }, {
                            name: 'customerDetailsPhonebook',
                            path: 'phonebook',
                            component: () => import('pages/AuiDetailsPageProxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Phonebook')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-address-book',
                                proxy: true,
                                proxyRewrite: proxyRewriteDetailPage,
                                proxyDetailsSectionId: 'collapse_phonebook'
                            }
                        }]
                    },
                    {
                        name: 'customerPreferences',
                        path: '/customer/:id/preferences',
                        component: () => import('pages/AuiCustomerPreferences'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'page.customer.preferences'
                            },
                            get label () {
                                return i18n.t('Preferences')
                            },
                            icon: 'settings_applications',
                            parentPath: 'customerList.customerContext',
                            menu: true
                        }
                    }
                ]
            },
            {
                name: 'customerCatchAll',
                path: '/customer/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.customers'
                    },
                    proxy: true
                }
            },
            {
                name: 'contractList',
                path: '/contract',
                component: () => import('pages/AuiContractList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.contracts'
                    },
                    get label () {
                        return i18n.t('Contracts')
                    },
                    icon: 'fas fa-handshake',
                    root: true
                }
            },
            {
                name: 'contractCreatePeering',
                path: 'contract/peering/create',
                component: () => import('pages/AuiContractCreation'),
                props: {
                    type: 'sippeering'
                },
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.contracts'
                    },
                    get label () {
                        return i18n.t('Add Peering Contract')
                    },
                    icon: 'add',
                    parentPath: 'contractList'
                }
            },
            {
                name: 'contractCreateReseller',
                path: '/contract/reseller/create',
                component: () => import('pages/AuiContractCreation'),
                props: {
                    type: 'reseller'
                },
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.contracts'
                    },
                    get label () {
                        return i18n.t('Add Reseller Contract')
                    },
                    icon: 'add',
                    parentPath: 'contractList'
                }
            },
            {
                name: 'contractContext',
                path: '/contract/:id',
                component: () => import('pages/AuiContractContext'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.contracts'
                    },
                    contextRoot: true,
                    parentPath: 'contractList'
                },
                children: [
                    {
                        name: 'contractEdit',
                        path: '/contract/:id/edit',
                        component: () => import('pages/AuiContractEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.contracts'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'contractList.contractContext'
                        }
                    }
                ]
            },
            {
                name: 'contractCatchAll',
                path: '/contract/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.contracts'
                    },
                    proxy: true
                }
            },
            {
                name: 'contactList',
                path: '/contact',
                component: () => import('pages/AuiContactList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.customercontacts'
                    },
                    get label () {
                        return i18n.t('Contacts')
                    },
                    icon: 'fas fa-address-card',
                    root: true
                }
            },
            {
                name: 'contactCreateCustomer',
                path: '/contact/create',
                component: () => import('pages/AuiContactCreation'),
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
                component: () => import('pages/AuiContactCreation'),
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
                component: () => import('pages/AuiContactContext'),
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
                        path: '/contact/:id/edit',
                        redirect: { name: 'contactEdit', query: { resource: 'customercontacts' } }
                    },
                    {
                        name: 'contactEditSystem',
                        path: '/contact/:id/edit/noreseller',
                        redirect: { name: 'contactEdit', query: { resource: 'systemcontacts' } }
                    },
                    {
                        name: 'contactEdit',
                        path: '/contact/:id/edit',
                        component: () => import('pages/AuiContactEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.customercontacts'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'contactList.contactContext'
                        }
                    }
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
            },
            {
                name: 'domainList',
                path: '/domain',
                component: () => import('pages/AuiDomainList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.domains'
                    },
                    get label () {
                        return i18n.t('Domains')
                    },
                    icon: 'fas fa-network-wired',
                    root: true
                }
            },
            {
                name: 'domainCreation',
                path: '/domain/create',
                component: () => import('pages/AuiDomainCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.domains'
                    },
                    get label () {
                        return i18n.t('Add Domain')
                    },
                    icon: 'add',
                    parentPath: 'domainList'
                }
            },
            {
                name: 'domainContext',
                path: '/domain/:id',
                component: () => import('pages/AuiDomainContext'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.domains'
                    },
                    contextRoot: true,
                    parentPath: 'domainList'
                },
                children: [
                    {
                        name: 'domainPreferences',
                        path: '/domain/:id/preferences',
                        component: () => import('pages/AuiDomainPreferences'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'page.domain.preferences'
                            },
                            get label () {
                                return i18n.t('Preferences')
                            },
                            icon: 'settings_applications',
                            parentPath: 'domainList.domainContext'
                        }
                    }
                ]
            },
            {
                name: 'subscriberList',
                path: '/subscriber',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscribers'
                    },
                    get label () {
                        return i18n.t('Subscribers')
                    },
                    icon: 'fas fa-user',
                    proxy: true
                }
            },
            {
                name: 'subscriberCatchAll',
                path: '/subscriber/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.subscribers'
                    },
                    proxy: true
                }
            },
            {
                name: 'subscriberProfileList',
                path: '/subscriberprofile',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscriberprofiles'
                    },
                    get label () {
                        return i18n.t('Subscriber Profiles')
                    },
                    icon: 'far fa-user',
                    proxy: true
                }
            },
            {
                name: 'subscriberProfileCatchAll',
                path: '/subscriberprofile/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.subscriberprofiles'
                    },
                    proxy: true
                }
            },
            {
                name: 'callListSuppressionList',
                path: '/calllistsuppression',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.calllistsuppressions'
                    },
                    get label () {
                        return i18n.t('Call List Suppressions')
                    },
                    icon: 'far fa-list-alt',
                    proxy: true
                }
            },
            {
                name: 'callListSuppressionCatchAll',
                path: '/calllistsuppression/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.calllistsuppressions'
                    },
                    proxy: true
                }
            },
            {
                name: 'billingProfileList',
                path: '/billing',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.billingprofiles'
                    },
                    get label () {
                        return i18n.t('Billing Profiles')
                    },
                    icon: 'fas fa-hand-holding-usd',
                    proxy: true
                }
            },
            {
                name: 'billingProfileCatchAll',
                path: '/billing/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingprofiles'
                    },
                    proxy: true
                }
            },
            {
                name: 'billingNetworkList',
                path: '/network',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.billingnetworks'
                    },
                    get label () {
                        return i18n.t('Billing Networks')
                    },
                    icon: 'fas fa-credit-card',
                    proxy: true
                }
            },
            {
                name: 'billingNetworkCatchAll',
                path: '/network/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingnetworks'
                    },
                    proxy: true
                }
            },
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
            },
            {
                name: 'invoiceTemplateList',
                path: '/invoicetemplate',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.invoicetemplates'
                    },
                    get label () {
                        return i18n.t('Invoice Templates')
                    },
                    icon: 'fas fa-file-invoice',
                    proxy: true
                }
            },
            {
                name: 'invoiceTemplateCatchAll',
                path: '/invoicetemplate/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.invoicetemplates'
                    },
                    proxy: true
                }
            },
            {
                name: 'invoiceList',
                path: '/invoice',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.invoices'
                    },
                    get label () {
                        return i18n.t('Invoices')
                    },
                    icon: 'fas fa-file-invoice-dollar',
                    proxy: true
                }
            },
            {
                name: 'invoiceCatchAll',
                path: '/invoice/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.invoices'
                    },
                    proxy: true
                }
            },
            {
                name: 'voucherList',
                path: '/voucher',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.vouchers'
                    },
                    get label () {
                        return i18n.t('Billing Vouchers')
                    },
                    icon: 'fas fa-money-check-alt',
                    proxy: true
                }
            },
            {
                name: 'voucherCatchAll',
                path: '/voucher/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.vouchers'
                    },
                    proxy: true
                }
            },
            {
                name: 'peeringGroupList',
                path: '/peering',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.peeringgroups'
                    },
                    get label () {
                        return i18n.t('SIP Peering Groups')
                    },
                    icon: 'fas fa-exchange-alt',
                    proxy: true
                }
            },
            {
                name: 'peeringGroupCatchAll',
                path: '/peering/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.peeringgroups'
                    },
                    proxy: true
                }
            },
            {
                name: 'rewriteRuleSetList',
                path: '/rewrite',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.rewriterulesets'
                    },
                    get label () {
                        return i18n.t('Rewrite Rule Sets')
                    },
                    icon: 'fas fa-file-alt',
                    proxy: true
                }
            },
            {
                name: 'rewriteRuleSetCatchAll',
                path: '/rewrite/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.rewriterulesets'
                    },
                    proxy: true
                }
            },
            {
                name: 'headerRuleSetList',
                path: '/header',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.headerrulesets'
                    },
                    get label () {
                        return i18n.t('Header Manipulations')
                    },
                    icon: 'fas fa-edit',
                    proxy: true
                }
            },
            {
                name: 'headerRuleSetCatchAll',
                path: '/header/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.headerrulesets'
                    },
                    proxy: true
                }
            },
            {
                name: 'ncosLevelList',
                path: '/ncos',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.ncoslevels'
                    },
                    get label () {
                        return i18n.t('NCOS Levels')
                    },
                    icon: 'fas fa-layer-group',
                    proxy: true
                }
            },
            {
                name: 'ncosLevelCatchAll',
                path: '/ncos/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.ncoslevels'
                    },
                    proxy: true
                }
            },
            {
                name: 'soundSetList',
                path: '/sound',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.soundsets'
                    },
                    get label () {
                        return i18n.t('Sound Sets')
                    },
                    icon: 'fas fa-music',
                    proxy: true
                }
            },
            {
                name: 'soundSetCatchAll',
                path: '/sound/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.soundsets'
                    },
                    proxy: true
                }
            },
            {
                name: 'emailTemplateList',
                path: '/emailtemplate',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.emailtemplates'
                    },
                    get label () {
                        return i18n.t('Email Templates')
                    },
                    icon: 'fas fa-envelope',
                    proxy: true
                }
            },
            {
                name: 'emailTemplateCatchAll',
                path: '/emailtemplate/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.emailtemplates'
                    },
                    proxy: true
                }
            },
            {
                name: 'deviceList',
                path: '/device',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.pbxdevices'
                    },
                    get label () {
                        return i18n.t('Device Management')
                    },
                    icon: 'fas fa-fax',
                    proxy: true,
                    capability: 'cloudpbx'
                }
            },
            {
                name: 'deviceListCatchAll',
                path: '/device/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.pbxdevices'
                    },
                    proxy: true,
                    capability: 'cloudpbx'
                }
            },
            {
                name: 'securityBans',
                path: '/security',
                component: () => import('pages/AuiPageSecurityBans'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: ['entity.bannedips', 'entity.bannedusers']
                    },
                    get label () {
                        return i18n.t('Security Bans')
                    },
                    icon: 'fas fa-ban'
                }
            },
            {
                name: 'maliciousCallList',
                path: '/maliciouscall',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.maliciouscalls'
                    },
                    get label () {
                        return i18n.t('Malicious Calls')
                    },
                    icon: 'fas fa-phone-alt',
                    proxy: true,
                    platformInfo: 'malicious_call'
                }
            },
            {
                name: 'maliciousCallCatchAll',
                path: '/maliciouscall/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.maliciouscalls'
                    },
                    proxy: true,
                    platformInfo: 'malicious_call'
                }
            },
            {
                name: 'lnpList',
                path: '/lnp',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: ['entity.lnpcarriers', 'entity.lnpnumbers']
                    },
                    get label () {
                        return i18n.t('Number Porting')
                    },
                    icon: 'fas fa-sim-card',
                    proxy: true
                }
            },
            {
                name: 'lnpCatchAll',
                path: '/lnp/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: ['entity.lnpcarriers', 'entity.lnpnumbers']
                    },
                    proxy: true
                }
            },
            {
                name: 'emergencyMappingContainerList',
                path: '/emergencymapping',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.emergencymappingcontainers'
                    },
                    get label () {
                        return i18n.t('Emergency Mappings')
                    },
                    icon: 'fas fa-file-medical',
                    proxy: true
                }
            },
            {
                name: 'emergencyMappingContainerCatchAll',
                path: '/emergencymapping/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.emergencymappingcontainers'
                    },
                    proxy: true
                }
            },
            {
                name: 'phonebookEntryList',
                path: '/phonebook',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.phonebookentries'
                    },
                    get label () {
                        return i18n.t('Phonebook')
                    },
                    icon: 'fas fa-address-book',
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
            },
            {
                name: 'timeSetList',
                path: '/timeset',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.timesets'
                    },
                    get label () {
                        return i18n.t('Time Set')
                    },
                    icon: 'fas fa-clock',
                    proxy: true
                }
            },
            {
                name: 'timeSetCatchAll',
                path: '/timeset/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.timesets'
                    },
                    proxy: true
                }
            },
            {
                name: 'callRoutingVerifyList',
                path: '/callroutingverify',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'tool.callroutingverify'
                    },
                    get label () {
                        return i18n.t('Call Routing Verification')
                    },
                    icon: 'fas fa-tty',
                    proxy: true
                }
            },
            {
                name: 'callRoutingVerifyCatchAll',
                path: '/callroutingverify/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.callroutingverify'
                    },
                    proxy: true
                }
            },
            {
                name: 'peeringOverviewList',
                path: '/peeringoverview',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'tool.peeringoverview'
                    },
                    get label () {
                        return i18n.t('Peering Overview')
                    },
                    icon: 'fas fa-binoculars',
                    proxy: true
                }
            },
            {
                name: 'peeringOverviewCatchAll',
                path: '/peeringoverview/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.peeringoverview'
                    },
                    proxy: true
                }
            },
            {
                name: 'batchProvisioningList',
                path: '/batchprovisioning',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'tool.batchprovisioning'
                    },
                    get label () {
                        return i18n.t('Batch Provisioning')
                    },
                    icon: 'fas fa-users-cog',
                    proxy: true
                }
            },
            {
                name: 'batchProvisioningCatchAll',
                path: '/batchprovisioning/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.batchprovisioning'
                    },
                    proxy: true
                }
            },
            {
                name: 'systemStatistics',
                path: '/system-statistics',
                beforeEnter () {
                    document.location.href = '/grafana/d/system-statistics?ngcp_grafana_admin=no'
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.systemstatistics'
                    },
                    get label () {
                        return i18n.t('System Statistics')
                    },
                    icon: 'fas fa-chart-bar',
                    openNewWindow: true
                }
            },
            {
                name: 'processStatistics',
                path: '/system-processes',
                beforeEnter () {
                    document.location.href = '/grafana/d/system-processes?ngcp_grafana_admin=no'
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.systemprocesses'
                    },
                    get label () {
                        return i18n.t('System Processes')
                    },
                    icon: 'fas fa-chart-bar',
                    openNewWindow: true
                }
            },
            {
                name: 'rtpStatistics',
                path: '/rtp-statistics',
                beforeEnter () {
                    document.location.href = '/grafana/d/rtp-statistics?ngcp_grafana_admin=no'
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.rtpstatistics'
                    },
                    get label () {
                        return i18n.t('RTP Statistics')
                    },
                    icon: 'fas fa-phone-alt',
                    openNewWindow: true
                }
            },
            {
                name: 'sipStatistics',
                path: '/sip-statistics',
                beforeEnter () {
                    document.location.href = '/grafana/d/sip-statistics?ngcp_grafana_admin=no'
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.sipstatistics'
                    },
                    get label () {
                        return i18n.t('SIP Statistics')
                    },
                    icon: 'fas fa-phone-alt',
                    openNewWindow: true
                }
            },
            {
                name: 'databaseStatistics',
                path: '/database-statistics',
                beforeEnter () {
                    document.location.href = '/grafana/d/database-statistics?ngcp_grafana_admin=no'
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.databasestatistics'
                    },
                    get label () {
                        return i18n.t('Database Statistics')
                    },
                    icon: 'fas fa-database',
                    openNewWindow: true
                }
            },
            {
                name: 'clusterOverview',
                path: '/cluster-overview',
                beforeEnter () {
                    document.location.href = '/grafana/d/cluster-overview?ngcp_grafana_admin=no'
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.clusteroverview'
                    },
                    get label () {
                        return i18n.t('Cluster Overview')
                    },
                    icon: 'device_hub',
                    openNewWindow: true
                }
            },
            {
                name: 'sipCallFlowList',
                path: '/callflow',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.sipcallflows'
                    },
                    get label () {
                        return i18n.t('SIP Call Flows')
                    },
                    icon: 'fas fa-exchange-alt',
                    proxy: true
                }
            },
            {
                name: 'sipCallFlowCatchAll',
                path: '/callflow/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'statistic.sipcallflows'
                    },
                    proxy: true
                }
            },
            {
                name: 'statisticsAdministration',
                path: '/statistics-administration',
                beforeEnter () {
                    document.location.href = '/grafana/?ngcp_grafana_admin=yes'
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.statisticsadministration'
                    },
                    get label () {
                        return i18n.t('Statistics Administration')
                    },
                    icon: 'fas fa-cog',
                    openNewWindow: true
                }
            },
            {
                name: 'apiDoc',
                path: '/api-doc',
                beforeEnter () {
                    document.location.href = '/api/'
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'doc.api'
                    },
                    get label () {
                        return i18n.t('API')
                    },
                    icon: 'fas fa-file-alt',
                    openNewWindow: true
                }
            },
            {
                name: 'handbook',
                path: '/handbook',
                beforeEnter () {
                    document.location.href = '/handbook/'
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'doc.handbook'
                    },
                    get label () {
                        return i18n.t('Handbook')
                    },
                    icon: 'fas fa-book',
                    openNewWindow: true
                }
            },
            {
                name: 'proxyGrafana',
                path: '/grafana/*',
                component: () => import('pages/Proxy'),
                meta: {
                    proxy: true
                }
            },
            {
                name: 'proxyReflection',
                path: '/proxy/*',
                component: () => import('pages/Proxy'),
                meta: {
                    proxy: true,
                    proxyReverseInvisible: true,
                    proxyRewrite ({ route, url }) {
                        url.pathname = route.path.replace('/proxy', '')
                        return url
                    }
                }
            }
        ]
    },
    {
        path: '',
        component: () => import('layouts/Login'),
        children: [
            {
                name: 'login',
                path: '/login/admin',
                component: () => import('pages/Login'),
                meta: {
                    get label () {
                        return i18n.t('Login')
                    }
                }
            },
            {
                name: 'passwordRecovery',
                path: PATH_RECOVER_PASSWORD,
                component: () => import('pages/RecoverPassword'),
                props: getToken
            },
            {
                name: 'error403',
                path: PATH_ERROR_403,
                component: () => import('pages/AuiPageError403'),
                meta: {
                    get label () {
                        return i18n.t('Forbidden')
                    }
                }
            },
            ...(process.env.MODE !== 'ssr' ? [
                {
                    name: 'error404',
                    path: '*',
                    component: () => import('pages/AuiPageError404'),
                    meta: {
                        get label () {
                            return i18n.t('Page not found')
                        }
                    }
                }
            ] : [])
        ]
    }
]

export default routes
