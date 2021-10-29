import { ajaxDownloadCsv } from 'src/api/ngcpPanelAPI'

export async function downloadCsv () {
    await ajaxDownloadCsv({
        url: '/phonebook/download_csv',
        defaultFileName: 'phonebook_entries.csv'
    })
}
