import * as invoiceTemplatesApi from 'src/api/invoice-templates'
import { buildInvoiceTemplatePayload } from 'src/helpers/invoice-templates'

export async function createInvoiceTemplate ({ commit }, payload) {
    return invoiceTemplatesApi.createInvoiceTemplate(buildInvoiceTemplatePayload(payload))
}

export async function updateInvoiceTemplate ({ commit }, { id, operations }) {
    return invoiceTemplatesApi.updateInvoiceTemplate(id, operations)
}

export async function fetchInvoiceTemplateContent (context, templateId) {
    return invoiceTemplatesApi.getInvoiceTemplateContent(templateId)
}

export async function uploadInvoiceTemplate (context, { id, content }) {
    return invoiceTemplatesApi.updateInvoiceTemplateContent(id, content)
}

export async function fetchInvoiceTemplatePreview (context, templateId) {
    return invoiceTemplatesApi.getInvoiceTemplatePreview(templateId)
}

export async function fetchInvoiceTemplateVars (context, templateId) {
    return invoiceTemplatesApi.getInvoiceTemplateVars(templateId)
}

export async function fetchInvoiceTemplate (context, templateId) {
    return invoiceTemplatesApi.getInvoiceTemplate(templateId)
}
