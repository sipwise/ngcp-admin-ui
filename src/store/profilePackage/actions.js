import _ from 'lodash'
import { apiGetList, generateResellerFilterParams } from 'src/api/common'

export async function fetchProfilePackages ({ commit }, payload) {
    const profilePackages = await apiGetList({
        resource: 'profilepackages',
        params: generateResellerFilterParams(payload)
    })
    commit('profilePackages', _.get(profilePackages, 'items', []))
}
