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
        deviceManagementModelContextExpand () {
            return [
                'reseller_id'
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
        deviceManagementModelContextReseller () {
            return this.deviceManagementModelContext?.reseller_id_expand
        }
    },
    methods: {
        async reloadDeviceManagementModelContext () {
            await this.reloadDataContext(this.deviceManagementModelContextId)
        }
    }
}
