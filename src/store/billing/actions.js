import { apiPost, apiPut, apiGet } from 'src/api/ngcpAPI'
import { ajaxPost } from 'src/api/ngcpPanelAPI'

export async function createBillingProfile ({ commit }, data) {
    return await apiPost({
        resource: 'billingprofiles',
        data: data
    })
}

// TODO: is should be replaced with an appropriate new API endpoint
export async function getCustomerBillingProfilesMapping ({ commit }, data) {
    const { customerId, start, end } = data
    const ajaxUrl = `/customer/${customerId}/billingmappings/ajax`
    const res = await ajaxPost(
        ajaxUrl,
        {
            start: (start != null ? start.toISOString() : null),
            end: (end != null ? end.toISOString() : null)
        }, {
            timeout: 15000,
            headers: {
                contentType: 'application/json; charset=utf-8'
            }
        })
    return res?.data
}

export async function createBillingNetwork ({ commit }, data) {
    return await apiPost({
        resource: 'billingnetworks',
        data: data
    })
}

export async function updateBillingNetwork ({ commit }, data) {
    return await apiPut({
        resource: 'billingnetworks',
        resourceId: data.id,
        data: data.payload
    })
}

export async function loadBillingNetwork ({ commit }, billingNetworkId) {
    return await apiGet({
        resource: 'billingnetworks',
        resourceId: billingNetworkId
    })
}

export async function updateBillingProfile ({ commit }, data) {
    return await apiPut({
        resource: 'billingprofiles',
        resourceId: data.id,
        data: data.payload
    })
}

export async function loadBillingProfile ({ commit }, billingProfileId) {
    return await apiGet({
        resource: 'billingprofiles',
        resourceId: billingProfileId
    })
}
