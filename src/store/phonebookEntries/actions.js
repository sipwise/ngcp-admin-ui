import { ajaxDownloadCsv } from 'src/api/ngcpPanelAPI'
import { apiPostMinimal } from 'src/api/ngcpAPI'

export async function downloadCsv () {
    await ajaxDownloadCsv({
        url: '/phonebook/download_csv',
        defaultFileName: 'phonebook_entries.csv'
    })
}

export async function createPhonebookEntry (context, payload) {
    await apiPostMinimal({
        resource: 'phonebookentries',
        data: payload
    })
}
