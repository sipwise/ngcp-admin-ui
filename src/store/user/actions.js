
import Qs from 'qs'

export async function login ({ commit }, options) {
	commit('loginRequesting')
	try {
		const res = await this.$http.post('https://192.168.178.23:1443/login/admin', Qs.stringify({
			username: options.username,
			password: options.password
		}), {
			maxRedirects: 0,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		console.log(res)
		if (res.status === 302) {
			commit('loginSucceeded')
		} else {
			commit('loginFailed')
		}
	} catch (err) {
		commit('loginFailed')
	}
}
