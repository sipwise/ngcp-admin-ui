import { apiDownloadFile, apiPost, apiPut, apiGet } from 'src/api/ngcpAPI'
import _ from 'lodash'
import {
    ajaxFetchTable
} from 'src/api/ngcpPanelAPI'

const columns = [
    'id',
    'reseller_id',
    'name'
]
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

export async function updateTimeSet (context, payload) {
    const formData = new FormData()
    const fields = _.clone(payload)
    delete fields.calendarfile
    const json = JSON.stringify(fields)
    formData.append('json', json)
    if (payload.calendarfile) {
        formData.append('calendarfile', payload.calendarfile)
    }
    return apiPut({
        resource: 'timesets',
        resourceId: payload.id,
        data: formData
    })
}

export async function loadTimeSet (context, payload) {
    const timeSets = await apiGet({
        resource: 'timesets'
    })
    const timeSet = timeSets.data.items.find(timeset => timeset.id === payload.id)
    return timeSet
}

export async function fetchtimeset ({ commit }, options) {
    return ajaxFetchTable('/timeset/fieldajax', columns, options)
}

export async function filterTimeSets ({ commit, dispatch }, filter) {
    const timesets = await dispatch('timeSets/fetchtimeset', {
        filter: (typeof filter === 'object') ? filter?.filter : filter,
        pagination: {
            sortBy: 'id',
            descending: false,
            page: 1,
            rowsPerPage: 10,
            rowsNumber: null
        }
    }, { root: true })
    commit('filterTimeSets', _.get(timesets, 'aaData', []))
}
