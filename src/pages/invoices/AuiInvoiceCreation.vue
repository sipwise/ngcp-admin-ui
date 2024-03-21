<template>
    <aui-base-add-page>
        <template
            #default="props"
        >
            <aui-new-invoice
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
            </aui-new-invoice>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import AuiNewInvoice from 'components/edit-forms/AuiNewInvoice'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
export default {
    name: 'AuiInvoiceCreation',
    components: {
        AuiFormActionsCreation,
        AuiNewInvoice,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('invoices', {
            createInvoices: WAIT_PAGE
        }),
        async create (data) {
            await this.createInvoices(data)
            showGlobalSuccessMessage(this.$t('Invoice created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
