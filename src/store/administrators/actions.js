
import _ from 'lodash'
import {
	fetchAjaxTable
} from '../common'

const columns = [
	'id',
	'reseller_name',
	'login',
	'is_master',
	'is_ccare',
	'is_active',
	'read_only',
	'show_passwords',
	'call_data',
	'billing_data',
	'lawful_intercept',
	''
]

export async function fetchAdministrators ({ commit }, options) {
	commit('adminsRequesting', options)
	try {
		const res = await fetchAjaxTable(this.$httpPanel,
			'/administrator/ajax', columns, options)
		if (res.status === 200) {
			commit('adminsSucceeded', res.data)
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

export async function filterResellers ({ commit }, options) {
	const params = {
		rows: 10,
		page: 1
	}
	if (_.isString(options.filter) && options.filter.length > 0) {
		params.name = options.filter
	}
	const res = await this.$httpApi.get('/resellers', {
		params: params
	})
	const resellers = _.get(res.data, '_embedded.ngcp:resellers', [])
	commit('filterResellers', resellers)
	options.update()
}
