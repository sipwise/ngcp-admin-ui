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
        :loading="loading"
    >
        <router-view />
    </aui-context-aware-page>
</template>

<script>
import AuiContextAwarePage from 'pages/AuiContextAwarePage'
import { WAIT_PREFERENCES } from 'src/constants'
export default {
    name: 'AuiDomainContext',
    components: {
        AuiContextAwarePage
    },
    computed: {
        resourceRelations () {
            return {
                reseller_id: {
                    name: 'reseller',
                    resource: 'resellers',
                    required: false
                }
            }
        },
        loading () {
            return this.$wait.is(WAIT_PREFERENCES)
        }
    }
}
</script>
