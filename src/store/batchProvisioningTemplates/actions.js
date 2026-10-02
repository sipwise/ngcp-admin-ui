import {
    apiDelete,
    apiPost,
    apiPut,
    apiUploadCsv
} from 'src/api/ngcpAPI'
import { toApiTemplateId } from 'src/helpers/batch-provisioning'

export async function createTemplate ({ commit }, payload) {
    return apiPost({ resource: 'provisioningtemplates', data: payload })
}

export async function updateTemplate ({ commit }, { id, payload }) {
    return apiPut({ resource: 'provisioningtemplates', resourceId: toApiTemplateId(id), data: payload })
}

export async function deleteTemplate ({ commit }, { resourceId }) {
    return apiDelete({ resource: 'provisioningtemplates', resourceId: toApiTemplateId(resourceId) })
}

export async function submitOpenForm ({ commit }, { id, values }) {
    return apiPost({ path: `provisioningtemplates/${toApiTemplateId(id)}`, data: values })
}

export async function uploadCsv ({ commit }, { id, file, purge_existing: purgeExisting }) {
    return apiUploadCsv({
        path: `provisioningtemplates/${toApiTemplateId(id)}?purge_existing=${!!purgeExisting}`,
        data: file,
        config: {
            headers: {
                'Content-Type': 'text/csv'
            }
        }
    })
}
