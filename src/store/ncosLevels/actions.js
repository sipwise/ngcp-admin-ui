import _ from 'lodash'
import {
    apiGetList
} from 'src/api/common'

export async function filterNcosLevels ({ commit, rootGetters }, options = {
    filter: null,
    resellerId: null
}) {
    if (options.resellerId !== null) {
        const params = {
            reseller_id: options.resellerId
        }
        if (_.trim(options.filter)) {
            params.level = '*' + options.filter + '*'
        }
        const ncosLevels = await apiGetList({
            resource: 'ncoslevels',
            params: params
        })
        commit('filterNcosLevels', ncosLevels.items)
    } else {
        throw new Error('Missing resellerId while fetching NcosLevels')
    }
}
