
export function adminsRequesting (state) {
	state.administratorsState = 'requesting'
}

export function adminsSucceeded (state, payload) {
	state.administrators = payload.rows
	state.adminsitratorsTotalRowCount = payload.totalRowCount
	state.administratorsState = 'succeeded'
}

export function adminsFailed (state) {
	state.administratorsState = 'failed'
}
