<template>
    <aui-base-edit-context>
        <aui-new-batch-provisioning-template
            v-if="template && !isStaticTemplate(template)"
            :initial-form-data="template"
            :reseller-id="template.reseller_id"
            :reseller-name="template.reseller_id_expand?.name"
            :loading="loading"
            @submit="update"
        >
            <template
                #actions="{ loading: formLoading, hasInvalidData, hasUnsavedData, reset, submit }"
            >
                <aui-form-actions-update
                    :loading="formLoading"
                    :has-unsaved-data="hasUnsavedData"
                    :has-invalid-data="hasInvalidData"
                    @reset="reset"
                    @submit="submit"
                />
            </template>
        </aui-new-batch-provisioning-template>
        <div
            v-else-if="template"
            class="text-body1 q-pa-md"
        >
            {{ t('Static templates are defined in config.yml and cannot be edited') }}
        </div>
    </aui-base-edit-context>
</template>

<script setup>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewBatchProvisioningTemplate from 'components/edit-forms/AuiNewBatchProvisioningTemplate'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { useBatchProvisioningTemplateContext } from 'src/composables/useBatchProvisioningTemplateContext'
import { useBatchProvisioningTemplates } from 'src/composables/useBatchProvisioningTemplates'
import { isStaticTemplate, parseTemplateYaml } from 'src/helpers/batch-provisioning'
import { decodeHex } from 'src/helpers/hex'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

defineOptions({ name: 'AuiBatchProvisioningTemplateEdit' })

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const id = computed(() => decodeHex(route.params.id))

const { template } = useBatchProvisioningTemplateContext({
    resourceId: id,
    autoLoad: false
})
const { loading, updateTemplate } = useBatchProvisioningTemplates()

async function update (data) {
    try {
        await updateTemplate({
            id: id.value,
            payload: {
                name: data.name,
                description: data.description ?? '',
                lang: data.lang,
                template: parseTemplateYaml(data.template),
                reseller_id: data.reseller_id ?? null
            }
        })
    } catch (error) {
        showGlobalErrorMessage(error)
        return
    }
    showGlobalSuccessMessage(t('Template successfully updated'))

    await router.push({ name: 'batchProvisioningList' })
}
</script>
