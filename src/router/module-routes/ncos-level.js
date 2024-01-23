import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'ncosLevelList',
        path: '/ncos',
        component: () => import('pages/ncos-levels/AuiNCOSLevelsList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.ncoslevels'
            },
            get label () {
                return i18n.global.tc('NCOS Levels')
            },
            icon: 'fas fa-layer-group',
            root: true,
            journalRouteName: 'ncosLevelJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'ncosLevelJournalAdvanced',
        path: '/ncos/journal',
        resource: 'ncoslevels',
        parentPath: 'ncosLevelList'
    }),
    {
        name: 'ncosLevelCreate',
        path: '/ncos/create',
        component: () => import('pages/ncos-levels/AuiNCOSLevelsCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.ncoslevels'
            },
            get label () {
                return i18n.global.tc('Add NCOS Level')
            },
            icon: 'add',
            parentPath: 'ncosLevelList'
        }
    },
    {
        name: 'ncosLevelsContext',
        path: '/ncos/:id',
        redirect: (to) => {
            return { name: 'ncosLevelEdit', params: to.params }
        },
        component: () => import('pages/ncos-levels/AuiNCOSLevelsContext'),
        props: true,
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.ncoslevels'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return '#' + resourceObject.id + ' - ' + resourceObject.level
            },
            parentPath: 'ncosLevelList'
        },
        children: [
            {
                name: 'ncosLevelEdit',
                path: 'edit',
                component: () => import('pages/ncos-levels/AuiNCOSLevelsEdit'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.ncoslevels'
                    },
                    get label () {
                        return i18n.global.tc('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'ncosLevelList.ncosLevelsContext',
                    menu: true
                }
            },
            {
                name: 'ncosLevelDetailsOldUIRedirect',
                path: 'pattern',
                redirect: { name: 'ncosLevelDetails' }
            },
            {
                name: 'ncosLevelDetails',
                path: 'details',
                component: () => import('pages/ncos-levels-details/AuiNCOSLevelsDetailsPage'),
                props: {
                    detailsPageRouteName: 'ncosLevelDetails',
                    redirectToSubpageRoute: { name: 'ncosLevelsDetailsNumberPattern' }
                },
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.ncoslevels'
                    },
                    get label () {
                        return i18n.global.tc('Details')
                    },
                    icon: 'article',
                    parentPath: 'ncosLevelList.ncosLevelsContext',
                    menu: true
                },
                children: [
                    {
                        name: 'ncosLevelsDetailsLnpCarrier',
                        path: 'lnp',
                        component: () => import('pages/ncos-levels-details/AuiNCOSLevelsDetailsLnpCarrier'),
                        meta: {
                            get label () {
                                return i18n.global.tc('NCOS LNP Carriers')
                            },
                            parentPath: 'ncosLevelList.ncosLevelsContext.ncosLevelDetails',
                            icon: 'fas fa-tasks',
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/ncos/' + route.params.id + '/pattern'
                                return url
                            }
                        }
                    },
                    {
                        name: 'ncosLevelsDetailsLnpCarrierCreation',
                        path: 'lnp/create',
                        component: () => import('pages/ncos-levels-details/AuiNCOSLevelsDetailsLnpCarrierCreation'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'ncosLevelList.ncosLevelsContext.ncosLevelDetails.ncosLevelsDetailsLnpCarrier',
                            icon: 'add',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/ncos/' + route.params.id + '/pattern/lnp/create'
                                return url
                            }
                        }
                    },
                    {
                        name: 'ncosLevelsDetailsLnpCarrierContext',
                        path: 'lnp/:lnpCarrierId',
                        redirect: (to) => {
                            return { name: 'ncosLevelsDetailsLnpCarrierEdit', params: to.params }
                        },
                        component: () => import('pages/ncos-levels-details/AuiNCOSLevelsDetailsLnpCarrierContext'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.ncoslnpcarriers'
                            },
                            parentPath: 'ncosLevelList.ncosLevelsContext.ncosLevelDetails.ncosLevelsDetailsLnpCarrier',
                            contextRoot: true,
                            contextLabel: ({ resourceObject }) => {
                                return '#' + resourceObject.id
                            }
                        },
                        children: [
                            {
                                name: 'ncosLevelsDetailsLnpCarrierEdit',
                                path: 'edit',
                                component: () => import('pages/ncos-levels-details/AuiNCOSLevelsDetailsLnpCarrierEdit'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.ncoslnpcarriers'
                                    },
                                    get label () {
                                        return i18n.global.tc('Edit')
                                    },
                                    icon: 'edit',
                                    parentPath: 'ncosLevelList.ncosLevelsContext.ncosLevelDetails.ncosLevelsDetailsLnpCarrier.ncosLevelsDetailsLnpCarrierContext',
                                    hideFromPageMenu: true,
                                    menu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/ncos/' + route.params.id + '/pattern/lnp/' + route.params.lnpCarrierId + '/edit'
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'ncosLevelsDetailsLnpCarrierPattern',
                                path: 'patterns',
                                component: () => import('pages/ncos-levels-details/AuiNCOSLevelsDetailsLnpCarrierPattern'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.ncoslnpcarriers'
                                    },
                                    get label () {
                                        return i18n.global.tc('Patterns')
                                    },
                                    parentPath: 'ncosLevelList.ncosLevelsContext.ncosLevelDetails.ncosLevelsDetailsLnpCarrier.ncosLevelsDetailsLnpCarrierContext',
                                    icon: 'fas fa-tasks',
                                    hideFromPageMenu: true,
                                    menu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/ncos/' + route.params.id + '/pattern/lnp/' + route.params.lnpCarrierId + '/lnp_patterns'
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'ncosLevelsDetailsLnpCarrierPatternCreation',
                                path: 'patterns/create',
                                component: () => import('pages/ncos-levels-details/AuiNCOSLevelsDetailsLnpCarrierPatternCreation'),
                                meta: {
                                    get label () {
                                        return i18n.global.tc('Add')
                                    },
                                    parentPath: 'ncosLevelList.ncosLevelsContext.ncosLevelDetails.ncosLevelsDetailsLnpCarrier.ncosLevelsDetailsLnpCarrierContext.ncosLevelsDetailsLnpCarrierPattern',
                                    icon: 'add',
                                    hideFromPageMenu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/ncos/' + route.params.id + '/pattern/lnp/' + route.params.lnpCarrierId + '/lnp_patterns/create'
                                        return url
                                    }
                                }
                            },
                            {
                                name: 'ncosLevelsDetailsLnpCarrierPatternContext',
                                path: 'patterns/:lnpCarrierPatternId',
                                redirect: (to) => {
                                    return { name: 'ncosLevelsDetailsLnpCarrierPatternEdit', params: to.params }
                                },
                                component: () => import('pages/ncos-levels-details/AuiNCOSLevelsDetailsLnpCarrierPatternContext'),
                                meta: {
                                    $p: {
                                        operation: 'read',
                                        resource: 'entity.ncoslnppatterns'
                                    },
                                    parentPath: 'ncosLevelList.ncosLevelsContext.ncosLevelDetails.ncosLevelsDetailsLnpCarrier.ncosLevelsDetailsLnpCarrierContext.ncosLevelsDetailsLnpCarrierPattern',
                                    contextRoot: true,
                                    contextLabel: ({ resourceObject }) => {
                                        return '#' + resourceObject.id
                                    }
                                },
                                children: [
                                    {
                                        name: 'ncosLevelsDetailsLnpCarrierPatternEdit',
                                        path: 'edit',
                                        component: () => import('pages/ncos-levels-details/AuiNCOSLevelsDetailsLnpCarrierPatternEdit'),
                                        meta: {
                                            $p: {
                                                operation: 'update',
                                                resource: 'entity.ncoslnppatterns'
                                            },
                                            get label () {
                                                return i18n.global.tc('Edit')
                                            },
                                            icon: 'edit',
                                            parentPath: 'ncosLevelList.ncosLevelsContext.ncosLevelDetails.ncosLevelsDetailsLnpCarrier.ncosLevelsDetailsLnpCarrierContext.ncosLevelsDetailsLnpCarrierPattern.ncosLevelsDetailsLnpCarrierPatternContext',
                                            hideFromPageMenu: true,
                                            menu: true,
                                            goToPathRewrite: ({ route, url }) => {
                                                url.pathname = '/ncos/' + route.params.id + '/pattern/lnp/' + route.params.lnpCarrierId + '/lnp_patterns/' + route.params.lnpCarrierPatternId + '/edit'
                                                return url
                                            }
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        name: 'ncosLevelsDetailsNumberPattern',
                        path: 'pattern',
                        component: () => import('pages/ncos-levels-details/AuiNCOSLevelsDetailsNumberPattern'),
                        meta: {
                            get label () {
                                return i18n.global.tc('NCOS Number Patterns')
                            },
                            parentPath: 'ncosLevelList.ncosLevelsContext.ncosLevelDetails',
                            icon: 'fas fa-tasks',
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/ncos/' + route.params.id + '/pattern'
                                return url
                            }
                        }
                    },
                    {
                        name: 'ncosLevelsDetailsNumberPatternCreation',
                        path: 'pattern/create',
                        component: () => import('pages/ncos-levels-details/AuiNCOSLevelsDetailsNumberPatternCreation'),
                        meta: {
                            get label () {
                                return i18n.global.tc('Add')
                            },
                            parentPath: 'ncosLevelList.ncosLevelsContext.ncosLevelDetails.ncosLevelsDetailsNumberPattern',
                            icon: 'add',
                            hideFromPageMenu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/ncos/' + route.params.id + '/pattern/create'
                                return url
                            }
                        }
                    },
                    {
                        name: 'ncosLevelsDetailsNumberPatternContext',
                        path: 'pattern/:numberPatternId',
                        redirect: (to) => {
                            return { name: 'ncosLevelsDetailsNumberPatternEdit', params: to.params }
                        },
                        component: () => import('pages/ncos-levels-details/AuiNCOSLevelsDetailsNumberPatternContext'),
                        meta: {
                            $p: {
                                operation: 'read',
                                resource: 'entity.ncospatterns'
                            },
                            parentPath: 'ncosLevelList.ncosLevelsContext.ncosLevelDetails.ncosLevelsDetailsNumberPattern',
                            contextRoot: true,
                            contextLabel: ({ resourceObject }) => {
                                return '#' + resourceObject.id + ' - ' + resourceObject.pattern
                            }
                        },
                        children: [
                            {
                                name: 'ncosLevelsDetailsNumberPatternEdit',
                                path: 'edit',
                                component: () => import('pages/ncos-levels-details/AuiNCOSLevelsDetailsNumberPatternEdit'),
                                meta: {
                                    $p: {
                                        operation: 'update',
                                        resource: 'entity.ncospatterns'
                                    },
                                    get label () {
                                        return i18n.global.tc('Edit')
                                    },
                                    icon: 'edit',
                                    parentPath: 'ncosLevelList.ncosLevelsContext.ncosLevelDetails.ncosLevelsDetailsNumberPattern.ncosLevelsDetailsNumberPatternContext',
                                    hideFromPageMenu: true,
                                    menu: true,
                                    goToPathRewrite: ({ route, url }) => {
                                        url.pathname = '/ncos/' + route.params.id + '/pattern/' + route.params.numberPatternId + '/edit'
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
        name: 'ncosLevelCatchAll',
        path: '/ncos/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.ncoslevels'
            },
            proxy: true
        }
    }
]
