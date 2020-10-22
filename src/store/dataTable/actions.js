import {
	apiDelete,
	apiGetPaginatedList
} from 'src/api/common'
import {
	panelGetPaginatedList
} from 'src/api/panel'

export async function request (context, options) {
	context.commit('dataRequesting', {
		tableId: options.tableId,
		pagination: options.pagination,
		filter: options.filter
	})
	let res
	if (options.resourceType === 'ajax') {
		res = await panelGetPaginatedList(options.resource, options.columns, {
			pagination: options.pagination,
			filter: options.filter
		})
	} else {
		res = await apiGetPaginatedList({
			resource: options.resource
		}, options.pagination)
	}
	context.commit('dataSucceeded', {
		tableId: options.tableId,
		items: res.items,
		lastPage: res.lastPage,
		totalItems: res.totalItems
	})
}

export async function deleteResource (context, options) {
	await apiDelete(options.resource, options.resourceId)
}
