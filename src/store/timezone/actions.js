import _ from 'lodash'
import {
    ajaxFetchTable
} from 'src/api/ngcpPanelAPI'

const columns = [
    'id',
    'name'
]
export async function fetchTimezones ({ commit }, options) {
    return ajaxFetchTable('/contact/timezone_ajax', columns, options)
}

export async function filterTimezones ({ commit, dispatch }, filter) {
    const timezones = await dispatch('fetchTimezones', {
        filter: (typeof filter === 'object') ? filter?.filter : filter,
        pagination: {
            sortBy: 'id',
            descending: false,
            rowsNumber: null
        }
    })
    commit('timezones', _.get(timezones, 'aaData', []))
}
