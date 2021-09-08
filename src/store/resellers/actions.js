import {
    ajaxFetchTable
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

export async function fetchResellerBranding ({ commit }, resellerId) {
    try {
        const resellerBrandings = await apiGet({
            resource: 'resellerbrandings',
            resourceId: resellerId
        })
        if (resellerBrandings.data && !resellerBrandings.data.logo) {
            try {
                const resellerBrandingLogos = await apiGet({
                    resource: 'resellerbrandinglogos',
                    resourceId: resellerId,
                    config: {
                        responseType: 'blob'
                    }
                })
                // extract file name, required to render the image
                const regExp = 'filename\\*?=[\'"]?(?:UTF-\\d[\'"]*)?([^;\\r\\n"\']*)[\'"]?;?'
                const fileName = resellerBrandingLogos.headers['content-disposition'].match(regExp)[1]
                resellerBrandingLogos.data.name = fileName
                resellerBrandings.data.logo = resellerBrandingLogos.data
            } catch (e) {
                resellerBrandings.data.logo = ''
            }
        }
        return _.get(resellerBrandings, 'data', {})
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
