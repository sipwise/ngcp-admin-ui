import { i18n } from 'boot/i18n'

export default [
    {
        name: 'emailTemplatePage',
        path: '/emailtemplate',
        redirect: (to) => {
            return { name: 'emailTemplatePageCustom', params: to.params }
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.emailtemplates'
            },
            get label () {
                return i18n.global.t('Email Templates')
            },
            root: true,
            icon: 'fas fa-envelope'
        }
    },
    {
        name: 'emailTemplatePageCustom',
        path: '/emailtemplate/custom',
        component: () => import('pages/emailTemplates/AuiEmailTemplatesPage'),
        props: {
            showCustom: true
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.emailtemplates'
            },
            get label () {
                return i18n.global.t('Custom Templates')
            },
            root: true,
            icon: 'fas fa-envelope',
            parentPath: 'emailTemplatePage'
        }
    },
    {
        name: 'emailTemplatePageDefault',
        path: '/emailtemplate/default',
        component: () => import('pages/emailTemplates/AuiEmailTemplatesPage'),
        props: {
            showCustom: false
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.emailtemplates'
            },
            get label () {
                return i18n.global.t('Default Templates')
            },
            root: true,
            icon: 'fas fa-envelope',
            parentPath: 'emailTemplatePage'
        }
    },
    {
        name: 'emailTemplatesContextDefault',
        path: '/emailtemplate/default/:id',
        redirect: (to) => {
            return { name: 'emailTemplateEditDefault', params: to.params }
        },
        component: () => import('pages/emailTemplates/AuiEmailTemplatesContext'),
        props: {
            isCustomContext: false
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.emailtemplates'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return `#${resourceObject.id} - ${resourceObject.name}`
            },
            parentPath: 'emailTemplatePage.emailTemplatePageDefault'
        },
        children: [
            {
                name: 'emailTemplateEditDefault',
                path: 'edit',
                component: () => import('pages/emailTemplates/AuiEmailTemplateEdit'),
                props: {
                    isCustomContext: false
                },
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.emailtemplates'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    hideFromPageMenu: true,
                    parentPath: 'emailTemplatePage.emailTemplatePageDefault.emailTemplatesContextDefault'
                }
            }
        ]
    },
    {
        name: 'emailTemplatesContextCustom',
        path: '/emailtemplate/custom/:id',
        redirect: (to) => {
            return { name: 'emailTemplateEditCustom', params: to.params }
        },
        component: () => import('pages/emailTemplates/AuiEmailTemplatesContext'),
        props: {
            isCustomContext: true
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.emailtemplates'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return `#${resourceObject.id} - ${resourceObject.name}`
            },
            parentPath: 'emailTemplatePage.emailTemplatePageCustom'
        },
        children: [
            {
                name: 'emailTemplateEditCustom',
                path: 'edit',
                component: () => import('pages/emailTemplates/AuiEmailTemplateEdit'),
                props: {
                    isCustomContext: true
                },
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.emailtemplates'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    hideFromPageMenu: true,
                    parentPath: 'emailTemplatePage.emailTemplatePageCustom.emailTemplatesContextCustom'
                }
            }
        ]
    },
    {
        name: 'emailTemplateCreation',
        path: '/emailtemplate/create',
        component: () => import('pages/emailTemplates/AuiEmailTemplateCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.emailtemplates'
            },
            get label () {
                return i18n.global.t('Add')
            },
            icon: 'add',
            parentPath: 'emailTemplatePage'
        }
    },
    {
        name: 'emailTemplateCatchAll',
        path: '/emailtemplate/:pathMatch(.*)',
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
