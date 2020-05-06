import {
	LocalStorage
} from 'quasar'

export async function login ({ commit }, options) {
	commit('loginRequesting')
	try {
		const res = await this.$httpPanel.post('/admin_login_jwt', {
			username: options.username,
			password: options.password
		})
		if (res.status === 200) {
			LocalStorage.set('ngcpJwt', res.data.jwt)
			LocalStorage.set('ngcpAdminId', res.data.id)
			commit('loginSucceeded', res.data)
			await this.$router.push({ path: '/dashboard' })
		} else {
			commit('loginFailed', 'Wrong credentials')
		}
	} catch (err) {
		commit('loginFailed', 'Wrong credentials')
	}
}

export async function logout ({ commit }) {
	LocalStorage.remove('ngcpJwt')
	LocalStorage.remove('ngcpAdminId')
	commit('logout')
	await this.$router.push({ path: '/login/admin' })
}

export async function closeGoToOldAdminPanelInfo ({ commit }) {
	LocalStorage.set('ngcpGoToOldAdminPanelInfo', false)
	commit('changeGoToOldAdminPanel', false)
}

export async function loadGoToOldAdminPanelInfo ({ commit }) {
	commit('changeGoToOldAdminPanel', LocalStorage.getItem('ngcpGoToOldAdminPanelInfo'))
}
