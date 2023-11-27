import _ from 'lodash'
import {
    ajaxFetchTable,
    ajaxGet
} from 'src/api/ngcpPanelAPI'
import {
    apiPostMinimal,
    apiPut,
    apiPost
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
export async function headerRuleMoveUpDown ({ commit }, { setId, headeruleId, move = 'up' }) {
    await ajaxGet(`/header/${setId}/rules/`, {
        params: {
            move: headeruleId,
            where: (move === 'up') ? 'up' : 'down'
        }
    })
}
export async function createHeaderRuleSet ({ commit }, data) {
    return await apiPostMinimal({ resource: 'headerrulesets', data })
}
export async function updateHeaderRuleSet ({ commit }, data) {
    return apiPut({
        resource: 'headerrulesets',
        resourceId: data.id,
        data: data.payload
    })
}
export async function createHeaderRule ({ commit }, data) {
    return await apiPost({ resource: 'headerrules', data })
}
export async function updateHeaderRule (context, data) {
    return apiPut({
        resource: 'headerrules',
        resourceId: data.id,
        data: data.payload
    })
}
export async function createHeaderRuleConditions ({ commit }, data) {
    return await apiPost({ resource: 'headerruleconditions', data })
}
export async function updateHeaderRuleConditions (context, data) {
    return apiPut({
        resource: 'headerruleconditions',
        resourceId: data.id,
        data: data.payload
    })
}
export async function createHeaderRuleActions ({ commit }, data) {
    return await apiPost({ resource: 'headerruleactions', data })
}
export async function updateHeaderRuleActions (context, data) {
    return apiPut({
        resource: 'headerruleactions',
        resourceId: data.id,
        data: data.payload
    })
}
export async function actionMoveUpDown ({ commit }, { headerRuleSetId, headerRuleId, headeruleactionsId, move = 'up' }) {
    await ajaxGet(`/header/${headerRuleSetId}/rules/${headerRuleId}/actions/`, {
        params: {
            move: headeruleactionsId,
            where: (move === 'up') ? 'up' : 'down'
        }
    })
}
