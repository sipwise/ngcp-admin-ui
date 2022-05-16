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

function detailsPagePathRewrite ({ route, url }) {
    url.pathname = route.path.split('/').slice(0, -1).join('/')
    if (route?.meta?.v1DetailsPageSectionId) {
        url.hash = '#' + route.meta.v1DetailsPageSectionId
    }
    return url
}

function detailsPageToPreferencesPagePathRewrite ({ route, url }) {
    url = detailsPagePathRewrite({ route, url })
    url.pathname = url.pathname.replace('details', 'preferences')
    return url
}

function proxyRewriteGrafanaBase ({ route, url }) {
    url.searchParams.set('kiosk', 'tv')
    return url
}

function getProxyRewriteFor (pathname) {
    const url = new URL(pathname, location.origin)
    return (config) => {
        const newConfig = { ...config, url }
        return proxyRewriteGrafanaBase(newConfig)
    }
}

function subscriberCallDetailsPathRewrite ({ route, url }) {
    url.pathname = `/subscriber/${route.params.id}/calls`
    url.searchParams.set('callid', route.params.callId)
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
                component: () => import('pages/AuiDashboardPage'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'page.dashboard'
                    },
                    get label () {
                        return i18n.t('Dashboard')
                    },
                    icon: 'fas fa-tachometer-alt'
                }
            },
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
            },
            {
                name: 'resellerList',
                path: '/reseller',
                component: () => import('pages/resellers/AuiResellerList'),
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
                component: () => import('pages/resellers/AuiResellerCreation'),
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
                component: () => import('pages/resellers/AuiResellerContext'),
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
                        component: () => import('pages/resellers/AuiResellerEdit'),
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
                        name: 'resellerJournal',
                        path: 'journal',
                        component: () => import('pages/resellers/AuiResellerJournal'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Journal')
                            },
                            icon: 'list',
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
                            menu: true,
                            goToPathRewrite: detailsPagePathRewrite
                        },
                        children: [{
                            name: 'resellerDetailsBaseInformation',
                            path: 'base-information',
                            component: () => import('pages/reseller-details/AuiResellerBaseInformation'),
                            meta: {
                                get label () {
                                    return i18n.t('Reseller Base Information')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fa fa-info',
                                v1DetailsPageSectionId: 'collapse_reseller'
                            }
                        }, {
                            name: 'resellerDetailsContract',
                            path: 'contract',
                            component: () => import('pages/reseller-details/AuiResellerDetailsContract'),
                            meta: {
                                get label () {
                                    return i18n.t('Reseller Contract')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-handshake',
                                v1DetailsPageSectionId: 'collapse_contract'
                            }
                        }, {
                            name: 'resellerDetailsContact',
                            path: 'contact',
                            component: () => import('pages/reseller-details/AuiResellerDetailsContact'),
                            meta: {
                                get label () {
                                    return i18n.t('Reseller Contact')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-address-card',
                                v1DetailsPageSectionId: 'collapse_contact'
                            }
                        }, {
                            name: 'resellerDetailsAdminLogins',
                            path: 'admin-logins',
                            component: () => import('pages/reseller-details/AuiResellerDetailsAdmin'),
                            meta: {
                                get label () {
                                    return i18n.t('Administrator Logins')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-sign-in-alt',
                                v1DetailsPageSectionId: 'collapse_admin'
                            }
                        }, {
                            name: 'resellerDetailsDomains',
                            path: 'domains',
                            component: () => import('pages/reseller-details/AuiResellerDetailsDomain'),
                            meta: {
                                get label () {
                                    return i18n.t('Domains')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-network-wired',
                                v1DetailsPageSectionId: 'collapse_domain'
                            }
                        }, {
                            name: 'resellerDetailsBillingProfiles',
                            path: 'billing-profiles',
                            component: () => import('pages/reseller-details/AuiResellerDetailsBillingProfiles'),
                            meta: {
                                get label () {
                                    return i18n.t('Billing Profiles')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-hand-holding-usd',
                                v1DetailsPageSectionId: 'collapse_profile'
                            }
                        }, {
                            name: 'resellerDetailsBillingNetworks',
                            path: 'billing-networks',
                            component: () => import('pages/reseller-details/AuiResellerDetailsBillingNetworks'),
                            meta: {
                                get label () {
                                    return i18n.t('Billing Networks')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-credit-card',
                                v1DetailsPageSectionId: 'collapse_network'
                            }
                        }, {
                            name: 'resellerDetailsProfilePackages',
                            path: 'profile-packages',
                            component: () => import('pages/reseller-details/AuiResellerDetailsProfilePackages'),
                            meta: {
                                get label () {
                                    return i18n.t('Profile Packages')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-cubes',
                                v1DetailsPageSectionId: 'collapse_package'
                            }
                        }, {
                            name: 'resellerDetailsCustomers',
                            path: 'customers',
                            component: () => import('pages/reseller-details/AuiResellerDetailsCustomers'),
                            meta: {
                                get label () {
                                    return i18n.t('Customers')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-user',
                                v1DetailsPageSectionId: 'collapse_customer'
                            }
                        }, {
                            name: 'resellerDetailsBranding',
                            path: 'branding',
                            component: () => import('pages/reseller-details/AuiResellerDetailsBranding'),
                            meta: {
                                get label () {
                                    return i18n.t('Branding')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-palette',
                                v1DetailsPageSectionId: 'collapse_branding'
                            }
                        }, {
                            name: 'resellerDetailsInvoiceTemplates',
                            path: 'invoice-templates',
                            component: () => import('pages/reseller-details/AuiResellerDetailsInvoiceTemplates'),
                            meta: {
                                get label () {
                                    return i18n.t('Invoice Templates')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-file-invoice',
                                v1DetailsPageSectionId: 'collapse_intemplate'
                            }
                        }, {
                            name: 'resellerDetailsPhoneBook',
                            path: 'phone-book',
                            component: () => import('pages/reseller-details/AuiResellerDetailsPhonebook'),
                            meta: {
                                get label () {
                                    return i18n.t('Phonebook')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-address-book',
                                v1DetailsPageSectionId: 'collapse_phonebook'
                            }
                        }, {
                            name: 'resellerDetailsPhonebookEntryCreation',
                            path: '/reseller/:id/phonebook/create',
                            component: () => import('pages/reseller-details/AuiResellerDetailsPhonebookCreation'),
                            meta: {
                                get label () {
                                    return i18n.t('Add Phonebook Entry')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'add',
                                hideFromPageMenu: true,
                                goToPathRewrite: ({ route, url }) => {
                                    url.pathname = '/reseller/' + route.params.id + '/details/phonebook/create'
                                    return url
                                }
                            }
                        }, {
                            name: 'resellerDetailsPhonebookEntryEdit',
                            path: '/reseller/:id/details/phonebook/:phonebookId/edit',
                            component: () => import('pages/reseller-details/AuiResellerDetailsPhonebookEdit'),
                            meta: {
                                $p: {
                                    operation: 'update',
                                    resource: 'entity.phonebookentries'
                                },
                                get label () {
                                    return i18n.t('Edit')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'edit',
                                hideFromPageMenu: true,
                                goToPathRewrite: ({ route, url }) => {
                                    url.pathname = '/reseller/' + route.params.id + '/details/phonebook/' + route.params.phonebookId + '/edit'
                                    return url
                                }
                            }
                        }, {
                            name: 'resellerDetailsTimeSets',
                            path: 'time-sets',
                            component: () => import('pages/reseller-details/AuiResellerDetailsTimeSets'),
                            meta: {
                                get label () {
                                    return i18n.t('Time Sets')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'fas fa-clock',
                                v1DetailsPageSectionId: 'collapse_timeset'
                            }
                        }, {
                            name: 'resellerDetailsTimeSetCreation',
                            path: 'timeset/create',
                            component: () => import('pages/Proxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Add Timeset')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'add',
                                proxy: true,
                                hideFromPageMenu: true
                            }
                        }, {
                            name: 'resellerDetailsInvoiceTemplateCreation',
                            path: '/invoicetemplate/create/:id',
                            component: () => import('pages/Proxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Add Invoice Template')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'add',
                                proxy: true,
                                hideFromPageMenu: true
                            }
                        }, {
                            name: 'resellerDetailsPhonebookEntryUploadCSV',
                            path: '/reseller/:id/details/phonebook_upload_csv',
                            component: () => import('pages/Proxy'),
                            meta: {
                                $p: {
                                    operation: 'update',
                                    resource: 'entity.phonebookentries'
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                get label () {
                                    return i18n.t('Upload CSV')
                                },
                                icon: 'fas fa-upload',
                                proxy: true,
                                hideFromPageMenu: true
                            }
                        }, {
                            name: 'resellerDetailsBillingProfileCreation',
                            path: '/reseller/:id/details/billing-profiles/create',
                            component: () => import('pages/AuiBillingProfileCreation'),
                            props: true,
                            meta: {
                                $p: {
                                    operation: 'create',
                                    resource: 'entity.billingprofiles'
                                },
                                get label () {
                                    return i18n.t('Add Billing Profile')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'add',
                                hideFromPageMenu: true,
                                goToPathRewrite: ({ url }) => {
                                    url.pathname = '/billing/create'
                                    return url
                                }
                            }
                        },
                        {
                            name: 'resellerDetailsBillingProfileEdit',
                            path: '/reseller/:id/details/billing-profiles/:billingProfileId/edit',
                            component: () => import('pages/AuiBillingProfileEdit'),
                            props: true,
                            meta: {
                                $p: {
                                    operation: 'update',
                                    resource: 'entity.billingprofiles'
                                },
                                get label () {
                                    return i18n.t('Edit')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'edit',
                                hideFromPageMenu: true,
                                goToPathRewrite: ({ route, url }) => {
                                    url.pathname = '/billing/' + route.params.billingProfileId + '/edit'
                                    return url
                                }
                            }
                        },
                        {
                            name: 'resellerDetailsBillingNetworkCreation',
                            path: '/reseller/:id/details/billing-networks/create',
                            component: () => import('pages/AuiBillingNetworkCreation'),
                            props: true,
                            meta: {
                                $p: {
                                    operation: 'create',
                                    resource: 'entity.billingnetworks'
                                },
                                get label () {
                                    return i18n.t('Add Billing Network')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'add',
                                hideFromPageMenu: true,
                                goToPathRewrite: ({ url }) => {
                                    url.pathname = '/network/create'
                                    return url
                                }
                            }
                        },
                        {
                            name: 'resellerDetailsBillingNetworkEdit',
                            path: '/reseller/:id/details/billing-networks/:billingNetworkId/edit',
                            component: () => import('pages/AuiBillingNetworkEdit'),
                            props: true,
                            meta: {
                                $p: {
                                    operation: 'update',
                                    resource: 'entity.billingnetworks'
                                },
                                get label () {
                                    return i18n.t('Edit')
                                },
                                parentPath: 'resellerList.resellerContext.resellerDetails',
                                icon: 'edit',
                                hideFromPageMenu: true,
                                goToPathRewrite: ({ route, url }) => {
                                    url.pathname = '/network/' + route.params.billingNetworkId + '/edit'
                                    return url
                                }
                            }
                        }]
                    },
                    {
                        name: 'resellerPreferences',
                        path: '/reseller/:id/preferences',
                        component: () => import('pages/resellers/AuiResellerPreferences'),
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
                component: () => import('pages/AuiBrandingPage'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'page.panelBranding'
                    },
                    get label () {
                        return i18n.t('Branding')
                    },
                    icon: 'fas fa-palette',
                    root: true
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
                component: () => import('pages/customers/AuiCustomerList'),
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
                component: () => import('pages/customers/AuiCustomerCreation'),
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
                component: () => import('pages/customers/AuiCustomerContext'),
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
                        component: () => import('pages/customers/AuiCustomerEdit'),
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
                        name: 'customerJournal',
                        path: 'journal',
                        component: () => import('pages/customers/AuiCustomerJournal'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.customers'
                            },
                            get label () {
                                return i18n.t('Journal')
                            },
                            icon: 'list',
                            parentPath: 'customerList.customerContext',
                            menu: true
                        }
                    },
                    {
                        name: 'customerPBXGroupEdit',
                        path: '/customer/:id/pbx/group/:groupId/edit',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.customers'
                            },
                            get label () {
                                return i18n.t('Edit PBX Group')
                            },
                            parentPath: 'customerList.customerContext',
                            icon: 'edit',
                            proxy: true
                        }
                    },
                    {
                        name: 'customerDetails',
                        path: '/customer/:id/details',
                        component: () => import('pages/customer-details/AuiCustomerDetailsPage'),
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
                            menu: true,
                            goToPathRewrite: detailsPagePathRewrite
                        },
                        children: [{
                            name: 'customerDetailsReseller',
                            path: 'reseller',
                            component: () => import('pages/customer-details/AuiCustomerDetailsReseller'),
                            meta: {
                                get label () {
                                    return i18n.t('Reseller')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-users',
                                v1DetailsPageSectionId: 'collapse_reseller'
                            }
                        }, {
                            name: 'customerDetailsContact',
                            path: 'contact',
                            component: () => import('pages/customer-details/AuiCustomerDetailsContact'),
                            meta: {
                                get label () {
                                    return i18n.t('Contact Details')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-address-card',
                                v1DetailsPageSectionId: 'collapse_contact'
                            }
                        }, {
                            name: 'customerDetailsBillingProfileSch',
                            path: 'billing-profile-sch',
                            component: () => import('pages/customer-details/AuiCustomerDetailsBillingProfileSchedule'),
                            meta: {
                                get label () {
                                    return i18n.t('Billing Profile Schedule')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fa fa-calendar-alt',
                                v1DetailsPageSectionId: 'collapse_bilprofs'
                            }
                        }, {
                            name: 'customerDetailsSubscribers',
                            path: 'subscribers',
                            component: () => import('pages/customer-details/AuiCustomerDetailsSubscribers'),
                            meta: {
                                get label () {
                                    return i18n.t('Subscribers')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-user',
                                v1DetailsPageSectionId: 'collapse_subs'
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
                                v1DetailsPageSectionId: 'collapse_pbxgroups',
                                proxy: true,
                                proxyRewrite: detailsPagePathRewrite,
                                capability: 'cloudpbx'
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
                                v1DetailsPageSectionId: 'collapse_pbxdevs',
                                proxy: true,
                                proxyRewrite: detailsPagePathRewrite,
                                capability: 'cloudpbx'
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
                                v1DetailsPageSectionId: 'collapse_soundsets',
                                proxy: true,
                                proxyRewrite: detailsPagePathRewrite,
                                capability: 'cloudpbx'
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
                                v1DetailsPageSectionId: 'collapse_balance',
                                proxy: true,
                                proxyRewrite: detailsPagePathRewrite
                            }
                        }, {
                            name: 'customerDetailsBalanceIntervals',
                            path: 'balance-intervals',
                            component: () => import('pages/customer-details/AuiCustomerDetailsBalanceIntervals'),
                            meta: {
                                get label () {
                                    return i18n.t('Balance Intervals')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fa fa-money-check-alt',
                                v1DetailsPageSectionId: 'collapse_balanceintervals'
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
                                v1DetailsPageSectionId: 'collapse_topuplog',
                                proxy: true,
                                proxyRewrite: detailsPagePathRewrite
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
                                v1DetailsPageSectionId: 'collapse_fraud',
                                proxy: true,
                                proxyRewrite: detailsPagePathRewrite
                            }
                        }, {
                            name: 'customerDetailsInvoices',
                            path: 'invoices',
                            component: () => import('pages/customer-details/AuiCustomerDetailsInvoices'),
                            meta: {
                                get label () {
                                    return i18n.t('Invoices')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-file-invoice-dollar',
                                v1DetailsPageSectionId: 'collapse_invoices'
                            }
                        }, {
                            name: 'customerDetailsLocations',
                            path: 'locations',
                            component: () => import('pages/customer-details/AuiCustomerDetailsLocations'),
                            meta: {
                                get label () {
                                    return i18n.t('Locations')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-map-marker-alt',
                                v1DetailsPageSectionId: 'collapse_locations'
                            }
                        }, {
                            name: 'customerDetailsPhonebook',
                            path: 'phonebook',
                            component: () => import('pages/customer-details/AuiCustomerDetailsPhonebook'),
                            meta: {
                                get label () {
                                    return i18n.t('Phonebook')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-address-book',
                                v1DetailsPageSectionId: 'collapse_phonebook'
                            }
                        }, {
                            name: 'customerDetailsPhonebookEntryCreation',
                            path: '/customer/:id/phonebook/create',
                            component: () => import('pages/customer-details/AuiCustomerDetailsPhonebookCreation'),
                            meta: {
                                get label () {
                                    return i18n.t('Add Phonebook Entry')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'add',
                                hideFromPageMenu: true,
                                goToPathRewrite: ({ route, url }) => {
                                    url.pathname = '/customer/' + route.params.id + '/phonebook/create'
                                    return url
                                }
                            }
                        }, {
                            name: 'customerDetailsPhonebookEntryEdit',
                            path: '/customer/:id/details/phonebook/:phonebookId/edit',
                            component: () => import('pages/customer-details/AuiCustomerDetailsPhonebookEdit'),
                            meta: {
                                $p: {
                                    operation: 'update',
                                    resource: 'entity.phonebookentries'
                                },
                                get label () {
                                    return i18n.t('Edit')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'edit',
                                hideFromPageMenu: true,
                                goToPathRewrite: ({ route, url }) => {
                                    url.pathname = '/customer/' + route.params.id + '/details/phonebook/' + route.params.phonebookId + '/edit'
                                    return url
                                }
                            }
                        }, {
                            name: 'customerDetailsLocationCreation',
                            path: '/customer/:id/location/create',
                            component: () => import('pages/Proxy'),
                            meta: {
                                get label () {
                                    return i18n.t('Add Location')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'add',
                                proxy: true,
                                hideFromPageMenu: true
                            }
                        }, {
                            name: 'customerDetailsPhonebookEntryUploadCSV',
                            path: '/customer/:id/phonebook_upload_csv',
                            component: () => import('pages/Proxy'),
                            meta: {
                                $p: {
                                    operation: 'update',
                                    resource: 'entity.phonebookentries'
                                },
                                get label () {
                                    return i18n.t('Upload CSV')
                                },
                                parentPath: 'customerList.customerContext.customerDetails',
                                icon: 'fas fa-upload',
                                proxy: true,
                                hideFromPageMenu: true
                            }
                        }]
                    },
                    {
                        name: 'customerLocationPreferences',
                        path: '/customer/:id/location/:locationId/preferences',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.customerlocations'
                            },
                            get label () {
                                return i18n.t('Preferences')
                            },
                            icon: 'settings_applications',
                            parentPath: 'customerList.customerContext.customerDetails.customerDetailsLocations',
                            hideFromPageMenu: true,
                            proxy: true
                        }
                    },
                    {
                        name: 'customerLocationEdit',
                        path: '/customer/:id/location/:locationId/edit',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.customerlocations'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'customerList.customerContext.customerDetails.customerDetailsLocations',
                            hideFromPageMenu: true,
                            proxy: true
                        }
                    },
                    {
                        name: 'customerSubscriberCreate',
                        path: '/customer/:id/subscriber/create',
                        component: () => import('pages/subscribers/AuiSubscriberCreation'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.t('Create Subscriber')
                            },
                            parentPath: 'customerList.customerContext',
                            icon: 'fas fa-user'
                        }
                    },
                    {
                        name: 'customerPreferences',
                        path: '/customer/:id/preferences',
                        component: () => import('pages/customers/AuiCustomerPreferences'),
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
                component: () => import('pages/contracts/AuiContractList'),
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
                component: () => import('pages/contracts/AuiContractCreation'),
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
                component: () => import('pages/contracts/AuiContractCreation'),
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
                component: () => import('pages/contracts/AuiContractContext'),
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
                        component: () => import('pages/contracts/AuiContractEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.contracts'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'contractList.contractContext',
                            menu: true
                        }
                    },
                    {
                        name: 'contractJournal',
                        path: 'journal',
                        component: () => import('pages/contracts/AuiContractJournal'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.contracts'
                            },
                            get label () {
                                return i18n.t('Journal')
                            },
                            icon: 'list',
                            parentPath: 'contractList.contractContext',
                            menu: true
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
                component: () => import('pages/contacts/AuiContactList'),
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
                component: () => import('pages/contacts/AuiContactCreation'),
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
                component: () => import('pages/contacts/AuiContactCreation'),
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
                component: () => import('pages/contacts/AuiContactContext'),
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
                        component: () => import('pages/contacts/AuiContactEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.customercontacts'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'contactList.contactContext',
                            menu: true
                        }
                    },
                    {
                        name: 'contactJournal',
                        path: '/contact/:id/journal',
                        component: () => import('pages/contacts/AuiContactJournal'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.customercontacts'
                            },
                            get label () {
                                return i18n.t('Journal')
                            },
                            icon: 'list',
                            parentPath: 'contactList.contactContext',
                            menu: true
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
                component: () => import('pages/domains/AuiDomainList'),
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
                component: () => import('pages/domains/AuiDomainCreation'),
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
                component: () => import('pages/domains/AuiDomainContext'),
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
                        component: () => import('pages/domains/AuiDomainPreferences'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'page.domain.preferences'
                            },
                            get label () {
                                return i18n.t('Preferences')
                            },
                            icon: 'settings_applications',
                            parentPath: 'domainList.domainContext',
                            menu: true
                        }
                    },
                    {
                        name: 'domainJournal',
                        path: '/domain/:id/journal',
                        component: () => import('pages/domains/AuiDomainJournal'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.domains'
                            },
                            get label () {
                                return i18n.t('Journal')
                            },
                            icon: 'list',
                            parentPath: 'domainList.domainContext',
                            menu: true
                        }
                    }
                ]
            },
            {
                name: 'subscriberList',
                path: '/subscriber',
                component: () => import('pages/subscribers/AuiSubscriberList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscribers'
                    },
                    get label () {
                        return i18n.t('Subscribers')
                    },
                    icon: 'fas fa-user',
                    root: true
                }
            },
            {
                name: 'subscriberContext',
                path: '/subscriber/:id',
                component: () => import('pages/subscribers/AuiSubscriberContext'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscribers'
                    },
                    contextRoot: true,
                    parentPath: 'subscriberList'
                },
                children: [
                    {
                        name: 'subscriberEdit',
                        path: 'details/edit',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            parentPath: 'subscriberList.subscriberContext',
                            icon: 'edit',
                            proxy: true
                        }
                    },
                    {
                        name: 'subscriberJournal',
                        path: 'journal',
                        component: () => import('pages/subscribers/AuiSubscriberJournal'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.t('Journal')
                            },
                            icon: 'list',
                            parentPath: 'subscriberList.subscriberContext',
                            menu: true
                        }
                    },
                    {
                        name: 'subscriberDetails',
                        path: 'details',
                        component: () => import('pages/subscriber-details/AuiSubscriberDetailsPage'),
                        props: {
                            detailsPageRouteName: 'subscriberDetails',
                            redirectToSubpageRoute: { name: 'subscriberDetailsMasterData' }
                        },
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.t('Details')
                            },
                            icon: 'article',
                            parentPath: 'subscriberList.subscriberContext',
                            menu: true,
                            goToPathRewrite: detailsPagePathRewrite
                        },
                        children: [
                            {
                                name: 'subscriberDetailsMasterData',
                                path: 'master-data',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsMasterData'),
                                meta: {
                                    get label () {
                                        return i18n.t('Master Data')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'fas fa-user-edit',
                                    v1DetailsPageSectionId: 'collapse_master'
                                }
                            },
                            {
                                name: 'subscriberDetailsGroups',
                                path: 'groups',
                                component: () => import('pages/AuiDetailsPageProxy'),
                                meta: {
                                    get label () {
                                        return i18n.t('PBX Groups')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'fas fa-user-friends',
                                    visibleOnlyForCustomerType: 'pbxaccount',
                                    visibleOnlyForSubscriberType: 'subscriber',
                                    v1DetailsPageSectionId: 'collapse_pbx_group_items',
                                    proxy: true,
                                    proxyRewrite: detailsPagePathRewrite,
                                    capability: 'cloudpbx'
                                }
                            },
                            {
                                name: 'subscriberDetailsGroupMembers',
                                path: 'group-members',
                                component: () => import('pages/AuiDetailsPageProxy'),
                                meta: {
                                    get label () {
                                        return i18n.t('PBX Group members')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'fas fa-user-friends',
                                    visibleOnlyForCustomerType: 'pbxaccount',
                                    visibleOnlyForSubscriberType: 'pbxgroup',
                                    v1DetailsPageSectionId: 'collapse_pbx_group_items',
                                    proxy: true,
                                    proxyRewrite: detailsPagePathRewrite,
                                    capability: 'cloudpbx'
                                }
                            },
                            {
                                name: 'subscriberDetailsVoicemails',
                                path: 'voicemails',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsVoicemails'),
                                meta: {
                                    get label () {
                                        return i18n.t('Voicemails')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'voicemail',
                                    v1DetailsPageSectionId: 'collapse_voicemail'
                                }
                            },
                            {
                                name: 'subscriberDetailsCallRecordings',
                                path: 'call-recordings',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsCallRecordings'),
                                meta: {
                                    get label () {
                                        return i18n.t('Call Recordings')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'play_circle',
                                    v1DetailsPageSectionId: 'collapse_recordings'
                                }
                            },
                            {
                                name: 'subscriberDetailsCallDetails',
                                path: 'call-details/:callId',
                                component: () => import('pages/Proxy'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.subscribers'
                                    },
                                    get label () {
                                        return i18n.t('Call details')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'search',
                                    proxy: true,
                                    hideFromPageMenu: true,
                                    proxyRewrite: subscriberCallDetailsPathRewrite,
                                    goToPathRewrite: subscriberCallDetailsPathRewrite
                                }
                            },
                            {
                                name: 'subscriberDetailsRecordedFiles',
                                path: '/subscriber/:id/details/recording/:recordingId/streams',
                                component: () => import('pages/Proxy'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.subscribers'
                                    },
                                    get label () {
                                        return i18n.t('Recorded files')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'play_arrow',
                                    proxy: true,
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberDetailsRegisteredDevices',
                                path: 'registered-devices',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsRegisteredDevices'),
                                meta: {
                                    get label () {
                                        return i18n.t('Registered Devices')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'devices',
                                    v1DetailsPageSectionId: 'collapse_regdev'
                                }
                            },
                            {
                                name: 'subscriberDetailsRegisteredDeviceCreation',
                                path: 'registered/create',
                                component: () => import('pages/AuiSubscriberRegisteredDevicesCreation'),
                                meta: {
                                    get label () {
                                        return i18n.t('Registered Devices')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'devices',
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberDetailsCapturedDialogs',
                                path: 'captured-dialogs',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsCapturedDialogs'),
                                meta: {
                                    get label () {
                                        return i18n.t('Captured Dialogs')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'sync_alt',
                                    v1DetailsPageSectionId: 'collapse_cap',
                                    goToPathRewrite: detailsPagePathRewrite,
                                    platformInfo: 'callflow'
                                }
                            },
                            {
                                name: 'subscriberDetailsCallMap',
                                path: '/subscriber/:id/callflow/:callId/callmap',
                                component: () => import('pages/Proxy'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.subscribers'
                                    },
                                    get label () {
                                        return i18n.t('Call map')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'sip',
                                    proxy: true,
                                    hideFromPageMenu: true,
                                    platformInfo: 'callflow'
                                }
                            },
                            {
                                name: 'subscriberDetailsPhonebook',
                                path: 'phonebook',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsPhonebook'),
                                meta: {
                                    get label () {
                                        return i18n.t('Phonebook')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'fas fa-address-book',
                                    v1DetailsPageSectionId: 'collapse_phonebook'
                                }
                            },
                            {
                                name: 'subscriberDetailsPhonebookEntryCreation',
                                path: '/subscriber/:id/details/phonebook/create',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsPhonebookCreation'),
                                meta: {
                                    get label () {
                                        return i18n.t('Add Phonebook Entry')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'add',
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberDetailsPhonebookEntryEdit',
                                path: '/subscriber/:id/details/phonebook/:phonebookId/edit',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsPhonebookEdit'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.phonebookentries'
                                    },
                                    get label () {
                                        return i18n.t('Edit')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'edit',
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberDetailsPhonebookEntryUploadCSV',
                                path: '/subscriber/:id/details/phonebook_upload_csv',
                                component: () => import('pages/Proxy'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.phonebookentries'
                                    },
                                    get label () {
                                        return i18n.t('Upload CSV')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'fas fa-upload',
                                    proxy: true,
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberDetailsCallForwarding',
                                path: 'call-forwarding',
                                component: () => import('pages/AuiDetailsPageProxy'),
                                meta: {
                                    get label () {
                                        return i18n.t('Call Forwarding')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'phone_forwarded',
                                    v1DetailsPageSectionId: 'collapse_cf',
                                    proxy: true,
                                    proxyRewrite: detailsPageToPreferencesPagePathRewrite,
                                    goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                                }
                            },
                            {
                                name: 'subscriberDetailsVoicemailSettings',
                                path: 'voicemail',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsVoicemailSettings'),
                                meta: {
                                    get label () {
                                        return i18n.t('Voicemail Settings')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'record_voice_over',
                                    v1DetailsPageSectionId: 'collapse_vm',
                                    goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                                }
                            },
                            {
                                name: 'subscriberDetailsFax',
                                path: 'fax',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsFaxSettings'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.subscribers'
                                    },
                                    get label () {
                                        return i18n.t('Fax Features')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'fax',
                                    v1DetailsPageSectionId: 'collapse_fax',
                                    goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                                }
                            },
                            {
                                name: 'subscriberDetailsAutoAttendant',
                                path: 'auto-attendant',
                                component: () => import('pages/AuiDetailsPageProxy'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.subscribers'
                                    },
                                    get label () {
                                        return i18n.t('Auto Attendant Slots')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'dialpad',
                                    v1DetailsPageSectionId: 'collapse_aa',
                                    proxy: true,
                                    proxyRewrite: detailsPageToPreferencesPagePathRewrite,
                                    goToPathRewrite: detailsPageToPreferencesPagePathRewrite,
                                    visibleOnlyForCustomerType: 'pbxaccount',
                                    capability: 'cloudpbx'
                                }
                            },
                            {
                                name: 'subscriberDetailsSpeedDial',
                                path: 'speed-dial',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsSpeedDial'),
                                meta: {
                                    get label () {
                                        return i18n.t('Speed Dial')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'touch_app',
                                    v1DetailsPageSectionId: 'collapse_speed',
                                    goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                                }
                            },
                            {
                                name: 'subscriberDetailsSpeedDialCreation',
                                path: '/subscriber/:id/preferences/speeddial/create',
                                component: () => import('pages/AuiDetailsPageProxy'),
                                meta: {
                                    $p: {
                                        operation: 'create',
                                        resource: 'entity.speeddial'
                                    },
                                    get label () {
                                        return i18n.t('Create Speed Dial')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'touch_app',
                                    proxy: true,
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberDetailsSpeedDialEdit',
                                path: '/subscriber/:id/preferences/speeddial/:speedDialId/edit',
                                component: () => import('pages/AuiDetailsPageProxy'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.speeddial'
                                    },
                                    get label () {
                                        return i18n.t('Edit')
                                    },
                                    icon: 'edit',
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    proxy: true,
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberDetailsReminder',
                                path: 'reminder',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsReminder'),
                                meta: {
                                    get label () {
                                        return i18n.t('Reminder')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'notifications',
                                    v1DetailsPageSectionId: 'collapse_rm',
                                    proxy: true,
                                    goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                                }
                            },
                            {
                                name: 'subscriberDetailsCallthroughClis',
                                path: 'callthrough-clis',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsCallthroughCLIs'),
                                meta: {
                                    get label () {
                                        return i18n.t('Callthrough CLIs')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'alt_route',
                                    v1DetailsPageSectionId: 'collapse_ccmap',
                                    goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                                }
                            },
                            {
                                name: 'subscriberDetailsCallthroughClisEdit',
                                path: '/subscriber/:id/details/ccmappings/edit',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsCallthroughCLIsEdit'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.ccmapentries'
                                    },
                                    get label () {
                                        return i18n.t('Edit Callthrough CLIs')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'alt_route',
                                    v1DetailsPageSectionId: 'collapse_ccmap',
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/subscriber/' + route.params.id + '/preferences/ccmappings/edit'
                                        return url
                                    },
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberDetailsTrustedSources',
                                path: 'trusted-sources',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsTrustedSources'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.trustedsources'
                                    },
                                    get label () {
                                        return i18n.t('Trusted Sources')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'verified_user',
                                    v1DetailsPageSectionId: 'collapse_ts',
                                    goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                                }
                            },
                            {
                                name: 'subscriberTrustedSourcesCreation',
                                path: '/subscriber/:id/details/trusted/create',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsTrustedSourcesCreation'),
                                meta: {
                                    $p: {
                                        operation: 'create',
                                        resource: 'entity.trustedsources'
                                    },
                                    get label () {
                                        return i18n.t('Create Trusted Source')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'verified_user',
                                    hideFromPageMenu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/subscriber/' + route.params.id + '/preferences/trusted/create'
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberTrustedSourcesEdit',
                                path: '/subscriber/:id/details/trusted/:trustedSourceId/edit',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsTrustedSourcesEdit'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.trustedsources'
                                    },
                                    get label () {
                                        return i18n.t('Edit')
                                    },
                                    icon: 'edit',
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    hideFromPageMenu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/subscriber/' + route.params.id + '/preferences/trusted/' + route.params.trustedSourceId + '/edit'
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberDetailsUpnRewrite',
                                path: 'upn-rewrite',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsUpnRewrite'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.upnrewritesets'
                                    },
                                    get label () {
                                        return i18n.t('UPN Rewrite')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'fas fa-id-card',
                                    v1DetailsPageSectionId: 'collapse_upnr',
                                    goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                                }
                            },
                            {
                                name: 'subscriberUpnRewriteCreate',
                                path: '/subscriber/:id/details/upn-rewrite/create',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsUpnRewriteCreation'),
                                meta: {
                                    $p: {
                                        operation: 'create',
                                        resource: 'entity.upnrewritesets'
                                    },
                                    get label () {
                                        return i18n.t('Create UPN Rewrite')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'fas fa-id-card',
                                    hideFromPageMenu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/subscriber/' + route.params.id + '/preferences/upnrewrite/create'
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberUpnRewriteEdit',
                                path: '/subscriber/:id/details/upn-rewrite/:upnRewriteId/edit',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsUpnRewriteEdit'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.upnrewritesets'
                                    },
                                    get label () {
                                        return i18n.t('Edit')
                                    },
                                    icon: 'edit',
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    hideFromPageMenu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/subscriber/' + route.params.id + '/preferences/upnrewrite/' + route.params.upnRewriteId + '/edit'
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberDetailsHeaderManipulations',
                                path: 'header-manipulations',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsHeaderManipulations'),
                                meta: {
                                    get label () {
                                        return i18n.t('Header Manipulations')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'fas fa-edit',
                                    v1DetailsPageSectionId: 'collapse_hdr',
                                    goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                                }
                            },
                            {
                                name: 'subscriberHeaderRuleCreate',
                                path: '/subscriber/:id/preferences/header/create',
                                component: () => import('pages/AuiDetailsPageProxy'),
                                meta: {
                                    $p: {
                                        operation: 'create',
                                        resource: 'entity.headerrules'
                                    },
                                    get label () {
                                        return i18n.t('Create Header Rule')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'fas fa-id-card',
                                    proxy: true,
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberHeaderRuleEdit',
                                path: '/subscriber/:id/preferences/header/:headerId/edit',
                                component: () => import('pages/AuiDetailsPageProxy'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.headerrules'
                                    },
                                    get label () {
                                        return i18n.t('Edit')
                                    },
                                    icon: 'edit',
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    proxy: true,
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberHeaderRuleConditions',
                                path: '/subscriber/:id/preferences/header/:headerId/conditions',
                                component: () => import('pages/AuiDetailsPageProxy'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.headerrules'
                                    },
                                    get label () {
                                        return i18n.t('Conditions')
                                    },
                                    icon: 'filter_alt',
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    proxy: true,
                                    hideFromPageMenu: true
                                }
                            },

                            {
                                name: 'subscriberHeaderRuleActions',
                                path: '/subscriber/:id/preferences/header/:headerId/actions',
                                component: () => import('pages/AuiDetailsPageProxy'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.headerrules'
                                    },
                                    get label () {
                                        return i18n.t('Actions')
                                    },
                                    icon: 'play_arrow',
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    proxy: true,
                                    hideFromPageMenu: true
                                }
                            },
                            {
                                name: 'subscriberDetailsLocationMappings',
                                path: 'location-mappings',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsLocationMappings'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.subscriberlocationmappings'
                                    },
                                    get label () {
                                        return i18n.t('Location Mappings')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'fmd_good',
                                    v1DetailsPageSectionId: 'collapse_lm',
                                    goToPathRewrite: detailsPageToPreferencesPagePathRewrite
                                }
                            },
                            {
                                name: 'subscriberLocationMappingsCreation',
                                path: '/subscriber/:id/details/locationmap/create',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsLocationMappingsCreation'),
                                meta: {
                                    $p: {
                                        operation: 'create',
                                        resource: 'entity.subscriberlocationmappings'
                                    },
                                    get label () {
                                        return i18n.t('Create Location Mapping')
                                    },
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    icon: 'fmd_good',
                                    hideFromPageMenu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/subscriber/' + route.params.id + '/preferences/locationmap/create'
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'subscriberLocationMappingsEdit',
                                path: '/subscriber/:id/details/locationmap/:locationMappingId/edit',
                                component: () => import('pages/subscriber-details/AuiSubscriberDetailsLocationMappingsEdit'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.subscriberlocationmappings'
                                    },
                                    get label () {
                                        return i18n.t('Edit')
                                    },
                                    icon: 'edit',
                                    parentPath: 'subscriberList.subscriberContext.subscriberDetails',
                                    hideFromPageMenu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/subscriber/' + route.params.id + '/preferences/locationmap/' + route.params.locationMappingId + '/edit'
                                        return url
                                    }
                                }
                            }
                        ]
                    },
                    {
                        name: 'subscriberPreferences',
                        path: 'preferences',
                        component: () => import('pages/subscribers/AuiSubscriberPreferences'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.t('Preferences')
                            },
                            icon: 'settings_applications',
                            parentPath: 'subscriberList.subscriberContext',
                            menu: true
                        }
                    },
                    {
                        name: 'subscriberCallHistory',
                        path: 'calls',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.t('Call History')
                            },
                            icon: 'list',
                            parentPath: 'subscriberList.subscriberContext',
                            menu: true,
                            proxy: true
                        }
                    }
                ]
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
                name: 'subscriberProfileSetList',
                path: '/subscriberprofile',
                component: () => import('pages/subscriber-profiles/AuiSubscriberProfileSetList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscriberprofilesets'
                    },
                    get label () {
                        return i18n.t('Subscriber Profiles')
                    },
                    icon: 'far fa-user',
                    root: true
                }
            },
            {
                name: 'subscriberProfileSetCreate',
                path: '/subscriberprofile/create',
                component: () => import('pages/subscriber-profiles/AuiSubscriberProfileSetCreation'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.subscriberprofilesets'
                    },
                    get label () {
                        return i18n.t('Create Subscriber Profile Set')
                    },
                    icon: 'add',
                    parentPath: 'subscriberProfileSetList'
                }
            },
            {
                name: 'subscriberProfileSetContext',
                path: '/subscriberprofile/:id',
                component: () => import('pages/subscriber-profiles/AuiSubscriberProfileSetContext'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscriberprofilesets'
                    },
                    contextRoot: true,
                    parentPath: 'subscriberProfileSetList'
                },
                children: [{
                    name: 'subscriberProfileSetEdit',
                    path: '/subscriberprofile/:id/edit',
                    component: () => import('pages/subscriber-profiles/AuiSubscriberProfileSetEdit'),
                    meta: {
                        $p: {
                            operation: 'update',
                            resource: 'entity.subscriberprofilesets'
                        },
                        get label () {
                            return i18n.t('Edit')
                        },
                        icon: 'edit',
                        parentPath: 'subscriberProfileSetList.subscriberProfileSetContext'
                    }
                },
                {
                    name: 'subscriberProfileSetClone',
                    path: '/subscriberprofile/:id/clone',
                    component: () => import('pages/Proxy'),
                    meta: {
                        $p: {
                            operation: 'update',
                            resource: 'entity.subscriberprofilesets'
                        },
                        get label () {
                            return i18n.t('Clone')
                        },
                        icon: 'content_copy',
                        parentPath: 'subscriberProfileSetList.subscriberProfileSetContext',
                        proxy: true
                    }
                }]
            },
            {
                name: 'subscriberProfilesList',
                path: '/subscriberprofile/:id/profile',
                component: () => import('pages/subscriber-profiles/AuiSubscriberProfilesList'),
                props: route => ({ profileSetId: Number(route.params.id) }),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscriberprofilesets'
                    },
                    get label () {
                        return i18n.t('Profiles')
                    },
                    icon: 'list',
                    root: true
                }
            },
            {
                name: 'subscriberProfilesContext',
                path: '/subscriberprofile/:profileSetId/profile/:id',
                component: () => import('pages/subscriber-profiles/AuiSubscriberProfilesContext'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscriberprofilesets'
                    },
                    contextRoot: true,
                    parentPath: 'subscriberProfilesList'
                },
                children: [{
                    name: 'subscriberProfilesEdit',
                    path: 'edit',
                    component: () => import('pages/subscriber-profiles/AuiSubscriberProfilesEdit'),
                    props: route => ({ profileSetId: Number(route.params.profileSetId) }),
                    meta: {
                        $p: {
                            operation: 'update',
                            resource: 'entity.subscriberprofilesets'
                        },
                        get label () {
                            return i18n.t('Edit')
                        },
                        icon: 'edit',
                        parentPath: 'subscriberProfilesList.subscriberProfilesContext'
                    }
                },
                {
                    name: 'subscriberProfilesClone',
                    path: 'clone',
                    component: () => import('pages/Proxy'),
                    meta: {
                        $p: {
                            operation: 'update',
                            resource: 'entity.subscriberprofilesets'
                        },
                        get label () {
                            return i18n.t('Clone')
                        },
                        icon: 'content_copy',
                        parentPath: 'subscriberProfilesList.subscriberProfilesContext',
                        proxy: true
                    }
                },
                {
                    name: 'subscriberProfilesPreferences',
                    path: 'preferences',
                    component: () => import('pages/Proxy'),
                    meta: {
                        $p: {
                            operation: 'update',
                            resource: 'entity.subscriberprofilesets'
                        },
                        get label () {
                            return i18n.t('Preferences')
                        },
                        icon: 'settings_applications',
                        parentPath: 'subscriberProfilesList.subscriberProfilesContext',
                        proxy: true
                    }
                }]
            },
            {
                name: 'subscriberProfilesCreate',
                path: '/subscriberprofile/:id/profile/create',
                component: () => import('pages/subscriber-profiles/AuiSubscriberProfilesCreation'),
                props: route => ({ profileSetId: Number(route.params.id) }),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.subscriberprofilesets'
                    },
                    get label () {
                        return i18n.t('Add')
                    },
                    icon: 'add',
                    parentPath: 'subscriberProfilesList'
                }
            },
            {
                name: 'subscriberProfileSetCatchAll',
                path: '/subscriberprofile/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.subscriberprofilesets'
                    },
                    proxy: true
                }
            },
            {
                name: 'callListSuppressionList',
                path: '/calllistsuppression',
                component: () => import('pages/AuiCallListSuppressionList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.calllistsuppressions'
                    },
                    get label () {
                        return i18n.t('Call List Suppressions')
                    },
                    icon: 'far fa-list-alt',
                    root: true
                }
            },
            {
                name: 'callListSupressionCreation',
                path: '/calllistsuppression/create',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.calllistsuppressions'
                    },
                    proxy: true
                }
            },
            {
                name: 'callListSuppressionEdit',
                path: '/calllistsuppression/:id/edit',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.calllistsuppressions'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'callListSuppressionList',
                    proxy: true
                }
            },
            {
                name: 'callListSuppressionUpload',
                path: '/calllistsuppression/upload',
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
                name: 'billingProfileCreation',
                path: '/billing/create',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.billingprofiles'
                    },
                    proxy: true
                }
            },
            {
                name: 'billingProfileEdit',
                path: '/billing/:id/edit',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingprofiles'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    proxy: true
                }
            },
            {
                name: 'billingProfileFees',
                path: '/billing/:id/fees',
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
                name: 'billingProfilePeaktimes',
                path: '/billing/:id/peaktimes',
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
                name: 'billingNetworkCreation',
                path: '/network/create',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.billingnetworks'
                    },
                    proxy: true
                }
            },
            {
                name: 'billingNetworkEdit',
                path: '/network/:id/edit',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingnetworks'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
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
            },
            {
                name: 'invoiceTemplateList',
                path: '/invoicetemplate',
                component: () => import('pages/AuiInvoiceTemplatesList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.invoicetemplates'
                    },
                    get label () {
                        return i18n.t('Invoice Templates')
                    },
                    icon: 'fas fa-file-invoice',
                    root: true
                }
            },
            {
                name: 'invoiceTemplateEditInfo',
                path: '/invoicetemplate/:id/editinfo',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.invoicetemplates'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'fas fa-file-invoice',
                    proxy: true
                }
            },
            {
                name: 'invoiceTemplateEditContent',
                path: '/invoicetemplate/:id/editcontent',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.invoicetemplates'
                    },
                    get label () {
                        return i18n.t('Edit Template')
                    },
                    icon: 'fas fa-file-invoice',
                    proxy: true
                }
            },
            {
                name: 'invoiceTemplateCreation',
                path: '/invoicetemplate/create',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.invoicetemplates'
                    },
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
                },
                children: [
                    {
                        name: 'invoiceDownload',
                        path: '/invoice/:id/download',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.invoices'
                            },
                            get label () {
                                return i18n.t('Download')
                            },
                            icon: 'fas fa-file-invoice-dollar',
                            proxy: true
                        }
                    }
                ]
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
                    proxy: true,
                    platformInfo: 'voucher'
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
                name: 'peeringGroupServers',
                path: '/peering/:id/servers',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.peeringgroups'
                    },
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
                name: 'rewriteRuleSetCreate',
                path: '/rewrite/create',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.rewriterulesets'
                    },
                    proxy: true
                }
            },
            {
                name: 'rewriteRuleSetRules',
                path: '/rewrite/:id/rules',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.rewriterulesets'
                    },
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
                name: 'ncosLevelCreate',
                path: '/ncos/create',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.ncoslevels'
                    },
                    proxy: true
                }
            },
            {
                name: 'ncosLevelPattern',
                path: '/ncos/:id/pattern',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.ncoslevels'
                    },
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
                name: 'soundSetHandles',
                path: '/sound/:id/handles',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.soundsets'
                    },
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
                name: 'lnpCarrierList',
                path: '/lnp',
                component: () => import('pages/AuiLnpCarrierList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.lnpcarriers'
                    },
                    get label () {
                        return i18n.t('Number Porting')
                    },
                    icon: 'fas fa-sim-card',
                    root: true
                }
            },
            {
                name: 'lnpCarrierUpload',
                path: '/lnp/upload',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.lnpcarriers'
                    },
                    proxy: true
                }
            },
            {
                name: 'lnpCarrierCreation',
                path: '/lnp/carrier_create',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.lnpcarriers'
                    },
                    proxy: true,
                    parentPath: 'lnpCarrierList'
                }
            },
            {
                name: 'lnpCarrierContext',
                path: '/lnp/:id',
                component: () => import('pages/AuiLnpCarrierContext'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.lnpcarriers'
                    },
                    contextRoot: true,
                    parentPath: 'lnpCarrierList'
                },
                children: [
                    {
                        name: 'lnpCarrierEdit',
                        path: '/lnp/carrier/:id/edit',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.lnpcarriers'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'lnpCarrierList.lnpCarrierContext',
                            proxy: true
                        }
                    },
                    {
                        name: 'lnpNumberList',
                        path: 'lnpnumbers',
                        component: () => import('pages/AuiLnpNumbersList'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.lnpnumbers'
                            },
                            get label () {
                                return i18n.t('LNP Numbers')
                            },
                            icon: 'list',
                            parentPath: 'lnpCarrierList.lnpCarrierContext',
                            goToPathRewrite: ({ url }) => {
                                url.pathname = '/lnp'
                                return url
                            }
                        }
                    },
                    {
                        name: 'lnpNumberCreation',
                        path: 'number_create',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.lnpnumbers'
                            },
                            get label () {
                                return i18n.t('Add Ported Numbers')
                            },
                            icon: 'add',
                            menu: false,
                            parentPath: 'lnpCarrierList.lnpCarrierContext',
                            proxy: true,
                            proxyRewrite: ({ url }) => {
                                url.pathname = '/lnp/number_create'
                                return url
                            }
                        }
                    },
                    {
                        name: 'lnpNumberEdit',
                        path: 'lnp/number/:numberId',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.lnpnumbers'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            menu: false,
                            parentPath: 'lnpCarrierList.lnpCarrierContext',
                            proxy: true,
                            proxyRewrite: ({ url, route }) => {
                                url.pathname = '/lnp/number/' + route.params.numberId + '/edit'
                                return url
                            }
                        }
                    }
                ]
            },
            {
                name: 'lnpCatchAll',
                path: '/lnp/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.lnpcarriers'
                    },
                    proxy: true
                }
            },
            {
                name: 'emergencyMappingContainerList',
                path: '/emergencymapping',
                component: () => import('pages/AuiEmergencyMappingContainerList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.emergencymappingcontainers'
                    },
                    get label () {
                        return i18n.t('Emergency Mappings')
                    },
                    icon: 'fas fa-file-medical',
                    root: true
                }
            },
            {
                name: 'emergencyMappingContainerUpload',
                path: '/emergencymapping/upload',
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
                name: 'emergencyMappingContainerDownload',
                path: '/emergencymapping/download',
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
                name: 'emergencyMappingContainerCreation',
                path: '/emergencymapping/emergency_container_create',
                component: () => import('pages/AuiEmergencyMappingContainerCreation'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.emergencymappingcontainers'
                    },
                    get label () {
                        return i18n.t('Add')
                    },
                    icon: 'add',
                    parentPath: 'emergencyMappingContainerList'
                }
            },
            {
                name: 'emergencyMappingContainerContext',
                path: '/emergencymappingcontainer/:id',
                component: () => import('pages/AuiEmergencyMappingContainerContext'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.emergencymappingcontainers'
                    },
                    contextRoot: true,
                    parentPath: 'emergencyMappingContainerList'
                },
                children: [
                    {
                        name: 'emergencyMappingContainerEdit',
                        path: '/emergencymapping/emergency_container/:id/edit',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.emergencymappings'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'emergencyMappingContainerList.emergencyMappingContainerContext',
                            proxy: true
                        }
                    },
                    {
                        name: 'emergencyMappingList',
                        path: 'emergencymappings',
                        component: () => import('pages/AuiEmergencyMappingList'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.emergencymappings'
                            },
                            get label () {
                                return i18n.t('Mappings')
                            },
                            icon: 'list',
                            parentPath: 'emergencyMappingContainerList.emergencyMappingContainerContext',
                            goToPathRewrite: ({ url }) => {
                                url.pathname = '/emergencymapping'
                                return url
                            }
                        }
                    },
                    {
                        name: 'emergencyMappingCreation',
                        path: 'emergencymappings-creation',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.emergencymappings'
                            },
                            get label () {
                                return i18n.t('Add Mapping')
                            },
                            icon: 'add',
                            menu: false,
                            parentPath: 'emergencyMappingContainerList.emergencyMappingContainerContext',
                            proxy: true,
                            proxyRewrite: ({ url }) => {
                                url.pathname = '/emergencymapping/emergency_mapping_create'
                                return url
                            }
                        }
                    },
                    {
                        name: 'emergencyMappingEdit',
                        path: 'emergencymappings-edit/:mappingId',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.emergencymappings'
                            },
                            get label () {
                                return i18n.t('Edit')
                            },
                            icon: 'edit',
                            menu: false,
                            parentPath: 'emergencyMappingContainerList.emergencyMappingContainerContext',
                            proxy: true,
                            proxyRewrite: ({ url, route }) => {
                                url.pathname = '/emergencymapping/emergency_mapping/' + route.params.mappingId + '/edit'
                                return url
                            }
                        }
                    }
                ]
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
            },
            {
                name: 'timeSetList',
                path: '/timeset',
                component: () => import('pages/AuiTimeSetList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.timesets'
                    },
                    get label () {
                        return i18n.t('Time Set')
                    },
                    icon: 'fas fa-clock',
                    root: true
                }
            },
            {
                name: 'timeSetCreation',
                path: '/timeset/create',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.timesets'
                    },
                    get label () {
                        return i18n.t('Add')
                    },
                    icon: 'add',
                    parentPath: 'timeSetList',
                    proxy: true
                }
            },
            {
                name: 'timeSetEdit',
                path: '/timeset/:id/edit',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.timesets'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'timeSetList',
                    proxy: true
                }
            },
            {
                name: 'timeSetEvents',
                path: '/timeset/:id/event',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.timesets'
                    },
                    get label () {
                        return i18n.t('Events')
                    },
                    icon: 'far fa-calendar-alt',
                    parentPath: 'timeSetList',
                    proxy: true
                }
            }, {
                name: 'timeSetResellerEdit',
                path: '/reseller/:resellerId/details/timeset/:id/edit',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.timesets'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
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
                    proxy: true,
                    platformInfo: 'batch_provisioning'
                }
            },
            {
                name: 'batchProvisioningCreate',
                path: '/batchprovisioning/create',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'tool.batchprovisioning'
                    },
                    proxy: true,
                    platformInfo: 'batch_provisioning'
                }
            },
            {
                name: 'batchProvisioningTemplatesForm',
                path: '/batchprovisioning/templates/:id/form',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.batchprovisioning'
                    },
                    proxy: true,
                    platformInfo: 'batch_provisioning'
                }
            },
            {
                name: 'batchProvisioningTemplatesUpload',
                path: '/batchprovisioning/templates/:id/upload',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.batchprovisioning'
                    },
                    proxy: true,
                    platformInfo: 'batch_provisioning'
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
                    proxy: true,
                    platformInfo: 'batch_provisioning'
                }
            },
            {
                name: 'systemStatistics',
                path: '/system-statistics',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.systemstatistics'
                    },
                    get label () {
                        return i18n.t('System Statistics')
                    },
                    icon: 'fas fa-chart-bar',
                    proxy: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/system-statistics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'processStatistics',
                path: '/system-processes',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.systemprocesses'
                    },
                    get label () {
                        return i18n.t('System Processes')
                    },
                    icon: 'fas fa-chart-bar',
                    proxy: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/system-processes?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'rtpStatistics',
                path: '/rtp-statistics',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.rtpstatistics'
                    },
                    get label () {
                        return i18n.t('RTP Statistics')
                    },
                    icon: 'fas fa-phone-alt',
                    proxy: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/rtp-statistics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'sipStatistics',
                path: '/sip-statistics',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.sipstatistics'
                    },
                    get label () {
                        return i18n.t('SIP Statistics')
                    },
                    icon: 'fas fa-phone-alt',
                    proxy: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/sip-statistics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'databaseStatistics',
                path: '/database-statistics',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.databasestatistics'
                    },
                    get label () {
                        return i18n.t('Database Statistics')
                    },
                    icon: 'fas fa-database',
                    proxy: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/database-statistics?ngcp_grafana_admin=no')
                }
            },
            {
                name: 'clusterOverview',
                path: '/cluster-overview',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.clusteroverview'
                    },
                    get label () {
                        return i18n.t('Cluster Overview')
                    },
                    icon: 'device_hub',
                    proxy: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/d/cluster-overview?ngcp_grafana_admin=no')
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
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.statisticsadministration'
                    },
                    get label () {
                        return i18n.t('Statistics Administration')
                    },
                    icon: 'fas fa-cog',
                    proxy: true,
                    proxyRewrite: getProxyRewriteFor('/grafana/?ngcp_grafana_admin=yes')
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
                    proxy: true,
                    proxyRewrite: proxyRewriteGrafanaBase
                }
            },
            {
                name: 'ngcpVersionStatistics',
                path: '/statistics/versions',
                component: () => import('pages/Proxy'),
                meta: {
                    proxy: true
                }
            },
            {
                name: 'ngcpVersionStatisticsSupport',
                path: '/statistics/supportstatus',
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
        component: () => import('layouts/LoginLayout'),
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
