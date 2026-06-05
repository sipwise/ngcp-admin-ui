<template>
    <aui-base-add-page>
        <template
            #default="{ initialFormData, loading }"
        >
            <aui-upload-csv
                :initial-form-data="initialFormData"
                :loading="loading"
                :label="$t('Upload CSV')"
                :additional-required-fields="additionalRequiredFields"
                @submit="create"
            >
                <template
                    #fields="{ formData, loading: fieldLoading, hasFieldError, getFieldError, validateField }"
                >
                    <aui-base-form-field
                        v-if="requiresResellerSelection"
                    >
                        <aui-select-reseller
                            v-model="formData.reseller_id"
                            dense
                            class="aui-required"
                            :hide-bottom-space="true"
                            :disable="fieldLoading"
                            :error="hasFieldError('reseller_id')"
                            :error-message="getFieldError('reseller_id')"
                            @blur="validateField('reseller_id')"
                        />
                    </aui-base-form-field>
                </template>
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
                    {{ $t('CSV Column Order') }}: container name, code, prefix, suffix
                </div>
            </div>
        </template>
    </aui-base-add-page>
</template>

<script>
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiSelectReseller from 'components/AuiSelectReseller'
import AuiUploadCsv from 'components/edit-forms/AuiUploadCsv'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { WAIT_PAGE } from 'src/constants'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapWaitingActions } from 'vue-wait'

export default {
    name: 'AuiEmergencyMappingContainerUpload',
    components: {
        AuiBaseAddPage,
        AuiBaseFormField,
        AuiFormActionsCreation,
        AuiSelectReseller,
        AuiUploadCsv
    },
    computed: {
        requiresResellerSelection () {
            return this.$aclCan('read', 'entity.resellers')
        },
        additionalRequiredFields () {
            return this.requiresResellerSelection ? ['reseller_id'] : []
        }
    },
    methods: {
        ...mapWaitingActions('emergencyMappings', {
            uploadCsv: WAIT_PAGE
        }),
        async create (data) {
            await this.uploadCsv(data)
            showGlobalSuccessMessage(this.$t('Successfully created emergency mappings'))
            await this.$auiGoToPrevForm()
        }
    }
}
</script>
