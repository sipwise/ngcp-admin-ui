import {
    apiGet,
    apiPatchReplace,
    apiPostMinimal,
    apiPut
} from 'src/api/ngcpAPI'

export async function createRewriteRuleSet ({ commit }, data) {
    return await apiPostMinimal({
        resource: 'v2/rewrite-rules/sets',
        data: {
            rules: data.rules,
            name: data.name,
            reseller_id: data.reseller_id,
            description: data.description
        }
    })
}

export async function updateRewriteRuleSet ({ commit }, data) {
    return apiPut({
        resource: 'v2/rewrite-rules/sets',
        resourceId: data.id,
        data: data.payload
    })
}

export async function getRewriteRules ({ commit }, options) {
    return await apiGet({
        resource: `v2/rewrite-rules/sets/${options.set_id}/rules`
    })
}

export async function createRewriteRule ({ commit }, data) {
    return apiPostMinimal({ resource: `v2/rewrite-rules/sets/${data.set_id}/rules`, data })
}

export async function updateRewriteRule (context, payload) {
    return apiPut({
        resource: `v2/rewrite-rules/sets/${payload.set_id}/rules`,
        resourceId: payload.id,
        data: payload
    })
}
export async function getRewriteRulesWithParams (setId, direction, field) {
    const params = {
        order_by: 'priority',
        direction,
        field
    }
    const res = await apiGet({
        resource: `v2/rewrite-rules/sets/${setId}/rules`,
        config: { params }
    })
    return res.data.items
}
async function updateRule ({ id, priority, rewriteRuleSetId, direction, field }) {
    const resource = `v2/rewrite-rules/sets/${rewriteRuleSetId}/rules`
    const params = {
        order_by: 'priority',
        direction,
        field
    }
    return apiPatchReplace({
        resource,
        resourceId: id,
        config: { params },
        field: 'priority',
        value: priority
    })
}
async function moveRule ({ commit }, { rewriteRuleSetId, rewriteRuleId, direction, field }, move) {
    const rules = await getRewriteRulesWithParams(rewriteRuleSetId, direction, field)
    const ruleIndex = rules.findIndex((rule) => rule.id === rewriteRuleId)
    const currentRule = rules[ruleIndex]

    let targetRule
    if (move === 'up' && ruleIndex > 0) {
        targetRule = rules[ruleIndex - 1]
    } else if (move === 'down' && ruleIndex < rules.length - 1) {
        targetRule = rules[ruleIndex + 1]
    }

    if (targetRule) {
        [currentRule.priority, targetRule.priority] = [targetRule.priority, currentRule.priority]
        await updateRule({ id: currentRule.id, priority: currentRule.priority, rewriteRuleSetId, direction, field })
        await updateRule({ id: targetRule.id, priority: targetRule.priority, rewriteRuleSetId, direction, field })
    } else {
        currentRule.priority += move === 'up' ? -1 : 1
        await updateRule({ id: currentRule.id, priority: currentRule.priority, rewriteRuleSetId, direction, field })
    }
}
export async function moveRewriteRuleUp ({ commit }, { rewriteRuleSetId, rewriteRuleId, direction, field }) {
    return await moveRule({ commit }, { rewriteRuleSetId, rewriteRuleId, direction, field }, 'up')
}
export async function moveRewriteRuleDown ({ commit }, { rewriteRuleSetId, rewriteRuleId, direction, field }) {
    return await moveRule({ commit }, { rewriteRuleSetId, rewriteRuleId, direction, field }, 'down')
}
