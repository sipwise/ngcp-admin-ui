import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'
import { PLATFORM_CARRIER, PLATFORM_PRO } from 'src/constants'

export default [
    {
        name: 'headerRuleSetList',
        path: '/header',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.headerrulesets'
            },
            get label () {
                return i18n.global.tc('Header Manipulations')
            },
            icon: 'fas fa-edit',
            proxy: true,
            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
        }
    },
    createAdvancedJournalRoute({
        name: 'headerRuleSetJournalAdvanced',
        path: '/header/journal',
        resource: 'headerrulesets',
        parentPath: 'headerRuleSetList'
    }),
    {
        name: 'headerRuleSetCatchAll',
        path: '/header/:pathMatch(.*)*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.headerrulesets'
            },
            proxy: true,
            platformVersions: [PLATFORM_PRO, PLATFORM_CARRIER]
        }
    }
]
