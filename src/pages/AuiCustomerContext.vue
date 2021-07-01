<template>
    <aui-context-aware-page
        resource="customers"
        :resource-relations="{
            contact_id: {
                name: 'contact',
                resource: 'customercontacts'
            },
            subscriber_email_template_id: {
                name: 'subscriberEmailTemplate',
                resource: 'emailtemplates'
            },
            passreset_email_template_id: {
                name: 'passwordResetEmailTemplate',
                resource: 'emailtemplates'
            },
            invoice_email_template_id: {
                name: 'invoiceEmailTemplate',
                resource: 'emailtemplates'
            },
            invoice_template_id: {
                name: 'invoiceTemplate',
                resource: 'invoicetemplates'
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
                    },
                    network_id: {
                        name: 'network',
                        resource: 'billingnetworks'
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
                    },
                    network_id: {
                        name: 'network',
                        resource: 'billingnetworks'
                    }
                }
            },
            profile_package_id: {
                name: 'profilePackage',
                resource: 'profilepackages'
            }
        }"
        default-sub-context-route="customerEdit"
        :context-name="({ resourceObject, resourceRelatedObjects }) => {
            if (resourceObject && resourceRelatedObjects && resourceRelatedObjects.contact) {
                return String('#' + resourceObject.id + ' - ' + resourceRelatedObjects.contact.email)
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
    name: 'AuiCustomerContext',
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
