<template>
    <aui-context-aware-page
        resource="billingnetworks"
        :resource-expand="[
            'reseller_id'
        ]"
        default-sub-context-route="billingNetworkEdit"
        :context-name="({ resourceObject }) => {
            return (resourceObject) ? resourceObject.name : '...'
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
