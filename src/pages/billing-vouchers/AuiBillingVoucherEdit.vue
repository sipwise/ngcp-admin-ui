<template>
    <aui-base-sub-context>
        <aui-new-billing-voucher
            v-if="billingVoucherContext"
            :initial-form-data="billingVoucherContext"
            :reseller="billingVoucherContextReseller"
            :customer="billingVoucherContextCustomer"
            :contact="billingVoucherContextCustomerContact"
            :package="billingVoucherContextPackage"
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
                    :path="'voucherList'"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-billing-voucher>
    </aui-base-sub-context>
</template>
<script>
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiNewBillingVoucher from 'components/edit-forms/AuiNewBillingVoucher'
import { mapWaitingActions } from 'vue-wait'
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataContextPageMixin from 'src/mixins/data-context-page'
import billingVoucherContextMixin from 'src/mixins/data-context-pages/billing-vouchers'
export default {
    name: 'AuiBillingVoucherEdit',
    components: {
        AuiBaseSubContext,
        AuiFormActionsUpdate,
        AuiNewBillingVoucher
    },
    mixins: [
        dataContextPageMixin,
        billingVoucherContextMixin
    ],
    methods: {
        ...mapWaitingActions('billing', {
            updateBillingVouchers: WAIT_PAGE
        }),
        async update (data) {
            await this.updateBillingVouchers({
                id: this.billingVoucherContext.id,
                payload: data
            })
            await this.reloadBillingVoucherContext()
            showGlobalSuccessMessage(this.$t('Billing Vouchers updated successfully'))
        }
    }
}
</script>
