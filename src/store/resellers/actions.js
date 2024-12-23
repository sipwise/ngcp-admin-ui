import contentDisposition from 'content-disposition'
import _ from 'lodash'
import {
    apiGet,
    apiPatchReplace,
    apiPost,
    apiPostMinimal,
    apiPut
} from 'src/api/ngcpAPI'
import { ajaxDownloadCsv, ajaxFetchTable, ajaxGet } from 'src/api/ngcpPanelAPI'
import { createEmptyTxtFile } from 'src/helpers/file'

const columns = [
    'id',
    'contract_id',
    'name',
    'status',
    'enable_rtc'
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
        config
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
        config
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

export async function updateBranding ({ state }, payload) {
    const resource = 'resellerbrandings'
    const formData = new FormData()
    const jsonPayload = {
        csc_color_primary: payload.data.csc_color_primary,
        csc_color_secondary: payload.data.csc_color_secondary,
        css: payload.data.css
    }
    if (payload.data.logo_image) {
        formData.append('logo', payload.data.logo_image)
    } else {
        formData.append('logo', createEmptyTxtFile())
    }
    let apiDatas
    if (payload.resellerId) {
        jsonPayload.reseller_id = payload.resellerId
    }
    if (state.branding.id) {
        apiDatas = {
            resource,
            resourceId: state.branding.id,
            data: formData
        }
    } else {
        apiDatas = {
            resource,
            data: formData
        }
    }
    try {
        apiDatas.data.append('json', JSON.stringify(jsonPayload))
        return await apiPut(apiDatas)
    } catch (err) {
        return await apiPost(apiDatas)
    }
}

export async function fetchBranding (context, payload) {
    const result = {
        logo_image: null,
        csc_color_primary: null,
        csc_color_secondary: null,
        css: null,
        id: null
    }
    const header = payload?.header || {}
    const logoData = {
        resource: 'resellerbrandinglogos',
        config: {
            responseType: 'blob',
            headers: {
                Accept: 'application/octet-stream',
                ...header
            }
        }
    }
    let brandingData = {
        resource: 'resellerbrandings'
    }
    if (payload && payload.resellerId) {
        logoData.config.params = {
            reseller_id: payload.resellerId
        }
        brandingData = {
            ...brandingData,
            config: {
                params: {
                    reseller_id: payload.resellerId
                }
            }
        }
    }
    const logoReq = apiGet(logoData)

    const brandingReq = apiGet(brandingData)
    try {
        const [logoRes, brandingRes] = await Promise.allSettled([logoReq, brandingReq])
        if (logoRes.status === 'fulfilled') {
            result.logo_image = new File([logoRes.value.data], 'logo')
        }
        if (brandingRes.status === 'fulfilled') {
            if (brandingRes.value.data.items && brandingRes.value.data.items.length > 0) {
                result.csc_color_primary = brandingRes.value.data.items[0].csc_color_primary
                result.csc_color_secondary = brandingRes.value.data.items[0].csc_color_secondary
                result.css = brandingRes.value.data.items[0].css
                result.id = brandingRes.value.data.items[0].id
            }
        }
    } finally {
        context.commit('brandingSucceeded', result)
    }
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
    await ajaxDownloadCsv({
        url: `/reseller/${resellerId}/phonebook_download_csv`,
        defaultFileName: 'reseller_phonebook_entries.csv'
    })
}
