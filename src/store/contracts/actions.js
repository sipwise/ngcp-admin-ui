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
    const filterObj = (typeof filter === 'object') ? filter : { filter }

    let api = 'contracts/fetchContracts'
    if (filterObj?.isReseller) {
        api = 'contracts/fetchResellerContracts'
    } else if (filterObj?.isSippeering) {
        api = 'contracts/fetchPeeringContracts'
    }

    const page = filterObj.page ?? 1
    const rowsPerPage = filterObj.rows ?? 10

    const contracts = await dispatch(api, {
        filter: filterObj.filter,
        pagination: {
            sortBy: 'id',
            descending: false,
            page: page === 0 ? 1 : page,
            rowsPerPage,
            rowsNumber: null
        }
    }, { root: true })
    commit('filterContracts', {
        contracts: _.get(contracts, 'aaData', []),
        page
    })
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
export async function loadAllContracts ({ commit }, options) {
    const page = options.page ?? 1
    const rowsPerPage = options.rows ?? 10
    const isCustomer = options.category === 'customer'
    const resource = isCustomer ? 'customers' : 'contracts'
    const mutation = isCustomer ? 'allCustomers' : 'allContracts'
    const inactiveMutation = isCustomer ? 'allContracts' : 'allCustomers'

    const response = await apiGet({
        path: `${resource}?expand=contact_id`,
        config: {
            params: {
                page: page === 0 ? 1 : page,
                rows: rowsPerPage
            }
        }
    })

    if (page <= 1) {
        commit(inactiveMutation, { items: [], page })
    }
    commit(mutation, {
        items: response?.data?.items ?? [],
        page
    })
}
