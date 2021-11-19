import { apiPostMinimal, apiPut } from 'src/api/ngcpAPI'

export async function createProfileSet ({ commit }, data) {
    return apiPostMinimal({ resource: 'subscriberprofilesets', data })
}

export async function updateProfileSet ({ commit }, data) {
    return apiPut({
        resource: 'subscriberprofilesets',
        resourceId: data.id,
        data: data.payload
    })
}
