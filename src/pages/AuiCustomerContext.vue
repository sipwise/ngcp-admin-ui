<template>
    <aui-context-aware-page
        resource="customers"
        :resource-id="$route.params.id"
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
            profile_package_id: {
                name: 'profilePackage',
                resource: 'profilepackages'
            }
        }"
        :breadcrumb-root-item="{
            route: 'customerList',
            label: $t('Customers'),
            icon: 'fas fa-user-tie'
        }"
        :breadcrumb-menu-items="[
            {
                route: 'customerDetails1',
                label: $t('CustomersDetails1')
            },
            {
                route: 'customerDetails2',
                label: $t('CustomersDetails2')
            }
        ]"
        :context-name="({ resourceObject, resourceRelatedObjects }) => {
            if (resourceObject) {
                return String('#' + resourceObject.id + ' - ' + resourceRelatedObjects.contact.email)
            } else {
                return '...'
            }
        }"
        :context-route="{
            name: 'customerPreferences',
            params: {
                id: $route.params.id
            }
        }"
    >
        <router-view />
    </aui-context-aware-page>
</template>

<script>
import AuiContextAwarePage from 'pages/AuiContextAwarePage'
export default {
    name: 'AuiCustomerContext',
    components: {
        AuiContextAwarePage
    }
}
</script>
