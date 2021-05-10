import _ from 'lodash'
import {
    ajaxFetchTable
} from 'src/api/ngcpPanelAPI'

const columns = [
    'id',
    'reseller_name',
    'name',
    'description',
    'null'
]

export async function fetchHeaderRuleSets ({ commit }, options) {
    return ajaxFetchTable('/header/ajax', columns, options)
}

export async function filterHeaderRuleSets ({ commit, dispatch }, filter) {
    const headerRuleSets = await dispatch('fetchHeaderRuleSets', {
        filter: filter,
        pagination: {
            sortBy: 'id',
            descending: false,
            page: 1,
            rowsPerPage: 10,
            rowsNumber: null
        }
    })
    commit('filterHeaderRuleSets', _.get(headerRuleSets, 'aaData', []))
}
