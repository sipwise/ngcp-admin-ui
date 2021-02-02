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
