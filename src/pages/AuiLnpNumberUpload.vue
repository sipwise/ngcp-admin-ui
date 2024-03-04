<template>
    <aui-base-sub-context>
        <template
            #default="{loading }"
        >
            <aui-upload-csv
                :loading="loading"
                :label="$t('Upload Lnp Number')"
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
export default {
    name: 'AuiLnpNumberUpload',
    components: {
        AuiUploadCsv,
        AuiFormActionsCreation,
        AuiBaseSubContext
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
