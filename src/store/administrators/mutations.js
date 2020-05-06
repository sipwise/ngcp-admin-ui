
export function adminsRequesting (state, options) {
	state.administratorsState = 'requesting'
	state.administratorsPagination = options.pagination
	state.administratorsFilter = options.filter
}

export function adminsSucceeded (state, payload) {
	state.administrators = payload.aaData
	state.administratorsPagination.rowsNumber = payload.iTotalRecords
	state.administratorsState = 'succeeded'
}

export function adminsFailed (state) {
	state.administratorsState = 'failed'
}

export function filterResellers (state, resellers) {
	state.filteredResellers = resellers
}

export function adminCreationRequesting (state) {
	state.adminCreationState = 'requesting'
}

export function adminCreationSucceeded (state) {
	state.adminCreationState = 'succeeded'
}

export function adminCreationFailed (state, error) {
	state.adminCreationState = 'failed'
	state.adminCreationError = error
}
