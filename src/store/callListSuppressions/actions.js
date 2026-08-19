import { apiFetchEntity, apiPost, apiPut } from 'src/api/ngcpAPI'
import { ajaxDownloadCsv } from 'src/api/ngcpPanelAPI'

export async function downloadCsv () {
    await ajaxDownloadCsv({
        url: '/calllistsuppression/download',
        defaultFileName: 'call_list_suppressions.csv'
    })
}

export async function createCallListSuppression (context, payload) {
    await apiPost({
        resource: 'calllistsuppressions',
        data: payload
    })
}

export async function loadCallListSuppression (context, payload) {
    return apiFetchEntity('calllistsuppressions', payload.id)
}

export async function updateCallListSuppression (context, payload) {
    await apiPut({
        resource: 'calllistsuppressions',
        resourceId: payload.id,
        data: payload
    })
}
