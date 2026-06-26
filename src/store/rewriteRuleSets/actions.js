import {
    apiGet,
    apiPatchField,
    apiPatchReplace,
    apiPostMinimal,
    apiPut
} from 'src/api/ngcpAPI'
import { showGlobalError } from 'src/helpers/ui'

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
    const options = Object.entries(data.payload)
        .filter(([key]) => key !== 'rules')
        .map(([key, value]) => ({ op: 'replace', path: `/${key}`, value }))
    return apiPatchField(`v2/rewrite-rules/sets/${data.id}`, options)
}

export async function getRewriteRules ({ commit }, options) {
    return await apiGet({
        resource: `v2/rewrite-rules/sets/${options.set_id}/rules`,
        config: {
            params: {
                rows: options.rows ?? null
            }
        }
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

function buildRuleParams ({ direction, field, orderBy = null, orderByDirection = null }) {
    const params = {
        direction,
        field
    }
    if (orderBy) {
        params.order_by = orderBy
        params.order_by_direction = orderByDirection || 'asc'
    }
    return params
}

export async function getRewriteRulesWithParams ({
    setId,
    page = 1,
    rows = 10,
    ...ruleOptions
}) {
    const params = {
        page,
        rows,
        ...buildRuleParams(ruleOptions)
    }
    const res = await apiGet({
        resource: `v2/rewrite-rules/sets/${setId}/rules`,
        config: { params }
    })
    return res.data.items || []
}
async function updateRulePriority ({
    id,
    priority,
    rewriteRuleSetId,
    ...ruleOptions
}) {
    const resource = `v2/rewrite-rules/sets/${rewriteRuleSetId}/rules`
    const params = buildRuleParams(ruleOptions)
    return apiPatchReplace({
        resource,
        resourceId: id,
        config: { params },
        field: 'priority',
        value: priority
    })
}

async function moveRule ({ commit }, payload, move) {
    const {
        rewriteRuleSetId,
        rewriteRuleId,
        page,
        rows,
        ...ruleOptions
    } = payload
    const currentPage = page || 1
    const rowsPerPage = rows || 10
    const fetchOptions = {
        setId: rewriteRuleSetId,
        rows: rowsPerPage,
        ...ruleOptions
    }
    const fetchRulesPage = (pageNumber) => getRewriteRulesWithParams({
        ...fetchOptions,
        page: pageNumber
    })
    const rules = await fetchRulesPage(currentPage)
    const ruleIndex = rules.findIndex((rule) => rule.id === rewriteRuleId)
    if (ruleIndex === -1) {
        return
    }

    const currentRule = rules[ruleIndex]
    let targetRule = move === 'up'
        ? rules[ruleIndex - 1]
        : rules[ruleIndex + 1]

    if (!targetRule && move === 'up' && ruleIndex === 0 && currentPage > 1) {
        const previousRules = await fetchRulesPage(currentPage - 1)
        targetRule = previousRules[previousRules.length - 1]
    } else if (!targetRule && move === 'down' && ruleIndex === rules.length - 1) {
        const nextRules = await fetchRulesPage(currentPage + 1)
        targetRule = nextRules[0]
    }

    if (!targetRule) {
        return
    }

    const updateOptions = {
        rewriteRuleSetId,
        ...ruleOptions
    }
    await updateRulePriority({
        ...updateOptions,
        id: currentRule.id,
        priority: targetRule.priority
    })
    try {
        await updateRulePriority({
            ...updateOptions,
            id: targetRule.id,
            priority: currentRule.priority
        })
    } catch (error) {
        await updateRulePriority({
            ...updateOptions,
            id: currentRule.id,
            priority: currentRule.priority
        })
        showGlobalError(error)
    }
}
export async function moveRewriteRuleUp ({ commit }, payload) {
    return await moveRule({ commit }, payload, 'up')
}
export async function moveRewriteRuleDown ({ commit }, payload) {
    return await moveRule({ commit }, payload, 'down')
}
