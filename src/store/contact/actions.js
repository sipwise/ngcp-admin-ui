import { apiPostMinimal, apiPutMinimal } from 'src/api/ngcpAPI'

export async function createCustomerContact ({ commit }, data) {
    return apiPostMinimal({ resource: 'customercontacts', data })
}

export async function createSystemContact ({ commit }, data) {
    return apiPostMinimal({ resource: 'systemcontacts', data })
}

export async function updateCustomerContact ({ commit }, data) {
    const resourceId = data.id
    delete data.id
    return apiPutMinimal({
        resource: 'customercontacts',
        resourceId,
        data
    })
}

export async function updateSystemContact ({ commit }, data) {
    const resourceId = data.id
    delete data.id
    return apiPutMinimal({
        resource: 'systemcontacts',
        resourceId,
        data
    })
}
