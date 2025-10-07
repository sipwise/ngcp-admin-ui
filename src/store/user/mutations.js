export function loginRequesting (state) {
    state.loginState = 'requesting'
    state.loginError = null
    state.OTPSecret = null
}

export function loginSucceeded (state, payload) {
    state.loginState = 'succeeded'
    state.loginError = null
    state.user = payload.user
    state.jwt = payload.jwt
    state.capabilities = payload.capabilities
    state.platformInfo = payload.platformInfo
    state.OTPSecret = null
}

export function loginFailed (state, err) {
    state.loginState = 'failed'
    state.loginError = err
}

export function loginWaitingForOTPCode (state) {
    state.loginState = 'waitingForOTPCode'
    state.OTPSecret = null
}

export function storeOTPSecret (state, payload) {
    state.loginState = 'waitingForOTPCode'
    state.OTPSecret = payload
}

export function logoutRequesting (state) {
    state.loginState = 'loggingOut'
    state.loginError = null
    state.user = null
    state.jwt = null
    state.capabilities = null
    state.platformInfo = null
}

export function logoutSucceeded (state) {
    state.loginState = 'loggedOut'
    state.loginError = null
    state.user = null
    state.jwt = null
    state.capabilities = null
    state.platformInfo = null
}

export function passwordChangeFailed (state, error) {
    state.passwordChangeState = 'failed'
    state.passwordChangeError = error.split("'").slice(-2, -1)[0].split(',').join(', ')
}

export function passwordChangeRequesting (state) {
    state.passwordChangeState = 'requesting'
    state.passwordChangeError = null
}

export function passwordChangeSuccess (state) {
    state.passwordChangeState = 'succeeded'
    state.passwordChangeError = null
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
    const updatedPinned = pinned === null || pinned === undefined ? true : pinned
    state.menuPinned = updatedPinned
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

export function trackPath (state, payload) {
    let goToPath = payload.currentPath
    const routesChain = this.$routeMeta.$routePath(payload.to)
    const routeWithRewriteFn = routesChain.reverse().find((r) => r?.meta?.goToPathRewrite)
    const goToPathRewrite = routeWithRewriteFn ? routeWithRewriteFn?.meta?.goToPathRewrite : null
    if (typeof goToPathRewrite === 'function') {
        const urlForRewrite = new URL(goToPath, location.origin)
        goToPath = goToPathRewrite({ route: payload.to, url: urlForRewrite })?.toString()
    }
    state.currentGoToPath = goToPath
    state.previousPath = payload.previousPath
}
export function setCurrentGoToPath (state, path) {
    state.currentGoToPath = path
}

export function updateGoToPath (state, { path }) {
    state.currentGoToPath = path
}

export function newPasswordRequesting (state, isRequesting) {
    state.newPasswordRequesting = isRequesting
}

export function settingsSucceeded (state, payload = {
    favPages: null
}) {
    if (payload.favPages) {
        state.favPages = payload.favPages
    }
}
