import _ from 'lodash'
import {
    ajaxFetchTable
} from 'src/api/ngcpPanelAPI'

const columns = [
    'id',
    'name'
]
export async function fetchCountries ({ commit }, options) {
    return ajaxFetchTable('/contact/country/ajax', columns, options)
}

export async function filterCountries ({ commit, dispatch }, filter) {
    const countries = await dispatch('fetchCountries', {
        filter: filter,
        pagination: {
            sortBy: 'id',
            descending: false,
            rowsNumber: null
        }
    })
    commit('countries', _.get(countries, 'aaData', []))
}
