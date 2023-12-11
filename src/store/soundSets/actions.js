import _ from 'lodash'
import {
    ajaxFetchTable
} from 'src/api/ngcpPanelAPI'
import {
    apiPostMinimal
} from 'src/api/ngcpAPI'
const columns = [
    'id',
    'reseller_name',
    'contract_contact_email',
    'name',
    'description',
    'null'
]

export async function fetchSoundSets ({ commit }, options) {
    return ajaxFetchTable('/sound/ajax', columns, options)
}

export async function filterSoundSets ({ commit, dispatch }, filter) {
    const soundSets = await dispatch('fetchSoundSets', {
        filter: filter,
        pagination: {
            sortBy: 'id',
            descending: false,
            page: 1,
            rowsPerPage: 10,
            rowsNumber: null
        }
    })
    commit('filterSoundSets', _.get(soundSets, 'aaData', []))
}
export async function createSoundSets ({ commit }, data) {
    return apiPostMinimal({ resource: 'soundsets', data })
}
