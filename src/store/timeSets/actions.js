import saveAs from 'file-saver'
import contentDisposition from 'content-disposition'
import { apiGet } from 'src/api/ngcpAPI'

export async function downloadTimeSet (context, id) {
    const res = await apiGet({
        resource: 'timesets',
        resourceId: id,
        config: {
            headers: {
                Accept: 'text/calendar'
            }
        }
    })
    const contentDispositionParsed = contentDisposition.parse(res.headers['content-disposition'])
    const fileName = contentDispositionParsed?.parameters?.filename || 'calendar.ics'
    saveAs(new Blob([res.data], { type: res.headers['content-type'] || 'text/calendar' }), fileName)
}
