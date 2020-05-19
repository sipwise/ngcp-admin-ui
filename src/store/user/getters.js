
import _ from 'lodash'

export function isEntityCreationRequesting (state) {
	return state.entityCreationState === 'requesting'
}

export function hasEntityCreationFailed (state) {
	return state.entityCreationState === 'failed'
}

export function entityCreationError (state) {
	return state.entityCreationError
}

export function isEntityUpdateRequesting (state) {
	return state.entityUpdateState === 'requesting'
}

export function hasEntityUpdateFailed (state) {
	return state.entityUpdateState === 'failed'
}

export function entityUpdateError (state) {
	return state.entityUpdateError
}

export function entityLoaded (state) {
	return state.entityLoaded
}

export function isEntityLoadRequesting (state) {
	return state.entityLoadState === 'requesting'
}

export function hasEntityLoadFailed (state) {
	return state.entityUpdateState === 'failed'
}

export function entityLoadError (state) {
	return state.entityUpdateError
}

export function isLoggedIn (state) {
	return state.loginState === 'succeeded' && state.user !== null
}

export function userName (state) {
	return state.user.login
}

export function userId (state) {
	return _.get(state, 'user.id', null)
}

export function isDialogRequesting (state) {
	return state.dialogState === 'requesting'
}

export function hasDialogSucceeded (state) {
	return state.dialogState === 'succeeded'
}

export function hasDialogFailed (state) {
	return state.dialogState === 'failed'
}

export function dialogError (state) {
	return state.dialogError
}
