import Vue from 'vue'

export function setFilter (state, { tableId, filter }) {
    Vue.set(state, tableId + 'Filter', filter)
}

export function setFilterCriteria (state, { tableId, filterCriteria }) {
    Vue.set(state, tableId + 'FilterCriteria', filterCriteria)
}

export function setPage (state, { tableId, page }) {
    Vue.set(state, tableId + 'Page', page)
}

export function setRowsPerPage (state, { tableId, rowsPerPage }) {
    Vue.set(state, tableId + 'RowsPerPage', rowsPerPage)
}

export function setSortBy (state, { tableId, sortBy }) {
    Vue.set(state, tableId + 'SortBy', sortBy)
}

export function setDescending (state, { tableId, descending }) {
    Vue.set(state, tableId + 'Descending', descending)
}

export function setRowsNumber (state, { tableId, rowsNumber }) {
    Vue.set(state, tableId + 'RowsNumber', rowsNumber)
}

export function destroyData (state, { tableId }) {
    Vue.delete(state, tableId + 'Filter')
    Vue.delete(state, tableId + 'FilterCriteria')
    Vue.delete(state, tableId + 'Page')
    Vue.delete(state, tableId + 'RowsPerPage')
    Vue.delete(state, tableId + 'SortBy')
    Vue.delete(state, tableId + 'Descending')
    Vue.delete(state, tableId + 'Rows')
    Vue.delete(state, tableId + 'RowsNumber')
    Vue.delete(state, tableId + 'PatchError')
}

export function dataSucceeded (state, { tableId, items, pagination, filter, filterCriteria, isClientTableNavigation }) {
    Vue.set(state, tableId + 'Rows', items)
    Vue.set(state, tableId + 'RowsNumber', pagination.rowsNumber)
    if (!isClientTableNavigation) {
        Vue.set(state, tableId + 'Filter', filter)
        Vue.set(state, tableId + 'FilterCriteria', filterCriteria)
        Vue.set(state, tableId + 'Page', pagination.page)
        Vue.set(state, tableId + 'RowsPerPage', pagination.rowsPerPage)
        Vue.set(state, tableId + 'SortBy', pagination.sortBy)
        Vue.set(state, tableId + 'Descending', pagination.descending)
    }
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
