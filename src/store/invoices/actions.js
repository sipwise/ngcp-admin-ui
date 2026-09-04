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
    return {
        category: res?.data.category,
        resellerId: res?.data.reseller_id
    }
}

export async function loadInvoiceRecipients ({ commit }, options) {
    const page = options.page ?? 1
    const rowsPerPage = options.rows ?? 10
    const isCustomerCategory = ['customer', 'did'].includes(options.category)
    const resource = isCustomerCategory ? 'customers' : 'contracts'
    const key = `${options.category}:${options.resellerId ?? ''}`

    commit('setActiveRecipientsKey', key)

    const params = {
        page: page === 0 ? 1 : page,
        rows: rowsPerPage
    }
    if (isCustomerCategory) {
        if (options.resellerId) {
            params.reseller_id = options.resellerId
        }
    } else if (options.category === 'peer') {
        params.type = 'sippeering'
    } else if (options.category === 'reseller') {
        params.type = 'reseller'
    }

    const response = await apiGet({
        path: `${resource}?expand=contact_id`,
        config: {
            params
        }
    })

    commit('setRecipients', {
        key,
        items: response?.data?.items ?? [],
        page
    })
}
