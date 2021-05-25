<template>
    <aui-context-aware-page
        :resource="$route.query.resource"
        :resource-relations="resourceRelations"
        default-sub-context-route="contactEdit"
        :context-name="({ resourceObject }) => {
            if (resourceObject) {
                return String('#' + resourceObject.id + ' - ' + resourceObject.email)
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
            if (this.$route.query.resource === 'customercontacts') {
                return {
                    reseller_id: {
                        name: 'reseller',
                        resource: 'resellers'
                    }
                }
            }
            return null
        }
    }
}
</script>
