import { ajaxDownloadCsv, ajaxPost, ajaxGet } from 'src/api/ngcpPanelAPI'

export async function downloadCsv () {
    await ajaxDownloadCsv({
        url: '/calllistsuppression/download',
        defaultFileName: 'call_list_suppressions.csv'
    })
}

export async function createCallListSuppression (context, payload) {
    const formData = new FormData()
    formData.append('direction', payload.direction)
    formData.append('domain', payload.domain)
    formData.append('label', payload.label)
    formData.append('mode', payload.mode)
    formData.append('pattern', payload.pattern)
    await ajaxPost('/calllistsuppression/create', formData, {
        timeout: 15000,
        headers: {
            contentType: 'application/json; charset=utf-8'
        }
    })
}

export async function loadCallListSuppression (context, payload) {
    const callListSuppressions = await ajaxGet('/calllistsuppression/ajax')
    const callListSuppression = callListSuppressions.data.aaData.find(callListSuppression => callListSuppression.id === payload.id)
    return callListSuppression
}

export async function updateCallListSuppression (context, payload) {
    const formData = new FormData()
    formData.append('direction', payload.direction)
    formData.append('domain', payload.domain)
    formData.append('label', payload.label)
    formData.append('mode', payload.mode)
    formData.append('pattern', payload.pattern)
    await ajaxPost(`/calllistsuppression/${payload.id}/edit`, formData, {
        timeout: 15000,
        headers: {
            contentType: 'application/json; charset=utf-8'
        }
    })
}
