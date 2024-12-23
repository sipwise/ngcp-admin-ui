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
            'Content-Type': 'text/csv'
        }
    }
    const purgeExistingValue = formData?.purge_existing ? '1' : '0'
    const path = formData?.path ? formData.path : 'resellerphonebookentries'
    let id = ''
    if (formData?.subscriber_id) {
        id = `&subscriber_id=${formData?.subscriber_id}`
    } else if (formData.customer_id) {
        id = `&customer_id=${formData?.customer_id}`
    } else if (formData.reseller_id) {
        id = `&reseller_id=${formData?.reseller_id}`
    }
    await apiUploadCsv({
        path: `${path}/?purge_existing=${purgeExistingValue}${id}`,
        data: formData.file,
        config
    })
}

export async function createPhonebookEntry (context, payload) {
    // const params = {}
    let path = 'resellerphonebookentries'
    if (payload.subscriber_id) {
        // params.subscriber_id = payload.subscriber_id
        path = 'subscriberphonebookentries'
    } else if (payload.customer_id) {
        // params.customer_id = payload.customer_id
        path = 'customerphonebookentries'
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
        // params.customer_id = payload.customer_id
        path = 'customerphonebookentries'
    } else if (payload.reseller_id) {
        // params.reseller_id = payload.reseller_id
    }
    await apiPutMinimal({
        resource: path,
        resourceId: payload.id,
        data: payload
    })
}
