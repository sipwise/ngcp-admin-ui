import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

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
    createAdvancedJournalRoute({
        name: 'emailTemplateJournalAdvanced',
        path: '/emailtemplate/journal',
        resource: 'emailtemplates',
        parentPath: 'emailTemplateList'
    }),
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
