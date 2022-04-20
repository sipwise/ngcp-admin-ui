import { ajaxDownloadCsv } from 'src/api/ngcpPanelAPI'

export async function downloadCsv () {
    await ajaxDownloadCsv({
        url: '/lnp/download',
        defaultFileName: 'lnp_list.csv'
    })
}
