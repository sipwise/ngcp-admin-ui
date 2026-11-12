import {
    apiDownloadFile, apiGet, apiGetPaginatedList, apiPost
} from 'src/api/ngcpAPI'
import { toInvoiceListFilter } from 'src/helpers/invoices'

export async function createInvoices ({ commit }, data) {
    return apiPost({ resource: 'v2/invoices', data })
}

export async function requestInvoices ({ commit }, options) {
    const res = await apiGetPaginatedList({
        resource: options.resource,
        resourceSearchField: options.resourceSearchField,
        resourceSearchWildcard: options.resourceSearchWildcard,
        resourceDefaultFilters: options.resourceDefaultFilters,
        filter: toInvoiceListFilter(options.filter)
    }, options.pagination)
    commit('dataTable/dataSucceeded', {
        tableId: options.tableId,
        displayFilter: options.displayFilter,
        filter: options.filter,
        filterCriteria: options.filterCriteria,
        pagination: {
            ...options.pagination,
            rowsNumber: res.totalItems
        },
        items: res.items,
        isClientTableNavigation: options.isClientTableNavigation
    }, { root: true })
}

export async function downloadFile (context, invoiceId = 0) {
    const apiGetOptions = {
        resource: 'v2/invoices',
        resourceId: invoiceId,
        config: {
            responseType: 'blob',
            headers: {
                Accept: 'application/pdf'
            }
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
        resource: 'v2/templates/invoices',
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
        rows: rowsPerPage,
        ...(isCustomerCategory ? { not_status: 'terminated' } : {})
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
