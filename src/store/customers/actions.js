import _ from 'lodash'
import { ajaxDownloadCsv, ajaxFetchTable } from 'src/api/ngcpPanelAPI'
import { apiPatchReplace, apiPost, apiPut, apiGetList, apiGet, apiPutMinimal, apiDelete, apiPatchField } from 'src/api/ngcpAPI'
const columns = [
    'id',
    'contact_email'
]
export async function createCustomer ({ commit }, data) {
    data.billing_profile_definition = 'profiles'
    if (data.billing_profile_id) {
        data.billing_profiles = [
            {
                profile_id: data.billing_profile_id,
                network_id: null,
                start: null,
                stop: null
            },
            ...data.billing_profiles
        ]
        delete data.billing_profile_id
    }
    await apiPost({
        resource: 'customers',
        data: data
    })
}

export async function updateCustomer (context, payload) {
    const resourceId = payload.id
    delete payload.id
    payload.billing_profile_definition = 'profiles'
    if (_.has(payload, 'profile_package_id')) {
        const profilePackageId = payload.profile_package_id
        delete payload.profile_package_id
        await apiPatchReplace({
            resource: 'customers',
            resourceId: resourceId,
            field: 'profile_package_id',
            value: profilePackageId
        })
    }
    if (_.has(payload, 'billing_profile_id')) {
        const billingProfileId = payload.billing_profile_id
        delete payload.billing_profile_id
        await apiPatchReplace({
            resource: 'customers',
            resourceId: resourceId,
            field: 'billing_profile_id',
            value: billingProfileId
        })
    }
    return apiPut({
        resource: 'customers',
        resourceId: resourceId,
        data: payload
    })
}

export async function fetchProductsList () {
    // TODO: Product loading code should be replaced with proper API call when it will be implemented
    const options = {
        pagination: {
            sortBy: 'id',
            descending: false,
            page: 1,
            rowsPerPage: 10,
            rowsNumber: null
        }
    }
    const res = await ajaxFetchTable('/product/ajax', ['name'], options)
    return _.get(res, 'aaData', [])
}

/**
 * TODO: temporary "ajax" implementation until the API will provide "Download CSV" implementation for customer Phonebook Entries
 */
export async function ajaxDownloadPhonebookCSV (context, customerId = 0) {
    await ajaxDownloadCsv({
        url: `/customer/${customerId}/phonebook_download_csv`,
        defaultFileName: 'customer_phonebook_entries.csv'
    })
}

export async function createSubscriber ({ commit }, data) {
    const res = await apiPost({
        resource: 'subscribers',
        data: data
    })
    // TODO ask backend to return data of newly created subscriber
    return res?.headers?.location.split('subscribers/')[1]
}

export async function updateSubscriber ({ commit }, data) {
    if (data.pbx_group_ids === null) { 
        data.pbx_group_ids = []
    }
    return await apiPut({
        resource: 'subscribers',
        resourceId: data.id,
        data: data
    })
}

export async function updatePbxGroups ({ commit }, data) {
    if (data.pbx_group_ids === null) {
        data.pbx_group_ids = []
    }
    const path = '/subscribers/' + data.id
    const listData = [
        {
            op: 'replace',
            path: '/alias_numbers',
            value: data.alias_numbers
        },
        {
            op: 'replace',
            path: '/display_name',
            value: data.display_name
        },
        {
            op: 'replace',
            path: '/pbx_extension',
            value: data.pbx_extension
        },
        {
            op: 'replace',
            path: '/pbx_hunt_cancel_mode',
            value: data.pbx_hunt_cancel_mode
        },
        {
            op: 'replace',
            path: '/pbx_hunt_policy',
            value: data.pbx_hunt_policy
        },
        {
            op: 'replace',
            path: '/pbx_hunt_timeout',
            value: data.pbx_hunt_timeout
        }]
    return await apiPatchField(path, listData)
}

export async function fetchCustomerSubscribers ({ commit }, customerId) {
    return await apiGetList({
        resource: 'subscribers',
        params: {
            page: 1,
            rows: 1,
            customer_id: customerId
        }
    })
}

export async function assignNumberToSubscriber ({ commit }, { numberId, subscriberId }) {
    await apiPatchReplace({
        resource: 'numbers',
        resourceId: numberId,
        field: 'subscriber_id',
        value: subscriberId
    })
}

export async function assignNumbersToSubscriber ({ dispatch }, { subscriberId, numberIds }) {
    if (numberIds && numberIds.length > 0) {
        const numberRequests = []
        numberIds.forEach((numberId) => {
            numberRequests.push(dispatch('assignNumberToSubscriber', {
                numberId: numberId,
                subscriberId: subscriberId
            }))
        })
        await Promise.allSettled(numberRequests)
    }
}

export async function unassignNumbers ({ dispatch }, { numberIds, customerId }) {
    const list = await apiGetList({
        resource: 'subscribers',
        params: {
            page: 1,
            rows: 1,
            is_pbx_pilot: true,
            customer_id: customerId
        }
    })
    const pilot = _.get(list, 'items.0')
    if (pilot) {
        await dispatch('assignNumbersToSubscriber', {
            subscriberId: pilot.id,
            numberIds
        })
    }
}

export async function loadFraudPreferences ({ commit }, customerId) {
    const res = await apiGet({
        resource: 'customerfraudpreferences',
        resourceId: customerId
    })
    commit('commitFraudLimits', res?.data || null)
}

export async function updateFraudPreferences (context, payload) {
    return apiPut({
        resource: 'customerfraudpreferences',
        resourceId: payload.id,
        data: payload
    })
}

export async function createLocation ({ commit }, data) {
    await apiPost({
        resource: 'customerlocations',
        data: data
    })
}

export async function updateCustomerLocation (context, payload) {
    const params = {}
    params.customer_id = payload.customer_id
    await apiPutMinimal({
        resource: 'customerlocations',
        resourceId: payload.id,
        data: payload,
        config: {
            params: params
        }
    })
}

export async function updateCustomerSpeedDials (context, payload) {
    const speedDialDefined = payload.data.filter((speeddial) => { return speeddial.id })
    let newSpeedDial = payload.data.filter((speeddial) => { return !speeddial.id })
    if (speedDialDefined.length > 0) {
        speedDialDefined.map(async (speeddial) => {
            await apiPutMinimal({
                resource: 'v2/customerspeeddials',
                resourceId: speeddial.id,
                data: speeddial
            })
        })
    }
    if (newSpeedDial.length > 0) {
        newSpeedDial = newSpeedDial.map((speeddial) => {
            return {
                ...speeddial,
                customer_id: payload.customer_id
            }
        })
        await apiPost({
            resource: 'v2/customerspeeddials',
            data: newSpeedDial
        })
    }
}

export async function deleteCustomerSpeedDial ({ commit }, speedDialId) {
    await apiDelete({
        resource: 'v2/customerspeeddials',
        resourceId: speedDialId
    })
}
export async function fetchCustomersPbxOnly ({ commit }, options) {
    return ajaxFetchTable('/customer/ajax_pbx_only', columns, options)
}
export async function fetchCustomersPbx ({ commit, dispatch }) {
    const api = 'customers/fetchCustomersPbxOnly'
    const customers = await dispatch(api, {
        pagination: {
            sortBy: 'id',
            descending: false,
            page: 1,
            rowsPerPage: 10,
            rowsNumber: null
        }
    }, { root: true })
    commit('customersPbx', _.get(customers, 'aaData', []))
}
