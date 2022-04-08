<template>
    <aui-context-aware-page
        resource="admins"
        :resource-relations="{
            reseller_id: {
                name: 'reseller',
                resource: 'resellers'
            }
        }"
        context-root-route="adminContext"
        default-sub-context-route="adminEdit"
        :sub-context-routes="[
            'adminEdit'
        ]"
        :context-name="({ resourceObject, resourceRelatedObjects }) => {
            if (resourceObject && resourceRelatedObjects && resourceRelatedObjects.reseller) {
                return String('#' + resourceObject.id + ' - ' + resourceObject.login + ' (' + resourceRelatedObjects.reseller.name + ')')
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
    name: 'AuiAdminContext',
    components: {
        AuiContextAwarePage
    }
}
</script>
