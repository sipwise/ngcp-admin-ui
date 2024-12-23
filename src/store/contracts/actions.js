import _ from 'lodash'
import {
    apiGet,
    apiGetList,
    apiPatchReplace,
    apiPost,
    apiPutMinimal
} from 'src/api/ngcpAPI'
import { ajaxFetchTable } from 'src/api/ngcpPanelAPI'

const columns = [
    'id',
    'external_id',
    'contact_email',
    'product_name',
    'billing_profile_name',
    'status'
]

export async function fetchContracts ({ commit }, options) {
    return ajaxFetchTable('/contract/ajax', columns, options)
}

export async function fetchResellerContracts ({ commit }, options) {
    return ajaxFetchTable('/reseller/ajax_contract', columns, options)
}
export async function fetchPeeringContracts ({ commit }, options) {
    return ajaxFetchTable('/contract/peering/ajax', columns, options)
}

export async function filterContracts ({ commit, dispatch }, filter) {
    // eslint-disable-next-line no-nested-ternary
    const api = filter?.isReseller ? 'contracts/fetchResellerContracts' : filter?.isSippeering ? 'contracts/fetchPeeringContracts' : 'contracts/fetchContracts'
    const contracts = await dispatch(api, {
        filter: (typeof filter === 'object') ? filter?.filter : filter,
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

export async function filterSystemContacts ({ commit }, filter) {
    const transformedFilter = (typeof filter === 'object') ? filter?.filter : filter
    const contacts = await apiGetList({
        resource: 'systemcontacts',
        params: {
            email: `${transformedFilter}*`
        }
    })
    commit('filterSystemContacts', _.get(contacts, 'items', []))
}

export async function fetchCustomerContacts ({ commit }, filter) {
    const transformedFilter = (typeof filter === 'object') ? filter?.filter : filter
    const contacts = await apiGetList({
        resource: 'customercontacts',
        params: {
            email: `*${transformedFilter}*`
        }
    })
    commit('customerContacts', _.get(contacts, 'items', []))
}

export async function createContract ({ commit }, data) {
    data.billing_profile_definition = 'profiles'
    if (data.billing_profile_id) {
        data.billing_profiles = [
            {
                profile_id: data.billing_profile_id,
                start: null,
                stop: null
            },
            ...data.billing_profiles
        ]
        delete data.billing_profile_id
    }
    await apiPost({
        resource: 'contracts',
        data
    })
}

export async function updateContract ({ commit }, data) {
    const resourceId = data.id
    delete data.id
    data.billing_profile_definition = 'profiles'
    if (data.billing_profile_id) {
        const billingProfileId = data.billing_profile_id
        delete data.billing_profile_id
        await apiPatchReplace({
            resource: 'contracts',
            resourceId,
            field: 'billing_profile_id',
            value: billingProfileId
        })
    }
    await apiPutMinimal({
        resource: 'contracts',
        resourceId,
        data
    })
}

export async function activateBillingProfile ({ commit }, { contractId, billingProfileId }) {
    return apiPatchReplace({
        resource: 'contracts',
        resourceId: contractId,
        field: 'billing_profile_id',
        value: billingProfileId
    })
}
export async function loadAllContracts ({ commit }, filter) {
    if (filter.category === 'customer') {
        const customers = await apiGet({
            path: 'customers?expand=contact_id'
        })
        commit('allCustomers', _.get(customers?.data, 'items', []))
        commit('allContracts', [])
    } else {
        const contracts = await apiGet({
            path: 'contracts?expand=contact_id'
        })
        commit('allContracts', _.get(contracts?.data, 'items', []))
        commit('allCustomers', [])
    }
}
