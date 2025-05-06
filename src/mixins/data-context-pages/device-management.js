import dataContextPageMixin from 'src/mixins/data-context-page'
export default {
    mixins: [dataContextPageMixin],
    computed: {
        deviceManagementContextResourceId () {
            return this.$route.params.id
        },
        deviceManagementPreferenceContextResourceId () {
            return this.$route.params.preferenceId
        },
        deviceManagementModelContextResource () {
            return 'pbxdevicemodels'
        },
        deviceManagementModelPreferenceContextResource () {
            return 'preferencesmetaentries'
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
        deviceManagementDeployedContextId () {
            return 'deviceManagementDeployedDeviceContext'
        },
        deviceManagementModelPreferenceContextId () {
            return 'customerPreferenceContext'
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
        deviceManagementDeployedContextExpand () {
            return [
                'profile_id'
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
        deviceManagementDeployedContext () {
            return this.getDataContextObject(this.deviceManagementDeployedContextId)
        },
        deviceManagementModelPreferenceContext () {
            return this.getDataContextObject(this.deviceManagementModelPreferenceContextId)
        },
        customerPbxDeviceContext () {
            return this.getDataContextObject('customerDetailsPbxDeviceContext')
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
        },
        deviceManagementDeployeDeviceContextDeviceConfigId () {
            return this.deviceManagementDeployedContext?.profile_id_expand?.config_id
        },
        customerPbxDeviceContextConfigId () {
            return this.customerPbxDeviceContext?.profile_id_expand?.config_id
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
        },
        async reloadDeviceManagementModelPreferenceContext () {
            await this.reloadDataContext(this.deviceManagementModelPreferenceContextId)
        },
        async reloadPbxCustomerDeviceContext () {
            await this.reloadDataContext('customerDetailsPbxDeviceContext')
        }
    }
}
