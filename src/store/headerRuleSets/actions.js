import _ from 'lodash'
import {
    ajaxFetchTable,
    ajaxGet
} from 'src/api/ngcpPanelAPI'
import {
    apiPostMinimal
} from 'src/api/ngcpAPI'
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

export async function headerRuleSetMoveUpDown ({ commit }, { subscriberId, headerId, move = 'up' }) {
    await ajaxGet(`/subscriber/${subscriberId}/preferences/header/`, {
        params: {
            move: headerId,
            where: (move === 'up') ? 'up' : 'down'
        }
    })
}
export async function createHeaderRuleSet ({ commit }, data) {
    return await apiPostMinimal({ resource: 'headerrulesets', data })
}
