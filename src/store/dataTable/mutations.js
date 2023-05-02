
export function setFilter (state, { tableId, filter }) {
    state[tableId + 'Filter'] = filter
}

export function setFilterCriteria (state, { tableId, filterCriteria }) {
    state[tableId + 'FilterCriteria'] = filterCriteria
}

export function setPage (state, { tableId, page }) {
    state[tableId + 'Page'] = page
}

export function setRowsPerPage (state, { tableId, rowsPerPage }) {
    state[tableId + 'RowsPerPage'] = rowsPerPage
}

export function setSortBy (state, { tableId, sortBy }) {
    state[tableId + 'SortBy'] = sortBy
}

export function setDescending (state, { tableId, descending }) {
    state[tableId + 'Descending'] = descending
}

export function setRowsNumber (state, { tableId, rowsNumber }) {
    state[tableId + 'RowsNumber'] = rowsNumber
}

export function destroyData (state, { tableId }) {
    delete state[tableId]
    delete state[tableId + 'Filter']
    delete state[tableId + 'FilterCriteria']
    delete state[tableId + 'Page']
    delete state[tableId + 'RowsPerPage']
    delete state[tableId + 'SortBy']
    delete state[tableId + 'Descending']
    delete state[tableId + 'Rows']
    delete state[tableId + 'RowsNumber']
    delete state[tableId + 'PatchError']
}

export function dataSucceeded (state, { tableId, items, pagination, filter, filterCriteria, isClientTableNavigation }) {
    state[tableId + 'Rows'] = items
    state[tableId + 'RowsNumber'] = pagination.rowsNumber
    if (!isClientTableNavigation) {
        state[tableId + 'Filter'] = filter
        state[tableId + 'FilterCriteria'] = filterCriteria
        state[tableId + 'Page'] = pagination.page
        state[tableId + 'RowsPerPage'] = pagination.rowsPerPage
        state[tableId + 'SortBy'] = pagination.sortBy
        state[tableId + 'Descending'] = pagination.descending
    }
}

export function patchRequesting (state, payload) {
    state[payload.tableId + 'PatchError'] = null
}

export function patchFailed (state, payload) {
    state[payload.tableId + 'PatchError'] = payload.error
}

export function preferencesSucceeded (state, payload = {
    preferencesId: null,
    data: null,
    schema: null,
    context: null
}) {
    state[payload.preferencesId + 'PreferencesErrorContext'] = undefined
    state[payload.preferencesId + 'PreferencesErrorMessage'] = undefined
    if (payload.data) {
        state[payload.preferencesId + 'PreferencesData'] = payload.data
    }
    if (payload.schema) {
        state[payload.preferencesId + 'PreferencesSchema'] = payload.schema
    }
    if (payload.context) {
        state[payload.preferencesId + 'PreferencesContext'] = payload.context
    }
    if (payload.contextRelatedObjects) {
        state[payload.id + 'PreferencesContextRelatedObjects'] = payload.contextRelatedObjects
    }
}

export function preferencesSchemaLoading (state, id) {
    state[id + 'PreferencesSchemaLoaded'] = false
}

export function preferencesSchemaLoaded (state, id) {
    state[id + 'PreferencesSchemaLoaded'] = true
}

export function preferenceRequesting (state, payload) {
    state[payload.preferencesId + 'PreferencesErrorContext'] = undefined
    state[payload.preferencesId + 'PreferencesErrorMessage'] = undefined
}

export function preferenceFailed (state, payload) {
    state[payload.preferencesId + 'PreferencesErrorContext'] = payload.preferenceName
    state[payload.preferencesId + 'PreferencesErrorMessage'] = payload.error
}

export function resourceSucceeded (state, payload) {
    state[payload.resource + 'ResourceObject'] = payload.resourceObject
    state[payload.resource + 'ResourceRelatedObjects'] = payload.resourceRelatedObjects
}
