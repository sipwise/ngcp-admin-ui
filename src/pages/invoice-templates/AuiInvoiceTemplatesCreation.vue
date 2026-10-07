<template>
    <aui-base-add-page>
        <template
            #default="{ initialFormData }"
        >
            <aui-new-invoice-template
                :initial-form-data="initialFormData"
                :reseller-id="resellerId"
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
            </aui-new-invoice-template>
        </template>
    </aui-base-add-page>
</template>

<script setup>
import AuiFormActionsCreation from 'components/AuiFormActionsCreation'
import AuiNewInvoiceTemplate from 'components/edit-forms/AuiNewInvoiceTemplate'
import AuiBaseAddPage from 'pages/AuiBaseAddPage'
import { useInvoiceTemplates } from 'src/composables/useInvoiceTemplates'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

defineOptions({ name: 'AuiInvoiceTemplatesCreation' })

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const { loading, createInvoiceTemplate } = useInvoiceTemplates()

const resellerId = computed(() => route.params.id ? Number(route.params.id) : null)

async function create (data) {
    try {
        await createInvoiceTemplate(data)
    } catch (error) {
        showGlobalErrorMessage(error)
        return
    }
    showGlobalSuccessMessage(t('Invoice template created successfully'))
    await router.push(resellerId.value
        ? { name: 'resellerDetailsInvoiceTemplates', params: { id: resellerId.value } }
        : { name: 'invoiceTemplateList' })
}
</script>
