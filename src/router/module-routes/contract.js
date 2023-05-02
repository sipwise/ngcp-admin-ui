import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute, createJournalRoute } from 'src/router/common'

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
                return i18n.global.tc('Contracts')
            },
            icon: 'fas fa-handshake',
            root: true,
            journalRouteName: 'contractJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'contractJournalAdvanced',
        path: '/contract/journal',
        resource: 'contracts',
        parentPath: 'contractList'
    }),
    {
        name: 'contractCreatePeering',
        path: '/contract/peering/create',
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
                return i18n.global.tc('Add Peering Contract')
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
                return i18n.global.tc('Add Reseller Contract')
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
                        return i18n.global.tc('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'contractList.contractContext',
                    menu: true
                }
            },
            createJournalRoute({
                name: 'contractJournal',
                resource: 'contracts',
                parentPath: 'contractList.contractContext'
            })
        ]
    },
    {
        name: 'contractCatchAll',
        path: '/contract/:pathMatch(.*)',
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
