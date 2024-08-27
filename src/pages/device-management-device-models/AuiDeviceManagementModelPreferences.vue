<template>
    <aui-preferences-context
        preferences-id="pbxdevice"
        resource="pbxdevices"
        resource-data="pbxdevicepreferences"
        resource-schema="pbxdevicepreferencedefs"
        is-device-model-preferences="true"
        :readonly="!$aclCan('update', 'entity.pbxdevices')"
        :resource-id="$route.params.id"
    />
</template>
<script>
import AuiPreferencesContext from 'pages/AuiPreferencesContext'

export default {
    name: 'AuiDeviceManagementModelPreferences',
    components: {
        AuiPreferencesContext
    }
}
</script>
