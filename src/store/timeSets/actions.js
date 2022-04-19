import { apiDownloadFile } from 'src/api/ngcpAPI'

export async function downloadTimeSet (context, id) {
    const apiGetOptions = {
        resource: 'timesets',
        resourceId: id,
        config: {
            headers: {
                Accept: 'text/calendar'
            }
        }
    }

    await apiDownloadFile({
        apiGetOptions,
        defaultFileName: 'calendar.ics',
        defaultContentType: 'text/calendar'
    })
}
