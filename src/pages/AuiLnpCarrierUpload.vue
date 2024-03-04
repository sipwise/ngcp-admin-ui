<template>
    <aui-base-add-page>
        <template
            #default="{loading }"
        >
            <aui-upload-csv
                :loading="loading"
                :label="$t('Upload Lnp')"
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
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import { mapWaitingActions } from 'vue-wait'
import AuiUploadCsv from 'components/edit-forms/AuiUploadCsv'
export default {
    name: 'AuiLnpCarrierUpload',
    components: {
        AuiUploadCsv,
        AuiFormActionsCreation,
        AuiBaseAddPage
    },
    methods: {
        ...mapWaitingActions('lnp', {
            uploadCsv: WAIT_PAGE
        }),
        async create (data) {
            await this.uploadCsv(data)
            showGlobalSuccessMessage(this.$t('Number porting created successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
