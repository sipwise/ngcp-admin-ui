<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-upload-csv
                :initial-form-data="props.initialFormData"
                :loading="$waitPage($wait)"
                :label="$t('Upload Fees as CSV')"
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
    </aui-base-sub-context>
</template>
<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import AuiUploadCsv from 'components/edit-forms/AuiUploadCsv'
import billingProfileContextMixin from 'src/mixins/data-context-pages/billing-profile'
export default {
    name: 'AuiBillingFeesUpload',
    components: {
        AuiUploadCsv,
        AuiFormActionsCreation,
        AuiBaseSubContext
    },
    mixins: [
        billingProfileContextMixin
    ],
    methods: {
        ...mapWaitingActions('billing', {
            uploadCsv: WAIT_PAGE
        }),
        async create (data) {
            await this.uploadCsv({
                ...data,
                billingProfileId: this.billingProfileContextResourceId
            })
            showGlobalSuccessMessage(this.$t('Billing Fees created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
