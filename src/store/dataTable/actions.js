
import {
    ajaxGetPaginatedList
} from 'src/api/ngcpPanelAPI'
import {
    normalisePreferences
} from 'src/api/preferences'
import {
    apiDelete, apiFetchEntity,
    apiFetchRelatedEntities, apiGetPaginatedList,
    apiPatchRemoveFull,
    apiPatchReplace,
    apiPatchReplaceFull
} from 'src/api/ngcpAPI'
import saveAs from 'file-saver'

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
            resourceDefaultFilters: options.resourceDefaultFilters,
            filter: options.filter
        }, options.pagination)
    }
    context.commit('dataSucceeded', {
        tableId: options.tableId,
        filter: options.filter,
        pagination: {
            ...options.pagination,
            rowsNumber: res.totalItems
        },
        items: res.items
    })
}

export async function patchResource (context, options) {
    context.commit('patchRequesting', {
        tableId: options.tableId
    })
    try {
        await apiPatchReplace({
            resource: options.resource,
            resourceId: options.resourceId,
            field: options.resourceField,
            value: options.resourceValue
        })
    } catch (err) {
        context.commit('patchFailed', {
            tableId: options.tableId,
            error: err.message
        })
    }
}

export async function deleteResource (context, options) {
    await apiDelete(options)
}

export async function loadResource (context, options) {
    const resourceObject = await apiFetchEntity(options.resource, options.resourceId)
    let resourceRelatedObjects = null
    if (options.resourceRelations) {
        resourceRelatedObjects = await apiFetchRelatedEntities(resourceObject, options.resourceRelations)
    }
    context.commit('resourceSucceeded', {
        resource: options.resource,
        resourceObject: resourceObject,
        resourceRelatedObjects: resourceRelatedObjects
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
    language: null,
    cache: true
}) {
    await context.dispatch('wait/start', 'aui-preferences-schema', { root: true })
    try {
        const params = {}
        if (options.language) {
            params.lang = options.language
        }
        if (!options.cache || !context.state[options.preferencesId + 'PreferencesSchema']) {
            const schema = await apiFetchEntity(options.resourceSchema, null, {
                params: params
            })
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
    preferenceValue: null
}) {
    context.commit('preferenceRequesting', {
        preferencesId: options.preferencesId,
        preferenceName: options.preferenceName
    })
    try {
        const preferencesData = await apiPatchReplaceFull({
            resource: options.resourceData,
            resourceId: options.resourceId,
            field: options.preferenceName,
            value: options.preferenceValue
        })
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
        context.commit('preferenceFailed', {
            preferencesId: options.preferencesId,
            preferenceName: options.preferenceName,
            error: err.message
        })
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

export async function downloadPreferenceFile (context, { contentType, resourceData, resourceId, preferenceName }) {
    const fileName = `${resourceId}-${preferenceName}`
    const data = await apiFetchEntity(resourceData, resourceId, {
        params: {
            preference: preferenceName
        }
    })
    saveAs(new Blob([data], { type: contentType }), fileName)
}
