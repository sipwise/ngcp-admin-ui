<template>
    <aui-base-add-page>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-batch-provisioning-template
                :initial-form-data="initialFormData"
                :loading="loading"
                @submit="create"
            >
                <template
                    #actions="{ loading: formLoading, hasInvalidData, submit }"
                >
                    <aui-form-actions-creation
                        :loading="formLoading"
                        :has-invalid-data="hasInvalidData"
                        @submit="submit"
                    />
                </template>
            </aui-new-batch-provisioning-template>
        </template>
    </aui-base-add-page>
</template>

<script setup>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewBatchProvisioningTemplate from 'components/edit-forms/AuiNewBatchProvisioningTemplate'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { useBatchProvisioningTemplates } from 'src/composables/useBatchProvisioningTemplates'
import { parseTemplateYaml } from 'src/helpers/batch-provisioning'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

defineOptions({ name: 'AuiBatchProvisioningTemplateCreation' })

const { t } = useI18n()
const router = useRouter()
const { loading, createTemplate } = useBatchProvisioningTemplates()

async function create (data) {
    try {
        await createTemplate({
            name: data.name,
            reseller_id: data.reseller_id,
            description: data.description,
            lang: data.lang,
            template: parseTemplateYaml(data.template)
        })
    } catch (error) {
        showGlobalErrorMessage(error)
        return
    }
    showGlobalSuccessMessage(t('Template created successfully'))
    await router.push({ name: 'batchProvisioningList' })
}
</script>
