
export function adminsRequesting (state, options) {
	state.administratorsState = 'requesting'
	state.administratorsPagination = options.pagination
	state.administratorsFilter = options.filter
}

export function adminsSucceeded (state, payload) {
	if (payload !== undefined && payload !== null) {
		state.administrators = payload.aaData
		state.administratorsPagination.rowsNumber = payload.iTotalRecords
	}
	state.administratorsState = 'succeeded'
}

export function adminsFailed (state) {
	state.administratorsState = 'failed'
}

export function adminUpdateValue (state, payload) {
	const affectedReseller = state.administrators.find(admin => admin.id === payload.id)
	affectedReseller[payload.field] = payload.value
}

export function adminRequesting (state) {
	state.adminState = 'requesting'
	state.adminError = null
}

export function adminSucceeded (state, payload) {
	state.adminState = 'succeeded'
	state.adminError = null
	state.admin = payload.admin
	state.relatedReseller = payload.reseller
}

export function adminFailed (state, error) {
	state.adminState = 'failed'
	state.adminError = error
}

export function adminUpdateRequesting (state) {
	state.adminUpdateState = 'requesting'
	state.adminUpdateError = null
}

export function adminUpdateSucceeded (state) {
	state.adminUpdateState = 'succeeded'
	state.adminUpdateError = null
}

export function adminUpdateFailed (state, error) {
	state.adminUpdateState = 'failed'
	state.adminUpdateError = error
}
