
export function loginRequesting (state) {
	state.loginState = 'requesting'
	state.loginError = null
}

export function loginSucceeded (state, payload) {
	state.loginState = 'succeeded'
	state.loginError = null
	state.user = payload.user
	state.jwt = payload.jwt
}

export function loginFailed (state, err) {
	state.loginState = 'failed'
	state.loginError = err
}

export function logoutRequesting (state) {
	state.loginState = 'loggingOut'
	state.loginError = null
	state.user = null
	state.jwt = null
}

export function logoutSucceeded (state) {
	state.loginState = 'loggedOut'
	state.loginError = null
	state.user = null
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

export function entityUpdateRequesting (state) {
	state.entityUpdateState = 'requesting'
	state.entityUpdateError = null
}

export function entityUpdateSucceeded (state) {
	state.entityUpdateState = 'succeeded'
	state.entityUpdateError = null
}

export function entityUpdateFailed (state, error) {
	state.entityUpdateState = 'failed'
	state.entityUpdateError = error
}

export function entityLoadRequesting (state) {
	state.entityLoadState = 'requesting'
	state.entityLoadError = null
}

export function entityLoadSucceeded (state, entity) {
	state.entityLoaded = entity
	state.entityLoadState = 'succeeded'
	state.entityLoadError = null
}

export function entityLoadFailed (state, error) {
	state.entityLoadState = 'failed'
	state.entityLoadError = error
}

export function entityListRequesting (state) {
	state.entityListState = 'requesting'
	state.entityListError = null
}

export function entityListSucceeded (state) {
	state.entityListState = 'succeeded'
	state.entityListError = null
}

export function entityListFailed (state, error) {
	state.entityListState = 'failed'
	state.entityListError = error
}

export function dialogRequesting (state) {
	state.dialogState = 'requesting'
	state.dialogError = null
}

export function dialogSucceeded (state) {
	state.dialogState = 'succeeded'
	state.dialogError = null
}

export function dialogFailed (state, error) {
	state.dialogState = 'failed'
	state.dialogError = error
}

export function pinMenu (state, pinned) {
	if (pinned === null || pinned === undefined) {
		pinned = true
	}
	state.menuPinned = pinned
	if (state.menuPinned === false) {
		state.menuMinimized = true
	}
}

export function maximizeMenu (state) {
	if (state.menuPinned === false) {
		state.menuMinimized = false
	}
}

export function minimizeMenu (state) {
	if (state.menuPinned === false) {
		state.menuMinimized = true
	}
}
