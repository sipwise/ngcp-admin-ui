import { apiPutMinimal } from 'src/api/common'

export async function createCustomerContact ({ commit }, data) {
    return this.$httpApi.post('/customercontacts/', data)
}

export async function createSystemContact ({ commit }, data) {
    return this.$httpApi.post('/systemcontacts/', data)
}

export async function updateCustomerContact ({ commit }, data) {
    const resourceId = data.id
    delete data.id
    return apiPutMinimal({
        resource: 'customercontacts',
        resourceId: resourceId,
        data: data
    })
}

export async function updateSystemContact ({ commit }, data) {
    const resourceId = data.id
    delete data.id
    return apiPutMinimal({
        resource: 'systemcontacts',
        resourceId: resourceId,
        data: data
    })
}
