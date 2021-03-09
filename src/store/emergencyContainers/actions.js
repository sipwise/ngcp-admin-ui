import _ from 'lodash'
import {
    fetchAjaxTable
} from 'src/api/panel'

const columns = [
    'id',
    'reseller_name',
    'name',
    'null'
]

export async function fetchEmergencyContainers ({ commit }, options) {
    return fetchAjaxTable('/emergencymapping/emergency_container_ajax', columns, options)
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
