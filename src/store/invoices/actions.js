import { apiDownloadFile, apiGet, apiPostMinimal } from 'src/api/ngcpAPI'

export async function createInvoices ({ commit }, data) {
    return apiPostMinimal({ resource: 'invoices', data })
}

export async function downloadFile (context, invoiceId = 0) {
    const apiGetOptions = {
        resource: 'invoices',
        resourceId: invoiceId,
        config: {
            responseType: 'blob'
        }
    }

    await apiDownloadFile({
        apiGetOptions,
        defaultFileName: 'download.pdf',
        defaultContentType: 'application/pdf'
    })
}
export async function fetchInvoiceTemplateCategory ({ commit }, templateId) {
    const res = await apiGet({
        resource: 'invoicetemplates',
        resourceId: templateId
    })
    return res?.data.category
}
