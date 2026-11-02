import { apiGetPaginatedList } from 'src/api/ngcpAPI'

export async function fetchCountries ({ commit }, options) {
    return apiGetPaginatedList({
        resource: 'countries',
        resourceSearchField: 'q',
        filter: options.filter
    }, options.pagination)
}

export async function filterCountries ({ commit, dispatch }, filter) {
    const filterObj = (typeof filter === 'object') ? filter : { filter }
    const page = filterObj.page ?? 1
    const rowsPerPage = filterObj.rows ?? 10

    const countries = await dispatch('fetchCountries', {
        filter: filterObj.filter,
        pagination: {
            sortBy: 'name',
            descending: false,
            page: page === 0 ? 1 : page,
            rowsPerPage,
            rowsNumber: null
        }
    })
    commit('countries', {
        countries: countries.items,
        page
    })
}
