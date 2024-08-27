<template>
    <aui-base-page
        class="row no-wrap"
        :loading="$attrs.loading || $wait.is('aui-data-table-*')"
        v-bind="$attrs"
    >
        <q-list
            class="q-pl-md q-pt-md"
            style="width: 280px;"
        >
            <aui-main-menu-item
                v-for="(item, index) in menuItems"
                :key="index"
                :label="item.label"
                :icon="item.icon"
                :to="item.to"
            />
        </q-list>
        <aui-device-management-models-list
            v-if="showDeviceModel"
            class="aui-deviceManagement-list"
            style="width: 100%; overflow: auto;"
        />
        <aui-device-management-firmwares-list
            v-if="showDeviceFirmware"
            class="aui-deviceManagement-list"
            style="width: 100%; overflow: auto;"
        />
        <aui-device-management-configurations-list
            v-if="showDeviceConfigurations"
            class="aui-deviceManagement-list"
            style="width: 100%; overflow: auto;"
        />
        <aui-device-management-profiles-list
            v-if="showDeviceProfiles"
            class="aui-deviceManagement-list"
            style="width: 100%; overflow: auto;"
        />
        <aui-device-management-deployed-devices-list
            v-if="showDeployedDevices"
            class="aui-deviceManagement-list"
            style="width: 100%; overflow: auto;"
        />
    </aui-base-page>
</template>

<script>
import AuiDeviceManagementModelsList from 'src/pages/device-management-device-models/AuiDeviceManagementModelsList'
import AuiDeviceManagementFirmwaresList from 'src/pages/device-management-device-firmwares/AuiDeviceManagementFirmwaresList'
import AuiDeviceManagementConfigurationsList from 'src/pages/device-management-device-configurations/AuiDeviceManagementConfigurationsList'
import AuiDeviceManagementProfilesList from 'src/pages/device-management-device-profiles/AuiDeviceManagementProfilesList'
import AuiDeviceManagementDeployedDevicesList from 'src/pages/device-management-deployed-devices/AuiDeviceManagementDeployedDevicesList'
import AuiMainMenuItem from 'components/AuiMainMenuItem'
import AuiBasePage from 'pages/AuiBasePage'
export default {
    name: 'AuiDeviceManagementPage',
    components: {
        AuiMainMenuItem,
        AuiBasePage,
        AuiDeviceManagementModelsList,
        AuiDeviceManagementFirmwaresList,
        AuiDeviceManagementConfigurationsList,
        AuiDeviceManagementProfilesList,
        AuiDeviceManagementDeployedDevicesList
    },
    props: {
        showDeviceModel: {
            type: Boolean,
            default: false
        },
        showDeviceFirmware: {
            type: Boolean,
            default: false
        },
        showDeviceConfigurations: {
            type: Boolean,
            default: false
        },
        showDeviceProfiles: {
            type: Boolean,
            default: false
        },
        showDeployedDevices: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        menuItems () {
            return [
                {
                    label: this.$t('Device Models'),
                    icon: 'fas fa-fax',
                    to: { name: 'deviceManagementModelsPage' }
                },
                {
                    label: this.$t('Device Firmwares'),
                    icon: 'fas fa-fax',
                    to: { name: 'deviceManagementFirmwaresPage' }
                },
                {
                    label: this.$t('Device Configurations'),
                    icon: 'fas fa-fax',
                    to: { name: 'deviceManagementConfigurationsPage' }
                },
                {
                    label: this.$t('Device Profiles'),
                    icon: 'fas fa-fax',
                    to: { name: 'deviceManagementProfilesPage' }
                },
                {
                    label: this.$t('Deployed Devices'),
                    icon: 'fas fa-fax',
                    to: { name: 'deviceManagementDeployedDevicesPage' }
                }
            ]
        }
    }
}
</script>
<style lang="sass" rel="stylesheet/sass">
@import 'src/css/custom.variables.sass'
.aui-deviceManagement-list
    padding: $aui-page-padding
</style>
