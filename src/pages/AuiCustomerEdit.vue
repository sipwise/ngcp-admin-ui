<template>
    <aui-base-edit-context>
        <aui-new-customer
            v-if="resourceObject"
            :initial-form-data="resourceObject"
            :initial-contact="resourceRelatedObjects.contact"
            :subscriber-email-template="resourceRelatedObjects.subscriberEmailTemplate"
            :password-reset-email-template="resourceRelatedObjects.passwordResetEmailTemplate"
            :invoice-email-template="resourceRelatedObjects.invoiceEmailTemplate"
            :invoice-template="resourceRelatedObjects.invoiceTemplate"
            :billing-profile="resourceRelatedObjects.billingProfile"
            :billing-profiles="resourceRelatedObjects.billingProfiles"
            :all-billing-profiles="resourceRelatedObjects.allBillingProfiles"
            :profile-package="resourceRelatedObjects.profilePackage"
            :loading="$waitPage()"
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
import AuiNewCustomer from 'components/edit-forms/AuiNewCustomer'
import { mapActions, mapState } from 'vuex'
import { WAIT_PAGE } from 'src/constants'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
export default {
    name: 'AuiCustomerEdit',
    components: {
        AuiFormActionsUpdate,
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
        async update (data) {
            try {
                this.$wait.start(WAIT_PAGE)
                await this.updateCustomer(data)
                await this.reloadContext()
                showGlobalSuccessMessage(this.$t('Customer saved successfully'))
            } finally {
                this.$wait.end(WAIT_PAGE)
            }
        }
    }
}
</script>
