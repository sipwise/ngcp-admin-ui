import {
	fetchAjaxTable
} from 'src/api/panel'
import _ from 'lodash'

const columns = [
	'id',
	'external_id',
	'contact_email',
	'product_name',
	'billing_profile_name',
	'status'
]

export async function fetchContracts ({ commit }, options) {
	return fetchAjaxTable('/contract/ajax', columns, options)
}

export async function filterContracts ({ commit, dispatch }, filter) {
	const contracts = await dispatch('contracts/fetchContracts', {
		filter: filter,
		pagination: {
			sortBy: 'id',
			descending: false,
			page: 1,
			rowsPerPage: 10,
			rowsNumber: null
		}
	}, { root: true })
	commit('filterContracts', _.get(contracts, 'aaData', []))
}
