import {
    apiDownloadFile,
    apiPostMinimal,
    apiPut,
    apiUploadCsv
} from 'src/api/ngcpAPI'

export async function createLnpCarrier ({ commit }, data) {
    return apiPostMinimal({ resource: 'lnpcarriers', data })
}
export async function createLnpNumber ({ commit }, data) {
    return apiPostMinimal({ resource: 'lnpnumbers', data })
}
export async function updateLnpCarrier ({ commit }, data) {
    return apiPut({
        resource: 'lnpcarriers',
        resourceId: data.id,
        data: data.payload
    })
}
export async function uploadLnpCsv (context, data) {
    const config = {
        headers: {
            'Content-Type': 'text/csv'
        }
    }

    await apiUploadCsv({
        path: `lnpnumbers/?purge_existing=${data.purge_existing}`,
        data: data.file,
        config
    })
}
export async function updateLnpNumbers ({ commit }, data) {
    return await apiPut({
        resource: 'lnpnumbers',
        resourceId: data.id,
        data: data.payload
    })
}
export async function downloadLnpCsv ({ commit }) {
    const apiGetOptions = {
        resource: 'lnpnumbers',
        config: {
            headers: {
                Accept: 'text/csv'
            }
        }
    }
    await apiDownloadFile({
        apiGetOptions,
        defaultContentType: 'text/csv'
    })
}
