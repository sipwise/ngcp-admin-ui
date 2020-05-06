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
