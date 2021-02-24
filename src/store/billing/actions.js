import _ from 'lodash'
import { apiGetList } from 'src/api/common'

export async function fetchBillingProfiles ({ commit }, filter) {
	let paramsObj = {}
	if (filter) {
		paramsObj = {
			params: {
				handle: filter
			}
		}
	}
	const billingProfiles = await apiGetList({
		...{
			resource: 'billingprofiles'
		},
		...paramsObj
	})
	commit('billingProfiles', _.get(billingProfiles, 'items', []))
}

export async function fetchBillingNetworks ({ commit }, filter) {
	const networks = await apiGetList({
		resource: 'billingnetworks',
		params: {
			name: filter + '*',
			page: 1,
			rows: 10
		}
	})
	commit('billingNetworks', _.get(networks, 'items', []))
}

export function addInterval ({ commit }) {
	commit('addBillingInterval', {
		profile_id: null,
		network_id: null,
		start: null,
		stop: null
	})
}

export function editInterval ({ commit }, { index, field, value }) {
	commit('editBillingInterval', {
		index: index,
		field: field,
		value: value
	})
}

export function deleteInterval ({ commit }, index) {
	commit('deleteBillingInterval', index)
}

export function resetIntervals ({ commit }) {
	commit('resetBillingIntervals')
}

export async function createBillingProfile ({ commit }, data) {
	return this.$httpApi.post('/billingprofiles/', data)
}
