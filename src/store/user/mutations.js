
export function loginRequesting (state) {
	state.loginState = 'requesting'
	state.loginError = null
}

export function loginSucceeded (state, data) {
	state.loginState = 'succeeded'
	state.loginError = null
	state.userId = data.id
	state.jwt = data.jwt
}

export function loginFailed (state, err) {
	state.loginState = 'failed'
	state.loginError = err
}

export function logout (state) {
	state.loginState = 'initialized'
	state.loginError = null
	state.userId = null
	state.jwt = null
}

export function changeGoToOldAdminPanel (state, goToOldAdminPanel) {
	if (goToOldAdminPanel === null) {
		goToOldAdminPanel = true
	}
	state.goToOldAdminPanelInfo = goToOldAdminPanel
}

export function entityCreationInitialized (state) {
	state.entityCreationState = null
	state.entityCreationError = null
}

export function entityCreationRequesting (state) {
	state.entityCreationState = 'requesting'
	state.entityCreationError = null
}

export function entityCreationSucceeded (state) {
	state.entityCreationState = 'succeeded'
	state.entityCreationError = null
}

export function entityCreationFailed (state, error) {
	state.entityCreationState = 'failed'
	state.entityCreationError = error
}

export function entityDeletionRequesting (state) {
	state.entityDeletionState = 'requesting'
	state.entityDeletionError = null
}

export function entityDeletionSucceeded (state) {
	state.entityDeletionState = 'succeeded'
	state.entityDeletionError = null
}

export function entityDeletionFailed (state, error) {
	state.entityDeletionState = 'failed'
	state.entityDeletionError = error
}
