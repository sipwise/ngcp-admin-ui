import saveAs from 'file-saver'
import contentDisposition from 'content-disposition'
import {
    ajaxFetchTable, ajaxGet
} from 'src/api/ngcpPanelAPI'
import _ from 'lodash'
import { apiGet, apiPatchReplace, apiPost, apiPostMinimal, apiPut } from 'src/api/ngcpAPI'
import { createEmptyTxtFile } from 'src/helpers/file'
const columns = [
    'id',
    'contract_id',
    'name',
    'status',
    'enable_rtc',
    'null'
]

export async function createReseller ({ commit }, data) {
    return apiPostMinimal({ resource: 'resellers', data })
}

export async function updateReseller (context, payload) {
    return apiPut({
        resource: 'resellers',
        resourceId: payload.id,
        data: payload
    })
}

export async function fetchResellers ({ commit }, options) {
    return ajaxFetchTable('/reseller/ajax', columns, options)
}

export async function fetchResellerList ({ commit, dispatch }, options) {
    commit('resellerListRequesting', options)
    try {
        const data = await dispatch('fetchResellers', options)
        if (data !== null) {
            commit('resellerListSucceeded', data)
        } else {
            commit('resellerListFailed')
        }
    } catch (err) {
        commit('resellerListFailed')
    }
}

export async function toggleEnableRTC ({ commit, state }, options) {
    commit('resellerListRequesting', {
        pagination: state.resellerListPagination,
        filter: state.resellerListFilter
    })
    try {
        const sanitizedValue = this.$toVerbalBoolean(options.value)
        const res = await apiPatchReplace({
            resource: 'resellers',
            resourceId: options.id,
            field: 'enable_rtc',
            value: options.value
        })
        if (res === true) {
            commit('resellerUpdateValue', {
                id: options.id,
                field: 'enable_rtc',
                value: sanitizedValue
            })
            commit('resellerListSucceeded')
        } else {
            commit('resellerListFailed')
        }
    } catch (err) {
        commit('resellerListFailed')
    }
}

export async function filterResellers ({ commit, dispatch }, filter) {
    const resellers = await dispatch('resellers/fetchResellers', {
        filter: (typeof filter === 'object') ? filter?.filter : filter,
        pagination: {
            sortBy: 'id',
            descending: false,
            page: 1,
            rowsPerPage: 10,
            rowsNumber: null
        }
    }, { root: true })
    commit('filterResellers', _.get(resellers, 'aaData', []))
}

export async function fetchResellerLogo ({ commit }, resellerId) {
    try {
        const resellerLogo = await apiGet({
            resource: 'resellerbrandinglogos',
            resourceId: resellerId,
            config: {
                responseType: 'blob'
            }
        })
        const contentDispositionParsed = contentDisposition.parse(resellerLogo.headers['content-disposition'])
        const fileName = contentDispositionParsed?.parameters?.filename
        resellerLogo.data.name = fileName
        return resellerLogo.data
    } catch (err) {
        // Error suppressed because the endpoint returns 404 in case reseller-admin has no logo set
        if (err.response.status !== 404) {
            throw err
        }
    }
}

export async function fetchResellerBranding ({ commit }, resellerId) {
    try {
        const resellerBranding = await apiGet({
            resource: 'resellerbrandings',
            resourceId: resellerId
        })
        if (resellerBranding.data && !resellerBranding.data.logo) {
            // initialise empty logo in case no logo is delivered within response
            resellerBranding.data.logo = null
        }
        return _.get(resellerBranding, 'data', {})
    } catch (err) {
        // Error suppressed because the endpoint returns 404 in case reseller has no branding set
        if (err.response.status === 404) {
            return {
                id: null,
                logo: null,
                csc_color_primary: '',
                csc_color_secondary: '',
                css: ''
            }
        }
        throw err
    }
}

export async function createResellerBranding ({ commit }, payload) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const formData = formDataPayload(payload)
    return await apiPost({
        resource: 'resellerbrandings',
        data: formData,
        config: config
    })
}

export async function updateResellerBranding ({ commit }, payload) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const formData = formDataPayload(payload)
    return await apiPut({
        resource: 'resellerbrandings',
        resourceId: payload.reseller_id,
        data: formData,
        config: config
    })
}

function formDataPayload (payload) {
    let { logo, ...data } = payload
    const formData = new FormData()
    if (logo === '' || logo === null) {
        // Workaround to delete the logo - create an empty file :(
        logo = createEmptyTxtFile()
    }
    formData.append('json', JSON.stringify(data))
    formData.append('logo', logo)
    return formData
}

/**
 * TODO: temporary "deleteAction" for the DataTable until the API will have native implementation of deletion the InvoiceTemplates
 */
export async function ajaxDeleteInvoiceTemplate (context, options) {
    const id = options.resourceId
    const deleteURL = `/invoicetemplate/${id}/delete`
    try {
        await ajaxGet(deleteURL, { maxRedirects: 0 })
    } catch (e) {
        if (e?.response?.status === 404) {
            // suppressing auto-redirection error after deletion. Axios "maxRedirects: 0" doesn't work
        } else {
            throw e
        }
    }
}

/**
 * TODO: temporary "ajax" implementation until the API will provide "Download CSV" implementation for reseller Phonebook Entries
 */
export async function ajaxDownloadPhonebookCSV (context, resellerId = 0) {
    const downloadURL = `/reseller/${resellerId}/phonebook_download_csv`
    const res = await ajaxGet(downloadURL)

    const contentDispositionParsed = contentDisposition.parse(res.headers['content-disposition'])
    const fileName = contentDispositionParsed?.parameters?.filename || 'reseller_phonebook_entries.csv'
    saveAs(new Blob([res.data], { type: res.headers['content-type'] || 'text/csv' }), fileName)
}
