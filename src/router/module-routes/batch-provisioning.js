import { i18n } from 'boot/i18n'
import { LICENSES } from 'src/constants'

export default [
    {
        name: 'batchProvisioningList',
        path: '/batchprovisioning',
        component: () => import('pages/batchProvisioning/AuiBatchProvisioningTemplatesPage'),
        props: { editable: null },
        meta: {
            $p: {
                operation: 'read',
                resource: 'tool.batchprovisioning'
            },
            get label () {
                return i18n.global.t('Batch Provisioning')
            },
            icon: 'fas fa-users-cog',
            licenses: [LICENSES.batch_provisioning],
            root: true,
            platformInfo: 'batch_provisioning'
        }
    },
    {
        name: 'batchProvisioningListDatabase',
        path: '/batchprovisioning/database',
        component: () => import('pages/batchProvisioning/AuiBatchProvisioningTemplatesPage'),
        props: { editable: 1 },
        meta: {
            $p: {
                operation: 'read',
                resource: 'tool.batchprovisioning'
            },
            get label () {
                return i18n.global.t('Database')
            },
            icon: 'fas fa-database',
            licenses: [LICENSES.batch_provisioning],
            root: true,
            parentPath: 'batchProvisioningList',
            platformInfo: 'batch_provisioning'
        }
    },
    {
        name: 'batchProvisioningListStatic',
        path: '/batchprovisioning/static',
        component: () => import('pages/batchProvisioning/AuiBatchProvisioningTemplatesPage'),
        props: { editable: 0 },
        meta: {
            $p: {
                operation: 'read',
                resource: 'tool.batchprovisioning'
            },
            get label () {
                return i18n.global.t('Static')
            },
            icon: 'fas fa-lock',
            licenses: [LICENSES.batch_provisioning],
            root: true,
            parentPath: 'batchProvisioningList',
            platformInfo: 'batch_provisioning'
        }
    },
    {
        name: 'batchProvisioningCreate',
        path: '/batchprovisioning/create',
        component: () => import('pages/batchProvisioning/AuiBatchProvisioningTemplateCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'tool.batchprovisioning'
            },
            licenses: [LICENSES.batch_provisioning],
            root: true,
            platformInfo: 'batch_provisioning'
        }
    },
    {
        name: 'batchProvisioningTemplatesContext',
        path: '/batchprovisioning/templates/:id',
        redirect: (to) => {
            return {
                name: 'batchProvisioningTemplatesEdit',
                params: to.params
            }
        },
        component: () => import('pages/batchProvisioning/AuiBatchProvisioningTemplatesContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'tool.batchprovisioning'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                if (!resourceObject) {
                    return ''
                }
                return resourceObject.reseller_id_expand?.name
                    ? `${resourceObject.reseller_id_expand.name}/${resourceObject.name}`
                    : resourceObject.name
            },
            licenses: [LICENSES.batch_provisioning],
            parentPath: 'batchProvisioningList',
            platformInfo: 'batch_provisioning'
        },
        children: [
            {
                name: 'batchProvisioningTemplatesEdit',
                path: 'edit',
                component: () => import('pages/batchProvisioning/AuiBatchProvisioningTemplateEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.batchprovisioning'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    licenses: [LICENSES.batch_provisioning],
                    hideFromPageMenu: true,
                    parentPath: 'batchProvisioningList.batchProvisioningTemplatesContext',
                    platformInfo: 'batch_provisioning'
                }
            },
            {
                name: 'batchProvisioningTemplatesForm',
                path: 'form',
                component: () => import('pages/batchProvisioning/AuiBatchProvisioningOpenForm'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'tool.batchprovisioning'
                    },
                    get label () {
                        return i18n.global.t('Open Form')
                    },
                    icon: 'fas fa-file-alt',
                    licenses: [LICENSES.batch_provisioning],
                    hideFromPageMenu: true,
                    parentPath: 'batchProvisioningList.batchProvisioningTemplatesContext',
                    platformInfo: 'batch_provisioning'
                }
            }
        ]
    },
    {
        name: 'batchProvisioningCatchAll',
        path: '/batchprovisioning/:pathMatch(.*)',
        redirect: () => {
            return { name: 'batchProvisioningList' }
        },
        meta: {
            $p: {
                operation: 'update',
                resource: 'tool.batchprovisioning'
            },
            licenses: [LICENSES.batch_provisioning],
            platformInfo: 'batch_provisioning'
        }
    }
]
