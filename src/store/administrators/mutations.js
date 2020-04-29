
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
