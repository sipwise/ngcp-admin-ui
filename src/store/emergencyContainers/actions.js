import { apiPostMinimal, apiPut } from 'src/api/ngcpAPI'

export async function createEmergencyMappingContainer (context, payload) {
    await apiPostMinimal({
        resource: 'emergencymappingcontainers',
        data: payload
    })
}
export async function updateEmergencyMappingContainer ({ commit }, data) {
    return apiPut({
        resource: 'emergencymappingcontainers',
        resourceId: data.id,
        data: data.payload
    })
}
