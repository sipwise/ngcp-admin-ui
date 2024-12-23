import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
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
                return i18n.global.t('Number Porting')
            },
            icon: 'fas fa-sim-card',
            root: true
        }
    },
    createAdvancedJournalRoute({
        name: 'lnpCarrierJournalAdvanced',
        path: '/lnp/journal',
        resource: 'lnpcarriers',
        parentPath: 'lnpCarrierList'
    }),
    {
        name: 'lnpCarrierCreation',
        path: '/lnp/carrier_create',
        component: () => import('pages/AuiLnpCarrierCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.lnpcarriers'
            },
            get label () {
                return i18n.global.t('Add')
            },
            icon: 'add',
            parentPath: 'lnpCarrierList'
        }
    },
    {
        name: 'lnpCarrierContext',
        path: '/lnp/carrier/:id',
        redirect: (to) => {
            return {
                name: 'lnpCarrierEdit',
                params: to.params
            }
        },
        component: () => import('pages/AuiLnpCarrierContext'),
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
            parentPath: 'lnpCarrierList'
        },
        children: [
            {
                name: 'lnpCarrierEdit',
                path: 'edit',
                component: () => import('pages/AuiLnpCarrierEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.lnpcarriers'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'lnpCarrierList.lnpCarrierContext',
                    menu: true
                }
            },
            {
                name: 'lnpNumberList',
                path: 'lnpnumbers',
                component: () => import('pages/AuiLnpNumbersList'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.lnpnumbers'
                    },
                    get label () {
                        return i18n.global.t('LNP Numbers')
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
                component: () => import('pages/AuiLnpNumbersCreation'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.lnpnumbers'
                    },
                    get label () {
                        return i18n.global.t('Add Ported Numbers')
                    },
                    icon: 'add',
                    parentPath: 'lnpCarrierList.lnpCarrierContext.lnpNumberList',
                    proxyRewrite: ({ url }) => {
                        url.pathname = '/lnp/number_create'
                        return url
                    }
                }
            },
            {
                name: 'lnpNumberUpload',
                path: '/lnpnumbers',
                component: () => import('pages/AuiLnpNumberUpload'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.lnpnumbers'
                    },
                    get label () {
                        return i18n.global.t('Upload')
                    },
                    icon: 'fas fa-upload',
                    parentPath: 'lnpCarrierList.lnpCarrierContext.lnpNumberList'
                }
            },
            {
                name: 'lnpNumbersContext',
                path: 'lnpnumbers/:numberId',
                redirect: (to) => {
                    return { name: 'lnpNumberEdit', params: to.params }
                },
                component: () => import('pages/AuiLnpNumbersContext'),
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
                    parentPath: 'lnpCarrierList.lnpCarrierContext.lnpNumberList'
                },
                children: [
                    {
                        name: 'lnpNumberEdit',
                        path: 'edit',
                        component: () => import('pages/AuiLnpNumbersEdit'),
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
                            parentPath: 'lnpCarrierList.lnpCarrierContext.lnpNumberList.lnpNumbersContext',
                            proxyRewrite: ({ url, route }) => {
                                url.pathname = `/lnp/number/${route.params.numberId}/edit`
                                return url
                            }
                        }
                    }
                ]
            }
        ]
    },
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
