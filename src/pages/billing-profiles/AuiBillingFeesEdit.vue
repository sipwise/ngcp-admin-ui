<template>
    <aui-base-sub-context>
        <aui-new-billing-fees
            v-if="billingProfileContext && billingFeeContext"
            :initial-form-data="billingFeeContext"
            :loading="$waitPage($wait)"
            :zones="billingFeeContextZones"
            :billing-profile-id="billingProfileContextResourceId"
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
        </aui-new-billing-fees>
    </aui-base-sub-context>
</template>
<script>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewBillingFees from 'components/edit-forms/AuiNewBillingFees'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import billingFeesContextMixin from 'src/mixins/data-context-pages/billing-fees'
import billingProfileContextMixin from 'src/mixins/data-context-pages/billing-profile'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiBillingFeesEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewBillingFees
    },
    mixins: [
        billingProfileContextMixin,
        billingFeesContextMixin
    ],
    methods: {
        ...mapWaitingActions('billing', {
            updateBillingFees: WAIT_PAGE
        }),
        async update (data) {
            await this.updateBillingFees({
                id: this.billingFeeContext.id,
                payload: data
            })
            await this.reloadDataContext('billingFeeContext')
            showGlobalSuccessMessage(this.$t('Billing Fees saved successfully'))
        }
    }
}
</script>
