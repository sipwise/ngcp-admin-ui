import { apiPatchField, apiPost } from 'src/api/ngcpAPI'
import { INVOICE_TEMPLATE_RESOURCE, buildInvoiceTemplatePayload } from 'src/helpers/invoice-templates'

export async function createInvoiceTemplate ({ commit }, payload) {
    return apiPost({
        resource: INVOICE_TEMPLATE_RESOURCE,
        data: buildInvoiceTemplatePayload(payload)
    })
}

export async function updateInvoiceTemplate ({ commit }, { id, operations }) {
    return apiPatchField(`${INVOICE_TEMPLATE_RESOURCE}/${id}`, operations)
}
