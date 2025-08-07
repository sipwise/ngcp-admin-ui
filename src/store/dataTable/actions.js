import saveAs from 'file-saver'
import _ from 'lodash'
import {
    apiDelete,
    apiFetchEntity,
    apiFetchEntityAndRelations,
    apiFetchRelatedEntities,
    apiGetPaginatedList,
    apiPatchAdd,
    apiPatchRemoveFull,
    apiPatchReplace,
    apiPatchReplaceFull
} from 'src/api/ngcpAPI'
import {
    ajaxGet,
    ajaxGetPaginatedList
} from 'src/api/ngcpPanelAPI'
import { normalisePreferences } from 'src/api/preferences'

export async function request (context, options) {
    let res
    if (options.resourceType === 'ajax') {
        res = await ajaxGetPaginatedList(options.resourceAlt, options.columns, {
            pagination: options.pagination,
            filter: options.filter
        })
    } else {
        res = await apiGetPaginatedList({
            resource: options.resource,
            resourceSearchField: options.resourceSearchField,
            resourceSearchWildcard: options.resourceSearchWildcard,
            resourceDefaultFilters: options.resourceDefaultFilters,
            filter: options.filter
        }, options.pagination)
    }
    context.commit('dataSucceeded', {
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
    })
}
export async function requestMapping (context, options) {
    const res = await apiGetPaginatedList({
        resource: options.resource,
        resourceSearchField: options.resourceSearchField,
        resourceSearchWildcard: options.resourceSearchWildcard,
        resourceDefaultFilters: options.resourceDefaultFilters,
        filter: options.filter
    }, options.pagination)
    const transformItems = (items) => {
        const typesMap = {
            cfu: 'Unconditional',
            cfb: 'Busy',
            cft: 'Timeout',
            cfs: 'SMS',
            cfr: 'Response',
            cfo: 'Overflow',
            cfna: 'Unavailable'
        }

        return items.map((item) => {
            return Object.keys(typesMap).map((key) => {
                return {
                    type: typesMap[key],
                    cft_ringtimeout: item.cft_ringtimeout,
                    mappings: item[key]
                }
            })
        }).flat()
    }
    const transformedItems = transformItems(res.items)
    context.commit('dataSucceeded', {
        tableId: options.tableId,
        filter: options.filter,
        filterCriteria: options.filterCriteria,
        pagination: {
            ...options.pagination,
            rowsNumber: res.totalItems
        },
        items: transformedItems,
        isClientTableNavigation: options.isClientTableNavigation
    })
}
export async function patchResource (context, options) {
    context.commit('patchRequesting', {
        tableId: options.tableId
    })
    try {
        let params
        if (options.resourceDefaultFilters) {
            params = { ...options.resourceDefaultFilters }
        }

        await apiPatchReplace({
            resource: options.resource,
            resourceId: options.resourceId,
            field: options.resourceField,
            value: options.resourceValue,
            config: {
                params
            }
        })
    } catch (err) {
        context.commit('patchFailed', {
            tableId: options.tableId,
            error: err.message
        })
    }
}

export async function deleteResource (context, options) {
    let params = {}
    if (options.resourceDefaultFilters) {
        params = { ...params, ...options.resourceDefaultFilters }
        params.order_by && delete params.order_by
    }
    const newOptions = _.merge({}, options, {
        config: {
            params
        }
    })
    await apiDelete(newOptions)
}

export async function loadResource (context, options) {
    const resourceObject = await apiFetchEntity(options.resource, options.resourceId)
    let resourceRelatedObjects = null
    if (options.resourceRelations) {
        resourceRelatedObjects = await apiFetchRelatedEntities(resourceObject, options.resourceRelations)
    }
    context.commit('resourceSucceeded', {
        resource: options.resource,
        resourceObject,
        resourceRelatedObjects
    })
}

export async function loadPreferencesContext (context, options = {
    preferencesId: null,
    resourceId: null,
    resource: null,
    resourceRelations: null
}) {
    await context.dispatch('wait/start', 'aui-preferences-context', { root: true })
    try {
        const preferencesContext = await apiFetchEntity(options.resource, options.resourceId)
        let relatedObjects = null
        if (options.resourceRelations) {
            relatedObjects = await apiFetchRelatedEntities(preferencesContext, options.resourceRelations)
        }
        context.commit('preferencesSucceeded', {
            preferencesId: options.preferencesId,
            context: preferencesContext,
            contextRelatedObjects: relatedObjects
        })
    } finally {
        await context.dispatch('wait/end', 'aui-preferences-context', { root: true })
    }
}

export async function loadPreferencesSchema (context, options = {
    preferencesId: null,
    resourceSchema: null,
    secondResourceSchema: null,
    language: null,
    cache: true
}) {
    await context.dispatch('wait/start', 'aui-preferences-schema', { root: true })
    try {
        const params = options.language ? { lang: options.language } : {}

        if (!options.cache || !context.state[`${options.preferencesId}PreferencesSchema`]) {
            const schema = await apiFetchEntity(options.resourceSchema, null, { params })

            if (options.secondResourceSchema) {
                const secondSchema = await apiFetchEntity(options.secondResourceSchema)
                secondSchema.items.forEach((item) => {
                    if (schema[item.attribute]) {
                        schema[item.attribute].id = item.id
                    }
                })
            }
            context.commit('preferencesSucceeded', {
                preferencesId: options.preferencesId,
                schema: Object.freeze(normalisePreferences(schema))
            })
        }
    } finally {
        await context.dispatch('wait/end', 'aui-preferences-schema', { root: true })
    }
}

export async function loadPreferencesData (context, options = {
    preferencesId: null,
    resourceData: null,
    resourceId: null
}) {
    await context.dispatch('wait/start', 'aui-preferences-data', { root: true })
    try {
        const data = await apiFetchEntity(options.resourceData, options.resourceId)
        context.commit('preferencesSucceeded', {
            preferencesId: options.preferencesId,
            data: Object.freeze(data)
        })
    } finally {
        await context.dispatch('wait/end', 'aui-preferences-data', { root: true })
    }
}

export async function setPreference (context, options = {
    preferencesId: null,
    resourceId: null,
    resourceData: null,
    preferenceName: null,
    preferenceValue: null,
    existsInCurrentPreferences: false
}) {
    context.commit('preferenceRequesting', {
        preferencesId: options.preferencesId,
        preferenceName: options.preferenceName
    })

    const payload = {
        resource: options.resourceData,
        resourceId: options.resourceId,
        field: options.preferenceName,
        value: options.preferenceValue
    }

    if (!options.existsInCurrentPreferences) {
        try {
            const preferencesData = await apiPatchAdd(payload)
            context.commit('preferencesSucceeded', {
                preferencesId: options.preferencesId,
                data: preferencesData
            })
        } catch (err) {
            context.commit('preferenceFailed', {
                preferencesId: options.preferencesId,
                preferenceName: options.preferenceName,
                error: err.message
            })
        }
    } else {
        try {
            const preferencesData = await apiPatchReplaceFull(payload)
            context.commit('preferencesSucceeded', {
                preferencesId: options.preferencesId,
                data: preferencesData
            })
        } catch (err) {
            context.commit('preferenceFailed', {
                preferencesId: options.preferencesId,
                preferenceName: options.preferenceName,
                error: err.message
            })
        }
    }
}

export async function removePreference (context, options = {
    preferencesId: null,
    resourceId: null,
    resourceData: null,
    preferenceName: null
}) {
    context.commit('preferenceRequesting', {
        preferencesId: options.preferencesId
    })
    try {
        const preferencesData = await apiPatchRemoveFull({
            resource: options.resourceData,
            resourceId: options.resourceId,
            field: options.preferenceName
        })
        context.commit('preferencesSucceeded', {
            preferencesId: options.preferencesId,
            data: preferencesData
        })
    } catch (err) {
        if (!err.response || err.response.status !== 422) {
            context.commit('preferenceFailed', {
                preferencesId: options.preferencesId,
                preferenceName: options.preferenceName,
                error: err.message
            })
        }
    }
}

export async function deleteResourceByTerminatedStatus (context, options) {
    await apiPatchReplace({
        resource: options.resource,
        resourceId: options.resourceId,
        field: 'status',
        value: 'terminated'
    })
}
export async function deleteCf (context, options) {
    const fields = ['cfu', 'cfb', 'cft', 'cfs', 'cfr', 'cfo', 'cfna']
    const field = fields[options.rowIndex] || ''
    await apiPatchReplace({
        resource: options.resource,
        field,
        value: []
    })
}

export async function downloadPreferenceFile (context, { contentType, resourceData, resourceId, preferenceName }) {
    const fileName = `${resourceId}-${preferenceName}`
    const data = await apiFetchEntity(resourceData, resourceId, {
        params: {
            preference: preferenceName
        }
    })
    saveAs(new Blob([data], { type: contentType }), fileName)
}

export async function fetchEntityAndRelations (context, { resource, resourceId, relations }) {
    const res = await apiFetchEntityAndRelations(resource, resourceId, relations)
    return res
}

export async function ajaxDelete (context, { resourceBasePath, resourceId }) {
    const deleteURL = `/${resourceBasePath}/${resourceId}/delete`
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
export async function deleteCustomPreferences ({ commit }, id) {
    await apiDelete({
        resource: 'preferencesmetaentries',
        resourceId: id
    })
}
