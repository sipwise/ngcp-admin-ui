
export function resellerListRequesting (state, options) {
    state.resellerListState = 'requesting'
    state.resellerListPagination = options.pagination
    state.resellerListFilter = options.filter
}

export function resellerListSucceeded (state, payload) {
    if (payload !== undefined && payload !== null) {
        state.resellerList = payload.aaData
        state.resellerListPagination.rowsNumber = payload.iTotalRecords
    }
    state.resellerListState = 'succeeded'
}

export function resellerListFailed (state) {
    state.resellerListState = 'failed'
}

export function resellerUpdateValue (state, payload) {
    const affectedReseller = state.resellerList.find(reseller => reseller.id === payload.id)
    affectedReseller[payload.field] = payload.value
}

export function filterResellers (state, resellers) {
    state.filteredResellers = resellers
}
