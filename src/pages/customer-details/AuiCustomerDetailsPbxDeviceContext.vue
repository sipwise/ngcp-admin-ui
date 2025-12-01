<template>
    <aui-data-context
        resource-object-id="customerDetailsPbxDeviceContext"
        :resource="'pbxdevices'"
        :resource-id="$route.params.pbxDeviceId"
        :resource-expand="[
            'profile_id.device_id'
        ]"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    components: { AuiDataContext }
}
</script>
