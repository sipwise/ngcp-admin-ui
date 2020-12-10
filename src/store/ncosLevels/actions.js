import _ from 'lodash'
import {
	fetchAjaxTable
} from 'src/api/panel'

const columns = [
	'id',
	'reseller_name',
	'level',
	'mode',
	'description',
	'null'
]

export async function fetchNcosLevels ({ commit }, options) {
	return fetchAjaxTable('/ncos/ajax', columns, options)
}

export async function filterNcosLevels ({ commit, dispatch }, filter) {
	const ncosLevels = await dispatch('fetchNcosLevels', {
		filter: filter,
		pagination: {
			sortBy: 'id',
			descending: false,
			page: 1,
			rowsPerPage: 10,
			rowsNumber: null
		}
	})
	commit('filterNcosLevels', _.get(ncosLevels, 'aaData', []))
}
