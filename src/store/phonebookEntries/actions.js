import { apiPostMinimal, apiPutMinimal, apiUploadCsv } from 'src/api/ngcpAPI'
import { ajaxDownloadCsv } from 'src/api/ngcpPanelAPI'

export async function downloadCsv () {
    await ajaxDownloadCsv({
        url: '/phonebook/download_csv',
        defaultFileName: 'phonebook_entries.csv'
    })
}

export async function uploadCsv (context, formData) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const purgeExistingValue = formData?.purge_existing ? 'true' : 'false'
    let path = ''
    const payload = formDataPayload(formData)
    if (formData?.subscriber_id) {
        path = `v2/subscribers/${formData?.subscriber_id}/phonebook`
    } else if (formData?.customer_id) {
        path = `v2/customers/${formData?.customer_id}/phonebook`
    } else if (formData.reseller_id) {
        path = `v2/resellers/${formData?.reseller_id}/phonebook`
    }
    await apiUploadCsv({
        path: `${path}/?purge_existing=${purgeExistingValue}`,
        data: payload,
        config
    })
}

function formDataPayload (payload) {
    const formData = new FormData()
    formData.append('file', payload.file)
    return formData
}

export async function createPhonebookEntry (context, payload) {
    // const params = {}
    let path = 'resellerphonebookentries'
    if (payload.subscriber_id) {
        // params.subscriber_id = payload.subscriber_id
        path = 'subscriberphonebookentries'
    } else if (payload.customer_id) {
        path = `v2/customers/${payload.customer_id}/phonebook`
    } else if (payload.reseller_id) {
        // params.reseller_id = payload.reseller_id
    }
    await apiPostMinimal({
        resource: path,
        data: payload
    })
}

export async function updatePhonebookEntry (context, payload) {
    // const params = {}
    let path = 'resellerphonebookentries'
    if (payload.subscriber_id) {
        // params.subscriber_id = payload.subscriber_id
        path = 'subscriberphonebookentries'
    } else if (payload.customer_id) {
        path = `v2/customers/${payload.customer_id}/phonebook`
    } else if (payload.reseller_id) {
        // params.reseller_id = payload.reseller_id
    }
    await apiPutMinimal({
        resource: path,
        resourceId: payload.id,
        data: payload
    })
}
