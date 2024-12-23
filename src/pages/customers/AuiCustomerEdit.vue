<template>
    <aui-base-edit-context>
        <aui-new-customer
            v-if="customer"
            :initial-form-data="customer"
            :initial-contact="contact"
            :subscriber-email-template="subscriberEmailTemplate"
            :password-reset-email-template="passwordResetEmailTemplate"
            :invoice-email-template="invoiceEmailTemplate"
            :invoice-template="invoiceTemplate"
            :billing-profile="billingProfile"
            :billing-profiles="billingProfiles"
            :all-billing-profiles="allBillingProfiles"
            :profile-package="profilePackage"
            :loading="$waitPage($wait)"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-unsaved-data="hasUnsavedData"
                    :has-invalid-data="hasInvalidData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-customer>
    </aui-base-edit-context>
</template>
<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewCustomer from 'components/edit-forms/AuiNewCustomer'
import _ from 'lodash'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import customerContextPageMixin from 'src/mixins/data-context-pages/customer'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCustomerEdit',
    components: {
        AuiFormActionsUpdate,
        AuiBaseEditContext,
        AuiNewCustomer
    },
    mixins: [
        customerContextPageMixin
    ],
    computed: {
        customer () {
            return this.getDataContextObject('customerContext')
        },
        contact () {
            return _.get(this.customer, 'contact_id_expand')
        },
        subscriberEmailTemplate () {
            return _.get(this.customer, 'subscriber_email_template_id_expand')
        },
        passwordResetEmailTemplate () {
            return _.get(this.customer, 'passreset_email_template_id_expand')
        },
        invoiceEmailTemplate () {
            return _.get(this.customer, 'invoice_email_template_id_expand')
        },
        invoiceTemplate () {
            return _.get(this.customer, 'invoice_template_id_expand')
        },
        billingProfile () {
            return _.get(this.customer, 'billing_profile_id_expand')
        },
        billingProfiles () {
            return this.customerContextBillingProfiles
        },
        allBillingProfiles () {
            return this.customerContextAllBillingProfiles
        },
        profilePackage () {
            return _.get(this.customer, 'profile_package_id')
        }
    },
    methods: {
        ...mapWaitingActions('customers', {
            updateCustomer: WAIT_PAGE
        }),
        async update (data) {
            await this.updateCustomer(data)
            await this.reloadDataContext('customerContext')
            showGlobalSuccessMessage(this.$t('Customer saved successfully'))
        }
    }
}
</script>
