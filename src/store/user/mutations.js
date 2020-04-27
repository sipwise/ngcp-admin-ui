
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
