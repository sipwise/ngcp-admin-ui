import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'lnpMainRedirect',
        path: '/lnp',
        redirect: () => {
            return { name: 'lnpCarriersList' }
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.lnpcarriers'
            },
            get label () {
                return i18n.global.t('Number Porting')
            },
            root: true,
            icon: 'fa-solid fa-code-merge'
        }
    },
    {
        name: 'lnpUpload',
        path: '/lnp/upload',
        component: () => import('pages/lnp/AuiLnpUpload'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.lnpnumbers'
            },
            get label () {
                return i18n.global.t('Upload')
            },
            icon: 'fas fa-upload',
            parentPath: 'lnpMainRedirect'
        }
    },
    // ============================================
    // LNP Carriers Routes and sub-routes
    // ============================================
    {
        name: 'lnpCarriersList',
        path: '/lnp/carriers',
        component: () => import('pages/lnp/AuiLnpPage'),
        props: {
            showCarriers: true
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.lnpcarriers'
            },
            get label () {
                return i18n.global.t('LNP Carriers')
            },
            icon: 'fa-solid fa-circle-nodes',
            root: true,
            parentPath: 'lnpMainRedirect'
        }
    },
    {
        name: 'lnpCarrierCreation',
        path: '/lnp/carriers/create',
        component: () => import('pages/lnp/AuiLnpCarrierCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.lnpcarriers'
            },
            get label () {
                return i18n.global.t('Add')
            },
            icon: 'add',
            parentPath: 'lnpMainRedirect.lnpCarriersList'
        }
    },
    {
        name: 'lnpCarrierContext',
        path: '/lnp/carriers/:id',
        redirect: (to) => {
            return {
                name: 'lnpCarrierEdit',
                params: to.params
            }
        },
        component: () => import('pages/lnp/AuiLnpCarrierContext'),
        props: true,
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.lnpcarriers'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return `#${resourceObject.id} - ${resourceObject.name}`
            },
            parentPath: 'lnpMainRedirect.lnpCarriersList'
        },
        children: [
            {
                name: 'lnpCarrierEdit',
                path: 'edit',
                component: () => import('pages/lnp/AuiLnpCarrierEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.lnpcarriers'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'lnpMainRedirect.lnpCarriersList.lnpCarrierContext',
                    menu: true
                }
            },
            {
                name: 'lnpCarrierNumbersList',
                path: 'numbers',
                component: () => import('pages/lnp/AuiLnpNumbersList'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.lnpnumbers'
                    },
                    get label () {
                        return i18n.global.t('LNP Numbers')
                    },
                    icon: 'list',
                    parentPath: 'lnpMainRedirect.lnpCarriersList.lnpCarrierContext'
                }
            },
            {
                name: 'lnpCarrierNumberCreation',
                path: 'create',
                component: () => import('pages/lnp/AuiLnpNumberCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.lnpnumbers'
                    },
                    get label () {
                        return i18n.global.t('Add')
                    },
                    icon: 'add',
                    parentPath: 'lnpMainRedirect.lnpCarriersList.lnpCarrierContext.lnpCarrierNumbersList'
                }
            },
            {
                name: 'lnpCarrierNumbersContext',
                path: 'numbers/:numberId',
                redirect: (to) => {
                    return { name: 'lnpCarrierNumberEdit', params: to.params }
                },
                component: () => import('pages/lnp/AuiLnpCarrierNumbersContext'),
                props: true,
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.lnpnumbers'
                    },
                    dataContext: true,
                    contextLabel: ({ resourceObject }) => {
                        return `#${resourceObject.id} - ${resourceObject.number}`
                    },
                    parentPath: 'lnpMainRedirect.lnpCarriersList.lnpCarrierContext.lnpCarrierNumbersList'
                },
                children: [
                    {
                        name: 'lnpCarrierNumberEdit',
                        path: 'edit',
                        component: () => import('pages/lnp/AuiLnpNumbersEdit'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.lnpnumbers'
                            },
                            get label () {
                                return i18n.global.t('Edit')
                            },
                            icon: 'edit',
                            menu: true,
                            parentPath: 'lnpMainRedirect.lnpCarriersList.lnpCarrierContext.lnpCarrierNumbersList.lnpCarrierNumbersContext'
                        }
                    }
                ]
            }
        ]
    },
    createAdvancedJournalRoute({
        name: 'lnpCarrierJournalAdvanced',
        path: '/lnp/journal',
        resource: 'lnpcarriers',
        parentPath: 'lnpCarriersList'
    }),
    // ============================================================
    // LNP Numbers Routes and sub routes (without Carrier context)
    // ============================================================
    {
        name: 'lnpNumbersList',
        path: '/lnp/numbers',
        component: () => import('pages/lnp/AuiLnpPage'),
        props: {
            showCarriers: false
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.lnpnumbers'
            },
            get label () {
                return i18n.global.t('LNP Numbers')
            },
            icon: 'fa-solid fa-sim-card',
            root: true,
            parentPath: 'lnpMainRedirect'
        }
    },
    {
        name: 'lnpNumberCreation',
        path: '/lnp/numbers/create',
        component: () => import('pages/lnp/AuiLnpNumberCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.lnpnumbers'
            },
            get label () {
                return i18n.global.t('Add')
            },
            icon: 'add',
            parentPath: 'lnpMainRedirect.lnpNumbersList'
        }
    },
    {
        name: 'lnpNumbersContext',
        path: '/lnp/numbers/:id',
        redirect: (to) => {
            return {
                name: 'lnpNumberEdit',
                params: to.params
            }
        },
        component: () => import('pages/lnp/AuiLnpNumbersContext'),
        props: true,
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.lnpnumbers'
            },
            contextRoot: true,
            parentPath: 'lnpMainRedirect.lnpNumbersList'
        },
        children: [
            {
                name: 'lnpNumberEdit',
                path: 'edit',
                component: () => import('pages/lnp/AuiLnpNumbersEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.lnpnumbers'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'lnpMainRedirect.lnpNumbersList.lnpNumbersContext',
                    menu: true
                }
            }
        ]
    },
    createAdvancedJournalRoute({
        name: 'lnpNumberJournalAdvanced',
        path: '/lnp/journal',
        resource: 'lnpnumbers',
        parentPath: 'lnpNumbersList'
    }),
    {
        name: 'lnpCatchAll',
        path: '/lnp/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.lnpcarriers'
            },
            proxy: true
        }
    }
]
