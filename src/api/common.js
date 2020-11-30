import _ from 'lodash'
import {
	httpApi
} from 'boot/axios'

const HTTP_STATUS_OK_START = 200
const HTTP_STATUS_OK_END = 299

class ResponseError extends Error {
	constructor (err) {
		super()
		this.message = _.get(err, 'response.data.message', err.message)
		this.response = err.response
	}
}

class RequestError extends Error {
	constructor (err) {
		super()
		this.message = err.message
		this.request = err.request
	}
}

export async function apiGetPaginatedList (options, pagination) {
	const descending = _.get(pagination, 'descending', false)
	const orderBy = _.get(pagination, 'sortBy', '')
	const orderByDirection = (descending === true) ? 'desc' : 'asc'
	const params = {
		page: _.get(pagination, 'page', 1),
		rows: _.get(pagination, 'rowsPerPage', 10)
	}
	if (orderBy !== '') {
		params.order_by = orderBy
		params.order_by_direction = orderByDirection
	}
	const newOptions = _.merge({}, options, {
		params: params
	})
	return apiGetList(newOptions)
}

export async function apiGetList (options) {
	try {
		const rows = _.get(options, 'rows', 10)
		const headers = _.get(options, 'headers', {})
		const params = _.get(options, 'params', {})
		const res = await httpApi.get('/' + options.resource + '/', {
			headers: headers,
			params: params
		})
		const items = _.get(res.data, '_embedded.ngcp:' + options.resource, [])
		const totalCount = _.get(res.data, 'total_count', 0)
		let lastPage = 1
		if (_.isNumber(totalCount)) {
			lastPage = Math.ceil(totalCount / rows)
			if (lastPage === 0) {
				lastPage = 1
			}
		}
		const normalizedItems = items.map(item => {
			delete item._links
			return item
		})
		return {
			items: normalizedItems,
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

export async function apiFetchEntity (entity, id) {
	try {
		const res = await httpApi.get('/' + entity + '/' + id)
		if (res.status >= HTTP_STATUS_OK_START && res.status <= HTTP_STATUS_OK_END) {
			delete res.data._links
			return res.data
		} else {
			return null
		}
	} catch (err) {
		return null
	}
}

export async function apiUpdateEntity (entity, id, payload) {
	const res = await httpApi.put('/' + entity + '/' + id, payload, {
		headers: {
			Prefer: 'return=representation'
		}
	})
	delete res.data._links
	return res.data
}

export async function apiPatch (path, data, config = {}) {
	return httpApi.patch(path, data, _.merge(config, {
		headers: {
			'Content-Type': 'application/json-patch+json',
			Prefer: 'return=minimal'
		}
	})).catch((err) => {
		if (err.response) {
			throw new ResponseError(err)
		} else if (err.request) {
			throw new RequestError(err)
		} else {
			throw err
		}
	})
}

export async function apiPatchReplace (entity, id, field, value, config) {
	const res = await apiPatch('/' + entity + '/' + id, [
		{
			op: 'replace',
			path: '/' + field,
			value: value
		}
	])
	return res.status >= HTTP_STATUS_OK_START && res.status <= HTTP_STATUS_OK_END
}

export async function apiPostBlob (path, data, config = {}) {
	return httpApi.post(path, data, _.merge(config, {
		responseType: 'blob',
		headers: {
			Prefer: 'return=representation'
		}
	}))
}

export async function apiPostMinimal (path, data, config = {}) {
	return httpApi.post(path, data, _.merge(config, {
		headers: {
			Prefer: 'return=minimal'
		}
	}))
}

export async function apiDelete (resource, resourceId, config = {}) {
	return httpApi.delete('/' + resource + '/' + resourceId, config)
}
