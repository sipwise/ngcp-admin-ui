import _ from 'lodash'
import {
    ajaxFetchTable
} from 'src/api/ngcpPanelAPI'
import {
    apiPostMinimal,
    apiPut,
    apiGet
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
    if (data.id) {
        delete data.id
    }
    return await apiPostMinimal({ resource: 'rewriterulesets', data })
}

export async function updateRewriteRuleSet ({ commit }, data) {
    return apiPut({
        resource: 'rewriterulesets',
        resourceId: data.id,
        data: data.payload
    })
}

export async function getRewriteRules ({ commit }, options) {
    return await apiGet({
        resource: 'rewriterules',
        config: {
            params: { set_id: options.set_id }
        }
    })
}

export async function createRewriteRule ({ commit }, data) {
    return apiPostMinimal({ resource: 'rewriterules', data: data })
}
