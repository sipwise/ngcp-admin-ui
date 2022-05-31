import { apiDownloadFile, apiPost } from 'src/api/ngcpAPI'
import _ from 'lodash'

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

export async function createTimeSet (context, payload) {
    const formData = new FormData()
    const fields = _.clone(payload)
    delete fields.calendarfile
    const json = JSON.stringify(fields)
    formData.append('json', json)
    if (payload.calendarfile) {
        formData.append('calendarfile', payload.calendarfile)
    }
    await apiPost({
        resource: 'timesets',
        data: formData
    })
}
