
export function loginRequesting (state) {
	state.loginState = 'requesting'
	state.loginError = null
}

export function loginSucceeded (state) {
	state.loginState = 'succeeded'
	state.loginError = null
}

export function loginFailed (state, err) {
	state.loginState = 'failed'
	state.loginError = err
}
