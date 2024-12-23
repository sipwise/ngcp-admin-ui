<template>
    <aui-base-edit-context>
        <aui-new-customer
            v-if="dataContextRootObject && dataContextObject"
            :initial-form-data="dataContextObject"
            :reseller-id="dataContextRootObject.id"
            :initial-contact="contact"
            :subscriber-email-template="subscriberEmailTemplate"
            :password-reset-email-template="passwordResetEmailTemplate"
            :invoice-email-template="invoiceEmailTemplate"
            :invoice-template="invoiceTemplate"
            :billing-profile="billingProfile"
            :billing-profiles="billingProfiles"
            :all-billing-profiles="allBillingProfiles"
            :profile-package="profilePackage"
            :loading="dataContextLoading"
            @submit="update"
        >
            <template
                #actions="{ loading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="loading"
                    :has-invalid-data="hasInvalidData"
                    :has-unsaved-data="hasUnsavedData"
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
import dataContext from 'src/mixins/data-context'
import dataContextPageMixin from 'src/mixins/data-context-page'
import { mapWaitingActions } from 'vue-wait'
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerDetailsCustomerEdit',
    components: {
        AuiBaseEditContext,
        AuiFormActionsUpdate,
        AuiNewCustomer
    },
    mixins: [
        dataContext,
        dataContextPageMixin
    ],
    props: {
        id: {
            type: [String, Number],
            default: null
        }
    },
    data () {
        return {
            initialData: null
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        dataContextResource () {
            return 'customers'
        },
        dataContextResourceId () {
            return this.$route.params.customerId
        },
        dataContextResourceExpand () {
            return [
                'contact_id',
                'contact_id.reseller_id',
                'subscriber_email_template_id',
                'passreset_email_template_id',
                'invoice_email_template_id',
                'invoice_template_id',
                'billing_profile_id',
                'profile_package_id'
            ]
        },
        dataContextFilters () {
            return {
                reseller_id: this.$route.params.id
            }
        },
        contact () {
            return _.get(this.dataContextObject, 'contact_id_expand')
        },
        subscriberEmailTemplate () {
            return _.get(this.dataContextObject, 'subscriber_email_template_id_expand')
        },
        passwordResetEmailTemplate () {
            return _.get(this.dataContextObject, 'passreset_email_template_id_expand')
        },
        invoiceEmailTemplate () {
            return _.get(this.dataContextObject, 'invoice_email_template_id_expand')
        },
        invoiceTemplate () {
            return _.get(this.dataContextObject, 'invoice_template_id_expand')
        },
        billingProfile () {
            return _.get(this.dataContextObject, 'billing_profile_id_expand')
        },
        billingProfiles () {
            return this.getDataContextRelatedObject('customerContext', 'billingProfiles')
        },
        allBillingProfiles () {
            return this.getDataContextRelatedObject('customerContext', 'allBillingProfiles')
        },
        profilePackage () {
            return _.get(this.dataContextObject, 'profile_package_id')
        }
    },
    methods: {
        ...mapWaitingActions('customers', {
            updateCustomer: WAIT_PAGE
        }),
        async update (data) {
            try {
                await this.updateCustomer(data)
                showGlobalSuccessMessage(this.$t('Customer saved successfully'))
            } finally {
                await this.dataContextLoad()
            }
        }
    }
}
</script>
