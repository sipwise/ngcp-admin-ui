import { apiPostMinimal, apiPut } from 'src/api/ngcpAPI'

export async function createNCOSSet ({ commit }, data) {
    return apiPostMinimal({ resource: 'v2/ncos/sets', data })
}

export async function updateNCOSSet ({ commit }, data) {
    return apiPut({
        resource: 'v2/ncos/sets',
        resourceId: data.id,
        data: data.payload
    })
}

export async function createNCOSSetLevel ({ commit }, data) {
    return apiPostMinimal({ resource: `v2/ncos/sets/${data.id}/levels`, data: { level_id: data.level_id } })
}
