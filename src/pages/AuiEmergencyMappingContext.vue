<template>
    <aui-data-context
        resource-object-id="emergencyMappingContext"
        resource="emergencymappings"
        :resource-id="mappingId"
    />
</template>
<script>
import AuiDataContext from 'components/AuiDataContext'
export default {
    name: 'AuiEmergencyMappingContext',
    components: { AuiDataContext },
    props: {
        mappingId: {
            type: [String, Number],
            required: true
        }
    }
}
</script>
