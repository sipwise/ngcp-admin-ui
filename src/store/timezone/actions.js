import _ from 'lodash'
import { ajaxFetchTable } from 'src/api/ngcpPanelAPI'

const columns = [
    'id',
    'name'
]
export async function fetchTimezones ({ commit }, options) {
    return ajaxFetchTable('/contact/timezone_ajax', columns, options)
}

export async function filterTimezones ({ commit, dispatch }, filter) {
    const filterObj = (typeof filter === 'object') ? filter : { filter }
    const page = filterObj.page ?? 1
    const rowsPerPage = filterObj.rows ?? 10

    const timezones = await dispatch('fetchTimezones', {
        filter: filterObj.filter,
        pagination: {
            sortBy: 'id',
            descending: false,
            page: page === 0 ? 1 : page,
            rowsPerPage,
            rowsNumber: null
        }
    })
    commit('timezones', {
        timezones: _.get(timezones, 'aaData', []),
        page
    })
}
