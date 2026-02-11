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

export async function updateBranding ({ state }, payload) {
    const resource = 'resellerbrandings'
    const formData = new FormData()
    const jsonPayload = {
        csc_color_primary: payload.data.csc_color_primary,
        csc_color_secondary: payload.data.csc_color_secondary,
        css: payload.data.css,
        ...(payload.resellerId && { reseller_id: payload.resellerId })
    }

    formData.append('logo', payload.data.logo_image || createEmptyTxtFile())
    formData.append('json', JSON.stringify(jsonPayload))

    const apiMethod = state.branding.id ? apiPut : apiPost

    return apiMethod({
        resource,
        data: formData,
        ...(state.branding.id && { resourceId: state.branding.id })
    })
}

/**
 * Fetch branding for reseller users (no resellerId needed - API returns their own branding)
 */
export async function fetchBranding (context, payload) {
    const result = {
        logo_image: null,
        csc_color_primary: null,
        csc_color_secondary: null,
        css: null,
        id: null
    }

    try {
        const brandingRes = await apiGet({
            resource: 'resellerbrandings'
        })

        const brandingItem = brandingRes.data?.items?.[0]

        result.csc_color_primary = brandingItem?.csc_color_primary ?? null
        result.csc_color_secondary = brandingItem?.csc_color_secondary ?? null
        result.css = brandingItem?.css ?? null
        result.id = brandingItem?.id ?? null

        if (brandingItem) {
            await fetchBrandingLogo(result, payload?.header)
        }
    } finally {
        context.commit('brandingSucceeded', result)
    }
}

/**
 * Fetch branding for admin users viewing a specific reseller's branding
 */
export async function fetchResellerBranding (context, payload) {
    const result = {
        logo_image: null,
        csc_color_primary: null,
        csc_color_secondary: null,
        css: null,
        id: null
    }

    try {
        const brandingRes = await apiGet({
            resource: 'resellerbrandings'
        })

        const brandingItem = brandingRes.data?.items?.find(
            (item) => item.reseller_id === Number(payload?.resellerId)
        )

        result.csc_color_primary = brandingItem?.csc_color_primary ?? null
        result.csc_color_secondary = brandingItem?.csc_color_secondary ?? null
        result.css = brandingItem?.css ?? null
        result.id = brandingItem?.id ?? null

        if (brandingItem) {
            await fetchBrandingLogo(result, payload?.header, payload?.resellerId)
        }
    } finally {
        context.commit('brandingSucceeded', result)
    }
}

async function fetchBrandingLogo (result, header = {}, resellerId = null) {
    const logoData = {
        resource: 'resellerbrandinglogos',
        config: {
            responseType: 'blob',
            headers: {
                Accept: 'application/octet-stream',
                ...header
            },
            ...(resellerId && { params: { reseller_id: resellerId } })
        }
    }

    try {
        const logoRes = await apiGet(logoData)
        result.logo_image = new File([logoRes.data], 'logo')
    } catch (logoErr) {
        // 404 is expected if user has branding but no logo set - not an error
        const isNotFound = logoErr?.response?.status === 404
        if (!isNotFound) {
            throw logoErr
        }
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
