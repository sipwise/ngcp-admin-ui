import {
	LocalStorage
} from 'quasar'

import {
	getJwt,
	setJwt,
	hasJwt,
	deleteJwt,
	getAdminId
} from 'src/auth'
import {
	getLocal,
	setLocal
} from 'src/storage'
import {
	PATH_LOGIN
} from 'src/router/common'

export async function login ({ commit, getters }, options) {
	commit('loginRequesting')
	try {
		const res = await this.$httpPanel.post('/admin_login_jwt', {
			username: options.username,
			password: options.password
		})
		setJwt(res.data.jwt)
		const admin = await this.$apiFetchEntity('admins', getAdminId())
		if (admin !== null) {
			commit('loginSucceeded', {
				user: admin,
				jwt: res.data.jwt
			})
			this.$acl.change(getters.permissions)
			await this.$router.push({ path: '/dashboard' })
		} else {
			commit('loginFailed', 'Wrong credentials')
		}
	} catch (err) {
		commit('loginFailed', 'Wrong credentials')
	}
}

export async function loadUser ({ commit, dispatch }) {
	const jwt = getJwt()
	const id = getAdminId()
	if (hasJwt()) {
		const admin = await this.$apiFetchEntity('admins', id)
		if (admin !== null) {
			commit('loginSucceeded', {
				user: admin,
				jwt: jwt
			})
		} else {
			commit('loginFailed', 'User does not exist')
		}
	} else {
		commit('loginFailed', 'Missing jwt token')
	}
}

export async function logout ({ commit }) {
	deleteJwt()
	this.$acl.reset()
	commit('logout')
	document.location.href = '/#' + PATH_LOGIN
}

export async function closeGoToOldAdminPanelInfo ({ commit }) {
	LocalStorage.set('aui_ngcpGoToOldAdminPanelInfo', false)
	commit('changeGoToOldAdminPanel', false)
}

export async function loadGoToOldAdminPanelInfo ({ commit }) {
	commit('changeGoToOldAdminPanel', LocalStorage.getItem('aui_ngcpGoToOldAdminPanelInfo'))
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

export async function pinMenu (context) {
	setLocal('menuPinned', !context.state.menuPinned)
	context.commit('pinMenu', getLocal('menuPinned'))
}

export async function loadMenuState (context) {
	context.commit('pinMenu', getLocal('menuPinned'))
}
