import {
    apiGet,
    apiPatchReplace,
    apiPost,
    apiPut
} from 'src/api/ngcpAPI'

export async function createHeaderRuleSet ({ commit }, data) {
    return await apiPost({
        resource: 'v2/header-manipulations/sets',
        data
    })
}
export async function updateHeaderRuleSet ({ commit }, data) {
    return apiPut({
        resource: 'v2/header-manipulations/sets',
        resourceId: data.id,
        data: data.payload
    })
}
export async function createSubscriberHeaderRule ({ commit }, data) {
    return await apiPost({
        resource: 'v2/header-manipulations/sets/rules',
        data
    })
}
export async function updateSubscriberHeaderRule (context, payload) {
    await apiPut({
        resource: 'v2/header-manipulations/sets/rules',
        resourceId: payload.id,
        config: {
            params: {
                subscriber_id: payload.subscriber_id
            }
        },
        data: payload.data
    })
}
export async function createHeaderRule ({ commit }, data) {
    return await apiPost({
        resource: `v2/header-manipulations/sets/${data.set_id}/rules`,
        data: data.payload
    })
}
export async function updateHeaderRule (context, data) {
    return apiPut({
        resource: `v2/header-manipulations/sets/${data.set_id}/rules`,
        resourceId: data.id,
        data: data.payload
    })
}
export async function createHeaderRuleCondition ({ commit }, data) {
    return await apiPost({
        resource: `v2/header-manipulations/sets/${data.set_id}/rules/${data.rule_id}/conditions`,
        config: {
            params: {
                subscriber_id: data.subscriber_id
            }
        },
        data: data.payload
    })
}
export async function updateHeaderRuleCondition (context, data) {
    let params = {}
    if (data.subscriber_id !== null) {
        params = { subscriber_id: data.subscriber_id }
    }
    return apiPut({
        resource: `v2/header-manipulations/sets/${data.set_id}/rules/${data.rule_id}/conditions`,
        resourceId: data.id,
        data: data.payload,
        config: { params }
    })
}
export async function createHeaderRuleAction ({ commit }, data) {
    return await apiPost({
        resource: `v2/header-manipulations/sets/${data.set_id}/rules/${data.rule_id}/actions`,
        config: {
            params: {
                subscriber_id: data.subscriber_id
            }
        },
        data: data.payload
    })
}
export async function getHeaderRulesBySetId (context, data) {
    return getSubscriberHeaderRules(data?.subscriber_id ?? null, data.set_id)
}
export async function updateHeaderRuleAction (context, data) {
    let params = {}
    if (data.subscriber_id !== null) {
        params = { subscriber_id: data.subscriber_id }
    }
    return apiPut({
        resource: `v2/header-manipulations/sets/${data.set_id}/rules/${data.rule_id}/actions`,
        resourceId: data.id,
        config: { params },
        data: data.payload
    })
}
export async function getSubscriberHeaderRuleActions (subscriberId, setId, headerRuleId) {
    let params = { order_by: 'priority' }
    if (subscriberId !== null) {
        params = { ...params, subscriber_id: subscriberId }
    }
    const res = await apiGet({
        resource: `v2/header-manipulations/sets/${setId}/rules/${headerRuleId}/actions`,
        config: { params }
    })
    return res.data.items
}
export async function getSubscriberHeaderRules (subscriberId, setId) {
    let params = { order_by: 'priority' }
    if (subscriberId !== null) {
        params = { ...params, subscriber_id: subscriberId }
    }
    const res = await apiGet({
        resource: `v2/header-manipulations/sets/${setId}/rules`,
        config: { params }
    })
    return res.data.items
}
async function updateRule ({ id, priority, setId, headerRuleId = null, subscriberId = null, type }) {
    let resource = `v2/header-manipulations/sets/${setId}/rules`
    if (headerRuleId !== null && type === 'actions') {
        resource += `/${headerRuleId}`
    }
    if (type === 'actions') {
        resource += `/${type}`
    }
    return apiPatchReplace({
        resource,
        resourceId: id,
        config: subscriberId ? { params: { subscriber_id: subscriberId } } : null,
        field: 'priority',
        value: priority
    })
}
async function moveRule ({ commit }, { subscriberId = null, setId, headerRuleId = null, headerRuleActionId = null }, direction, type) {
    const rules = await (type === 'actions'
        ? getSubscriberHeaderRuleActions(subscriberId, setId, headerRuleId)
        : getSubscriberHeaderRules(subscriberId, setId))
    const ruleIndex = type === 'actions' ? rules.findIndex((rule) => rule.id === headerRuleActionId) : rules.findIndex((rule) => rule.id === headerRuleId)
    const currentRule = rules[ruleIndex]

    let targetRule
    if (direction === 'up' && ruleIndex > 0) {
        targetRule = rules[ruleIndex - 1]
    } else if (direction === 'down' && ruleIndex < rules.length - 1) {
        targetRule = rules[ruleIndex + 1]
    }

    if (targetRule) {
        [currentRule.priority, targetRule.priority] = [targetRule.priority, currentRule.priority]
        await updateRule({ id: currentRule.id, priority: currentRule.priority, setId, headerRuleId, subscriberId, type })
        await updateRule({ id: targetRule.id, priority: targetRule.priority, setId, headerRuleId, subscriberId, type })
    } else {
        currentRule.priority += direction === 'up' ? -1 : 1
        await updateRule({ id: currentRule.id, priority: currentRule.priority, setId, headerRuleId, subscriberId, type })
    }
}
export async function moveHeaderRuleActionUp ({ commit }, { subscriberId, setId, headerRuleId, headerRuleActionId }) {
    return await moveRule({ commit }, { subscriberId, setId, headerRuleId, headerRuleActionId }, 'up', 'actions')
}
export async function moveHeaderRuleActionDown ({ commit }, { subscriberId, setId, headerRuleId, headerRuleActionId }) {
    return await moveRule({ commit }, { subscriberId, setId, headerRuleId, headerRuleActionId }, 'down', 'actions')
}
export async function moveHeaderRuleUp ({ commit }, { subscriberId, setId, headerRuleId }) {
    return await moveRule({ commit }, { subscriberId, setId, headerRuleId }, 'up', 'rules')
}
export async function moveHeaderRuleDown ({ commit }, { subscriberId, setId, headerRuleId }) {
    return await moveRule({ commit }, { subscriberId, setId, headerRuleId }, 'down', 'rules')
}
export async function getHeaderRuleConditionValues ({ commit }, data) {
    let params = {}
    if (data.subscriber_id !== null) {
        params = { subscriber_id: data.subscriber_id }
    }
    const res = await apiGet({
        resource: `v2/header-manipulations/sets/rules/conditions/${data.id}/@values`,
        config: { params }
    })
    commit('headerRuleConditionValues', res?.data.items)
}
