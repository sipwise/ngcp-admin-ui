
import saveAs from 'file-saver'
import {
	fetchAjaxTable
} from '../common'
import Qs from 'qs'

const columns = [
	'id',
	'reseller_name',
	'login',
	'email',
	'is_master',
	'is_ccare',
	'is_active',
	'read_only',
	'show_passwords',
	'call_data',
	'billing_data',
	'can_reset_password',
	'lawful_intercept',
	'is_system',
	''
]

export async function fetchAdministrators ({ commit }, options) {
	commit('adminsRequesting', options)
	try {
		const data = await fetchAjaxTable(this.$httpPanel, '/administrator/ajax', columns, options)
		if (data !== null) {
			commit('adminsSucceeded', data)
		} else {
			commit('adminsFailed')
		}
	} catch (err) {
		commit('adminsFailed')
	}
}

export async function createAdministrator ({ commit }, data) {
	try {
		commit('user/entityCreationRequesting', null, { root: true })
		const res = await this.$httpApi.post('/admins/', data)
		if (res.status === 201) {
			commit('user/entityCreationSucceeded', null, { root: true })
			await this.$router.push({ path: '/administrator' })
		} else {
			commit('user/entityCreationFailed', res.data.message, { root: true })
		}
	} catch (err) {
		commit('user/entityCreationFailed', err.response.data.message, { root: true })
	}
}

export async function updateAdministrator ({ commit }, payload) {
	try {
		commit('adminUpdateRequesting')
		const admin = await this.$apiUpdateEntity('admins', payload.id, payload.data)
		const reseller = await this.$apiFetchEntity('resellers', admin.reseller_id)
		commit('adminUpdateSucceeded')
		commit('adminSucceeded', {
			admin: admin,
			reseller: reseller
		})
	} catch (err) {
		commit('adminUpdateFailed', err.message)
	}
}

export async function deleteAdministrator ({ commit, state, dispatch }, id) {
	commit('user/entityDeletionRequesting', null, { root: true })
	const res = await this.$httpApi.delete('/admins/' + id)
	if (res.status >= 200 && res.status <= 299) {
		commit('user/entityDeletionSucceeded', null, { root: true })
		await dispatch('fetchAdministrators', {
			pagination: state.administratorsPagination,
			filter: state.administratorsFilter
		})
	} else {
		commit('user/entityDeletionFailed', res.data.message, { root: true })
	}
}

export async function loadAdministrator ({ commit, dispatch }, id) {
	await dispatch('filterResellers', '')
	commit('adminRequesting')
	const admin = await this.$apiFetchEntity('admins', id)
	if (admin !== null) {
		const reseller = await this.$apiFetchEntity('resellers', admin.reseller_id)
		if (reseller !== null) {
			commit('adminSucceeded', {
				admin: admin,
				reseller: reseller
			})
		} else {
			commit('adminFailed')
		}
	} else {
		commit('adminFailed')
	}
}

export async function updateAdministratorField ({ commit, dispatch, state }, options) {
	commit('adminUpdateRequesting')
	commit('adminsRequesting', {
		pagination: state.administratorsPagination,
		filter: state.administratorsFilter
	})
	try {
		const res = await this.$apiPatchReplace('admins', options.id, options.field, options.value)
		if (res === true && options.reload === true) {
			const data = await fetchAjaxTable(this.$httpPanel, '/administrator/ajax', columns, {
				pagination: state.administratorsPagination,
				filter: state.administratorsFilter
			})
			commit('adminsSucceeded', data)
			commit('adminUpdateSucceeded')
		} else if (res === true) {
			commit('adminUpdateValue', options)
			commit('adminsSucceeded')
			commit('adminUpdateSucceeded')
		} else {
			commit('adminsFailed')
		}
	} catch (err) {
		commit('adminsFailed')
	}
}

export async function changeAdministratorPassword ({ commit, dispatch, state, rootGetters }, payload) {
	commit('user/dialogRequesting', null, { root: true })
	const res = await this.$apiPatchReplace('admins',
		rootGetters['user/userId'], 'password', payload.password)
	if (res === true) {
		commit('user/dialogSucceeded', null, { root: true })
	} else {
		commit('user/dialogFailed', null, { root: true })
	}
}

export async function recoverAdministratorPassword ({ commit, dispatch, state, rootGetters }, data) {
	commit('user/dialogRequesting', null, { root: true })
	try {
		const res = await this.$httpApi.post('/passwordrecovery/', {
			new_password: data.password,
			token: data.token
		})
		if (res.status === 200 || res.status === 201) {
			commit('user/dialogSucceeded', true, { root: true })
		} else {
			commit('user/dialogFailed', true, { root: true })
		}
	} catch (err) {
		commit('user/dialogFailed', true, { root: true })
	}
}

export async function createAdminCertificate ({ commit, state }, admin) {
	commit('adminCertRequesting')
	try {
		const resCreate = await this.$apiPostBlob('/admincerts/', {
			login: admin.login
		})
		saveAs(resCreate.data, 'ngcp-api-certificate.zip')
		const resExists = await this.$httpApi.get('/admincerts/' + admin.id)
		commit('adminCertSucceeded', {
			hasAdminCertificate: (resExists.data.has_certificate !== 0)
		})
	} catch (err) {
		commit('adminCertFailed', err.message)
	}
}

export async function downloadCACertificate ({ commit, state }, id) {
	commit('adminCertRequesting')
	try {
		const res = await this.$httpPanel.post('/administrator/' + id + '/api_key', Qs.stringify({
			submitid: '',
			'ca.download': 'Download CA Cert'
		}, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}))
		saveAs(new Blob([res.data], { type: 'application/x-x509-ca-cert' }), 'ngcp-ca.pem')
		commit('adminCertSucceeded')
	} catch (err) {
		commit('adminCertFailed', err.message)
	}
}

export async function revokeAdminCertificate ({ commit, state }, admin) {
	commit('adminCertRequesting')
	try {
		await this.$httpApi.delete('/admincerts/' + admin.id)
		const res = await this.$httpApi.get('/admincerts/' + admin.id)
		commit('adminCertSucceeded', {
			hasAdminCertificate: (res.data.has_certificate !== 0)
		})
	} catch (err) {
		commit('adminCertFailed', err.message)
	}
}

export async function hasAdminCertificate ({ commit, state }, admin) {
	commit('adminCertRequesting')
	try {
		const res = await this.$httpApi.get('/admincerts/' + admin.id)
		commit('adminCertSucceeded', {
			hasAdminCertificate: (res.data.has_certificate !== 0)
		})
	} catch (err) {
		commit('adminCertFailed', err.message)
	}
}
