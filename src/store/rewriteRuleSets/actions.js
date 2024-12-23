import {
    apiGet,
    apiPostMinimal,
    apiPut,
    apiPutMinimal
} from 'src/api/ngcpAPI'
import { ajaxGet } from 'src/api/ngcpPanelAPI'

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
    return apiPostMinimal({ resource: 'rewriterules', data })
}

export async function updateRewriteRule (context, payload) {
    const params = {}
    params.set_id = payload.set_id
    await apiPutMinimal({
        resource: 'rewriterules',
        resourceId: payload.id,
        data: payload,
        config: {
            params
        }
    })
}

export async function rewriteRuleMoveDown ({ commit }, { rewriteRuleSetId, rewriteRuleId }) {
    await ajaxGet(`/rewrite/${rewriteRuleSetId}/rules?move=${rewriteRuleId}&where=down`)
}
export async function rewriteRuleMoveUp ({ commit }, { rewriteRuleSetId, rewriteRuleId }) {
    await ajaxGet(`/rewrite/${rewriteRuleSetId}/rules?move=${rewriteRuleId}&where=up`)
}
