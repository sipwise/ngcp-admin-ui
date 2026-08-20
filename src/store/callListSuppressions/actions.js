import {
    apiDownloadFile,
    apiFetchEntity,
    apiPost,
    apiPut,
    apiUploadCsv
} from 'src/api/ngcpAPI'

export async function downloadCsv () {
    await apiDownloadFile({
        apiGetOptions: {
            resource: 'calllistsuppressions',
            config: {
                headers: {
                    Accept: 'text/csv'
                }
            }
        },
        defaultFileName: 'call_list_suppressions.csv',
        defaultContentType: 'text/csv'
    })
}

export async function uploadCsv (context, formData) {
    await apiUploadCsv({
        path: 'calllistsuppressions/',
        data: formData.file,
        config: {
            headers: {
                'Content-Type': 'text/csv'
            },
            params: {
                purge_existing: formData.purge_existing ? 'true' : 'false'
            }
        }
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
