import { i18n } from 'boot/i18n'

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
                return i18n.t('Number Porting')
            },
            icon: 'fas fa-sim-card',
            root: true
        }
    },
    {
        name: 'lnpCarrierUpload',
        path: '/lnp/upload',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.lnpcarriers'
            },
            proxy: true
        }
    },
    {
        name: 'lnpCarrierCreation',
        path: '/lnp/carrier_create',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.lnpcarriers'
            },
            proxy: true,
            parentPath: 'lnpCarrierList'
        }
    },
    {
        name: 'lnpCarrierContext',
        path: '/lnp/:id',
        component: () => import('pages/AuiLnpCarrierContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.lnpcarriers'
            },
            contextRoot: true,
            parentPath: 'lnpCarrierList'
        },
        children: [
            {
                name: 'lnpCarrierEdit',
                path: '/lnp/carrier/:id/edit',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.lnpcarriers'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'lnpCarrierList.lnpCarrierContext',
                    proxy: true
                }
            },
            {
                name: 'lnpNumberList',
                path: 'lnpnumbers',
                component: () => import('pages/AuiLnpNumbersList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.lnpnumbers'
                    },
                    get label () {
                        return i18n.t('LNP Numbers')
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
                        return i18n.t('Add Ported Numbers')
                    },
                    icon: 'add',
                    menu: false,
                    parentPath: 'lnpCarrierList.lnpCarrierContext',
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
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    menu: false,
                    parentPath: 'lnpCarrierList.lnpCarrierContext',
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
        path: '/lnp/*',
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
