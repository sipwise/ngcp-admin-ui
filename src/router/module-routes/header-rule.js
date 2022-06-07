import { i18n } from 'boot/i18n'

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
                return i18n.t('Header Manipulations')
            },
            icon: 'fas fa-edit',
            proxy: true
        }
    },
    {
        name: 'headerRuleSetCatchAll',
        path: '/header/*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.headerrulesets'
            },
            proxy: true
        }
    }
]
