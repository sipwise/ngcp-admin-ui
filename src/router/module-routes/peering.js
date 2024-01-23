import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'peeringGroupList',
        path: '/peering',
        component: () => import('pages/peering-groups/AuiPeeringGroupList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.peeringgroups'
            },
            get label () {
                return i18n.global.tc('SIP Peering Groups')
            },
            icon: 'fas fa-exchange-alt',
            root: true
        }
    },
    createAdvancedJournalRoute({
        name: 'peeringGroupJournalAdvanced',
        path: '/peering/journal',
        resource: 'peeringgroups',
        parentPath: 'peeringGroupList'
    }),
    {
        name: 'peeringGroupCreation',
        path: '/peering/create',
        component: () => import('pages/peering-groups/AuiPeeringGroupCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.peeringgroups'
            },
            get label () {
                return i18n.global.tc('Add Peering Group')
            },
            icon: 'add',
            parentPath: 'peeringGroupList'
        }
    },
    {
        name: 'peeringGroupContext',
        path: '/peering/:id',
        redirect: (to) => {
            return { name: 'peeringGroupEdit', params: to.params }
        },
        component: () => import('pages/peering-groups/AuiPeeringGroupContext'),
        props: true,
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.peeringgroups'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return '#' + resourceObject.id + ' - ' + resourceObject.name
            },
            parentPath: 'peeringGroupList'
        },
        children: [
            {
                name: 'peeringGroupEdit',
                path: 'edit',
                component: () => import('pages/peering-groups/AuiPeeringGroupEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.peeringgroups'
                    },
                    get label () {
                        return i18n.global.tc('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'peeringGroupList.peeringGroupContext',
                    menu: true
                }
            },
            {
                name: 'peeringGroupDetailsOldUIRedirect',
                path: 'servers',
                redirect: { name: 'peeringGroupDetails' }
            },
            {
                name: 'peeringGroupDetails',
                path: 'details',
                component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsPage'),
                props: {
                    detailsPageRouteName: 'peeringGroupDetails',
                    redirectToSubpageRoute: { name: 'peeringGroupDetailsServers' }
                },
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.peeringgroups'
                    },
                    get label () {
                        return i18n.global.tc('Details')
                    },
                    icon: 'article',
                    parentPath: 'peeringGroupList.peeringGroupContext',
                    menu: true,
                    goToPathRewrite: ({ route, url }) => {
                        url.pathname = '/peering/' + route.params.id + '/servers'
                        return url
                    }
                },
                children: [
                    {
                        name: 'peeringGroupDetailsServers',
                        path: 'server',
                        component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsServers'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Peering Servers')
                            },
                            parentPath: 'peeringGroupList.peeringGroupContext.peeringGroupDetails',
                            icon: 'fas fa-project-diagram',
                            v1DetailsPageSectionId: 'collapse_servers',
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/peering/' + route.params.id + '/servers'
                                return url
                            }
                        }
                    },
                    {
                        name: 'peeringGroupDetailsServerCreation',
                        path: 'server/create',
                        component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsServerCreation'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'peeringGroupList.peeringGroupContext.peeringGroupDetails.peeringGroupDetailsServers',
                            icon: 'add',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/peering/' + route.params.id + '/servers/create'
                                return url
                            }
                        }
                    },
                    {
                        name: 'peeringGroupDetailsServerContext',
                        path: 'server/:serverId',
                        redirect: (to) => {
                            return { name: 'peeringGroupServerEdit', params: to.params }
                        },
                        component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsServerContext'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.peeringservers'
                            },
                            parentPath: 'peeringGroupList.peeringGroupContext.peeringGroupDetails.peeringGroupDetailsServers',
                            contextRoot: true,
                            contextLabel: ({ resourceObject }) => {
                                return '#' + resourceObject.id + ' - ' + resourceObject.name
                            }
                        },
                        children: [
                            {
                                name: 'peeringGroupServerEdit',
                                path: 'edit',
                                component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsServerEdit'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.peeringservers'
                                    },
                                    get label () {
                                        return i18n.global.tc('Edit')
                                    },
                                    icon: 'edit',
                                    parentPath: 'peeringGroupList.peeringGroupContext.peeringGroupDetails.peeringGroupDetailsServers.peeringGroupDetailsServerContext',
                                    hideFromPageMenu: true,
                                    menu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/peering/' + route.params.id + '/servers/' + route.params.serverId + '/edit/'
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'peeringGroupServerPreferences',
                                path: 'preferences',
                                component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsServerPreferences'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'page.peeringservers.preferences'
                                    },
                                    get label () {
                                        return i18n.global.tc('Preferences')
                                    },
                                    icon: 'settings_applications',
                                    parentPath: 'peeringGroupList.peeringGroupContext.peeringGroupDetails.peeringGroupDetailsServers.peeringGroupDetailsServerContext',
                                    hideFromPageMenu: true,
                                    menu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/peering/' + route.params.id + '/servers/' + route.params.serverId + '/preferences'
                                        return url
                                    }
                                }
                            }
                        ]
                    },
                    {
                        name: 'peeringGroupDetailsOutbound',
                        path: 'outboundrules',
                        component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsOutboundRule'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Outbound Rules')
                            },
                            parentPath: 'peeringGroupList.peeringGroupContext.peeringGroupDetails',
                            icon: 'fas fa-sign-out-alt',
                            v1DetailsPageSectionId: 'collapse_outboundrules'
                        }
                    },
                    {
                        name: 'peeringGroupDetailsOutboundRuleCreation',
                        path: 'outboundrules/create',
                        component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsOutboundRuleCreation'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'peeringGroupList.peeringGroupContext.peeringGroupDetails.peeringGroupDetailsOutbound',
                            icon: 'add',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/peering/' + route.params.id + '/rules/create/'
                                return url
                            }
                        }
                    },
                    {
                        name: 'peeringGroupDetailsOutboundRuleContext',
                        path: 'outboundrules/:outboundrulesId',
                        redirect: (to) => {
                            return { name: 'peeringGroupDetailsOutboundRuleEdit', params: to.params }
                        },
                        component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsOutboundRuleContext'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.peeringrules'
                            },
                            parentPath: 'peeringGroupList.peeringGroupContext.peeringGroupDetails.peeringGroupDetailsOutbound',
                            contextRoot: true,
                            contextLabel: ({ resourceObject }) => {
                                return '#' + resourceObject.id + ' - ' + resourceObject.callee_pattern
                            }
                        },
                        children: [
                            {
                                name: 'peeringGroupDetailsOutboundRuleEdit',
                                path: 'edit',
                                component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsOutboundRuleEdit'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.peeringrules'
                                    },
                                    get label () {
                                        return i18n.global.tc('Edit')
                                    },
                                    icon: 'edit',
                                    parentPath: 'peeringGroupList.peeringGroupContext.peeringGroupDetails.peeringGroupDetailsOutbound.peeringGroupDetailsOutboundRuleContext',
                                    hideFromPageMenu: true,
                                    menu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/peering/' + route.params.id + '/rules/' + route.params.outboundrulesId + '/edit/'
                                        return url
                                    }
                                }
                            }
                        ]
                    },
                    {
                        name: 'peeringGroupDetailsInbound',
                        path: 'inboundrules',
                        component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsInboundRule'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Inbound Rules')
                            },
                            parentPath: 'peeringGroupList.peeringGroupContext.peeringGroupDetails',
                            icon: 'fas fa-sign-in-alt',
                            v1DetailsPageSectionId: 'collapse_inbound'
                        }
                    },
                    {
                        name: 'peeringGroupDetailsInboundRuleCreation',
                        path: 'inboundrules/create',
                        component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsInboundRuleCreation'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'peeringGroupList.peeringGroupContext.peeringGroupDetails.peeringGroupDetailsInbound',
                            icon: 'add',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/peering/' + route.params.id + '/inboundrules/create/'
                                return url
                            }
                        }
                    },
                    {
                        name: 'peeringGroupDetailsInboundRuleContext',
                        path: 'inboundrules/:inboundrulesId',
                        redirect: (to) => {
                            return { name: 'peeringGroupDetailsInboundRuleEdit', params: to.params }
                        },
                        component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsInboundRuleContext'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.peeringinboundrules'
                            },
                            parentPath: 'peeringGroupList.peeringGroupContext.peeringGroupDetails.peeringGroupDetailsInbound',
                            contextRoot: true,
                            contextLabel: ({ resourceObject }) => {
                                return '#' + resourceObject.id + ' - ' + resourceObject.pattern
                            }
                        },
                        children: [
                            {
                                name: 'peeringGroupDetailsInboundRuleEdit',
                                path: 'edit',
                                component: () => import('pages/peering-groups-details/AuiPeeringGroupDetailsInboundRuleEdit'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.peeringinboundrules'
                                    },
                                    get label () {
                                        return i18n.global.tc('Edit')
                                    },
                                    icon: 'edit',
                                    parentPath: 'peeringGroupList.peeringGroupContext.peeringGroupDetails.peeringGroupDetailsInbound.peeringGroupDetailsInboundRuleContext',
                                    hideFromPageMenu: true,
                                    menu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/peering/' + route.params.id + '/inboundrules/' + route.params.inboundrulesId + '/edit/'
                                        return url
                                    }
                                }
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name: 'peeringGroupCatchAll',
        path: '/peering/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.peeringgroups'
            },
            proxy: true
        }
    }
]
