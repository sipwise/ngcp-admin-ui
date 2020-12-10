import Vue from 'vue'
import {
	Store
} from 'vuex'
import axios from 'axios'
import appConfig from '../config/app'
import Qs from 'qs'
import {
	getJwt
} from '../auth'
import _ from 'lodash'

export const httpPanel = axios.create({
	baseURL: appConfig.ngcpPanelUrl
})
export const httpApi = axios.create({
	baseURL: appConfig.ngcpApiUrl
})

Vue.prototype.$httpPanel = httpPanel
Vue.prototype.$httpApi = httpApi
Store.prototype.$httpPanel = httpPanel
Store.prototype.$httpApi = httpApi

function authTokenInterceptor (config) {
	const jwt = getJwt()
	if (jwt !== null) {
		config.headers.Authorization = 'Bearer ' + jwt
	}
	return config
}

function interceptorRejection (error) {
	return Promise.reject(error)
}

httpPanel.interceptors.request.use(authTokenInterceptor, interceptorRejection)
httpPanel.interceptors.request.use(function normalisePanelRequestBody (config) {
	if (config.method === 'POST') {
		config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
		config.data = Qs.stringify(config.data)
	}
	return config
}, interceptorRejection)

httpApi.interceptors.request.use(authTokenInterceptor, interceptorRejection)
httpApi.interceptors.request.use(function normaliseApiRequestBody (config) {
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

httpApi.interceptors.response.use(function normaliseApiResponseBody (response) {
	if (_.isObject(response.data)) {
		if (_.has(response.data, 'total_count')) {
			response.data.items = []
			if (_.has(response.data, '_embedded')) {
				const pathParts = _.get(response, 'config.url', '')
					.split('/').filter(item => item !== '')
				if (pathParts.length > 0) {
					const items = _.get(response.data, '_embedded.ngcp:' + pathParts[0], [])
					items.forEach(item => {
						delete item._links
					})
					response.data.items = items
				}
			}
			response.data.totalCount = response.data.total_count
			delete response.data.total_count
		}
		delete response.data._links
	}
	return response
}, interceptorRejection)
