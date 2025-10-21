import { apiPostMinimal, apiPut, apiPutMinimal } from 'src/api/ngcpAPI'
import { ajaxGet } from 'src/api/ngcpPanelAPI'
export async function createPeering ({ commit }, data) {
    return apiPostMinimal({ resource: 'v2/peerings/groups', data })
}
export async function updatePeering ({ commit }, data) {
    return apiPut({
        resource: 'v2/peerings/groups',
        resourceId: data.id,
        data: data.payload
    })
}
export async function createServer ({ commit }, data) {
    return apiPostMinimal({ resource: `v2/peerings/groups/${data.group_id}/servers`, data })
}
export async function updatePeeringServer (context, payload) {
    await apiPutMinimal({
        resource: `v2/peerings/groups/${payload.group_id}/servers`,
        resourceId: payload.id,
        data: payload
    })
}
export async function createOutboundRule ({ commit }, data) {
    return apiPostMinimal({ resource: `v2/peerings/groups/${data.group_id}/rules`, data })
}
export async function updatePeeringOutboundrule (context, payload) {
    await apiPutMinimal({
        resource: `v2/peerings/groups/${payload.group_id}/rules`,
        resourceId: payload.id,
        data: payload
    })
}
export async function createinboundRule ({ commit }, data) {
    return apiPostMinimal({ resource: `v2/peerings/groups/${data.group_id}/inbound-rules`, data })
}
export async function updatePeeringInboundrule (context, payload) {
    await apiPutMinimal({
        resource: `v2/peerings/groups/${payload.group_id}/inbound-rules`,
        resourceId: payload.id,
        data: payload
    })
}
export async function inboundRuleMoveDown ({ commit }, { peeringId, inboundrulesId }) {
    await ajaxGet(`/peering/${peeringId}/inboundrules/${inboundrulesId}/down`)
}
export async function inboundRuleMoveUp ({ commit }, { peeringId, inboundrulesId }) {
    await ajaxGet(`/peering/${peeringId}/inboundrules/${inboundrulesId}/up`)
}
