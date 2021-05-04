import _ from 'lodash'
import { fetchAjaxTable } from 'src/api/panel'
import { apiPatchReplace, apiPost, apiPut } from 'src/api/common'

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
    const res = await fetchAjaxTable('/product/ajax', ['name'], options)
    return _.get(res, 'aaData', [])
}
