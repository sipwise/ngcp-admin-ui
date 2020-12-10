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

export function preferencesSucceeded (state, payload = {
	id: null,
	data: null,
	schema: null,
	context: null
}) {
	Vue.set(state, payload.id + 'PreferencesErrorContext', undefined)
	Vue.set(state, payload.id + 'PreferencesErrorMessage', undefined)
	if (payload.data) {
		Vue.set(state, payload.id + 'PreferencesData', payload.data)
	}
	if (payload.schema) {
		Vue.set(state, payload.id + 'PreferencesSchema', payload.schema)
	}
	if (payload.context) {
		Vue.set(state, payload.id + 'PreferencesContext', payload.context)
	}
}

export function preferencesSchemaLoading (state, id) {
	Vue.set(state, id + 'PreferencesSchemaLoaded', false)
}

export function preferencesSchemaLoaded (state, id) {
	Vue.set(state, id + 'PreferencesSchemaLoaded', true)
}

export function preferenceFailed (state, payload) {
	Vue.set(state, payload.preferencesId + 'PreferencesErrorContext', payload.preferenceName)
	Vue.set(state, payload.preferencesId + 'PreferencesErrorMessage', payload.error)
}
