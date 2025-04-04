import { i18n } from 'boot/i18n'
import { LICENSES } from 'src/constants'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'deviceManagementPage',
        path: '/devicemanagement',
        redirect: (to) => {
            return { name: 'deviceManagementModelsPage', params: to.params }
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.pbxdevices'
            },
            get label () {
                return i18n.global.t('Device Management')
            },
            icon: 'fas fa-fax',
            licenses: [LICENSES.device_provisioning, LICENSES.pbx],
            proxy: true,
            root: true,
            capability: 'cloudpbx'
        }
    },
    {
        name: 'deviceManagementModelsPage',
        path: '/devicemanagement/model',
        component: () => import('pages/device-management/AuiDeviceManagementPage'),
        props: {
            showDeviceModel: true
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.pbxdevices'
            },
            get label () {
                return i18n.global.t('Device Models')
            },
            proxy: true,
            icon: 'fas fa-fax',
            licenses: [LICENSES.device_provisioning, LICENSES.pbx],
            goToPathRewrite: ({ url }) => {
                url.pathname = '/device'
                return url
            },
            parentPath: 'deviceManagementPage'
        }
    },
    {
        name: 'deviceManagementModelCreation',
        path: '/devicemanagement/model/create',
        component: () => import('pages/device-management-device-models/AuiDeviceManagementModelCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.pbxdevices'
            },
            get label () {
                return i18n.global.t('Add')
            },
            icon: 'add',
            parentPath: 'deviceManagementPage.deviceManagementModelsPage'
        }
    },
    {
        name: 'deviceManagementModelContext',
        path: '/device/model/:id',
        redirect: (to) => {
            return { name: 'deviceManagementModelEdit', params: to.params }
        },
        component: () => import('pages/device-management-device-models/AuiDeviceManagementModelContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.pbxdevices'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return `#${resourceObject.id} - ${resourceObject.model}`
            },
            parentPath: 'deviceManagementPage.deviceManagementModelsPage'
        },
        children: [
            {
                name: 'deviceManagementModelFrontimage',
                path: 'frontimage',
                component: () => import('pages/device-management-device-models/AuiDeviceManagementModelFrontImage'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.pbxdevices'
                    },
                    get label () {
                        return i18n.global.t('Front Image')
                    },
                    icon: 'fas fa-image',
                    hideFromPageMenu: true,
                    goToPathRewrite: ({ route, url }) => {
                        url.pathname = `/device/model/${route.params.id}/preferences`
                        return url
                    },
                    parentPath: 'deviceManagementPage.deviceManagementModelsPage.deviceManagementModelContext'
                }
            },
            {
                name: 'deviceManagementModelEdit',
                path: 'edit',
                component: () => import('pages/device-management-device-models/AuiDeviceManagementModelEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.pbxdevices'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    hideFromPageMenu: true,
                    goToPathRewrite: ({ route, url }) => {
                        url.pathname = `/device/model/${route.params.id}/edit`
                        return url
                    },
                    parentPath: 'deviceManagementPage.deviceManagementModelsPage.deviceManagementModelContext'
                }
            },
            {
                name: 'deviceManagementModelPreferences',
                path: 'preferences',
                component: () => import('pages/device-management-device-models/AuiDeviceManagementModelPreferences'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.pbxdevices'
                    },
                    get label () {
                        return i18n.global.t('Preferences')
                    },
                    icon: 'settings_applications',
                    hideFromPageMenu: true,
                    goToPathRewrite: ({ route, url }) => {
                        url.pathname = `/device/model/${route.params.id}/preferences`
                        return url
                    },
                    parentPath: 'deviceManagementPage.deviceManagementModelsPage.deviceManagementModelContext'
                }
            },
            {
                name: 'createCustomerPreference',
                path: '/devicemanagement/model/:id/preferences/create',
                component: () => import('pages/device-management-device-models/AuiDeviceManagementModelCreationPreference'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.pbxdevices'
                    },
                    get label () {
                        return i18n.global.t('Create custom preference')
                    },
                    icon: 'fas fa-user-tie',
                    goToPathRewrite: ({ route, url }) => {
                        url.pathname = `/device/model/${route.params.id}/preferences/create`
                        return url
                    },
                    parentPath: 'deviceManagementPage.deviceManagementModelsPage.deviceManagementModelContext.deviceManagementModelPreferences'
                }
            },
            {
                name: 'customerPreferenceContext',
                path: '/devicemanagement/model/:id/preferences/:preferenceId',
                redirect: (to) => {
                    return { name: 'customerPreferenceEdit', params: to.params }
                },
                component: () => import('pages/device-management-device-models/AuiDeviceManagementModelPreferenceContext'),
                meta: {
                    $p: {
                        operation: 'read',
                        resource: 'entity.pbxdevices'
                    },
                    contextRoot: true,
                    contextLabel: ({ resourceObject }) => {
                        return `#${resourceObject.id} - ${resourceObject.attribute}`
                    },
                    parentPath: 'deviceManagementPage.deviceManagementModelsPage.deviceManagementModelContext.deviceManagementModelPreferences'
                },
                children: [
                    {
                        name: 'customerPreferenceEdit',
                        path: 'edit',
                        component: () => import('pages/device-management-device-models/AuiDeviceManagementModelEditPreference'),
                        meta: {
                            $p: {
                                operation: 'update',
                                resource: 'entity.pbxdevices'
                            },
                            get label () {
                                return i18n.global.t('Edit custom preference')
                            },
                            icon: 'fas fa-user-tie',
                            goToPathRewrite: ({ route, url }) => {
                                url.pathname = `/device/model/${route.params.id}/preferences/create`
                                return url
                            },
                            parentPath: 'deviceManagementPage.deviceManagementModelsPage.deviceManagementModelContext.deviceManagementModelPreferences.customerPreferenceContext'
                        }
                    }
                ]
            }
        ]
    },
    {
        name: 'deviceManagementFirmwaresPage',
        path: '/devicemanagement/firmware',
        component: () => import('pages/device-management/AuiDeviceManagementPage'),
        props: {
            showDeviceFirmware: true
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.pbxdevices'
            },
            get label () {
                return i18n.global.t('Device Firmwares')
            },
            root: true,
            icon: 'fas fa-fax',
            licenses: [LICENSES.device_provisioning, LICENSES.pbx],
            goToPathRewrite: ({ url }) => {
                url.pathname = '/device'
                return url
            },
            parentPath: 'deviceManagementPage'
        }
    },
    {
        name: 'deviceManagementFirmwareUpload',
        path: '/device/firmware/create',
        component: () => import('pages/device-management-device-firmwares/AuiDeviceManagementFirmwareUpload'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.pbxdevices'
            },
            get label () {
                return i18n.global.t('Add')
            },
            icon: 'add',
            parentPath: 'deviceManagementPage.deviceManagementFirmwaresPage'
        }
    },
    {
        name: 'deviceManagementFirmwareContext',
        path: '/device/firmware/:id',
        redirect: (to) => {
            return { name: 'deviceManagementFirmwareEdit', params: to.params }
        },
        component: () => import('pages/device-management-device-firmwares/AuiDeviceManagementFirmwareContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.pbxdevices'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return `#${resourceObject.id} - ${resourceObject.device_id_expand.vendor} - ${resourceObject.device_id_expand.model} - ${resourceObject.version}`
            },
            parentPath: 'deviceManagementPage.deviceManagementFirmwaresPage'
        },
        children: [
            {
                name: 'deviceManagementFirmwareEdit',
                path: 'edit',
                component: () => import('pages/device-management-device-firmwares/AuiDeviceManagementFirmwareEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.pbxdevices'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    hideFromPageMenu: true,
                    goToPathRewrite: ({ route, url }) => {
                        url.pathname = `/device/firmware/${route.params.id}/edit`
                        return url
                    },
                    parentPath: 'deviceManagementPage.deviceManagementFirmwaresPage.deviceManagementFirmwareContext'
                }
            }
        ]
    },
    {
        name: 'deviceManagementConfigurationsPage',
        path: '/devicemanagement/configuration',
        component: () => import('pages/device-management/AuiDeviceManagementPage'),
        props: {
            showDeviceConfigurations: true
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.pbxdevices'
            },
            get label () {
                return i18n.global.t('Device Configurations')
            },
            root: true,
            icon: 'fas fa-fax',
            licenses: [LICENSES.device_provisioning, LICENSES.pbx],
            goToPathRewrite: ({ url }) => {
                url.pathname = '/device'
                return url
            },
            parentPath: 'deviceManagementPage'
        }
    },
    {
        name: 'deviceManagementConfigurationCreation',
        path: '/device/config/create',
        component: () => import('pages/device-management-device-configurations/AuiDeviceManagementConfigurationCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.pbxdevices'
            },
            get label () {
                return i18n.global.t('Add')
            },
            icon: 'add',
            parentPath: 'deviceManagementPage.deviceManagementConfigurationsPage'
        }
    },
    {
        name: 'deviceManagementConfigurationContext',
        path: '/device/config/:id',
        redirect: (to) => {
            return { name: 'deviceManagementConfigurationEdit', params: to.params }
        },
        component: () => import('pages/device-management-device-configurations/AuiDeviceManagementConfigurationContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.pbxdevices'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return `#${resourceObject.id} - ${resourceObject.device_id_expand.vendor} - ${resourceObject.device_id_expand.model}`
            },
            parentPath: 'deviceManagementPage.deviceManagementConfigurationsPage'
        },
        children: [
            {
                name: 'deviceManagementConfigurationEdit',
                path: 'edit',
                component: () => import('pages/device-management-device-configurations/AuiDeviceManagementConfigurationEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.pbxdevices'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    hideFromPageMenu: true,
                    goToPathRewrite: ({ route, url }) => {
                        url.pathname = `/device/config/${route.params.id}/edit`
                        return url
                    },
                    parentPath: 'deviceManagementPage.deviceManagementConfigurationsPage.deviceManagementConfigurationContext'
                }
            }
        ]
    },
    {
        name: 'deviceManagementProfilesPage',
        path: '/devicemanagement/profile',
        component: () => import('pages/device-management/AuiDeviceManagementPage'),
        props: {
            showDeviceProfiles: true
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.pbxdevices'
            },
            get label () {
                return i18n.global.t('Device Profiles')
            },
            root: true,
            icon: 'fas fa-fax',
            licenses: [LICENSES.device_provisioning, LICENSES.pbx],
            goToPathRewrite: ({ url }) => {
                url.pathname = '/device'
                return url
            },
            parentPath: 'deviceManagementPage'
        }
    },
    {
        name: 'deviceManagementProfileCreation',
        path: '/device/profile/create',
        component: () => import('pages/device-management-device-profiles/AuiDeviceManagementProfileCreation'),
        meta: {
            $p: {
                operation: 'create',
                resource: 'entity.pbxdevices'
            },
            get label () {
                return i18n.global.t('Add')
            },
            icon: 'add',
            parentPath: 'deviceManagementPage.deviceManagementProfilesPage'
        }
    },
    {
        name: 'deviceManagementProfileContext',
        path: '/device/profile/:id',
        redirect: (to) => {
            return { name: 'deviceManagementProfileEdit', params: to.params }
        },
        component: () => import('pages/device-management-device-profiles/AuiDeviceManagementProfileContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.pbxdevices'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return `#${resourceObject.id} - ${resourceObject.name}`
            },
            parentPath: 'deviceManagementPage.deviceManagementProfilesPage'
        },
        children: [
            {
                name: 'deviceManagementProfileEdit',
                path: 'edit',
                component: () => import('pages/device-management-device-profiles/AuiDeviceManagementProfileEdit'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.pbxdevices'
                    },
                    get label () {
                        return i18n.global.t('Edit')
                    },
                    icon: 'edit',
                    hideFromPageMenu: true,
                    goToPathRewrite: ({ route, url }) => {
                        url.pathname = `/device/profile/${route.params.id}/edit`
                        return url
                    },
                    parentPath: 'deviceManagementPage.deviceManagementProfilesPage.deviceManagementProfileContext'
                }
            },
            {
                name: 'deviceManagementProfilePreferences',
                path: 'preferences',
                component: () => import('pages/device-management-device-profiles/AuiDeviceManagementProfilePreferences'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.pbxdevices'
                    },
                    get label () {
                        return i18n.global.t('Preferences')
                    },
                    icon: 'settings_applications',
                    hideFromPageMenu: true,
                    goToPathRewrite: ({ route, url }) => {
                        url.pathname = `/device/profile/${route.params.id}/preferences`
                        return url
                    },
                    parentPath: 'deviceManagementPage.deviceManagementProfilesPage.deviceManagementProfileContext'
                }
            }
        ]
    },
    {
        name: 'deviceManagementDeployedDevicesPage',
        path: '/devicemanagement/device',
        component: () => import('pages/device-management/AuiDeviceManagementPage'),
        props: {
            showDeployedDevices: true
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.pbxdevices'
            },
            get label () {
                return i18n.global.t('Deployed Devices')
            },
            root: true,
            icon: 'fas fa-fax',
            licenses: [LICENSES.device_provisioning, LICENSES.pbx],
            goToPathRewrite: ({ url }) => {
                url.pathname = '/device'
                return url
            },
            parentPath: 'deviceManagementPage'
        }
    },
    {
        name: 'deviceManagementDeployedDeviceContext',
        path: '/devicemanagement/device/deployed-devices/:id',
        redirect: (to) => {
            return { name: 'deviceManagementDeployedDevicePreferences', params: to.params }
        },
        component: () => import('pages/device-management-deployed-devices/AuiDeviceManagementDeployedDeviceContext'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.pbxdevices'
            },
            contextRoot: true,
            contextLabel: ({ resourceObject }) => {
                return `#${resourceObject.id} - ${resourceObject.identifier}`
            },
            parentPath: 'deviceManagementPage.deviceManagementDeployedDevicesPage'
        },
        children: [
            {
                name: 'deviceManagementDeployedDeviceConfiguration',
                path: 'config',
                component: () => import('pages/device-management-deployed-devices/AuiDeviceManagementDeployedDeviceConfig'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.pbxdevices'
                    },
                    get label () {
                        return i18n.global.t('Config')
                    },
                    icon: 'edit',
                    hideFromPageMenu: true,
                    goToPathRewrite: ({ url }) => {
                        url.pathname = '/device'
                        return url
                    },
                    parentPath: 'deviceManagementPage.deviceManagementDeployedDevicesPage.deviceManagementDeployedDeviceContext'
                }
            },
            {
                name: 'deviceManagementDeployedDevicePreferences',
                path: 'preferences',
                component: () => import('pages/device-management-deployed-devices/AuiDeviceManagementDeployedDevicePreferences'),
                meta: {
                    $p: {
                        operation: 'update',
                        resource: 'entity.pbxdevices'
                    },
                    get label () {
                        return i18n.global.t('Preferences')
                    },
                    icon: 'settings_applications',
                    hideFromPageMenu: true,
                    goToPathRewrite: ({ route, url }) => {
                        url.pathname = `/device/profile/${route.params.id}/preferences`
                        return url
                    },
                    parentPath: 'deviceManagementPage.deviceManagementDeployedDevicesPage.deviceManagementDeployedDeviceContext'
                }
            }
        ]
    },
    createAdvancedJournalRoute({
        name: 'deviceJournalAdvanced',
        path: '/device/journal',
        resource: 'pbxdevices',
        parentPath: 'deviceManagementPage',
        licenses: [LICENSES.device_provisioning, LICENSES.pbx]
    }),
    {
        name: 'deviceListCatchAll',
        path: '/device/:pathMatch(.*)',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.pbxdevices'
            },
            proxy: true,
            capability: 'cloudpbx'
        }
    }
]
