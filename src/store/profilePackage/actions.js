import _ from 'lodash'
import { generateResellerFilterParams } from 'src/api/common'
import { apiGetList } from 'src/api/ngcpAPI'

export async function fetchProfilePackages ({ commit }, payload) {
    const profilePackages = await apiGetList({
        resource: 'profilepackages',
        params: generateResellerFilterParams(payload)
    })
    commit('profilePackages', _.get(profilePackages, 'items', []))
}
