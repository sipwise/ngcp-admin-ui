<template>
    <aui-page-form-update
        ref="updatePage"
        icon="fas fa-users"
        resource="customers"
        :resource-id="$route.params.id"
        :resource-relations="resourceRelations"
        :resource-singular="$t('Customer')"
        resource-name-field="id"
        :loading="loading"
        :list-route="listRoute"
        :input-changed="!hasUnsavedData"
        @save="save"
        @reset="reset"
        @resource-loaded="resourceLoaded"
    >
        <aui-new-customer
            v-if="customer"
            ref="form"
            :loading="loading"
            :customer="customer"
            :contact="contact"
            :initial-billing-profile="billing_profile"
            :initial-subscriber-email-template="subscriber_email_template"
            :initial-passreset-email-template="passreset_email_template"
            :initial-invoice-email-template="invoice_email_template"
            :initial-invoice-template="invoice_template"
            :reseller-id="reseller_id"
            @saved="saved"
            @has-unsaved-data="hasUnsavedDataEvent"
        />
    </aui-page-form-update>
</template>
<script>
import AuiPageFormUpdate from 'pages/AuiPageFormUpdate'
import AuiNewCustomer from 'components/edit-forms/AuiNewCustomer'
export default {
    name: 'AuiPageCustomerUpdate',
    components: {
        AuiPageFormUpdate,
        AuiNewCustomer
    },
    data () {
        return {
            customer: null,
            contact: null,
            billing_profile: null,
            subscriber_email_template: null,
            passreset_email_template: null,
            invoice_email_template: null,
            invoice_template: null,
            reseller_id: null,
            hasUnsavedData: false // TODO restore fallback "true" when /customer endpoint is fixed
        }
    },
    computed: {
        listRoute () {
            return '/customer'
        },
        resourceRelations () {
            return {
                contact_id: {
                    resource: 'customercontacts'
                },
                billing_profile_id: {
                    resource: 'billingprofiles'
                },
                subscriber_email_template_id: {
                    resource: 'emailtemplates'
                },
                passreset_email_template_id: {
                    resource: 'emailtemplates'
                },
                invoice_email_template_id: {
                    resource: 'emailtemplates'
                },
                invoice_template_id: {
                    resource: 'invoicetemplates'
                }
            }
        },
        loading () {
            return this.$wait.is('aui-resource-object')
        }
    },
    methods: {
        save () {
            this.$refs.form.submit()
        },
        reset () {
            this.$refs.form.reset()
        },
        saved () {
            this.$refs.updatePage.load()
        },
        resourceLoaded (payload) {
            this.customer = payload.resourceObject
            this.billing_profile = payload.resourceRelatedObjects.billing_profile_id
            this.contact = payload.resourceRelatedObjects.contact_id
            this.subscriber_email_template = payload.resourceRelatedObjects.subscriber_email_template_id
            this.passreset_email_template = payload.resourceRelatedObjects.passreset_email_template_id
            this.invoice_email_template = payload.resourceRelatedObjects.invoice_email_template_id
            this.invoice_template = payload.resourceRelatedObjects.invoice_template_id
            this.reseller_id = this.contact.reseller_id
        },
        hasUnsavedDataEvent (hasUnsavedData) {
            // TODO restore when /customer endpoint is fixed
            // this.hasUnsavedData = hasUnsavedData
        }
    }
}
</script>
