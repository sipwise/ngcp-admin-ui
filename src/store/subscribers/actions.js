import { ajaxDownloadCsv } from 'src/api/ngcpPanelAPI'

/**
 * TODO: temporary "ajax" implementation until the API will provide "Download CSV" implementation for customer Phonebook Entries
 */
export async function ajaxDownloadPhonebookCSV (context, subscriberId = 0) {
    await ajaxDownloadCsv({
        url: `/subscriber/${subscriberId}/phonebook_download_csv`,
        defaultFileName: 'subscriber_phonebook_entries.csv'
    })
}
