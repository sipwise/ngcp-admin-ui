import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute, createJournalRoute, detailsPagePathRewrite } from 'src/router/common'
import { LICENSES, PLATFORM_CARRIER, PLATFORM_PRO } from 'src/constants'

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
                return i18n.global.tc('Customers')
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
                return i18n.global.tc('Add Customer')
            },
            icon: 'add',
            parentPath: 'customerList'
        }
    },
    {
        name: 'customerContext',
        path: '/customer/:id',
        redirect: (to) => {
            return { name: 'customerEdit', params: to.params }
        },
        component: () => import('pages/customers/AuiCustomerContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.customers'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return '#' + resourceObject.id + ' - ' + resourceObject?.contact_id_expand.email
            },
            parentPath: 'customerList'
        },
        children: [
            {
                name: 'customerEdit',
                path: 'edit',
                component: () => import('pages/customers/AuiCustomerEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.customers'
                    },
                    get label () {
                        return i18n.global.tc('Edit')
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
                name: 'customerDetails',
                path: 'details',
                component: () => import('pages/customer-details/AuiCustomerDetailsPage'),
                props: {
                    detailsPageRouteName: 'customerDetails',
                    redirectToSubpageRoute: { name: 'customerDetailsContact' }
                },
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.customers'
                    },
                    get label () {
                        return i18n.global.tc('Details')
                    },
                    icon: 'article',
                    parentPath: 'customerList.customerContext',
                    menu: true,
                    goToPathRewrite: detailsPagePathRewrite
                },
                children: [
                    {
                        name: 'customerDetailsReseller',
                        path: 'reseller',
                        component: () => import('pages/customer-details/AuiCustomerDetailsReseller'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.global.tc('Reseller')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'fas fa-users',
                            licenses: [LICENSES.reseller],
                            v1DetailsPageSectionId: 'collapse_reseller'
                        }
                    },
                    {
                        name: 'customerDetailsContact',
                        path: 'contact',
                        component: () => import('pages/customer-details/AuiCustomerDetailsContact'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Contact Details')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'fas fa-address-card',
                            v1DetailsPageSectionId: 'collapse_contact'
                        }
                    },
                    {
                        name: 'customerDetailsBillingProfileSchedule',
                        path: 'billing-profile-schedule',
                        component: () => import('pages/customer-details/AuiCustomerDetailsBillingProfileSchedule'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Billing Profile Schedule')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'fa fa-calendar-alt',
                            licenses: [LICENSES.billing],
                            v1DetailsPageSectionId: 'collapse_bilprofs'
                        }
                    },
                    {
                        name: 'customerDetailsSpeedDial',
                        path: 'speed-dial',
                        component: () => import('pages/customer-details/AuiCustomerDetailsSpeedDial'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.customerspeeddials'
                            },
                            get label () {
                                return i18n.global.tc('Speed Dial')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'touch_app'
                        }
                    },
                    {
                        name: 'customerDetailsSpeedDialEdit',
                        path: 'speed-dial/edit',
                        component: () => import('pages/customer-details/AuiCustomerDetailsSpeedDialEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.customerspeeddials'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'customerList.customerContext.customerDetails.customerDetailsSpeedDial',
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'customerDetailsSubscribers',
                        path: 'subscribers',
                        component: () => import('pages/customer-details/AuiCustomerDetailsSubscribers'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.global.tc('Subscribers')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'fas fa-user',
                            v1DetailsPageSectionId: 'collapse_subs'
                        }
                    },
                    {
                        name: 'customerSubscriberCreate',
                        path: 'subscribers/create',
                        component: () => import('pages/customer-details/AuiCustomerDetailsSubscriberCreation'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'customerList.customerContext.customerDetails.customerDetailsSubscribers',
                            icon: 'add',
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'customerSubscriberEdit',
                        path: 'subscribers/:subscriberId/edit',
                        component: () => import('pages/customer-details/AuiCustomerDetailsSubscriberEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            parentPath: 'customerList.customerContext.customerDetails.customerDetailsSubscribers',
                            icon: 'edit',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/subscriber/' + route.params.subscriberId + '/details/edit'
                                return url
                            }
                        }
                    },
                    {
                        name: 'customerDetailsPbxGroups',
                        path: 'pbx-groups',
                        component: () => import('pages/customer-details/AuiCustomerDetailsPbxGroups'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.global.tc('PBX Groups')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'group',
                            licenses: [LICENSES.pbx],
                            customerType: 'pbxaccount',
                            proxyRewrite: detailsPagePathRewrite,
                            capability: 'cloudpbx'
                        }
                    },
                    {
                        name: 'customerDetailsPbxGroupCreation',
                        path: 'pbx-groups/create',
                        component: () => import('pages/customer-details/AuiCustomerDetailsPbxGroupsCreation'),
                        meta: {
                            $p: {
                                operation: 'create',
                                resource: 'entity.subscribers'
                            },
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'customerList.customerContext.customerDetails.customerDetailsPbxGroups',
                            icon: 'add',
                            capability: 'cloudpbx',
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/customer/' + route.params.id + '/pbx/group/create'
                                return url
                            }
                        }
                    },
                    {
                        name: 'customerDetailsPbxGroupContext',
                        path: 'pbx-groups/:pbxGroup',
                        redirect: (to) => {
                            return { name: 'customerDetailsPbxGroupEdit', params: to.params }
                        },
                        component: () => import('pages/customer-details/AuiCustomerDetailsPbxGroupsContext'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.subscribers'
                            },
                            parentPath: 'customerList.customerContext.customerDetails.customerDetailsPbxGroups',
                            contextRoot: true,
                            contextLabel: ({ resourceObject }) => {
                                return '#' + resourceObject.id + ' - ' + resourceObject.display_name
                            }
                        },
                        children: [
                            {
                                name: 'customerDetailsPbxGroupEdit',
                                path: 'edit',
                                redirect: (to) => {
                                    return '/subscriber/' + to.params.pbxGroup + '/details/edit'
                                },
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.subscribers'
                                    },
                                    get label () {
                                        return i18n.global.tc('Edit')
                                    },
                                    icon: 'edit',
                                    parentPath: 'customerList.customerContext.customerDetails.customerDetailsPbxGroups.customerDetailsPbxGroupContext',
                                    hideFromPageMenu: true,
                                    menu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/customer/' + route.params.id + '/pbx/group/' + route.params.pbxGroup + '/edit'
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'customerDetailsPbxGroupDetails',
                                path: 'details',
                                redirect: (to) => {
                                    return '/subscriber/' + to.params.pbxGroup + '/details/master-data'
                                },
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.subscribers'
                                    },
                                    get label () {
                                        return i18n.global.tc('Details')
                                    },
                                    icon: 'article',
                                    parentPath: 'customerList.customerContext.customerDetails.customerDetailsPbxGroups.customerDetailsPbxGroupContext',
                                    hideFromPageMenu: true,
                                    menu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/subscriber/' + route.params.pbxGroup + '/details'
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'customerDetailsPbxGroupPreferences',
                                path: 'preferences',
                                redirect: (to) => {
                                    return '/subscriber/' + to.params.pbxGroup + '/preferences'
                                },
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.subscribers'
                                    },
                                    get label () {
                                        return i18n.global.tc('Preferences')
                                    },
                                    icon: 'settings_applications',
                                    parentPath: 'customerList.customerContext.customerDetails.customerDetailsPbxGroups.customerDetailsPbxGroupContext',
                                    menu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/subscriber/' + route.params.pbxGroup + '/preferences'
                                        return url
                                    }
                                }
                            }
                        ]
                    },
                    {
                        name: 'customerDetailsPBXDevices',
                        path: 'pbx-devices',
                        component: () => import('pages/AuiCustomerDetailsPbxDevices'),
                        meta: {
                            get label () {
                                return i18n.global.tc('PBX Devices')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'devices',
                            customerType: 'pbxaccount',
                            v1DetailsPageSectionId: 'collapse_pbxdevs',
                            proxy: true,
                            licenses: [LICENSES.device_provisioning, LICENSES.pbx],
                            proxyRewrite: detailsPagePathRewrite,
                            capability: 'cloudpbx'
                        }
                    },
                    {
                        name: 'customerDetailsSoundSets',
                        path: 'sound-sets',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Sound Sets')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'fas fa-music',
                            customerType: 'pbxaccount',
                            v1DetailsPageSectionId: 'collapse_soundsets',
                            proxy: true,
                            proxyRewrite: detailsPagePathRewrite,
                            capability: 'cloudpbx'
                        }
                    },
                    {
                        name: 'customerDetailsContractBalance',
                        path: 'contract-balance',
                        component: () => import('pages/AuiDetailsPageProxy'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Contract Balance')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'fa fa-hand-holding-usd',
                            licenses: [LICENSES.billing],
                            v1DetailsPageSectionId: 'collapse_balance',
                            proxy: true,
                            proxyRewrite: detailsPagePathRewrite
                        }
                    },
                    {
                        name: 'customerDetailsBalanceIntervals',
                        path: 'balance-intervals',
                        component: () => import('pages/customer-details/AuiCustomerDetailsBalanceIntervals'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.balanceintervals'
                            },
                            get label () {
                                return i18n.global.tc('Balance Intervals')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'fa fa-money-check-alt',
                            licenses: [LICENSES.billing],
                            v1DetailsPageSectionId: 'collapse_balanceintervals'
                        }
                    },
                    {
                        name: 'customerDetailsTopUpLog',
                        path: 'top-up-log',
                        component: () => import('pages/customer-details/AuiCustomerDetailsTopUpLogs'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.topuplogs'
                            },
                            get label () {
                                return i18n.global.tc('Top-up Log')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'fa fa-file-contract',
                            licenses: [LICENSES.billing],
                            v1DetailsPageSectionId: 'collapse_topuplog'
                        }
                    },
                    {
                        name: 'customerDetailsFraudLimits',
                        path: 'fraud-limits',
                        component: () => import('pages/customer-details/AuiCustomerDetailsFraudLimits'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.customerfraudpreferences'
                            },
                            get label () {
                                return i18n.global.tc('Fraud Limits')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'fas fa-mask',
                            licenses: [LICENSES.billing],
                            v1DetailsPageSectionId: 'collapse_fraud'
                        }
                    },
                    {
                        name: 'customerDetailsInvoices',
                        path: 'invoices',
                        component: () => import('pages/customer-details/AuiCustomerDetailsInvoices'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.invoices'
                            },
                            get label () {
                                return i18n.global.tc('Invoices')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'fas fa-file-invoice-dollar',
                            licenses: [LICENSES.invoice],
                            v1DetailsPageSectionId: 'collapse_invoices'
                        }
                    },
                    {
                        name: 'customerDetailsLocations',
                        path: 'location',
                        component: () => import('pages/customer-details/AuiCustomerDetailsLocations'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Locations')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'fas fa-map-marker-alt',
                            v1DetailsPageSectionId: 'collapse_locations'
                        }
                    },
                    {
                        name: 'customerDetailsLocationCreation',
                        path: 'location/create',
                        component: () => import('pages/customer-details/AuiCustomerDetailsLocationCreation'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'customerList.customerContext.customerDetails.customerDetailsLocations',
                            icon: 'add',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/customer/' + route.params.id + '/location/create'
                                return url
                            }
                        }
                    },
                    {
                        name: 'customerDetailsLocationContext',
                        path: 'location/:locationId',
                        redirect: (to) => {
                            return { name: 'customerLocationEdit', params: to.params }
                        },
                        component: () => import('pages/customer-details/AuiCustomerDetailsLocationContext'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.customerlocations'
                            },
                            parentPath: 'customerList.customerContext.customerDetails.customerDetailsLocations',
                            contextRoot: true,
                            contextLabel: ({ resourceObject }) => {
                                return '#' + resourceObject.id + ' - ' + resourceObject.name
                            }
                        },
                        children: [
                            {
                                name: 'customerLocationEdit',
                                path: 'edit',
                                component: () => import('pages/customer-details/AuiCustomerDetailsLocationEdit'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.customerlocations'
                                    },
                                    get label () {
                                        return i18n.global.tc('Edit')
                                    },
                                    icon: 'edit',
                                    parentPath: 'customerList.customerContext.customerDetails.customerDetailsLocations.customerDetailsLocationContext',
                                    hideFromPageMenu: true,
                                    menu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/customer/' + route.params.id + '/location/' + route.params.locationId + '/edit'
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'customerLocationPreferences',
                                path: 'preferences',
                                component: () => import('pages/AuiDetailsPageProxy'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.customerlocations'
                                    },
                                    get label () {
                                        return i18n.global.tc('Preferences')
                                    },
                                    icon: 'settings_applications',
                                    parentPath: 'customerList.customerContext.customerDetails.customerDetailsLocations.customerDetailsLocationContext',
                                    hideFromPageMenu: true,
                                    menu: true,
                                    proxy: true,
                                    proxyRewrite: ({ route, url }) => {
                                        url.pathname = '/customer/' + route.params.id + '/location/' + route.params.locationId + '/preferences'
                                        return url
                                    }
                                }
                            }
                        ]
                    },
                    {
                        name: 'customerDetailsPhonebook',
                        path: 'phonebook',
                        component: () => import('pages/customer-details/AuiCustomerDetailsPhonebook'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.customerphonebookentries'
                            },
                            get label () {
                                return i18n.global.tc('Phonebook')
                            },
                            parentPath: 'customerList.customerContext.customerDetails',
                            icon: 'fas fa-address-book',
                            licenses: [LICENSES.phonebook],
                            v1DetailsPageSectionId: 'collapse_phonebook',
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'customerDetailsPhonebookEntryCreation',
                        path: 'phonebook/create',
                        component: () => import('pages/customer-details/AuiCustomerDetailsPhonebookCreation'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'customerList.customerContext.customerDetails.customerDetailsPhonebook',
                            icon: 'add',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/customer/' + route.params.id + '/phonebook/create'
                                return url
                            },
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        }
                    },
                    {
                        name: 'customerDetailsPhonebookEntryUploadCSV',
                        path: '/customer/:id/phonebook_upload_csv',
                        component: () => import('pages/AuiDetailsPhonebookUpload'),
                        props: {
                            path: 'customerphonebookentries'
                        },
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.customerphonebookentries'
                            },
                            get label () {
                                return i18n.global.tc('Upload CSV')
                            },
                            parentPath: 'customerList.customerContext.customerDetails.customerDetailsPhonebook',
                            icon: 'fas fa-upload',
                            licenses: [LICENSES.phonebook],
                            hideFromPageMenu: true
                        }
                    },
                    {
                        name: 'customerDetailsPhonebookContext',
                        path: 'phonebook/:phonebookId',
                        redirect: (to) => {
                            return { name: 'customerDetailsPhonebookEntryEdit', params: to.params }
                        },
                        component: () => import('pages/customer-details/AuiCustomerDetailsPhonebookContext'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.customerphonebookentries'
                            },
                            parentPath: 'customerList.customerContext.customerDetails.customerDetailsPhonebook',
                            contextRoot: true,
                            contextLabel: ({ resourceObject }) => {
                                return '#' + resourceObject.id + ' - ' + resourceObject.name
                            },
                            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                        },
                        children: [
                            {
                                name: 'customerDetailsPhonebookEntryEdit',
                                path: 'edit',
                                component: () => import('pages/customer-details/AuiCustomerDetailsPhonebookEdit'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.customerphonebookentries'
                                    },
                                    get label () {
                                        return i18n.global.tc('Edit')
                                    },
                                    parentPath: 'customerList.customerContext.customerDetails.customerDetailsPhonebook.customerDetailsPhonebookContext',
                                    icon: 'edit',
                                    licenses: [LICENSES.phonebook],
                                    hideFromPageMenu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/customer/' + route.params.id + '/details/phonebook/' + route.params.phonebookId + '/edit'
                                        return url
                                    },
                                    platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
                                }
                            }
                        ]
                    }
                ]
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
                        return i18n.global.tc('Preferences')
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
        path: '/customer/:pathMatch(.*)',
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
