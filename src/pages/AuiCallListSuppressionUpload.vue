<template>
    <aui-base-add-page>
        <template
            #default="{ initialFormData, loading }"
        >
            <aui-upload-csv
                :initial-form-data="initialFormData"
                :loading="loading"
                :label="$t('Upload CSV')"
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
            <div class="q-mb-md q-pa-md">
                <div class="text-caption text-grey-7">
                    {{ $t('CSV Column Order') }} ({{ $t('Headers are not allowed') }}): {{ $t('Domain') }}, {{ $t('Direction') }}, {{ $t('Pattern') }}, {{ $t('Mode') }}, {{ $t('Label') }}
                </div>
            </div>
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
    name: 'AuiCallListSuppressionUpload',
    components: {
        AuiBaseAddPage,
        AuiFormActionsCreation,
        AuiUploadCsv
    },
    methods: {
        ...mapWaitingActions('callListSuppressions', {
            uploadCsv: WAIT_PAGE
        }),
        async create (data) {
            await this.uploadCsv(data)
            showGlobalSuccessMessage(this.$t('Call list suppression saved successfully'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
