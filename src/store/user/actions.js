
import Qs from 'qs'

export async function login ({ commit }, options) {
	commit('loginRequesting')
	try {
		const res = await this.$http.post('https://192.168.178.23:1443/api_admin_jwt', Qs.stringify({
			username: options.username,
			password: options.password
		}), {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		if (res.status === 200) {
			commit('loginSucceeded')
		} else {
			commit('loginFailed')
		}
	} catch (err) {
		commit('loginFailed')
	}
}
