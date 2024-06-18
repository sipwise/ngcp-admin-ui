import { ajaxGet } from 'src/api/ngcpPanelAPI'
import {
    apiPostMinimal,
    apiPut,
    apiPost,
    apiGet,
    apiPatchReplace
} from 'src/api/ngcpAPI'

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
export async function updateDataSubscriberHeaderRulesActions (context, data) {
    return apiPut({
        resource: `v2/header-manipulations/sets/${data.set_id}/rules/${data.rule_id}/actions/${data.id}`,
        data: data.payload
    })
}
export async function getSubscriberHeaderRulesActions (setId, ruleId) {
    const res = await apiGet({
        resource: `v2/header-manipulations/sets/${setId}/rules/${ruleId}/actions`,
        config: {
            params: {
                order_by: 'priority'
            }
        }
    })
    return res.data.items
}
async function updateSubscriberHeaderRulesActions ({ id, priority, setId, ruleId }) {
    return apiPatchReplace({
        resource: `v2/header-manipulations/sets/${setId}/rules/${ruleId}/actions`,
        resourceId: id,
        field: 'priority',
        value: priority
    })
}
async function moveHeaderRule ({ commit }, { headeruleactionsId, setId, ruleId }, direction) {
    const rules = await getSubscriberHeaderRulesActions(setId, ruleId)
    const ruleIndex = rules.findIndex(rule => rule.id === headeruleactionsId)
    const currentRule = rules[ruleIndex]

    let targetRule, tempPriority
    if (direction === 'up' && ruleIndex > 0) {
        targetRule = rules[ruleIndex - 1]
    } else if (direction === 'down' && ruleIndex < rules.length - 1) {
        targetRule = rules[ruleIndex + 1]
    }

    if (targetRule) {
        tempPriority = currentRule.priority
        currentRule.priority = targetRule.priority
        targetRule.priority = tempPriority

        await updateSubscriberHeaderRulesActions({ id: currentRule.id, priority: currentRule.priority, setId, ruleId })
        await updateSubscriberHeaderRulesActions({ id: targetRule.id, priority: targetRule.priority, setId, ruleId })
    } else {
        currentRule.priority += direction === 'up' ? -1 : 1
        await updateSubscriberHeaderRulesActions({ id: currentRule.id, priority: currentRule.priority, setId, ruleId })
    }
}

export async function moveHeaderRuleActionsUp ({ commit }, { headeruleactionsId, setId, ruleId }) {
    return await moveHeaderRule({ commit }, { headeruleactionsId, setId, ruleId }, 'up')
}

export async function moveHeaderRuleActionsDown ({ commit }, { headeruleactionsId, setId, ruleId }) {
    return await moveHeaderRule({ commit }, { headeruleactionsId, setId, ruleId }, 'down')
}
