import _ from 'lodash'
import {
    ajaxFetchTable
} from 'src/api/ngcpPanelAPI'
import { apiPostMinimal } from 'src/api/ngcpAPI'

const columns = [
    'id',
    'reseller_name',
    'name',
    'null'
]

export async function fetchEmergencyContainers ({ commit }, options) {
    return ajaxFetchTable('/emergencymapping/emergency_container_ajax', columns, options)
}

export async function filterEmergencyContainers ({ commit, dispatch }, filter) {
    const headerRuleSets = await dispatch('fetchEmergencyContainers', {
        filter: filter,
        pagination: {
            sortBy: 'id',
            descending: false,
            page: 1,
            rowsPerPage: 10,
            rowsNumber: null
        }
    })
    commit('filterEmergencyContainers', _.get(headerRuleSets, 'aaData', []))
}

export async function createEmergencyMappingContainer (context, payload) {
    await apiPostMinimal({
        resource: 'emergencymappingcontainers',
        data: payload
    })
}
