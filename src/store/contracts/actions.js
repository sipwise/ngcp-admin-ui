import {
    ajaxFetchTable
} from 'src/api/ngcpPanelAPI'
import _ from 'lodash'
import { apiGetList, apiPatchReplace, apiPost, apiPutMinimal } from 'src/api/ngcpAPI'

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

export async function filterContracts ({ commit, dispatch }, filter) {
    const contracts = await dispatch('contracts/fetchContracts', {
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
    filter = (typeof filter === 'object') ? filter?.filter : filter
    const contacts = await apiGetList({
        resource: 'systemcontacts',
        params: {
            email: filter + '*'
        }
    })
    commit('filterSystemContacts', _.get(contacts, 'items', []))
}

export async function fetchCustomerContacts ({ commit }, filter) {
    filter = (typeof filter === 'object') ? filter?.filter : filter
    const contacts = await apiGetList({
        resource: 'customercontacts',
        params: {
            email: '*' + filter + '*'
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
        data: data
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
            resourceId: resourceId,
            field: 'billing_profile_id',
            value: billingProfileId
        })
    }
    await apiPutMinimal({
        resource: 'contracts',
        resourceId: resourceId,
        data: data
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
