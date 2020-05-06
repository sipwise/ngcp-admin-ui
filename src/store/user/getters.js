
export function isEntityCreationRequesting (state) {
	return state.entityCreationState === 'requesting'
}

export function hasEntityCreationFailed (state) {
	return state.entityCreationState === 'failed'
}

export function entityCreationError (state) {
	return state.entityCreationError
}
