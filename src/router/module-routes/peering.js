import { i18n } from 'boot/i18n'

export default [
    {
        name: 'peeringGroupList',
        path: '/peering',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.peeringgroups'
            },
            get label () {
                return i18n.t('SIP Peering Groups')
            },
            icon: 'fas fa-exchange-alt',
            proxy: true
        }
    },
    {
        name: 'peeringGroupServers',
        path: '/peering/:id/servers',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.peeringgroups'
            },
            proxy: true
        }
    },
    {
        name: 'peeringGroupCatchAll',
        path: '/peering/*',
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
