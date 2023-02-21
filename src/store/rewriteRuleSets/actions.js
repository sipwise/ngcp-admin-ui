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
    'name',
    'description',
    'null'
]

export async function fetchRewriteRuleSets ({ commit }, options) {
    return ajaxFetchTable('/rewrite/ajax', columns, options)
}

export async function filterRewriteRuleSets ({ commit, dispatch }, filter) {
    const rewriteRuleSets = await dispatch('fetchRewriteRuleSets', {
        filter: filter,
        pagination: {
            sortBy: 'id',
            descending: false,
            page: 1,
            rowsPerPage: 10,
            rowsNumber: null
        }
    })
    commit('filterRewriteRuleSets', _.get(rewriteRuleSets, 'aaData', []))
}

export async function createRewriteRuleSet ({ commit }, data) {
    return apiPostMinimal({ resource: 'rewriterulesets', data })
}
