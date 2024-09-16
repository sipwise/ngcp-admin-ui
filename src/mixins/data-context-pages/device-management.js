import dataContextPageMixin from 'src/mixins/data-context-page'
export default {
    mixins: [dataContextPageMixin],
    computed: {
        deviceManagementContextResourceId () {
            return this.$route.params.id
        },
        deviceManagementModelContextResource () {
            return 'pbxdevicemodels'
        },
        deviceManagementModelContextId () {
            return 'deviceManagementModelContext'
        },
        deviceManagementFirmwareContextId () {
            return 'deviceManagementFirmwareContext'
        },
        deviceManagementConfigurationContextId () {
            return 'deviceManagementConfigurationContext'
        },
        deviceManagementProfileContextId () {
            return 'deviceManagementProfileContext'
        },
        deviceManagementModelContextExpand () {
            return [
                'reseller_id'
            ]
        },
        deviceManagementContextExpand () {
            return [
                'device_id'
            ]
        },
        deviceManagementProfileContextExpand () {
            return [
                'config_id.device_id'
            ]
        },
        deviceManagementFirmwareContextResource () {
            return 'pbxdevicefirmwares'
        },
        deviceManagementConfigurationContextResource () {
            return 'pbxdeviceconfigs'
        },
        deviceManagementProfileContextResource () {
            return 'pbxdeviceprofiles'
        },
        deviceManagementDeployedDeviceContextResource () {
            return 'pbxdevices'
        },
        deviceManagementModelContext () {
            return this.getDataContextObject(this.deviceManagementModelContextId)
        },
        deviceManagementFirmwareContext () {
            return this.getDataContextObject(this.deviceManagementFirmwareContextId)
        },
        deviceManagementConfigurationContext () {
            return this.getDataContextObject(this.deviceManagementConfigurationContextId)
        },
        deviceManagementProfileContext () {
            return this.getDataContextObject(this.deviceManagementProfileContextId)
        },
        deviceManagementModelContextReseller () {
            return this.deviceManagementModelContext?.reseller_id_expand
        },
        deviceManagementFirmwareContextDevice () {
            return this.deviceManagementFirmwareContext?.device_id_expand
        },
        deviceManagementConfigurationContextDevice () {
            return this.deviceManagementConfigurationContext?.device_id_expand
        },
        deviceManagementProfileContextDeviceConfig () {
            return this.deviceManagementProfileContext?.config_id_expand
        }
    },
    methods: {
        async reloadDeviceManagementModelContext () {
            await this.reloadDataContext(this.deviceManagementModelContextId)
        },
        async reloadDeviceManagementFirmwareContext () {
            await this.reloadDataContext(this.deviceManagementFirmwareContextId)
        },
        async reloadDeviceManagementConfigurationContext () {
            await this.reloadDataContext(this.deviceManagementConfigurationContextId)
        },
        async reloadDeviceManagementProfileContext () {
            await this.reloadDataContext(this.deviceManagementProfileContextId)
        }
    }
}
