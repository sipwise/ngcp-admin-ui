import {
    apiGet,
    apiPatchField,
    apiPost,
    apiPostMinimal
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

const REWRITE_RULE_SET_PATCHABLE_FIELDS = ['reseller_id', 'name', 'description']

export async function updateRewriteRuleSet ({ commit }, data) {
    const options = REWRITE_RULE_SET_PATCHABLE_FIELDS
        .filter((field) => field in data.payload)
        .map((field) => ({ op: 'replace', path: `/${field}`, value: data.payload[field] }))
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

const REWRITE_RULE_PATCHABLE_FIELDS = ['match_pattern', 'replace_pattern', 'description', 'direction', 'field', 'enabled']

export async function updateRewriteRule (context, payload) {
    const options = REWRITE_RULE_PATCHABLE_FIELDS
        .filter((field) => field in payload)
        .map((field) => ({ op: 'replace', path: `/${field}`, value: payload[field] }))
    return apiPatchField(`v2/rewrite-rules/sets/${payload.set_id}/rules/${payload.id}`, options)
}

async function moveRule ({ rewriteRuleSetId, rewriteRuleId }, direction) {
    return apiPost({
        path: `v2/rewrite-rules/sets/${rewriteRuleSetId}/rules/${rewriteRuleId}/move`,
        data: { direction }
    })
}
export async function moveRewriteRuleUp ({ commit }, payload) {
    return await moveRule(payload, 'up')
}
export async function moveRewriteRuleDown ({ commit }, payload) {
    return await moveRule(payload, 'down')
}
