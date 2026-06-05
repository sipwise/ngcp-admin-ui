import {
    apiDownloadFile,
    apiPostMinimal,
    apiPut,
    apiUploadCsv
} from 'src/api/ngcpAPI'

export async function downloadCsv (context, payload = {}) {
    const resellerId = payload?.reseller_id
    const params = {}
    if (resellerId) {
        params.reseller_id = resellerId
    }
    const apiGetOptions = {
        resource: 'emergencymappings',
        config: {
            headers: {
                Accept: 'text/csv'
            },
            params
        }
    }
    await apiDownloadFile({
        apiGetOptions,
        defaultFileName: 'emergency_mappings.csv',
        defaultContentType: 'text/csv'
    })
}

export async function uploadCsv (context, formData) {
    const resellerId = formData?.reseller_id
    const csvBody = await getCsvBody(formData?.file)
    const purgeExistingValue = formData?.purge_existing ? 'true' : 'false'
    const params = {
        purge_existing: purgeExistingValue
    }
    if (resellerId) {
        params.reseller_id = resellerId
    }
    await apiUploadCsv({
        path: 'emergencymappings/',
        data: csvBody,
        config: {
            headers: {
                'Content-Type': 'text/csv'
            },
            params,
            transformRequest: [(data) => data]
        }
    })
}

async function getCsvBody (file) {
    if (file instanceof Blob) {
        return file
    }
    if (typeof file === 'string' && file.length > 0) {
        return file
    }
    throw new Error('CSV upload file is missing.')
}

export async function createEmergencyMapping (context, payload) {
    await apiPostMinimal({
        resource: 'emergencymappings',
        data: payload
    })
}
export async function updateEmergencyMapping ({ commit }, data) {
    return apiPut({
        resource: 'emergencymappings',
        resourceId: data.id,
        data: data.payload
    })
}
