<template>
    <aui-context-aware-page
        resource="resellers"
        :resource-relations="{
            contract_id: {
                name: 'contract',
                resource: 'contracts',
                relations: {
                    contact_id: {
                        name: 'contact',
                        resource: 'systemcontacts'
                    }
                }
            }
        }"
        default-sub-context-route="resellerEdit"
        :context-name="({ resourceObject }) => {
            if (resourceObject) {
                return String('#' + resourceObject.id + ' - ' + resourceObject.name)
            } else {
                return '...'
            }
        }"
    >
        <router-view />
    </aui-context-aware-page>
</template>

<script>
import AuiContextAwarePage from 'pages/AuiContextAwarePage'
export default {
    name: 'AuiResellerContext',
    components: {
        AuiContextAwarePage
    }
}
</script>
