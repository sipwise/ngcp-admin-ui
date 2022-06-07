import { i18n } from 'boot/i18n'

export default [
    {
        name: 'emailTemplateList',
        path: '/emailtemplate',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.emailtemplates'
            },
            get label () {
                return i18n.t('Email Templates')
            },
            icon: 'fas fa-envelope',
            proxy: true
        }
    },
    {
        name: 'emailTemplateCatchAll',
        path: '/emailtemplate/*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.emailtemplates'
            },
            proxy: true
        }
    }
]
