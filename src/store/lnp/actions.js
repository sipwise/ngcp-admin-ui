import { ajaxDownloadCsv } from 'src/api/ngcpPanelAPI'
import { apiPostMinimal, apiPut, apiUploadCsv } from 'src/api/ngcpAPI'

export async function downloadCsv () {
    await ajaxDownloadCsv({
        url: '/lnp/download',
        defaultFileName: 'lnp_list.csv'
    })
}
export async function createLnpCarrier ({ commit }, data) {
    return apiPostMinimal({ resource: 'lnpcarriers', data })
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
            'Content-Type': 'application/json'
        }
    }
    const purgeExistingValue = formData?.purge_existing ? '1' : '0'
    await apiUploadCsv({
        path: 'lnpcarriers/?purge_existing=' + purgeExistingValue,
        data: formData.file,
        config
    })
}
