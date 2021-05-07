<template>
    <aui-base-edit-context
        @form-input="triggerUpdate"
    >
        <aui-new-customer
            v-if="resourceObject"
            ref="form"
            :customer="resourceObject"
            :contact="resourceRelatedObjects.contact"
            :subscriber-email-template="resourceRelatedObjects.subscriberEmailTemplate"
            :password-reset-email-template="resourceRelatedObjects.passwordResetEmailTemplate"
            :invoice-email-template="resourceRelatedObjects.invoiceEmailTemplate"
            :invoice-template="resourceRelatedObjects.invoiceTemplate"
            :billing-profile="resourceRelatedObjects.billingProfile"
            :billing-profiles="resourceRelatedObjects.billingProfiles"
            :all-billing-profiles="resourceRelatedObjects.allBillingProfiles"
            :profile-package="resourceRelatedObjects.profilePackage"
            :loading="$waitPage()"
        />
    </aui-base-edit-context>
</template>
<script>
import AuiNewCustomer from 'components/edit-forms/AuiNewCustomer'
import { mapActions, mapState } from 'vuex'
import { WAIT_PAGE } from 'src/constants'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'AuiCustomerEdit',
    components: {
        AuiBaseEditContext,
        AuiNewCustomer
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects'
        ])
    },
    methods: {
        ...mapActions('customers', [
            'updateCustomer'
        ]),
        ...mapActions('page', [
            'reloadContext'
        ]),
        async triggerUpdate (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.updateCustomer(data)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Customer saved successfully'))
            } catch (err) {
                this.$refs.form.reset()
                throw err
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
