import _ from 'lodash'
import { ajaxFetchTable } from 'src/api/ngcpPanelAPI'

const columns = [
    'id',
    'name'
]
export async function fetchCountries ({ commit }, options) {
    return ajaxFetchTable('/contact/country/ajax', columns, options)
}

export async function filterCountries ({ commit, dispatch }, filter) {
    const filterObj = (typeof filter === 'object') ? filter : { filter }
    const page = filterObj.page ?? 1
    const rowsPerPage = filterObj.rows ?? 10

    const countries = await dispatch('fetchCountries', {
        filter: filterObj.filter,
        pagination: {
            sortBy: 'id',
            descending: false,
            page: page === 0 ? 1 : page,
            rowsPerPage,
            rowsNumber: null
        }
    })
    commit('countries', {
        countries: _.get(countries, 'aaData', []),
        page
    })
}
