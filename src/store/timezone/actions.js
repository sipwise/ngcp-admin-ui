import _ from 'lodash'
import {
    fetchAjaxTable
} from 'src/api/panel'

const columns = [
    'id',
    'name'
]
export async function fetchTimezones ({ commit }, options) {
    return fetchAjaxTable('/contact/timezone_ajax', columns, options)
}

export async function filterTimezones ({ commit, dispatch }, filter) {
    const timezones = await dispatch('fetchTimezones', {
        filter: filter,
        pagination: {
            sortBy: 'id',
            descending: false,
            rowsNumber: null
        }
    })
    commit('timezones', _.get(timezones, 'aaData', []))
}
