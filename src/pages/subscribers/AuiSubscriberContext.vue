<template>
    <aui-context-aware-page
        resource="subscribers"
        :resource-expand="[
            'domain_id',
            'profile_id',
            'profile_set_id',
            'customer_id',
            'customer_id.contact_id'
        ]"
        default-sub-context-route="subscriberDetails"
        :context-name="({ resourceObject }) => {
            return (resourceObject) ? resourceObject.webusername : '...'
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
