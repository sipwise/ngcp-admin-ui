<template>
    <aui-context-aware-page
        resource="billingprofiles"
        :resource-expand="[
            'reseller_id'
        ]"
        default-sub-context-route="billingProfileEdit"
        :context-name="({ resourceObject }) => {
            return (resourceObject) ? '#' + resourceObject.id + ' - ' + resourceObject.name : '...'
        }"
    >
        <router-view />
    </aui-context-aware-page>
</template>
<script>
import AuiContextAwarePage from 'pages/AuiContextAwarePage'
export default {
    components: { AuiContextAwarePage }
}
</script>
