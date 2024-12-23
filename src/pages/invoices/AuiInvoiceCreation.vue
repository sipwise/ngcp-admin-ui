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
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewInvoice from 'components/edit-forms/AuiNewInvoice'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
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
