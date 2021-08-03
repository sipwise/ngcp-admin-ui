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
                    },
                    billing_profile_id: {
                        name: 'billingProfile',
                        resource: 'billingprofiles'
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
        :loading="loading"
    >
        <router-view />
    </aui-context-aware-page>
</template>

<script>
import AuiContextAwarePage from 'pages/AuiContextAwarePage'
import { WAIT_PREFERENCES } from 'src/constants'
export default {
    name: 'AuiResellerContext',
    components: {
        AuiContextAwarePage
    },
    computed: {
        loading () {
            return this.$wait.is(WAIT_PREFERENCES)
        }
    }
}
</script>
