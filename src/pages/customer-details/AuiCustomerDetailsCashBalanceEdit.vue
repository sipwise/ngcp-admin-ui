<template>
    <aui-base-add-context>
        <aui-new-cash-balance
            v-if="customerContext && cashBalance"
            :initial-form-data="cashBalance"
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
        </aui-new-cash-balance>
    </aui-base-add-context>
</template>

<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewCashBalance from 'components/edit-forms/AuiNewCashBalance'
import AuiBaseAddContext from 'pages/AuiBaseAddContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import customerContextMixin from 'src/mixins/data-context-pages/customer'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiCustomerDetailsCashBalanceEdit',
    components: {
        AuiFormActionsCreation,
        AuiBaseAddContext,
        AuiNewCashBalance
    },
    mixins: [
        customerContextMixin
    ],
    computed: {
        cashBalance () {
            return this.getDataContextObject('customerDetailsContractBalanceContext')
        }
    },
    methods: {
        ...mapWaitingActions('customers', {
            updateCashBalance: WAIT_PAGE
        }),
        async create (data) {
            await this.updateCashBalance(data)
            showGlobalSuccessMessage(this.$t('Successfully updated Cash Balance'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
