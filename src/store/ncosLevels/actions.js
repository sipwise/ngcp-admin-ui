import { apiPostMinimal, apiPut } from 'src/api/ngcpAPI'

export async function createNCOSLevel ({ commit }, data) {
    return apiPostMinimal({ resource: 'v2/ncos/levels', data })
}

export async function updateNCOSLevel ({ commit }, data) {
    return apiPut({
        resource: 'v2/ncos/levels',
        resourceId: data.id,
        data: data.payload
    })
}

export async function createNCOSLevelPattern ({ commit }, data) {
    return apiPostMinimal({ resource: 'v2/ncos/patterns', data })
}

export async function updateNCOSLevelPattern ({ commit }, data) {
    return apiPut({
        resource: 'v2/ncos/patterns',
        resourceId: data.id,
        data: data.payload
    })
}

export async function createNCOSLevelCarrier ({ commit }, data) {
    return apiPostMinimal({ resource: 'ncoslnpcarriers', data })
}

export async function updateNCOSLevelCarrier ({ commit }, data) {
    return apiPut({
        resource: 'ncoslnpcarriers',
        resourceId: data.id,
        data: data.payload
    })
}

export async function createNCOSLevelCarrierPattern ({ commit }, data) {
    return apiPostMinimal({ resource: 'ncoslnppatterns', data })
}

export async function updateNCOSLevelCarrierPattern ({ commit }, data) {
    return apiPut({
        resource: 'ncoslnppatterns',
        resourceId: data.id,
        data: data.payload
    })
}
