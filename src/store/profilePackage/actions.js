import _ from 'lodash'
import { apiGetList } from 'src/api/common'

export async function fetchProfilePackages ({ commit }, filter) {
	const profilePackages = await apiGetList({
		resource: 'profilepackages',
		params: {
			name: filter + '*',
			page: 1,
			rows: 10
		}
	})
	commit('profilePackages', _.get(profilePackages, 'items', []))
}
