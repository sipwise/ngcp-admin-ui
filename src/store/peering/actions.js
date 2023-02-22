import { apiPostMinimal } from 'src/api/ngcpAPI'

export async function createPeering ({ commit }, data) {
    return apiPostMinimal({ resource: 'peeringgroups', data })
}
