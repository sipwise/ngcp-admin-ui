import { i18n } from 'boot/i18n'
import { LICENSES, PLATFORM_CARRIER, PLATFORM_PRO } from 'src/constants'
import { createAdvancedJournalRoute, createJournalRoute, detailsPagePathRewrite } from 'src/router/common'

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
                return i18n.global.t('Resellers')
            },
            icon: 'fas fa-users',
            licenses: [LICENSES.reseller],
            root: true,
            journalRouteName: 'resellerJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'resellerJournalAdvanced',
        path: '/reseller/journal',
        resource: 'resellers',
        parentPath: 'resellerList',
        licenses: [LICENSES.reseller]
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
                return i18n.global.t('Add Reseller')
            },
            icon: 'add',
            licenses: [LICENSES.reseller],
            parentPath: 'resellerList'
        }
    },
    {
        name: 'resellerContext',
        path: '/reseller/:id',
        redirect: (to) => {
            return { name: 'resellerEdit', params: to.params }
        },
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
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    licenses: [LICENSES.reseller],
                    parentPath: 'resellerList.resellerContext',
                    menu: true
                }
            },
            createJournalRoute({
                name: 'resellerJournal',
                resource: 'resellers',
                parentPath: 'resellerList.resellerContext',
                licenses: [LICENSES.reseller]
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
                        return i18n.global.t('Details')
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
                            return i18n.global.t('Reseller Base Information')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fa fa-info',
                        licenses: [LICENSES.reseller],
                        v1DetailsPageSectionId: 'collapse_reseller'
                    }
                }, {
                    name: 'resellerDetailsContract',
                    path: 'contract',
                    component: () => import('pages/reseller-details/AuiResellerDetailsContract'),
                    meta: {
                        get label () {
                            return i18n.global.t('Reseller Contract')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-handshake',
                        licenses: [LICENSES.reseller],
                        v1DetailsPageSectionId: 'collapse_contract'
                    }
                }, {
                    name: 'resellerDetailsContact',
                    path: 'contact',
                    component: () => import('pages/reseller-details/AuiResellerDetailsContact'),
                    meta: {
                        get label () {
                            return i18n.global.t('Reseller Contact')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-address-card',
                        licenses: [LICENSES.reseller],
                        v1DetailsPageSectionId: 'collapse_contact'
                    }
                }, {
                    name: 'resellerDetailsAdminLogins',
                    path: 'admin-logins',
                    component: () => import('pages/reseller-details/AuiResellerDetailsAdmin'),
                    meta: {
                        get label () {
                            return i18n.global.t('Administrator Logins')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-sign-in-alt',
                        licenses: [LICENSES.reseller],
                        v1DetailsPageSectionId: 'collapse_admin'
                    }
                }, {
                    name: 'resellerDetailsDomains',
                    path: 'domains',
                    component: () => import('pages/reseller-details/AuiResellerDetailsDomain'),
                    meta: {
                        get label () {
                            return i18n.global.t('Domains')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-network-wired',
                        licenses: [LICENSES.reseller],
                        v1DetailsPageSectionId: 'collapse_domain'
                    }
                }, {
                    name: 'resellerDetailsBillingProfiles',
                    path: 'billing-profiles',
                    component: () => import('pages/reseller-details/AuiResellerDetailsBillingProfiles'),
                    meta: {
                        get label () {
                            return i18n.global.t('Billing Profiles')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-hand-holding-usd',
                        licenses: [LICENSES.billing, LICENSES.reseller],
                        v1DetailsPageSectionId: 'collapse_profile'
                    }
                }, {
                    name: 'resellerDetailsBillingNetworks',
                    path: 'billing-networks',
                    component: () => import('pages/reseller-details/AuiResellerDetailsBillingNetworks'),
                    meta: {
                        get label () {
                            return i18n.global.t('Billing Networks')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-credit-card',
                        licenses: [LICENSES.billing, LICENSES.reseller],
                        v1DetailsPageSectionId: 'collapse_network'
                    }
                }, {
                    name: 'resellerDetailsProfilePackages',
                    path: 'profile-packages',
                    component: () => import('pages/reseller-details/AuiResellerDetailsProfilePackages'),
                    meta: {
                        get label () {
                            return i18n.global.t('Profile Packages')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-cubes',
                        licenses: [LICENSES.billing, LICENSES.reseller],
                        v1DetailsPageSectionId: 'collapse_package'
                    }
                }, {
                    name: 'resellerDetailsCustomers',
                    path: 'customers',
                    component: () => import('pages/reseller-details/AuiResellerDetailsCustomers'),
                    meta: {
                        get label () {
                            return i18n.global.t('Customers')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-user',
                        licenses: [LICENSES.reseller],
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
                            return i18n.global.t('Add Customer')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'add',
                        licenses: [LICENSES.reseller],
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
                            return i18n.global.t('Edit')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'edit',
                        licenses: [LICENSES.reseller],
                        hideFromPageMenu: true,
                        goToPathRewrite: ({ route, url }) => {
                            url.pathname = `/customer/${route.params.customerId}/edit`
                            return url
                        }
                    }
                }, {
                    name: 'resellerDetailsBranding',
                    path: 'branding',
                    component: () => import('pages/reseller-details/AuiResellerDetailsBranding'),
                    meta: {
                        get label () {
                            return i18n.global.t('Branding')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-palette',
                        licenses: [LICENSES.reseller],
                        v1DetailsPageSectionId: 'collapse_branding'
                    }
                }, {
                    name: 'resellerDetailsInvoiceTemplates',
                    path: 'invoice-templates',
                    component: () => import('pages/reseller-details/AuiResellerDetailsInvoiceTemplates'),
                    meta: {
                        get label () {
                            return i18n.global.t('Invoice Templates')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-file-invoice',
                        licenses: [LICENSES.invoice, LICENSES.reseller],
                        v1DetailsPageSectionId: 'collapse_intemplate'
                    }
                }, {
                    name: 'resellerDetailsPhoneBook',
                    path: 'phone-book',
                    component: () => import('pages/reseller-details/AuiResellerDetailsPhonebook'),
                    meta: {
                        get label () {
                            return i18n.global.t('Phonebook')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-address-book',
                        licenses: [LICENSES.phonebook, LICENSES.reseller],
                        v1DetailsPageSectionId: 'collapse_phonebook',
                        platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                    }
                }, {
                    name: 'resellerDetailsPhonebookEntryCreation',
                    path: '/reseller/:id/phonebook/create',
                    component: () => import('pages/reseller-details/AuiResellerDetailsPhonebookCreation'),
                    meta: {
                        get label () {
                            return i18n.global.t('Add Phonebook Entry')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'add',
                        licenses: [LICENSES.phonebook, LICENSES.reseller],
                        hideFromPageMenu: true,
                        goToPathRewrite: ({ route, url }) => {
                            url.pathname = `/reseller/${route.params.id}/details/phonebook/create`
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
                            return i18n.global.t('Edit')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'edit',
                        licenses: [LICENSES.phonebook, LICENSES.reseller],
                        hideFromPageMenu: true,
                        goToPathRewrite: ({ route, url }) => {
                            url.pathname = `/reseller/${route.params.id}/details/phonebook/${route.params.phonebookId}/edit`
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
                            return i18n.global.t('Time Sets')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'fas fa-clock',
                        licenses: [LICENSES.reseller],
                        v1DetailsPageSectionId: 'collapse_timeset'
                    }
                },
                {
                    name: 'resellerDetailsTimeSetCreation',
                    path: 'time-sets/create',
                    component: () => import('pages/reseller-details/AuiResellerDetailsTimeSetCreation'),
                    meta: {
                        $p: {
                            operation: 'create',
                            resource: 'entity.timesets'
                        },
                        get label () {
                            return i18n.global.t('Add Timeset')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails.resellerDetailsTimeSets',
                        icon: 'add',
                        licenses: [LICENSES.reseller],
                        hideFromPageMenu: true
                    }
                },
                {
                    name: 'resellerDetailsTimeSetEdit',
                    path: 'time-sets/:timeSetId/edit',
                    component: () => import('pages/reseller-details/AuiResellerDetailsTimeSetEdit'),
                    props: true,
                    meta: {
                        $p: {
                            operation: 'update',
                            resource: 'entity.timesets'
                        },
                        get label () {
                            return i18n.global.t('Edit')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails.resellerDetailsTimeSets',
                        icon: 'edit',
                        licenses: [LICENSES.reseller],
                        hideFromPageMenu: true
                    }
                },
                {
                    name: 'resellerDetailsTimeSetEvents',
                    path: 'time-sets/:timeSetId/event',
                    component: () => import('pages/Proxy'),
                    meta: {
                        $p: {
                            operation: 'update',
                            resource: 'entity.timesets'
                        },
                        get label () {
                            return i18n.global.t('Events')
                        },
                        icon: 'far fa-calendar-alt',
                        parentPath: 'resellerList.resellerContext.resellerDetails.resellerDetailsTimeSets',
                        proxy: true,
                        proxyRewrite: ({ route, url }) => {
                            url.pathname = `/timeset/${route.params.timeSetId}/event`
                            return url
                        }
                    }
                },
                {
                    name: 'resellerDetailsInvoiceTemplateCreation',
                    path: '/invoicetemplate/create/:id',
                    component: () => import('pages/Proxy'),
                    meta: {
                        get label () {
                            return i18n.global.t('Add Invoice Template')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'add',
                        licenses: [LICENSES.reseller],
                        proxy: true,
                        hideFromPageMenu: true
                    }
                }, {
                    name: 'resellerDetailsPhonebookEntryUploadCSV',
                    path: '/reseller/:id/details/phonebook_upload_csv',
                    component: () => import('pages/AuiDetailsPhonebookUpload'),
                    props: {
                        path: 'v2/resellers/phonebook'
                    },
                    meta: {
                        $p: {
                            operation: 'update',
                            resource: 'entity.resellerphonebookentries'
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        get label () {
                            return i18n.global.t('Upload CSV')
                        },
                        licenses: [LICENSES.phonebook, LICENSES.reseller],
                        icon: 'fas fa-upload',
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
                            return i18n.global.t('Add Billing Profile')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'add',
                        licenses: [LICENSES.billing, LICENSES.reseller],
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
                            return i18n.global.t('Edit')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'edit',
                        licenses: [LICENSES.billing, LICENSES.reseller],
                        hideFromPageMenu: true,
                        goToPathRewrite: ({ route, url }) => {
                            url.pathname = `/billing/${route.params.billingProfileId}/edit`
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
                            return i18n.global.t('Add Billing Network')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'add',
                        licenses: [LICENSES.billing, LICENSES.reseller],
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
                            return i18n.global.t('Edit')
                        },
                        parentPath: 'resellerList.resellerContext.resellerDetails',
                        icon: 'edit',
                        licenses: [LICENSES.billing, LICENSES.reseller],
                        hideFromPageMenu: true,
                        goToPathRewrite: ({ route, url }) => {
                            url.pathname = `/network/${route.params.billingNetworkId}/edit`
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
                        return i18n.global.t('Preferences')
                    },
                    icon: 'settings_applications',
                    licenses: [LICENSES.reseller],
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
                return i18n.global.t('Branding')
            },
            icon: 'fas fa-palette',
            licenses: [LICENSES.reseller],
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
