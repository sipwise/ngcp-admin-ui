import { i18n } from 'boot/i18n'

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
                return i18n.t('Sound Sets')
            },
            icon: 'fas fa-music',
            proxy: true
        }
    },
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
        path: '/sound/*',
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
