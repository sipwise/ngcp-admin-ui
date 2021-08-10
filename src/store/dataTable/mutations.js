import Vue from 'vue'

export function dataSucceeded (state, payload) {
    Vue.set(state, payload.tableId + 'Rows', payload.items)
    Vue.set(state, payload.tableId + 'Pagination', payload.pagination)
    Vue.set(state, payload.tableId + 'Filter', payload.filter)
}

export function patchRequesting (state, payload) {
    Vue.set(state, payload.tableId + 'PatchError', null)
}

export function patchFailed (state, payload) {
    Vue.set(state, payload.tableId + 'PatchError', payload.error)
}

export function preferencesSucceeded (state, payload = {
    preferencesId: null,
    data: null,
    schema: null,
    context: null
}) {
    Vue.set(state, payload.preferencesId + 'PreferencesErrorContext', undefined)
    Vue.set(state, payload.preferencesId + 'PreferencesErrorMessage', undefined)
    if (payload.data) {
        Vue.set(state, payload.preferencesId + 'PreferencesData', payload.data)
    }
    if (payload.schema) {
        Vue.set(state, payload.preferencesId + 'PreferencesSchema', payload.schema)
    }
    if (payload.context) {
        Vue.set(state, payload.preferencesId + 'PreferencesContext', payload.context)
    }
    if (payload.contextRelatedObjects) {
        Vue.set(state, payload.id + 'PreferencesContextRelatedObjects', payload.contextRelatedObjects)
    }
}

export function preferencesSchemaLoading (state, id) {
    Vue.set(state, id + 'PreferencesSchemaLoaded', false)
}

export function preferencesSchemaLoaded (state, id) {
    Vue.set(state, id + 'PreferencesSchemaLoaded', true)
}

export function preferenceRequesting (state, payload) {
    Vue.set(state, payload.preferencesId + 'PreferencesErrorContext', undefined)
    Vue.set(state, payload.preferencesId + 'PreferencesErrorMessage', undefined)
}

export function preferenceFailed (state, payload) {
    Vue.set(state, payload.preferencesId + 'PreferencesErrorContext', payload.preferenceName)
    Vue.set(state, payload.preferencesId + 'PreferencesErrorMessage', payload.error)
}

export function resourceSucceeded (state, payload) {
    Vue.set(state, payload.resource + 'ResourceObject', payload.resourceObject)
    Vue.set(state, payload.resource + 'ResourceRelatedObjects', payload.resourceRelatedObjects)
}
