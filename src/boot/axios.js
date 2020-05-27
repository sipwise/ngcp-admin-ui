import Vue from 'vue'
import {
	Store
} from 'vuex'
import axios from 'axios'
import {
	LocalStorage
} from 'quasar'
import appConfig from '../config/app'
import Qs from 'qs'
import _ from 'lodash'

const httpPanel = axios.create({
	baseURL: appConfig.ngcpPanelUrl
})
const httpApi = axios.create({
	baseURL: appConfig.ngcpApiUrl
})

Vue.prototype.$httpPanel = httpPanel
Vue.prototype.$httpApi = httpApi
Store.prototype.$httpPanel = httpPanel
Store.prototype.$httpApi = httpApi

Store.prototype.$apiFetchEntity = apiFetchEntity
Store.prototype.$apiUpdateEntity = apiUpdateEntity
Store.prototype.$apiPatch = apiPatch
Store.prototype.$apiPatchReplace = apiPatchReplace
Store.prototype.$apiPostBlob = apiPostBlob
Store.prototype.$apiPostMinimal = apiPostMinimal

async function apiFetchEntity (entity, id) {
	try {
		const res = await httpApi.get('/' + entity + '/' + id)
		if (res.status >= 200 && res.status <= 299) {
			const data = _.cloneDeep(res.data)
			delete data._links
			return data
		} else {
			return null
		}
	} catch (err) {
		return null
	}
}

async function apiUpdateEntity (entity, id, payload) {
	const res = await httpApi.put('/' + entity + '/' + id, payload, {
		headers: {
			Prefer: 'return=representation'
		}
	})
	const data = _.cloneDeep(res.data)
	delete data._links
	return data
}

async function apiPatch (path, data, config) {
	config = config || {}
	return httpApi.patch(path, data, _.merge(config, {
		headers: {
			'Content-Type': 'application/json-patch+json',
			Prefer: 'return=minimal'
		}
	}))
}

async function apiPatchReplace (entity, id, field, value) {
	const res = await apiPatch('/' + entity + '/' + id, [
		{
			op: 'replace',
			path: '/' + field,
			value: value
		}
	])
	return res.status >= 200 && res.status <= 299
}

async function apiPostBlob (path, data, config) {
	config = config || {}
	return httpApi.post(path, data, _.merge(config, {
		responseType: 'blob',
		headers: {
			Prefer: 'return=representation'
		}
	}))
}

async function apiPostMinimal (path, data, config) {
	config = config || {}
	return httpApi.post(path, data, _.merge(config, {
		headers: {
			Prefer: 'return=minimal'
		}
	}))
}

const authTokenInterceptor = function (config) {
	const jwt = LocalStorage.getItem('ngcpJwt')
	if (jwt !== null) {
		config.headers.Authorization = 'Bearer ' + jwt
	}
	return config
}

const interceptorRejection = function (error) {
	return Promise.reject(error)
}

httpPanel.interceptors.request.use(authTokenInterceptor, interceptorRejection)
httpPanel.interceptors.request.use(function (config) {
	if (config.method === 'POST') {
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		config.data = Qs.stringify(config.data)
	}
	return config
}, interceptorRejection)

httpApi.interceptors.request.use(authTokenInterceptor, interceptorRejection)
httpApi.interceptors.request.use(function (config) {
	if (config.method === 'POST') {
		config.headers['Content-Type'] = 'application/json'
		if (config.data === undefined || config.data === null) {
			config.data = {}
		}
	} else if (config.method === 'PATCH') {
		config.headers['Content-Type'] = 'application/json-patch+json'
	}
	return config
}, interceptorRejection)
