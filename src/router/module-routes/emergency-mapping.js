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
                return i18n.global.tc('Emergency Mappings')
            },
            icon: 'fas fa-file-medical',
            root: true
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
                return i18n.global.tc('Add')
            },
            icon: 'add',
            parentPath: 'emergencyMappingContainerList'
        }
    },
    {
        name: 'emergencyMappingContainerContext',
        path: '/emergencymappingcontainer/:id',
        component: () => import('pages/AuiEmergencyMappingContainerContext'),
        redirect: (to) => {
            return { name: 'emergencyMappingContainerEdit', params: to.params }
        },
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
                component: () => import('pages/AuiEmergencyMappingContainerEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.emergencymappingcontainers'
                    },
                    get label () {
                        return i18n.global.tc('Edit')
                    },
                    icon: 'edit',
                    parentPath: 'emergencyMappingContainerList.emergencyMappingContainerContext',
                    menu: true
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
                        return i18n.global.tc('Mappings')
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
                path: 'emergencymappings/create',
                component: () => import('pages/AuiEmergencyMappingCreation'),
                props: true,
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.emergencymappings'
                    },
                    get label () {
                        return i18n.global.tc('Add Emergency Mappings')
                    },
                    icon: 'add',
                    parentPath: 'emergencyMappingContainerList.emergencyMappingContainerContext.emergencyMappingList',
                    goToPathRewrite: ({ route, url }) => {
                        url.pathname = '/emergencymapping/emergency_mapping_create/'
                        return url
                    }
                }
            },
            {
                name: 'emergencyMappingContext',
                path: 'emergencymappings/:mappingId',
                redirect: (to) => {
                    return { name: 'emergencyMappingEdit', params: to.params }
                },
                component: () => import('pages/AuiEmergencyMappingContext'),
                props: true,
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.emergencymappings'
                    },
                    dataContext: true,
                    parentPath: 'emergencyMappingContainerList.emergencyMappingContainerContext.emergencyMappingList',
                    contextLabel: ({ resourceObject }) => {
                        return '#' + resourceObject.id + ' - ' + resourceObject.code
                    }
                },
                children: [
                    {
                        name: 'emergencyMappingEdit',
                        path: 'edit',
                        component: () => import('pages/AuiEmergencyMappingEdit'),
                        props: true,
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.emergencymappings'
                            },
                            get label () {
                                return i18n.global.tc('Edit')
                            },
                            icon: 'edit',
                            parentPath: 'emergencyMappingContainerList.emergencyMappingContainerContext.emergencyMappingList.emergencyMappingContext',
                            menu: true,
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = '/emergencymapping/emergency_mapping/' + route.params.mappingId + '/edit'
                                return url
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        name: 'emergencyMappingContainerCatchAll',
        path: '/emergencymapping/:pathMatch(.*)',
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
