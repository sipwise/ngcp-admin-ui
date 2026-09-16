<template>
    <router-view />
</template>
<script setup>
import { useDataContext } from 'src/composables/useDataContext'

defineOptions({ name: 'AuiEmergencyMappingContext' })

const props = defineProps({
    mappingId: {
        type: [String, Number],
        required: true
    }
})

useDataContext({
    resourceObjectId: 'emergencyMappingContext',
    resource: 'emergencymappings',
    resourceId: () => props.mappingId
})
</script>
