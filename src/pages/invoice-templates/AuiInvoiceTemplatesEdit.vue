<template>
    <aui-base-edit-context>
        <aui-new-invoice-template
            v-if="template"
            :initial-form-data="template"
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
        </aui-new-invoice-template>
    </aui-base-edit-context>
</template>

<script setup>
import AuiFormActionsUpdate from 'components/AuiFormActionsUpdate'
import AuiNewInvoiceTemplate from 'components/edit-forms/AuiNewInvoiceTemplate'
import AuiBaseEditContext from 'pages/AuiBaseEditContext'
import { useInvoiceTemplateContext } from 'src/composables/useInvoiceTemplateContext'
import { useInvoiceTemplates } from 'src/composables/useInvoiceTemplates'
import { buildInvoiceTemplatePatch, toInvoiceTemplateFormData } from 'src/helpers/invoice-templates'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

defineOptions({ name: 'AuiInvoiceTemplatesEdit' })

const { t } = useI18n()
const route = useRoute()

const { template, reload } = useInvoiceTemplateContext({
    resourceId: () => route.params.id,
    autoLoad: false
})
const { loading, updateInvoiceTemplate } = useInvoiceTemplates()

async function update (data) {
    const operations = buildInvoiceTemplatePatch(toInvoiceTemplateFormData(template.value), data)
    if (operations.length) {
        try {
            await updateInvoiceTemplate({ id: route.params.id, operations })
        } catch (error) {
            showGlobalErrorMessage(error)
            return
        }
        await reload()
    }
    showGlobalSuccessMessage(t('Invoice template saved successfully'))
}
</script>
