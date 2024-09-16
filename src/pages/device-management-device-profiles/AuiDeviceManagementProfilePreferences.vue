<template>
    <aui-preferences-context
        preferences-id="pbxdevice"
        resource="pbxdevices"
        resource-data="pbxdeviceprofilepreferences"
        resource-schema="pbxdeviceprofilepreferencedefs"
        :readonly="!$aclCan('update', 'entity.pbxdevices')"
        :resource-id="$route.params.id"
    />
</template>
<script>
import AuiPreferencesContext from 'pages/AuiPreferencesContext'

export default {
    name: 'AuiDeviceManagementProfilePreferences',
    components: {
        AuiPreferencesContext
    }
}
</script>
