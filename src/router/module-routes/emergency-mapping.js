import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'emergencyMappingContainerList',
        path: '/emergencymapping',
        component: () => import('pages/AuiEmergencyMappingContainerList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.emergencymappingcontainers'
            },
            get label () {
                return i18n.t('Emergency Mappings')
            },
            icon: 'fas fa-file-medical',
            root: true,
            journalRouteName: 'emergencyMappingJournalAdvanced'
        }
    },
    createAdvancedJournalRoute({
        name: 'emergencyMappingJournalAdvanced',
        path: '/emergencymapping/journal',
        resource: 'emergencymappingcontainers',
        parentPath: 'emergencyMappingContainerList'
    }),
    {
        name: 'emergencyMappingContainerUpload',
        path: '/emergencymapping/upload',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.emergencymappingcontainers'
            },
            proxy: true
        }
    },
    {
        name: 'emergencyMappingContainerDownload',
        path: '/emergencymapping/download',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.emergencymappingcontainers'
            },
            proxy: true
        }
    },
    {
        name: 'emergencyMappingContainerCreation',
        path: '/emergencymapping/emergency_container_create',
        component: () => import('pages/AuiEmergencyMappingContainerCreation'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.emergencymappingcontainers'
            },
            get label () {
                return i18n.t('Add')
            },
            icon: 'add',
            parentPath: 'emergencyMappingContainerList'
        }
    },
    {
        name: 'emergencyMappingContainerContext',
        path: '/emergencymappingcontainer/:id',
        component: () => import('pages/AuiEmergencyMappingContainerContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.emergencymappingcontainers'
            },
            contextRoot: true,
            parentPath: 'emergencyMappingContainerList'
        },
        children: [
            {
                name: 'emergencyMappingContainerEdit',
                path: '/emergencymapping/emergency_container/:id/edit',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.emergencymappings'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'emergencyMappingContainerList.emergencyMappingContainerContext',
                    proxy: true
                }
            },
            {
                name: 'emergencyMappingList',
                path: 'emergencymappings',
                component: () => import('pages/AuiEmergencyMappingList'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.emergencymappings'
                    },
                    get label () {
                        return i18n.t('Mappings')
                    },
                    icon: 'list',
                    parentPath: 'emergencyMappingContainerList.emergencyMappingContainerContext',
                    goToPathRewrite: ({ url }) => {
                        url.pathname = '/emergencymapping'
                        return url
                    }
                }
            },
            {
                name: 'emergencyMappingCreation',
                path: 'emergencymappings-creation',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'create',
                        resource: 'entity.emergencymappings'
                    },
                    get label () {
                        return i18n.t('Add Mapping')
                    },
                    icon: 'add',
                    menu: false,
                    parentPath: 'emergencyMappingContainerList.emergencyMappingContainerContext',
                    proxy: true,
                    proxyRewrite: ({ url }) => {
                        url.pathname = '/emergencymapping/emergency_mapping_create'
                        return url
                    }
                }
            },
            {
                name: 'emergencyMappingEdit',
                path: 'emergencymappings-edit/:mappingId',
                component: () => import('pages/Proxy'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.emergencymappings'
                    },
                    get label () {
                        return i18n.t('Edit')
                    },
                    icon: 'edit',
                    menu: false,
                    parentPath: 'emergencyMappingContainerList.emergencyMappingContainerContext',
                    proxy: true,
                    proxyRewrite: ({ url, route }) => {
                        url.pathname = '/emergencymapping/emergency_mapping/' + route.params.mappingId + '/edit'
                        return url
                    }
                }
            }
        ]
    },
    {
        name: 'emergencyMappingContainerCatchAll',
        path: '/emergencymapping/*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.emergencymappingcontainers'
            },
            proxy: true
        }
    }
]
