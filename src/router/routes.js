import {
    PATH_ERROR_403
} from 'src/router/common'

const routes = [
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
                path: '/administrator',
                component: () => import('pages/AuiPageAdministrators'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.admins'
                    }
                }
            },
            {
                path: '/administrator/create',
                component: () => import('pages/AuiPageAdminCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.admins'
                    }
                }
            },
            {
                path: '/administrator/:id/edit',
                component: () => import('pages/AuiPageAdminUpdate'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'page.administrator.edit'
                    }
                }
            },
            {
                path: '/reseller',
                component: () => import('pages/AuiPageResellers'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.resellers'
                    }
                }
            },
            {
                path: '/reseller/create',
                component: () => import('pages/AuiPageResellerCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.resellers'
                    }
                }
            },
            {
                path: '/reseller/:id/preferences',
                component: () => import('pages/AuiPageResellerPreferences'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'page.reseller.preferences'
                    }
                }
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
                path: '/reseller/:id/edit',
                component: () => import('pages/AuiPageResellerUpdate'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.resellers'
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
                component: () => import('pages/AuiPageCustomers'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.customers'
                    }
                }
            },
            {
                path: '/customer/create',
                component: () => import('pages/AuiPageCustomerCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.customers'
                    }
                }
            },
            {
                path: '/customer/:id/edit',
                component: () => import('pages/AuiPageCustomerUpdate'),
                meta: {
                    permission: ['admin', 'reseller', 'ccare']
                }
            },
            {
                path: '/customer/:id',
                component: () => import('pages/AuiCustomerContext'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.customers'
                    }
                },
                children: [
                    {
                        name: 'customerDetails1',
                        path: '/customer/:id/details1',
                        component: () => import('pages/AuiCustomerDetails1'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.customers'
                            }
                        }
                    },
                    {
                        name: 'customerDetails2',
                        path: '/customer/:id/details2',
                        component: () => import('pages/AuiCustomerDetails2'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.customers'
                            }
                        }
                    }
                ]
            },
            {
                name: 'customerPreferences',
                path: '/customer/:id/preferences',
                component: () => import('pages/AuiPageCustomerPreferences'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'page.customer.preferences'
                    }
                }
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
                path: '/contract',
                component: () => import('pages/AuiPageContracts'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.contracts'
                    }
                }
            },
            {
                path: 'contract/peering/create',
                component: () => import('pages/AuiPageContractCreation'),
                props: {
                    type: 'sippeering'
                },
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.contracts'
                    }
                }
            },
            {
                path: '/contract/reseller/create',
                component: () => import('pages/AuiPageContractCreation'),
                props: {
                    type: 'reseller'
                },
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.contracts'
                    }
                }
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
                path: '/contact',
                component: () => import('pages/AuiPageContacts'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.customercontacts'
                    }
                }
            },
            {
                path: '/contact/create',
                component: () => import('pages/AuiPageContactCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.customercontacts'
                    }
                }
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
                path: '/domain',
                component: () => import('pages/AuiPageDomains'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.domains'
                    }
                }
            },
            {
                path: '/domain/create',
                component: () => import('pages/AuiPageDomainCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.domains'
                    }
                }
            },
            {
                path: '/domain/:id/preferences',
                component: () => import('pages/AuiPagePreferencesDomain'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'page.domain.preferences'
                    }
                }
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
