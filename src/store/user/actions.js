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
	try {
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
				dispatch('logout')
			}
		} else {
			dispatch('logout')
		}
	} catch (err) {
		console.debug('Error loading user')
		console.error(err)
		dispatch('logout')
	}
}

export async function logout ({ commit }) {
	commit('logoutRequesting')
	deleteJwt()
	this.$acl.reset()
	try {
		await this.$httpPanel.get('/ajax_logout')
	} catch (err) {
		console.debug('Cloud not logout from v1 properly')
		console.error(err)
	} finally {
		commit('logoutSucceeded')
		document.location.href = this.$appConfig.path + '/#' + PATH_LOGIN
	}
}

export async function closeGoToOldAdminPanelInfo ({ commit }) {
	LocalStorage.set('aui_ngcpGoToOldAdminPanelInfo', false)
	commit('changeGoToOldAdminPanel', false)
}

export async function loadGoToOldAdminPanelInfo ({ commit }) {
	commit('changeGoToOldAdminPanel', LocalStorage.getItem('aui_ngcpGoToOldAdminPanelInfo'))
}

export async function goToOldAdminPanel ({ state }) {
	document.location.href = this.$appConfig.ngcpPanelUrl + state.currentPath + '?framed=0'
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

export async function passwordReset ({ commit }, data) {
	commit('newPasswordRequesting', true)
	const response = await this.$httpApi.post('/passwordreset/', data)
	commit('newPasswordRequesting', false)
	return response
}
