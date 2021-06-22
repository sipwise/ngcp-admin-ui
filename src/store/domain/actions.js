import { apiGetList, apiPostMinimal } from 'src/api/ngcpAPI'

export async function createDomain ({ commit }, data) {
    return apiPostMinimal({ resource: 'domains', data })
}

export async function fetchDomainSubscribersCount ({ commit }, filter = {}) {
    const subscribers = await apiGetList({
        resource: 'subscribers',
        ...filter
    })
    return subscribers.totalItems
}
