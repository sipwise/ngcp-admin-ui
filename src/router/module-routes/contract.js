import { i18n } from 'boot/i18n'

export default [
    {
        name: 'contractList',
        path: '/contract',
        component: () => import('pages/contracts/AuiContractList'),
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
        component: () => import('pages/contracts/AuiContractCreation'),
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
        component: () => import('pages/contracts/AuiContractCreation'),
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
        component: () => import('pages/contracts/AuiContractContext'),
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
                component: () => import('pages/contracts/AuiContractEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.contracts'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'contractList.contractContext',
                    menu: true
                }
            },
            {
                name: 'contractJournal',
                path: 'journal',
                component: () => import('pages/contracts/AuiContractJournal'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.contracts'
                    },
                    get label () {
                        return i18n.t('Journal')
                    },
                    icon: 'list',
                    parentPath: 'contractList.contractContext',
                    menu: true
                }
            }
        ]
    },
    {
        name: 'contractCatchAll',
        path: '/contract/*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.contracts'
            },
            proxy: true
        }
    }
]
