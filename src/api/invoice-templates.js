import {
    apiGet,
    apiPatchField,
    apiPatchFile,
    apiPost
} from 'src/api/ngcpAPI'

export const INVOICE_TEMPLATES_RESOURCE = 'v2/templates/invoices'

export async function createInvoiceTemplate (data) {
    return apiPost({
        resource: INVOICE_TEMPLATES_RESOURCE,
        data
    })
}

export async function updateInvoiceTemplate (id, operations) {
    return apiPatchField(`${INVOICE_TEMPLATES_RESOURCE}/${id}`, operations)
}

export async function getInvoiceTemplate (id) {
    const res = await apiGet({
        resource: INVOICE_TEMPLATES_RESOURCE,
        resourceId: id
    })
    return res.data
}

export async function getInvoiceTemplateContent (id) {
    const res = await apiGet({
        resource: INVOICE_TEMPLATES_RESOURCE,
        resourceId: id,
        config: {
            headers: { Accept: 'image/svg+xml' },
            responseType: 'text'
        }
    })
    return res.data
}

export async function updateInvoiceTemplateContent (id, content) {
    return apiPatchFile({
        resource: INVOICE_TEMPLATES_RESOURCE,
        resourceId: id,
        file: new Blob([content], { type: 'image/svg+xml' }),
        fileName: 'template.svg'
    })
}

export async function getInvoiceTemplatePreview (id) {
    const res = await apiGet({
        path: `${INVOICE_TEMPLATES_RESOURCE}/${id}/@preview`,
        config: {
            headers: {
                Accept: 'application/pdf',
                'Cache-Control': 'no-cache'
            },
            responseType: 'blob'
        }
    })
    return res.data
}

export async function getInvoiceTemplateVars (id) {
    const res = await apiGet({
        path: `${INVOICE_TEMPLATES_RESOURCE}/${id}/@vars`
    })
    return res.data
}
