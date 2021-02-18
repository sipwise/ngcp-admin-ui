import _ from 'lodash'
import {
	httpApi
} from 'boot/axios'

const HTTP_STATUS_OK_START = 200
const HTTP_STATUS_OK_END = 299

export class ResponseError extends Error {
	constructor (err) {
		super()
		this.message = _.get(err, 'response.data.message', err.message)
		this.response = err.response
	}
}

export class RequestError extends Error {
	constructor (err) {
		super()
		this.message = err.message
		this.request = err.request
	}
}

function handleRequestError (err) {
	if (err.response) {
		throw new ResponseError(err)
	} else if (err.request) {
		throw new RequestError(err)
	} else {
		throw err
	}
}

export async function apiGet (options = {
	path: undefined,
	resource: undefined,
	resourceId: undefined,
	config: {}
}) {
	let path = options.path
	if (options.resource && options.resourceId) {
		path = options.resource + '/' + options.resourceId
	} else 	if (options.resource) {
		path = options.resource + '/'
	}
	return httpApi.get(path, options.config).catch(handleRequestError)
}

export async function apiGetList (options = {
	resource: undefined,
	rows: 10,
	headers: {},
	params: {}
}) {
	try {
		const res = await apiGet({
			resource: options.resource,
			config: {
				headers: options.headers,
				params: options.params
			}
		})
		const items = _.get(res.data, 'items', [])
		const totalCount = _.get(res.data, 'totalCount', 0)
		let lastPage = 1
		if (_.isNumber(totalCount)) {
			lastPage = Math.ceil(totalCount / options.rows)
			if (lastPage === 0) {
				lastPage = 1
			}
		}
		return {
			items: items,
			lastPage: lastPage,
			totalItems: totalCount
		}
	} catch (err) {
		return {
			items: [],
			lastPage: 1
		}
	}
}

export async function apiGetPaginatedList (options, pagination) {
	const descending = _.get(pagination, 'descending', false)
	const orderBy = _.get(pagination, 'sortBy', '')
	const orderByDirection = (descending === true) ? 'desc' : 'asc'
	const filter = _.trim(_.get(options, 'filter', ''))
	const params = {
		page: _.get(pagination, 'page', 1),
		rows: _.get(pagination, 'rowsPerPage', 10)
	}
	if (orderBy !== '') {
		params.order_by = orderBy
		params.order_by_direction = orderByDirection
	}
	if (options.resourceSearchField && options.filter && filter !== '') {
		params[options.resourceSearchField] = '*' + filter + '*'
	}
	const newOptions = _.merge({}, options, {
		params: params
	})
	return apiGetList(newOptions)
}

export async function apiFetchEntity (resource, resourceId) {
	const res = await apiGet({
		resource: resource,
		resourceId: resourceId
	})
	return res.data
}

export async function apiUpdateEntity (resource, resourceId, data) {
	const res = await apiPut({
		resource: resource,
		resourceId: resourceId,
		data: data
	})
	return res.data
}

export async function apiPatch (options = {
	path: undefined,
	resource: undefined,
	resourceId: undefined,
	method: undefined,
	field: undefined,
	value: undefined,
	config: {}
}) {
	let path = options.path
	if (options.resource && options.resourceId) {
		path = options.resource + '/' + options.resourceId
	} else 	if (options.resource) {
		path = options.resource + '/'
	}
	return httpApi.patch(path, [{
		op: options.method,
		path: '/' + options.field,
		value: options.value
	}], _.merge({
		headers: {
			Prefer: 'return=minimal'
		}
	}, options.config, {
		headers: {
			'Content-Type': 'application/json-patch+json'
		}
	})).catch(handleRequestError)
}

export async function apiPatchReplace (options) {
	try {
		const res = await apiPatch(_.merge(options, {
			method: 'replace'
		}))
		return res.status >= HTTP_STATUS_OK_START &&
			res.status <= HTTP_STATUS_OK_END
	} catch (err) {
		if (err.response && err.response.status === 422) {
			const res = await apiPatch(_.merge(options, {
				method: 'add'
			}))
			return res.status >= HTTP_STATUS_OK_START &&
				res.status <= HTTP_STATUS_OK_END
		} else {
			throw err
		}
	}
}

export async function apiPatchReplaceFull (options) {
	const defaultConfig = {
		headers: {
			Prefer: 'return=representation'
		}
	}
	try {
		const res = await apiPatch(_.merge(options, {
			method: 'replace',
			config: defaultConfig
		}))
		return res.data
	} catch (err) {
		if (err.response && err.response.status === 422) {
			const res = await apiPatch(_.merge(options, {
				method: 'add',
				config: defaultConfig
			}))
			return res.data
		} else {
			throw err
		}
	}
}

export async function apiPatchRemoveFull (options = {
	resource: undefined,
	resourceId: undefined,
	field: undefined,
	value: undefined,
	config: {}
}) {
	const res = await apiPatch(_.merge(options, {
		method: 'remove',
		config: {
			headers: {
				Prefer: 'return=representation'
			}
		}
	}))
	return res.data
}

export async function apiPost (options = {
	resource: undefined,
	data: undefined,
	config: {}
}) {
	let path = options.path
	if (options.resource) {
		path = options.resource + '/'
	}
	return httpApi.post(path, options.data, _.merge({
		headers: {
			Prefer: 'return=representation'
		}
	}, options.config)).catch(handleRequestError)
}

export async function apiPostBlob (options = {
	resource: undefined,
	data: undefined,
	config: {}
}) {
	return apiPost(_.merge(options, {
		config: {
			responseType: 'blob'
		}
	}))
}

export async function apiPostMinimal (options = {
	resource: undefined,
	data: undefined,
	config: {}
}) {
	return apiPost(_.merge(options, {
		config: {
			headers: {
				Prefer: 'return=minimal'
			}
		}
	}))
}

export async function apiPut (options = {
	path: undefined,
	resource: undefined,
	resourceId: undefined,
	data: undefined,
	config: {}
}) {
	let path = options.path
	if (options.resource && options.resourceId) {
		path = options.resource + '/' + options.resourceId
	} else 	if (options.resource) {
		path = options.resource + '/'
	}
	return httpApi.put(path, options.data, _.merge({
		headers: {
			Prefer: 'return=representation'
		}
	}, options.config)).catch(handleRequestError)
}

export async function apiPutMinimal (options) {
	return apiPut(_.merge(options, {
		config: {
			headers: {
				Prefer: 'return=minimal'
			}
		}
	}))
}

export async function apiDelete (options = {
	path: undefined,
	resource: undefined,
	resourceId: undefined,
	config: {}
}) {
	let path = options.path
	if (options.resource && options.resourceId) {
		path = options.resource + '/' + options.resourceId
	} else 	if (options.resource) {
		path = options.resource + '/'
	}
	return httpApi.delete(path, options.config).catch(handleRequestError)
}
