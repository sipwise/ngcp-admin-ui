import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute, createJournalRoute } from 'src/router/common'

export default [
    {
        name: 'domainList',
        path: '/domain',
        component: () => import('pages/domains/AuiDomainList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.domains'
            },
            get label () {
                return i18n.global.t('Domains')
            },
            icon: 'fas fa-network-wired',
            root: true,
            journalRouteName: 'domainJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'domainJournalAdvanced',
        path: '/domain/journal',
        resource: 'domains',
        parentPath: 'domainList'
    }),
    {
        name: 'domainCreation',
        path: '/domain/create',
        component: () => import('pages/domains/AuiDomainCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.domains'
            },
            get label () {
                return i18n.global.t('Add Domain')
            },
            icon: 'add',
            parentPath: 'domainList'
        }
    },
    {
        name: 'domainContext',
        path: '/domain/:id',
        component: () => import('pages/domains/AuiDomainContext'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.domains'
            },
            contextRoot: true,
            parentPath: 'domainList'
        },
        children: [
            {
                name: 'domainPreferences',
                path: '/domain/:id/preferences',
                component: () => import('pages/domains/AuiDomainPreferences'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'page.domain.preferences'
                    },
                    get label () {
                        return i18n.global.t('Preferences')
                    },
                    icon: 'settings_applications',
                    parentPath: 'domainList.domainContext',
                    menu: true
                }
            },
            createJournalRoute({
                name: 'domainJournal',
                resource: 'domains',
                parentPath: 'domainList.domainContext'
            })
        ]
    }
]
