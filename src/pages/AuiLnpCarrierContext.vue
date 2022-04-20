<template>
    <aui-context-aware-page
        resource="lnpcarriers"
        default-sub-context-route="lnpCarrierList"
        :context-name="({ resourceObject }) => {
            return resourceObject.name
        }"
    >
        <router-view />
    </aui-context-aware-page>
</template>

<script>
import AuiContextAwarePage from 'pages/AuiContextAwarePage'
export default {
    name: 'AuiLnpCarrierContext',
    components: {
        AuiContextAwarePage
    }
}
</script>
