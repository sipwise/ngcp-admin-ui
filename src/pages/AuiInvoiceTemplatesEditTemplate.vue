<template>
    <div class="q-pa-sm">
        <div class="row q-mb-md">
            <q-btn
                outline
                color="primary"
                icon="arrow_back"
                :label="$t('Back')"
                data-cy="btn-back"
                @click="goBack"
            />

            <q-btn
                class="q-ml-sm"
                color="primary"
                icon="picture_as_pdf"
                :label="$t('Preview as PDF')"
                :loading="loading"
                @click="previewAsPdf"
            />

            <q-btn
                class="q-ml-sm"
                color="primary"
                icon="save"
                :label="$t('Save')"
                :loading="loading"
                @click="save"
            />

            <q-btn
                class="q-ml-sm"
                color="primary"
                outline
                icon="data_object"
                :label="$t('Variables')"
                :loading="loading"
                data-cy="btn-template-vars"
                @click="toggleVars"
            />

            <q-btn
                class="q-ml-sm"
                color="negative"
                icon="restore"
                :label="$t('Discard changes')"
                :loading="loading"
                @click="confirmDiscard"
            />
        </div>
        <div class="row no-wrap">
            <div class="col">
                <AuiSvgEditTemplate
                    ref="svgEditor"
                    :initial-svg-content="templateContent"
                />
            </div>
            <AuiInvoiceTemplateVars
                v-if="showVars"
                class="col-3 q-ml-sm"
                :vars="templateVars"
                :category="templateCategory"
            />
        </div>
    </div>
</template>

<script setup>
import NegativeConfirmationDialog from 'components/dialog/NegativeConfirmationDialog'
import { useQuasar } from 'quasar'
import AuiInvoiceTemplateVars from 'src/components/svgEdit/AuiInvoiceTemplateVars'
import AuiSvgEditTemplate from 'src/components/svgEdit/AuiSvgEditTemplate'
import { useInvoiceTemplates } from 'src/composables/useInvoiceTemplates'
import { unescapeInvoiceTemplateDirectives } from 'src/helpers/invoice-templates'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'

defineOptions({ name: 'AuiInvoiceTemplatesEditTemplate' })

const { t } = useI18n()
const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const {
    loading,
    fetchInvoiceTemplate,
    fetchInvoiceTemplateVars,
    fetchInvoiceTemplatePreview,
    fetchInvoiceTemplateContent,
    uploadInvoiceTemplate
} = useInvoiceTemplates()

const templateId = route.params.id
const svgEditor = ref(null)
const templateContent = ref(null)
const templateVars = ref(null)
const templateCategory = ref(null)
const showVars = ref(false)

onMounted(loadTemplate)

async function loadTemplate () {
    templateContent.value = await fetchInvoiceTemplateContent(templateId)
}

async function goBack () {
    if (window.history.state?.back) {
        router.back()
    } else {
        await router.push({ name: 'invoiceTemplateList' })
    }
}

async function toggleVars () {
    showVars.value = !showVars.value
    if (showVars.value && !templateVars.value) {
        try {
            const [vars, template] = await Promise.all([
                fetchInvoiceTemplateVars(templateId),
                fetchInvoiceTemplate(templateId)
            ])
            templateVars.value = vars
            templateCategory.value = template.category
        } catch {
            showVars.value = false
        }
    }
}

async function previewAsPdf () {
    const pdfBlob = await fetchInvoiceTemplatePreview(templateId)
    const pdfUrl = URL.createObjectURL(pdfBlob)
    window.open(pdfUrl, '_blank')
    // give the new tab time to load the blob before releasing it
    setTimeout(() => URL.revokeObjectURL(pdfUrl), 60000)
}

async function save () {
    const svgContent = svgEditor.value.getSvgContent()
    if (!svgContent) {
        return showGlobalErrorMessage(t('No content to save'))
    }
    await uploadInvoiceTemplate({
        id: templateId,
        content: unescapeInvoiceTemplateDirectives(svgContent)
    })
    showGlobalSuccessMessage(t('Invoice template saved successfully'))
}

function confirmDiscard () {
    $q.dialog({
        component: NegativeConfirmationDialog,
        componentProps: {
            title: t('Discard changes'),
            icon: 'restore',
            text: t('Are you sure you want to discard changes applied in this session?'),
            buttonIcon: 'restore',
            buttonLabel: t('Discard')
        }
    }).onOk(async () => {
        await loadTemplate()
        svgEditor.value.loadSvgContent(templateContent.value)
    })
}
</script>
