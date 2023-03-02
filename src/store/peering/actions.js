import { apiPostMinimal, apiPut, apiPutMinimal } from 'src/api/ngcpAPI'

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
export async function createServer ({ commit }, data) {
    return apiPostMinimal({ resource: 'peeringservers', data: data })
}
export async function updatePeeringServer (context, payload) {
    const params = {}
    params.group_id = payload.group_id
    await apiPutMinimal({
        resource: 'peeringservers',
        resourceId: payload.id,
        data: payload,
        config: {
            params: params
        }
    })
}
