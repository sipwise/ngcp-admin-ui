import {
    apiGet,
    apiPatch,
    apiPost,
    apiPut,
    apiUploadCsv
} from 'src/api/ngcpAPI'
import { ajaxDownloadCsv, ajaxPost } from 'src/api/ngcpPanelAPI'

export async function createBillingProfile ({ commit }, data) {
    return await apiPost({
        resource: 'billingprofiles',
        data
    })
}

// TODO: is should be replaced with an appropriate new API endpoint
export async function getCustomerBillingProfilesMapping ({ commit }, data) {
    const { customerId, start, end } = data
    const ajaxUrl = `/customer/${customerId}/billingmappings/ajax`
    const res = await ajaxPost(
        ajaxUrl,
        {
            start: (start !== null ? start.toISOString() : null),
            end: (end !== null ? end.toISOString() : null)
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
        data
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
export async function createBillingZones ({ commit }, data) {
    return await apiPost({
        resource: 'billingzones',
        data
    })
}
export async function updateBillingZones ({ commit }, data) {
    return await apiPut({
        resource: 'billingzones',
        resourceId: data.id,
        data: data.payload
    })
}
export async function createProfilePackages ({ commit }, data) {
    return await apiPost({
        resource: 'profilepackages',
        data
    })
}
export async function updateProfilePackages ({ commit }, data) {
    return apiPut({
        resource: 'profilepackages',
        resourceId: data.id,
        data: data.payload
    })
}
export async function updateProfilePackagesPeakTimeWeekdays ({ commit }, data) {
    return apiPatch({
        resource: 'billingprofiles',
        resourceId: data.profileId,
        method: 'replace',
        field: 'peaktime_weekdays',
        value: data.timeWeekdays
    })
}
export async function updateProfilePackagesPeakTimeSpecialDates ({ commit }, data) {
    return apiPatch({
        resource: 'billingprofiles',
        resourceId: data.profileId,
        method: 'replace',
        field: 'peaktime_special',
        value: data.specialDates
    })
}
export async function downloadCsv (context, profileId = 0) {
    await ajaxDownloadCsv({
        url: `/billing/${profileId}/fees/download`,
        defaultFileName: `billing_fees_${profileId}.csv`
    })
}
export async function createBillingFees ({ commit }, data) {
    return await apiPost({
        resource: 'billingfees',
        data
    })
}
export async function updateBillingFees ({ commit }, data) {
    return await apiPut({
        resource: 'billingfees',
        resourceId: data.id,
        data: data.payload
    })
}

export async function uploadCsv (context, formData) {
    const config = {
        headers: {
            'Content-Type': 'text/csv'
        }
    }
    const purgeExistingValue = formData?.purge_existing ? '1' : '0'
    await apiUploadCsv({
        path: `billingfees/?billing_profile_id=${formData.billingProfileId}&purge_existing=${purgeExistingValue}`,
        data: formData.file,
        config
    })
}
export async function createVouchers ({ commit }, data) {
    return await apiPost({
        resource: 'vouchers',
        data
    })
}
export async function updateBillingVouchers ({ commit }, data) {
    return await apiPut({
        resource: 'vouchers',
        resourceId: data.id,
        data: data.payload
    })
}
export async function uploadVouchersAsCsv (context, formData) {
    const config = {
        headers: {
            'Content-Type': 'text/csv'
        }
    }
    const purgeExistingValue = formData?.purge_existing ? '1' : '0'
    await apiUploadCsv({
        path: `vouchers/?purge_existing=${purgeExistingValue}`,
        data: formData.file,
        config
    })
}
export async function duplicateBillingProfiles ({ commit }, data) {
    if (data.id) {
        delete data.id
    }
    return apiPost({
        resource: 'billingprofiles',
        data
    })
}
