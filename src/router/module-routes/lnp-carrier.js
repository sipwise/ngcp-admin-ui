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
                return i18n.global.tc('Number Porting')
            },
            icon: 'fas fa-sim-card',
            root: true,
            journalRouteName: 'lnpCarrierJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'lnpCarrierJournalAdvanced',
        path: '/lnp/journal',
        resource: 'lnpcarriers',
        parentPath: 'lnpCarrierList'
    }),
    {
        name: 'lnpCarrierUpload',
        path: '/lnp',
        component: () => import('pages/AuiLnpCarrierUpload'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.lnpcarriers'
            },
            get label () {
                return i18n.global.tc('Upload')
            },
            icon: 'fas fa-upload',
            parentPath: 'lnpCarrierList'
        }
    },
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
                return i18n.global.tc('Add')
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
                return '#' + resourceObject.id + ' - ' + resourceObject.name
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
                        return i18n.global.tc('Edit')
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
                        return i18n.global.tc('LNP Numbers')
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
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.lnpnumbers'
                    },
                    get label () {
                        return i18n.global.tc('Add Ported Numbers')
                    },
                    icon: 'add',
                    parentPath: 'lnpCarrierList.lnpCarrierContext.lnpNumberList',
                    proxy: true,
                    proxyRewrite: ({ url }) => {
                        url.pathname = '/lnp/number_create'
                        return url
                    }
                }
            },
            {
                name: 'lnpNumberEdit',
                path: 'lnp/number/:numberId',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.lnpnumbers'
                    },
                    get label () {
                        return i18n.global.tc('Edit')
                    },
                    icon: 'edit',
                    menu: false,
                    parentPath: 'lnpCarrierList.lnpCarrierContext.lnpNumberList',
                    proxy: true,
                    proxyRewrite: ({ url, route }) => {
                        url.pathname = '/lnp/number/' + route.params.numberId + '/edit'
                        return url
                    }
                }
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
