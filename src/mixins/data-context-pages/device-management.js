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
        deviceManagementModelContextExpand () {
            return [
                'reseller_id'
            ]
        },
        deviceManagementFirmwareContextExpand () {
            return [
                'device_id'
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
        deviceManagementModelContextReseller () {
            return this.deviceManagementModelContext?.reseller_id_expand
        },
        deviceManagementFirmwareContextDevice () {
            return this.deviceManagementFirmwareContext?.device_id_expand
        }
    },
    methods: {
        async reloadDeviceManagementModelContext () {
            await this.reloadDataContext(this.deviceManagementModelContextId)
        },
        async reloadDeviceManagementFirmwareContext () {
            await this.reloadDataContext(this.deviceManagementFirmwareContextId)
        }
    }
}
