import _ from 'lodash'
import { generateResellerFilterParams } from 'src/api/common'
import { apiGetList, apiPost } from 'src/api/ngcpAPI'

export async function fetchBillingProfiles ({ commit }, payload) {
    const billingProfiles = await apiGetList({
        resource: 'billingprofiles',
        params: generateResellerFilterParams(payload)
    })
    commit('billingProfiles', _.get(billingProfiles, 'items', []))
}

export async function fetchBillingNetworks ({ commit }, payload) {
    const networks = await apiGetList({
        resource: 'billingnetworks',
        params: generateResellerFilterParams(payload)
    })
    commit('billingNetworks', _.get(networks, 'items', []))
}

export async function createBillingProfile ({ commit }, data) {
    return await apiPost({
        resource: 'billingprofiles',
        data: data
    })
}
