<template>
    <aui-base-add-page>
        <template
            #default="{ initialFormData, loading }"
        >
            <aui-upload-csv
                :initial-form-data="initialFormData"
                :loading="loading"
                :label="$t('Upload vouchers')"
                @submit="create"
            >
                <template
                    #actions="{ hasInvalidData, submit }"
                >
                    <aui-form-actions-creation
                        :loading="loading"
                        :has-invalid-data="hasInvalidData"
                        @submit="submit"
                    />
                </template>
            </aui-upload-csv>
        </template>
    </aui-base-add-page>
</template>
<script>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiUploadCsv from 'components/edit-forms/AuiUploadCsv'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiBillingVoucherUpload',
    components: {
        AuiUploadCsv,
        AuiFormActionsCreation,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('billing', {
            uploadVouchersAsCsv: WAIT_PAGE
        }),
        async create (data) {
            await this.uploadVouchersAsCsv(data)
            showGlobalSuccessMessage(this.$t('Vouchers entry created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
