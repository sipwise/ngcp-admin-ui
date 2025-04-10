<template>
    <aui-base-add-context>
        <aui-new-top-up-cash
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
        </aui-new-top-up-cash>
    </aui-base-add-context>
</template>
<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewTopUpCash from 'components/edit-forms/AuiNewTopUpCash'
import AuiBaseAddContext from 'pages/AuiBaseAddContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCustomerDetailsTopUpCashCreate',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddContext,
        AuiNewTopUpCash
    },
    mixins: [
        customerContextMixin
    ],
    methods: {
        ...mapWaitingActions('customers', {
            createTopUpCash: WAIT_PAGE
        }),
        async create (data) {
            if (this.customerContext.profile_package_id !== null) {
                data.package_id = this.customerContext.profile_package_id
            }
            data.contract_id = this.customerContext.id
            await this.createTopUpCash(data)
            showGlobalSuccessMessage(this.$t('Successfully set top-up cash'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
