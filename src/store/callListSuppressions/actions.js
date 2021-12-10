import { ajaxDownloadCsv } from 'src/api/ngcpPanelAPI'

export async function downloadCsv () {
    await ajaxDownloadCsv({
        url: '/calllistsuppression/download',
        defaultFileName: 'call_list_suppressions.csv'
    })
}
