import {
	fetchAjaxTable
} from 'src/store/common'

const columns = [
	'id',
	'contract_id',
	'name',
	'status',
	'enable_rtc',
	'null'
]

export async function fetchResellers ({ commit }, options) {
	return fetchAjaxTable(this.$httpPanel, '/reseller/ajax', columns, options)
}

export async function fetchResellerList ({ commit, dispatch }, options) {
	commit('resellerListRequesting', options)
	try {
		const data = await dispatch('fetchResellers', options)
		if (data !== null) {
			commit('resellerListSucceeded', data)
		} else {
			commit('resellerListFailed')
		}
	} catch (err) {
		commit('resellerListFailed')
	}
}

export async function toggleEnableRTC ({ commit, state }, options) {
	commit('resellerListRequesting', {
		pagination: state.resellerListPagination,
		filter: state.resellerListFilter
	})
	try {
		const sanatizedValue = this.$toVerbalBoolean(options.value)
		const res = await this.$apiPatchReplace('resellers', options.id, 'enable_rtc', options.value)
		if (res === true) {
			commit('resellerUpdateValue', {
				id: options.id,
				field: 'enable_rtc',
				value: sanatizedValue
			})
			commit('resellerListSucceeded')
		} else {
			commit('resellerListFailed')
		}
	} catch (err) {
		commit('resellerListFailed')
	}
}
