<template>
    <aui-context-aware-page
        resource="domains"
        :resource-relations="resourceRelations"
        default-sub-context-route="domainPreferences"
        :context-name="({ resourceObject }) => {
            if (resourceObject) {
                return String('#' + resourceObject.id + ' - ' + resourceObject.domain)
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
    name: 'AuiContactContext',
    components: {
        AuiContextAwarePage
    },
    computed: {
        resourceRelations () {
            return {
                reseller_id: {
                    name: 'reseller',
                    resource: 'resellers'
                }
            }
        }
    }
}
</script>
