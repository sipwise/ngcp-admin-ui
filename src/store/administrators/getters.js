
export function isAdminLoading (state) {
	return state.adminState === 'requesting'
}

export function hasAdminFailed (state) {
	return state.adminState === 'failed'
}

export function isAdminUpdating (state) {
	return state.adminUpdateState === 'requesting'
}

export function hasAdminUpdateSucceeded (state) {
	return state.adminUpdateState === 'succeeded'
}

export function hasAdminUpdateFailed (state) {
	return state.adminUpdateState === 'failed'
}
