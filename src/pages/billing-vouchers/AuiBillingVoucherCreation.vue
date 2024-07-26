<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-billing-voucher
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
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
            </aui-new-billing-voucher>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewBillingVoucher from 'components/edit-forms/AuiNewBillingVoucher'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuibillingVoucherCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewBillingVoucher,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('billing', {
            createVouchers: WAIT_PAGE
        }),
        async create (data) {
            await this.createVouchers(data)
            showGlobalSuccessMessage(this.$t('Billing Vouchers created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
