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
		LocalStorage.set('ngcpJwt', res.data.jwt)
		LocalStorage.set('ngcpAdminId', res.data.id)
		const admin = await this.$fetchEntity('admins', res.data.id)
		if (admin !== null) {
			commit('loginSucceeded', {
				user: admin,
				jwt: res.data.jwt
			})
			await this.$router.push({ path: '/dashboard' })
		} else {
			commit('loginFailed', 'Wrong credentials')
		}
	} catch (err) {
		commit('loginFailed', 'Wrong credentials')
	}
}

export async function loadUser ({ commit, dispatch }) {
	const jwt = LocalStorage.getItem('ngcpJwt')
	const id = LocalStorage.getItem('ngcpAdminId')
	if (jwt !== null && id !== null) {
		const admin = await this.$fetchEntity('admins', id)
		if (admin !== null) {
			commit('loginSucceeded', {
				user: admin,
				jwt: jwt
			})
		} else {
			await dispatch('logout')
		}
	} else {
		await dispatch('logout')
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

export async function loadEntity ({ commit }, options) {
	commit('entityLoadRequesting')
	const res = await this.$httpApi.get('/' + options.entity + '/' + options.id)
	if (res.status >= 200 && res.status <= 299) {
		commit('entityLoadSucceeded', res.data)
	} else {
		commit('entityLoadFailed', res.data.message)
	}
}
