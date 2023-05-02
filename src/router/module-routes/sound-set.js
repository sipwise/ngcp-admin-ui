import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'soundSetList',
        path: '/sound',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.soundsets'
            },
            get label () {
                return i18n.global.tc('Sound Sets')
            },
            icon: 'fas fa-music',
            proxy: true
        }
    },
    createAdvancedJournalRoute({
        name: 'soundSetJournalAdvanced',
        path: '/sound/journal',
        resource: 'soundsets',
        parentPath: 'soundSetList'
    }),
    {
        name: 'soundSetHandles',
        path: '/sound/:id/handles',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.soundsets'
            },
            proxy: true
        }
    },
    {
        name: 'soundSetCatchAll',
        path: '/sound/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.soundsets'
            },
            proxy: true
        }
    }
]
