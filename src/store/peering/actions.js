import { apiPostMinimal, apiPut } from 'src/api/ngcpAPI'

export async function createPeering ({ commit }, data) {
    return apiPostMinimal({ resource: 'peeringgroups', data })
}
export async function updatePeering ({ commit }, data) {
    return apiPut({
        resource: 'peeringgroups',
        resourceId: data.id,
        data: data.payload
    })
}
