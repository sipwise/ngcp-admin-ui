import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute, createJournalRoute, detailsPagePathRewrite } from 'src/router/common'
import { PLATFORM_CARRIER, PLATFORM_PRO } from 'src/constants'

export default [
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
                return i18n.global.tc('Resellers')
            },
            icon: 'fas fa-users',
            root: true,
            journalRouteName: 'resellerJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'resellerJournalAdvanced',
        path: '/reseller/journal',
        resource: 'resellers',
        parentPath: 'resellerList'
    }),
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
                return i18n.global.tc('Add Reseller')
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
                        return i18n.global.tc('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'resellerList.resellerContext',
                    menu: true
                }
            },
            createJournalRoute({
                name: 'resellerJournal',
                resource: 'resellers',
                parentPath: 'resellerList.resellerContext'
            }),
            {
                name: 'resellerDetails',
                path: '/reseller/:id/details',
                component: () => import('pages/reseller-details/AuiResellerDetailsPage'),
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
                        return i18n.global.tc('Details')
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
                            return i18n.global.tc('Reseller Base Information')
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
                            return i18n.global.tc('Reseller Contract')
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
                            return i18n.global.tc('Reseller Contact')
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
                            return i18n.global.tc('Administrator Logins')
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
                            return i18n.global.tc('Domains')
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
                            return i18n.global.tc('Billing Profiles')
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
                            return i18n.global.tc('Billing Networks')
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
                            return i18n.global.tc('Profile Packages')
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
                            return i18n.global.tc('Customers')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-user',
                        v1DetailsPageSectionId: 'collapse_customer'
                    }
                }, {
                    name: 'resellerDetailsCustomerCreation',
                    path: '/reseller/:id/details/customers/create',
                    component: () => import('pages/reseller-details/AuiResellerDetailsCustomerCreation'),
                    props: true,
                    meta: {
                        $p: {
                            operation: 'create',
                            resource: 'entity.customers'
                        },
                        get label () {
                            return i18n.global.tc('Add Customer')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'add',
                        hideFromPageMenu: true,
                        goToPathRewrite: ({ url }) => {
                            url.pathname = '/customer/create'
                            return url
                        }
                    }
                }, {
                    name: 'resellerDetailsCustomerEdit',
                    path: '/reseller/:id/details/customers/:customerId/edit',
                    component: () => import('pages/reseller-details/AuiResellerDetailsCustomerEdit'),
                    props: true,
                    meta: {
                        $p: {
                            operation: 'update',
                            resource: 'entity.customers'
                        },
                        get label () {
                            return i18n.global.tc('Edit')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'edit',
                        hideFromPageMenu: true,
                        goToPathRewrite: ({ route, url }) => {
                            url.pathname = '/customer/' + route.params.customerId + '/edit'
                            return url
                        }
                    }
                }, {
                    name: 'resellerDetailsBranding',
                    path: 'branding',
                    component: () => import('pages/reseller-details/AuiResellerDetailsBranding'),
                    meta: {
                        get label () {
                            return i18n.global.tc('Branding')
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
                            return i18n.global.tc('Invoice Templates')
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
                            return i18n.global.tc('Phonebook')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-address-book',
                        v1DetailsPageSectionId: 'collapse_phonebook',
                        platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                    }
                }, {
                    name: 'resellerDetailsPhonebookEntryCreation',
                    path: '/reseller/:id/phonebook/create',
                    component: () => import('pages/reseller-details/AuiResellerDetailsPhonebookCreation'),
                    meta: {
                        get label () {
                            return i18n.global.tc('Add Phonebook Entry')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'add',
                        hideFromPageMenu: true,
                        goToPathRewrite: ({ route, url }) => {
                            url.pathname = '/reseller/' + route.params.id + '/details/phonebook/create'
                            return url
                        },
                        platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                    }
                }, {
                    name: 'resellerDetailsPhonebookEntryEdit',
                    path: '/reseller/:id/details/phonebook/:phonebookId/edit',
                    component: () => import('pages/reseller-details/AuiResellerDetailsPhonebookEdit'),
                    meta: {
                        $p: {
                            operation: 'update',
                            resource: 'entity.resellerphonebookentries'
                        },
                        get label () {
                            return i18n.global.tc('Edit')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'edit',
                        hideFromPageMenu: true,
                        goToPathRewrite: ({ route, url }) => {
                            url.pathname = '/reseller/' + route.params.id + '/details/phonebook/' + route.params.phonebookId + '/edit'
                            return url
                        },
                        platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                    }
                }, {
                    name: 'resellerDetailsTimeSets',
                    path: 'time-sets',
                    component: () => import('pages/reseller-details/AuiResellerDetailsTimeSets'),
                    meta: {
                        get label () {
                            return i18n.global.tc('Time Sets')
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
                            return i18n.global.tc('Add Timeset')
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
                            return i18n.global.tc('Add Invoice Template')
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
                            resource: 'entity.resellerphonebookentries'
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        get label () {
                            return i18n.global.tc('Upload CSV')
                        },
                        icon: 'fas fa-upload',
                        proxy: true,
                        hideFromPageMenu: true
                    }
                }, {
                    name: 'resellerDetailsBillingProfileCreation',
                    path: '/reseller/:id/details/billing-profiles/create',
                    component: () => import('pages/reseller-details/AuiResellerDetailsBillingProfileCreation'),
                    props: true,
                    meta: {
                        $p: {
                            operation: 'create',
                            resource: 'entity.billingprofiles'
                        },
                        get label () {
                            return i18n.global.tc('Add Billing Profile')
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
                    component: () => import('pages/reseller-details/AuiResellerDetailsBillingProfileEdit'),
                    props: true,
                    meta: {
                        $p: {
                            operation: 'update',
                            resource: 'entity.billingprofiles'
                        },
                        get label () {
                            return i18n.global.tc('Edit')
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
                    component: () => import('pages/reseller-details/AuiResellerDetailsBillingNetworkCreation'),
                    props: true,
                    meta: {
                        $p: {
                            operation: 'create',
                            resource: 'entity.billingnetworks'
                        },
                        get label () {
                            return i18n.global.tc('Add Billing Network')
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
                    component: () => import('pages/reseller-details/AuiResellerDetailsBillingNetworkEdit'),
                    props: true,
                    meta: {
                        $p: {
                            operation: 'update',
                            resource: 'entity.billingnetworks'
                        },
                        get label () {
                            return i18n.global.tc('Edit')
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
                        return i18n.global.tc('Preferences')
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
        path: '/reseller/css',
        component: () => import('pages/AuiBrandingPage'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'page.panelBranding'
            },
            get label () {
                return i18n.global.tc('Branding')
            },
            icon: 'fas fa-palette',
            root: true
        }
    },
    {
        name: 'resellerPanelBrandingUpdate',
        path: '/reseller/css/:pathMatch(.*)',
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
        path: '/reseller/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.resellers'
            },
            proxy: true
        }
    }
]
