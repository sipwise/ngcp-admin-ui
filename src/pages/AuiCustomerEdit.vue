<template>
    <aui-base-edit-context
        :has-unsaved-data="hasUnsavedData"
        @save="triggerSave"
        @reset="triggerReset"
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
            :loading="loading"
            @has-unsaved-data="hasUnsavedData=$event"
            @input="submit"
        />
    </aui-base-edit-context>
</template>
<script>
import AuiNewCustomer from 'components/edit-forms/AuiNewCustomer'
import { mapActions, mapState } from 'vuex'
import { WAIT_CONTEXT_AWARE_PAGE } from 'src/constants'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
export default {
    name: 'AuiCustomerEdit',
    components: {
        AuiBaseEditContext,
        AuiNewCustomer
    },
    data () {
        return {
            hasUnsavedData: false
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject',
            'resourceRelatedObjects'
        ]),
        loading () {
            return this.$wait.is(WAIT_CONTEXT_AWARE_PAGE)
        }
    },
    methods: {
        ...mapActions('customers', [
            'updateCustomer'
        ]),
        ...mapActions('page', [
            'reloadContext'
        ]),
        triggerSave () {
            this.$refs.form.submit()
        },
        triggerReset () {
            this.$refs.form.reset()
        },
        async submit (data) {
            try {
                this.$wait.start(WAIT_CONTEXT_AWARE_PAGE)
                await this.updateCustomer(data)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Customer saved successfully'))
            } catch (err) {
                this.triggerReset()
                throw err
            } finally {
                this.$wait.end(WAIT_CONTEXT_AWARE_PAGE)
            }
        }
    }
}
</script>
