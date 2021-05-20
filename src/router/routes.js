import {
    PATH_ERROR_403
} from 'src/router/common'
import {
    i18n
} from 'boot/i18n'

function proxyRewriteDetails ({ url, route }) {
    const pathParts = route.path.split('/')
    const lastPathPart = pathParts[pathParts.length - 1]
    const newRouteParts = pathParts.slice(0, pathParts.length - 1)
    url.pathname = newRouteParts.join('/')
    url.searchParams.set('section', lastPathPart)
    return url
}

export const routes = [
    {
        path: '/',
        component: () => import('layouts/MainLayout'),
        children: [
            {
                path: '/dashboard',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'page.dashboard'
                    }
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
                    },
                    {
                        name: 'resellerDetails',
                        path: '/reseller/:id/details',
                        component: () => import('pages/AuiResellerDetails'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Details')
                            },
                            icon: 'article',
                            parentPath: 'resellerList.resellerContext',
                            menu: true,
                            proxyReverseInvisible: true
                        }
                    },
                    {
                        name: 'resellerBaseInformation',
                        path: '/reseller/:id/details/base-information',
                        component: () => import('pages/AuiResellerBaseInformation'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Reseller Base Information')
                            },
                            icon: 'article',
                            parentPath: 'resellerList.resellerContext.resellerDetails',
                            menu: true
                        }
                    },
                    {
                        name: 'resellerContract',
                        path: '/reseller/:id/details/contract',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Reseller Contract')
                            },
                            icon: 'fas fa-handshake',
                            parentPath: 'resellerList.resellerContext.resellerDetails',
                            menu: true,
                            proxyRewrite: proxyRewriteDetails
                        }
                    },
                    {
                        name: 'resellerContact',
                        path: '/reseller/:id/details/contact',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Reseller Contact')
                            },
                            icon: 'fas fa-address-card',
                            parentPath: 'resellerList.resellerContext.resellerDetails',
                            menu: true,
                            proxyRewrite: proxyRewriteDetails
                        }
                    },
                    {
                        name: 'resellerAdmins',
                        path: '/reseller/:id/details/admins',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Administrator Logins')
                            },
                            icon: 'fas fa-user-cog',
                            parentPath: 'resellerList.resellerContext.resellerDetails',
                            menu: true,
                            proxyRewrite: proxyRewriteDetails
                        }
                    },
                    {
                        name: 'resellerDomains',
                        path: '/reseller/:id/details/domains',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Domains')
                            },
                            icon: 'fas fa-network-wired',
                            parentPath: 'resellerList.resellerContext.resellerDetails',
                            menu: true,
                            proxyRewrite: proxyRewriteDetails
                        }
                    },
                    {
                        name: 'resellerBillingProfiles',
                        path: '/reseller/:id/details/billing-profiles',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Billing Profiles')
                            },
                            icon: 'fas fa-hand-holding-usd',
                            parentPath: 'resellerList.resellerContext.resellerDetails',
                            menu: true,
                            proxyRewrite: proxyRewriteDetails
                        }
                    },
                    {
                        name: 'resellerBillingNetworks',
                        path: '/reseller/:id/details/billing-networks',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Billing Networks')
                            },
                            icon: 'fas fa-credit-card',
                            parentPath: 'resellerList.resellerContext.resellerDetails',
                            menu: true,
                            proxyRewrite: proxyRewriteDetails
                        }
                    },
                    {
                        name: 'resellerProfilePackages',
                        path: '/reseller/:id/details/profile-packages',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Profile Packages')
                            },
                            icon: 'fas fa-cubes',
                            parentPath: 'resellerList.resellerContext.resellerDetails',
                            menu: true,
                            proxyRewrite: proxyRewriteDetails
                        }
                    },
                    {
                        name: 'resellerCustomers',
                        path: '/reseller/:id/details/customers',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Customers')
                            },
                            icon: 'fas fa-user-tie',
                            parentPath: 'resellerList.resellerContext.resellerDetails',
                            menu: true,
                            proxyRewrite: proxyRewriteDetails
                        }
                    },
                    {
                        name: 'resellerBranding',
                        path: '/reseller/:id/details/branding',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Branding')
                            },
                            icon: 'fas fa-palette',
                            parentPath: 'resellerList.resellerContext.resellerDetails',
                            menu: true,
                            proxyRewrite: proxyRewriteDetails
                        }
                    },
                    {
                        name: 'resellerInvoiceTemplates',
                        path: '/reseller/:id/details/invoice-templates',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Invoice Templates')
                            },
                            icon: 'fas fa-file-invoice',
                            parentPath: 'resellerList.resellerContext.resellerDetails',
                            menu: true,
                            proxyRewrite: proxyRewriteDetails
                        }
                    },
                    {
                        name: 'resellerPhonebook',
                        path: '/reseller/:id/details/phonebook',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Phonebook')
                            },
                            icon: 'fas fa-address-book',
                            parentPath: 'resellerList.resellerContext.resellerDetails',
                            menu: true,
                            proxyRewrite: proxyRewriteDetails
                        }
                    },
                    {
                        name: 'resellerTimeSets',
                        path: '/reseller/:id/details/time-sets',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.resellers'
                            },
                            get label () {
                                return i18n.t('Time sets')
                            },
                            icon: 'fas fa-clock',
                            parentPath: 'resellerList.resellerContext.resellerDetails',
                            menu: true,
                            proxyRewrite: proxyRewriteDetails
                        }
                    }
                ]
            },
            {
                path: '/reseller/:id/css',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'page.panelBranding'
                    }
                }
            },
            {
                path: '/reseller/:id/css/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'page.panelBranding'
                    }
                }
            },
            {
                path: '/reseller/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.resellers'
                    }
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
                    },
                    {
                        name: 'customerDetails',
                        path: '/customer/:id/details',
                        component: () => import('pages/Proxy'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.customers'
                            },
                            get label () {
                                return i18n.t('Details')
                            },
                            icon: 'article',
                            parentPath: 'customerList.customerContext',
                            menu: true
                        }
                    }
                ]
            },
            {
                path: '/customer/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.customers'
                    }
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
                path: '/contract/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.contracts'
                    }
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
                        name: 'contactEdit',
                        path: '/contact/:id/edit/:resource',
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
                path: '/contact/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.customercontacts'
                    }
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
                path: '/subscriber',
                component: () => import('pages/AuiPageSubscribers'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscribers'
                    }
                }
            },
            {
                path: '/subscriber/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.subscribers'
                    }
                }
            },
            {
                path: '/subscriberprofile',
                component: () => import('pages/AuiPageSubscriberProfileSets'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.subscriberprofiles'
                    }
                }
            },
            {
                path: '/subscriberprofile/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.subscriberprofiles'
                    }
                }
            },
            {
                path: '/calllistsuppression',
                component: () => import('pages/AuiGlobalCallListSuppressions'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.calllistsuppressions'
                    }
                }
            },
            {
                path: '/calllistsuppression/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.calllistsuppressions'
                    }
                }
            },
            {
                path: '/billing',
                component: () => import('pages/AuiBillingProfiles'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.billingprofiles'
                    }
                }
            },
            {
                path: '/billing/create',
                component: () => import('pages/AuiBillingProfilesCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.billingprofiles'
                    }
                }
            },
            {
                path: '/billing/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingprofiles'
                    }
                }
            },
            {
                path: '/network',
                component: () => import('pages/AuiBillingNetworks'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.billingnetworks'
                    }
                }
            },
            {
                path: '/network/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.billingnetworks'
                    }
                }
            },
            {
                path: '/package',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.profilepackages'
                    }
                }
            },
            {
                path: '/package/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.profilepackages'
                    }
                }
            },
            {
                path: '/invoicetemplate',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.invoicetemplates'
                    }
                }
            },
            {
                path: '/invoicetemplate/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.invoicetemplates'
                    }
                }
            },
            {
                path: '/invoice',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.invoices'
                    }
                }
            },
            {
                path: '/invoice/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.invoices'
                    }
                }
            },
            {
                path: '/voucher',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.vouchers'
                    }
                }
            },
            {
                path: '/voucher/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.vouchers'
                    }
                }
            },
            {
                path: '/peering',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.peeringgroups'
                    }
                }
            },
            {
                path: '/peering/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.peeringgroups'
                    }
                }
            },
            {
                path: '/rewrite',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.rewriterulesets'
                    }
                }
            },
            {
                path: '/rewrite/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.rewriterulesets'
                    }
                }
            },
            {
                path: '/header',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.headerrulesets'
                    }
                }
            },
            {
                path: '/header/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.headerrulesets'
                    }
                }
            },
            {
                path: '/ncos',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.ncoslevels'
                    }
                }
            },
            {
                path: '/ncos/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.ncoslevels'
                    }
                }
            },
            {
                path: '/sound',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.soundsets'
                    }
                }
            },
            {
                path: '/sound/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.soundsets'
                    }
                }
            },
            {
                path: '/emailtemplate',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.emailtemplates'
                    }
                }
            },
            {
                path: '/emailtemplate/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.emailtemplates'
                    }
                }
            },
            {
                path: '/device',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.pbxdevices'
                    }
                }
            },
            {
                path: '/device/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.pbxdevices'
                    }
                }
            },
            {
                path: '/security',
                component: () => import('pages/AuiPageSecurityBans'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: ['entity.bannedips', 'entity.bannedusers']
                    }
                }
            },
            {
                path: '/lnp',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: ['entity.lnpcarriers', 'entity.lnpnumbers']
                    }
                }
            },
            {
                path: '/lnp/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: ['entity.lnpcarriers', 'entity.lnpnumbers']
                    }
                }
            },
            {
                path: '/emergencymapping',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.emergencymappingcontainers'
                    }
                }
            },
            {
                path: '/emergencymapping/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.emergencymappingcontainers'
                    }
                }
            },
            {
                path: '/phonebook',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.phonebookentries'
                    }
                }
            },
            {
                path: '/phonebook/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.phonebookentries'
                    }
                }
            },
            {
                path: '/timeset',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.timesets'
                    }
                }
            },
            {
                path: '/timeset/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.timesets'
                    }
                }
            },
            {
                path: '/callflow',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'statistic.sipcallflows'
                    }
                }
            },
            {
                path: '/callflow/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'statistic.sipcallflows'
                    }
                }
            },
            {
                path: '/callroutingverify',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'tool.callroutingverify'
                    }
                }
            },
            {
                path: '/callroutingverify/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.callroutingverify'
                    }
                }
            },
            {
                path: '/peeringoverview',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'tool.peeringoverview'
                    }
                }
            },
            {
                path: '/peeringoverview/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.peeringoverview'
                    }
                }
            },
            {
                path: '/batchprovisioning',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'tool.batchprovisioning'
                    }
                }
            },
            {
                path: '/batchprovisioning/*',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.batchprovisioning'
                    }
                }
            }
        ]
    },
    {
        path: '/login/admin',
        component: () => import('layouts/Login'),
        children: [
            {
                path: '',
                component: () => import('pages/Login')
            }
        ]
    },
    {
        path: PATH_ERROR_403,
        component: () => import('layouts/Login'),
        children: [
            {
                path: '',
                component: () => import('pages/AuiPageError403')
            }
        ]
    }
]

if (process.env.MODE !== 'ssr') {
    routes.push({
        path: '*',
        component: () => import('layouts/Login'),
        children: [
            {
                path: '',
                component: () => import('pages/AuiPageError404')
            }
        ]
    })
}

export default routes
