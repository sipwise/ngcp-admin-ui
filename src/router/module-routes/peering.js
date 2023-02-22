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
                return i18n.t('SIP Peering Groups')
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
                return i18n.t('Add Peering Group')
            },
            icon: 'add',
            parentPath: 'peeringGroupList'
        }
    },
    {
        name: 'peeringGroupEdit',
        path: '/peering/:id/edit',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.peeringgroups'
            },
            get label () {
                return i18n.t('Edit')
            },
            icon: 'edit',
            parentPath: 'peeringGroupList',
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
            get label () {
                return i18n.t('Servers')
            },
            icon: 'article',
            parentPath: 'peeringGroupList',
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
