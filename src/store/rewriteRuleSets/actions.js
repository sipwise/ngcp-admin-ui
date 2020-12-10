import _ from 'lodash'
import {
	fetchAjaxTable
} from 'src/api/panel'

const columns = [
	'id',
	'reseller_name',
	'name',
	'description',
	'null'
]

export async function fetchRewriteRuleSets ({ commit }, options) {
	return fetchAjaxTable('/rewrite/ajax', columns, options)
}

export async function filterRewriteRuleSets ({ commit, dispatch }, filter) {
	const rewriteRuleSets = await dispatch('fetchRewriteRuleSets', {
		filter: filter,
		pagination: {
			sortBy: 'id',
			descending: false,
			page: 1,
			rowsPerPage: 10,
			rowsNumber: null
		}
	})
	commit('filterRewriteRuleSets', _.get(rewriteRuleSets, 'aaData', []))
}
