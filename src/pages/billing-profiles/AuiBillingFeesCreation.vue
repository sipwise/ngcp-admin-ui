<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-new-billing-fees
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
                :billing-profile-id="billingProfileContextResourceId"
                @submit="create"
            >
                <template
                    #actions="{ loading, hasInvalidData, submit }"
                >
                    <aui-form-actions-creation
                        :loading="loading"
                        :has-invalid-data="hasInvalidData"
                        @submit="submit"
                    />
                </template>
            </aui-new-billing-fees>
        </template>
    </aui-base-sub-context>
</template>

<script>
import AuiNewBillingFees from 'components/edit-forms/AuiNewBillingFees'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import billingProfileContextMixin from 'src/mixins/data-context-pages/billing-profile'
export default {
    name: 'AuiBillingFeesCreation',
    components: {
        AuiBaseSubContext,
        AuiFormActionsCreation,
        AuiNewBillingFees
    },
    mixins: [
        billingProfileContextMixin
    ],
    methods: {
        ...mapWaitingActions('billing', {
            createBillingFees: WAIT_PAGE
        }),
        async create (data) {
            await this.createBillingFees(data)
            showGlobalSuccessMessage(this.$t('Billing Fees created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
