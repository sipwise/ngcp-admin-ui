import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute, createJournalRoute, detailsPagePathRewrite } from 'src/router/common'

export default [
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
            root: true,
            journalRouteName: 'customerJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'customerJournalAdvanced',
        path: '/customer/journal',
        resource: 'customers',
        parentPath: 'customerList'
    }),
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
            createJournalRoute({
                name: 'customerJournal',
                resource: 'customers',
                parentPath: 'customerList.customerContext'
            }),
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
                    component: () => import('pages/customer-details/AuiCustomerDetailsTopUpLogs'),
                    meta: {
                        get label () {
                            return i18n.t('Top-up Log')
                        },
                        parentPath: 'customerList.customerContext.customerDetails',
                        icon: 'fa fa-file-contract',
                        v1DetailsPageSectionId: 'collapse_topuplog'
                    }
                }, {
                    name: 'customerDetailsFraudLimits',
                    path: 'fraud-limits',
                    component: () => import('pages/customer-details/AuiCustomerDetailsFraudLimits'),
                    meta: {
                        get label () {
                            return i18n.t('Fraud Limits')
                        },
                        parentPath: 'customerList.customerContext.customerDetails',
                        icon: 'fas fa-mask',
                        v1DetailsPageSectionId: 'collapse_fraud'
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
                    component: () => import('pages/customer-details/AuiCustomerDetailsLocationCreation'),
                    meta: {
                        get label () {
                            return i18n.t('Add Location')
                        },
                        parentPath: 'customerList.customerContext.customerDetails',
                        icon: 'add',
                        hideFromPageMenu: true,
                        goToPathRewrite: ({ route, url }) => {
                            url.pathname = '/customer/' + route.params.id + '/location/create'
                            return url
                        }
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
    }
]
