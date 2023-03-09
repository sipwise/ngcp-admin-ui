import { apiPostMinimal, apiPut, apiPutMinimal } from 'src/api/ngcpAPI'
import {
    ajaxGet
} from 'src/api/ngcpPanelAPI'
export async function createPeering ({ commit }, data) {
    return apiPostMinimal({ resource: 'peeringgroups', data })
}
export async function updatePeering ({ commit }, data) {
    return apiPut({
        resource: 'peeringgroups',
        resourceId: data.id,
        data: data.payload
    })
}
export async function createServer ({ commit }, data) {
    return apiPostMinimal({ resource: 'peeringservers', data: data })
}
export async function updatePeeringServer (context, payload) {
    const params = {}
    params.group_id = payload.group_id
    await apiPutMinimal({
        resource: 'peeringservers',
        resourceId: payload.id,
        data: payload,
        config: {
            params: params
        }
    })
}
export async function createOutboundRule ({ commit }, data) {
    return apiPostMinimal({ resource: 'peeringrules', data: data })
}
export async function updatePeeringOutboundrule (context, payload) {
    const params = {}
    params.group_id = payload.group_id
    await apiPutMinimal({
        resource: 'peeringrules',
        resourceId: payload.id,
        data: payload,
        config: {
            params: params
        }
    })
}
export async function createinboundRule ({ commit }, data) {
    return apiPostMinimal({ resource: 'peeringinboundrules', data: data })
}
export async function updatePeeringInboundrule (context, payload) {
    const params = {}
    params.group_id = payload.group_id
    await apiPutMinimal({
        resource: 'peeringinboundrules',
        resourceId: payload.id,
        data: payload,
        config: {
            params: params
        }
    })
}
export async function inboundRuleMoveDown ({ commit }, { peeringId, inboundrulesId }) {
    await ajaxGet(`/peering/${peeringId}/inboundrules/${inboundrulesId}/down`)
}
export async function inboundRuleMoveUp ({ commit }, { peeringId, inboundrulesId }) {
    await ajaxGet(`/peering/${peeringId}/inboundrules/${inboundrulesId}/up`)
}
