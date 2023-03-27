<template>
    <aui-context-aware-page
        resource="emergencymappingcontainers"
        default-sub-context-route="emergencyMappingList"
        :context-name="({ resourceObject }) => {
            return '#' + resourceObject.id + ' - ' + resourceObject.name
        }"
    >
        <router-view />
    </aui-context-aware-page>
</template>

<script>
import AuiContextAwarePage from 'pages/AuiContextAwarePage'
export default {
    name: 'AuiEmergencyMappingContainerContext',
    components: {
        AuiContextAwarePage
    }
}
</script>
