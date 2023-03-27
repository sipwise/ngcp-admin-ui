
import { apiPostMinimal, apiPut } from 'src/api/ngcpAPI'
export async function createEmergencyMapping (context, payload) {
    await apiPostMinimal({
        resource: 'emergencymappings',
        data: payload
    })
}
export async function updateEmergencyMapping ({ commit }, data) {
    return apiPut({
        resource: 'emergencymappings',
        resourceId: data.id,
        data: data.payload
    })
}
