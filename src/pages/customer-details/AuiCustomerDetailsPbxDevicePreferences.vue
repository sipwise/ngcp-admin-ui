<template>
    <aui-preferences-context
        preferences-id="pbxdevice"
        resource="pbxdevices"
        resource-data="pbxfielddevicepreferences"
        resource-schema="pbxfielddevicepreferencedefs"
        :readonly="!$aclCan('update', 'entity.pbxdevices')"
        :resource-id="$route.params.pbxDeviceId"
    />
</template>
<script>
import AuiPreferencesContext from 'pages/AuiPreferencesContext'

export default {
    name: 'AuiCustomerDetailsPbxDevicePreferences',
    components: {
        AuiPreferencesContext
    }
}
</script>
