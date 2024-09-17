<template>
    <aui-preferences-context
        preferences-id="pbxdevice"
        resource="pbxdevices"
        resource-data="pbxfielddevicepreferences"
        resource-schema="pbxfielddevicepreferencedefs"
        :readonly="!$aclCan('update', 'entity.pbxdevices')"
        :resource-id="$route.params.id"
    />
</template>
<script>
import AuiPreferencesContext from 'pages/AuiPreferencesContext'

export default {
    name: 'AuiDeviceManagementDeployeDevicePreferences',
    components: {
        AuiPreferencesContext
    }
}
</script>
