import { apiPostMinimal } from 'src/api/ngcpAPI'

export async function createDomain ({ commit }, data) {
    return apiPostMinimal({ resource: 'domains', data })
}
