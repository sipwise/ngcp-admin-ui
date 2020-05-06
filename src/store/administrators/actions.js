
import _ from 'lodash'

const administratorColumns = [
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
	'lawful_intercept'
]

export async function fetchAdministrators ({ commit }, options) {
	commit('adminsRequesting', options)
	try {
		const sortColumn = administratorColumns.indexOf(options.pagination.sortBy)
		let sortDirection = 'asc'
		if (options.pagination.descending) {
			sortDirection = 'desc'
		}
		const res = await this.$httpPanel.get('/administrator/ajax', {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			params: {
				sEcho: 1,
				iColumns: 12,
				sColumns: ',,,,,,,,,,,',
				iDisplayStart: (options.pagination.page - 1) * options.pagination.rowsPerPage,
				iDisplayLength: options.pagination.rowsPerPage,
				mDataProp_0: 'id',
				sSearch_0: '',
				bRegex_0: false,
				bSearchable_0: true,
				bSortable_0: true,
				mDataProp_1: 'reseller_name',
				sSearch_1: '',
				bRegex_1: false,
				bSearchable_1: true,
				bSortable_1: true,
				mDataProp_2: 'login',
				sSearch_2: '',
				bRegex_2: false,
				bSearchable_2: true,
				bSortable_2: true,
				mDataProp_3: 'is_master',
				sSearch_3: '',
				bRegex_3: false,
				bSearchable_3: true,
				bSortable_3: true,
				mDataProp_4: 'is_ccare',
				sSearch_4: '',
				bRegex_4: false,
				bSearchable_4: true,
				bSortable_4: true,
				mDataProp_5: 'is_active',
				sSearch_5: '',
				bRegex_5: false,
				bSearchable_5: true,
				bSortable_5: true,
				mDataProp_6: 'read_only',
				sSearch_6: '',
				bRegex_6: false,
				bSearchable_6: true,
				bSortable_6: true,
				mDataProp_7: 'show_passwords',
				sSearch_7: '',
				bRegex_7: false,
				bSearchable_7: true,
				bSortable_7: true,
				mDataProp_8: 'call_data',
				sSearch_8: '',
				bRegex_8: false,
				bSearchable_8: true,
				bSortable_8: true,
				mDataProp_9: 'billing_data',
				sSearch_9: '',
				bRegex_9: false,
				bSearchable_9: true,
				bSortable_9: true,
				mDataProp_10: 'lawful_intercept',
				sSearch_10: '',
				bRegex_10: false,
				bSearchable_10: true,
				bSortable_10: true,
				mDataProp_11: null,
				sSearch_11: '',
				bRegex_11: false,
				bSearchable_11: true,
				bSortable_11: false,
				sSearch: options.filter,
				bRegex: false,
				iSortCol_0: sortColumn,
				sSortDir_0: sortDirection,
				iSortingCols: '1'
			}
		})
		if (res.status === 200) {
			commit('adminsSucceeded', res.data)
		} else {
			commit('adminsFailed')
		}
	} catch (err) {
		commit('adminsFailed')
	}
}

export async function createAdmin ({ commit }, data) {
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
