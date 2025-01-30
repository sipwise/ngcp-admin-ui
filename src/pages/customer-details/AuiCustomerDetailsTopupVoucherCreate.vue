<template>
    <aui-base-add-context>
        <aui-new-top-up-voucher
            v-if="customerContext"
            :reseller-id="customerContext.billing_profile_id_expand.reseller_id"
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
        </aui-new-top-up-voucher>
    </aui-base-add-context>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewTopUpVoucher from 'components/edit-forms/AuiNewTopUpVoucher'
import AuiBaseAddContext from 'pages/AuiBaseAddContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCustomerDetailsTopUpVoucherCreate',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddContext,
        AuiNewTopUpVoucher
    },
    mixins: [
        customerContextMixin
    ],
    methods: {
        ...mapWaitingActions('customers', {
            createTopUpVoucher: WAIT_PAGE
        }),
        async create (data) {
            data.contract_id = this.customerContext.id
            await this.createTopUpVoucher(data)
            showGlobalSuccessMessage(this.$t('Successfully set top-up voucher'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
