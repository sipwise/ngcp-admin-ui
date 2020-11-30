import Vue from 'vue'

export function dataRequesting (state, payload) {
	Vue.set(state, payload.tableId + 'Pagination', payload.pagination)
	Vue.set(state, payload.tableId + 'Filter', payload.filter)
}

export function dataSucceeded (state, payload) {
	Vue.set(state, payload.tableId + 'Rows', payload.items)
	Vue.set(state[payload.tableId + 'Pagination'], 'rowsNumber', payload.totalItems)
	Vue.set(state, payload.tableId + 'LastPage', payload.lastPage)
}

export function patchRequesting (state, payload) {
	Vue.set(state, payload.tableId + 'PatchError', null)
}

export function patchFailed (state, payload) {
	Vue.set(state, payload.tableId + 'PatchError', payload.error)
}
