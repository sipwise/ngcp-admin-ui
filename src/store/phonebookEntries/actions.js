import { ajaxDownloadCsv } from 'src/api/ngcpPanelAPI'
import { apiPostMinimal, apiPutMinimal } from 'src/api/ngcpAPI'

export async function downloadCsv () {
    await ajaxDownloadCsv({
        url: '/phonebook/download_csv',
        defaultFileName: 'phonebook_entries.csv'
    })
}

export async function createPhonebookEntry (context, payload) {
    const params = {}
    if (payload.subscriber_id) {
        params.subscriber_id = payload.subscriber_id
    } else if (payload.customer_id) {
        params.customer_id = payload.customer_id
    } else if (payload.reseller_id) {
        params.reseller_id = payload.reseller_id
    }
    await apiPostMinimal({
        resource: 'phonebookentries',
        data: payload,
        config: {
            params: params
        }
    })
}

export async function updatePhonebookEntry (context, payload) {
    const params = {}
    if (payload.subscriber_id) {
        params.subscriber_id = payload.subscriber_id
    } else if (payload.customer_id) {
        params.customer_id = payload.customer_id
    } else if (payload.reseller_id) {
        params.reseller_id = payload.reseller_id
    }
    await apiPutMinimal({
        resource: 'phonebookentries',
        resourceId: payload.id,
        data: payload,
        config: {
            params: params
        }
    })
}
