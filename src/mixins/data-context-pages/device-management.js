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
        }
    }
}
