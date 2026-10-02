<template>
    <aui-base-edit-context>
        <aui-upload-csv
            :loading="loading"
            :label="$t('Upload CSV')"
            @submit="submit"
        >
            <template
                #actions="{ hasInvalidData, submit: submitForm }"
            >
                <aui-form-actions-creation
                    :loading="loading"
                    :has-invalid-data="hasInvalidData"
                    @submit="submitForm"
                />
            </template>
            <template
                v-if="columns.length > 0"
                #fields
            >
                <q-item
                    data-cy="batchprovisioningtemplates-upload-columns"
                >
                    <q-item-section>
                        <q-item-label
                            caption
                        >
                            {{ $t('CSV columns') }}: {{ columns.join(', ') }}
                        </q-item-label>
                    </q-item-section>
                </q-item>
            </template>
        </aui-upload-csv>
    </aui-base-edit-context>
</template>

<script setup>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiUploadCsv from 'components/edit-forms/AuiUploadCsv'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { useBatchProvisioningTemplateContext } from 'src/composables/useBatchProvisioningTemplateContext'
import { useBatchProvisioningTemplates } from 'src/composables/useBatchProvisioningTemplates'
import { isInputField } from 'src/helpers/batch-provisioning'
import { decodeHex } from 'src/helpers/hex'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

defineOptions({ name: 'AuiBatchProvisioningTemplateUpload' })

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const id = computed(() => decodeHex(route.params.id))

const { template } = useBatchProvisioningTemplateContext({
    resourceId: id,
    autoLoad: false
})
const { loading, uploadCsv } = useBatchProvisioningTemplates()

const columns = computed(() => (template.value?.template?.fields || [])
    .filter(isInputField)
    .map((field) => field.name))

async function submit (data) {
    try {
        await uploadCsv({
            id: id.value,
            file: data.file,
            purge_existing: data.purge_existing
        })
    } catch (error) {
        // rows are committed independently, so a failed upload may be partially applied
        showGlobalErrorMessage(error)
        return
    }
    showGlobalSuccessMessage(t('CSV file uploaded successfully'))
    await router.push({ name: 'batchProvisioningList' })
}
</script>
