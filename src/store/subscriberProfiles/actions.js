import { apiGet, apiPostMinimal, apiPut } from 'src/api/ngcpAPI'

export async function createProfileSet ({ commit }, data) {
    return apiPostMinimal({ resource: 'subscriberprofilesets', data })
}

export async function createProfile ({ commit }, data) {
    return apiPostMinimal({ resource: 'subscriberprofiles', data })
}

export async function updateProfileSet ({ commit }, data) {
    return apiPut({
        resource: 'subscriberprofilesets',
        resourceId: data.id,
        data: data.payload
    })
}

export async function updateProfile ({ commit }, data) {
    return apiPut({
        resource: 'subscriberprofiles',
        resourceId: data.id,
        data: data.payload
    })
}
export async function getSubscriberProfile ({ commit }, options) {
    return await apiGet({
        resource: 'subscriberprofiles',
        config: {
            params: { set_id: options.set_id }
        }
    })
}
export async function createSubscriberProfileSet ({ commit }, data) {
    if (data.id) {
        delete data.id
    }
    return apiPostMinimal({ resource: 'subscriberprofilesets', data })
}
export async function getSubscriberProfiles ({ commit }, options) {
    return await apiGet({
        resource: 'subscriberprofiles',
        config: {
            params: { profile_set_id: options.set_id }
        }
    })
}
export async function createSubscriberProfile ({ commit }, data) {
    if (data.id) {
        delete data.id
    }
    return apiPostMinimal({ resource: 'subscriberprofiles', data })
}
