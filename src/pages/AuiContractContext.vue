<template>
    <aui-context-aware-page
        resource="contracts"
        :resource-relations="{
            contact_id: {
                name: 'contact',
                resource: 'systemcontacts'
            },
            billing_profile_id: {
                name: 'billingProfile',
                resource: 'billingprofiles'
            },
            billing_profiles: {
                name: 'billingProfiles',
                type: Array,
                resources: {
                    profile_id: {
                        name: 'profile',
                        resource: 'billingprofiles'
                    }
                }
            },
            all_billing_profiles: {
                name: 'allBillingProfiles',
                type: Array,
                resources: {
                    profile_id: {
                        name: 'profile',
                        resource: 'billingprofiles'
                    }
                }
            }
        }"
        context-root-route="contractContext"
        default-sub-context-route="contractEdit"
        :sub-context-routes="[
            'contractEdit'
        ]"
        :context-name="({ resourceObject, resourceRelatedObjects }) => {
            if (resourceObject && resourceRelatedObjects && resourceRelatedObjects.contact) {
                return String('#' + resourceObject.id + ' - ' + resourceRelatedObjects.contact.email)
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
    name: 'AuiContractContext',
    components: {
        AuiContextAwarePage
    }
}
</script>
