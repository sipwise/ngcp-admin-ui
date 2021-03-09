import _ from 'lodash'
import {
    fetchAjaxTable
} from 'src/api/panel'

const columns = [
    'id',
    'name'
]
export async function fetchCountries ({ commit }, options) {
    return fetchAjaxTable('/contact/country/ajax', columns, options)
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
