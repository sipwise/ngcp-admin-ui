import { ajaxDownloadCsv } from 'src/api/ngcpPanelAPI'
import { apiPostMinimal, apiPut, apiUploadCsv, apiDownloadFile } from 'src/api/ngcpAPI'

export async function downloadCsv () {
    await ajaxDownloadCsv({
        url: '/lnp/download',
        defaultFileName: 'lnp_list.csv'
    })
}
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
export async function uploadCsv (context, formData) {
    const config = {
        headers: {
            'Content-Type': 'text/csv'
        }
    }
    const purgeExistingValue = formData?.purge_existing ? '1' : '0'
    await apiUploadCsv({
        path: 'lnpnumbers/?purge_existing=' + purgeExistingValue,
        data: formData.file,
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
export async function downloadLnpNumber ({ commit }, carrierId = 0) {
    const apiGetOptions = {
        resource: 'lnpnumbers',
        config: {
            headers: {
                Accept: 'text/csv'
            },
            params: {
                carrier_id: carrierId
            }
        }
    }
    await apiDownloadFile({
        apiGetOptions,
        defaultFileName: 'lnp_number.csv',
        defaultContentType: 'text/csv'
    })
}
