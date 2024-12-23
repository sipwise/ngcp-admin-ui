import _ from 'lodash'
import { apiGetList, apiPostMinimal, apiPut } from 'src/api/ngcpAPI'

export async function filterNcosLevels ({ commit, rootGetters }, options = {
    filter: null,
    resellerId: null
}) {
    if (options.resellerId !== null) {
        const params = {
            reseller_id: options.resellerId
        }
        if (_.trim(options.filter)) {
            params.level = `*${options.filter}*`
        }
        const ncosLevels = await apiGetList({
            resource: 'ncoslevels',
            params
        })
        commit('filterNcosLevels', ncosLevels.items)
    } else {
        throw new Error('Missing resellerId while fetching NcosLevels')
    }
}

export async function createNCOSLevel ({ commit }, data) {
    return apiPostMinimal({ resource: 'ncoslevels', data })
}

export async function updateNCOSLevel ({ commit }, data) {
    return apiPut({
        resource: 'ncoslevels',
        resourceId: data.id,
        data: data.payload
    })
}

export async function createNCOSLevelPattern ({ commit }, data) {
    return apiPostMinimal({ resource: 'ncospatterns', data })
}

export async function updateNCOSLevelPattern ({ commit }, data) {
    return apiPut({
        resource: 'ncospatterns',
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
