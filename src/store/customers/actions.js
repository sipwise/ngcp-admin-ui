import _ from 'lodash'
import { fetchAjaxTable } from 'src/api/panel'

export async function createCustomer ({ commit }, data) {
	return this.$httpApi.post('/customers/', data)
}

export async function fetchProductsList () {
	// TODO: Product loading code should be replaced with proper API call when it will be implemented
	const options = {
		pagination: {
			sortBy: 'id',
			descending: false,
			page: 1,
			rowsPerPage: 10,
			rowsNumber: null
		}
	}
	const res = await fetchAjaxTable('/product/ajax', ['name'], options)
	return _.get(res, 'aaData', [])
}
