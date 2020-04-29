import Vue from 'vue'
import axios from 'axios'
import {
	LocalStorage
} from 'quasar'
import appConfig from '../config/app'

Vue.prototype.$axios = axios

axios.interceptors.request.use(function (config) {
	const jwt = LocalStorage.getItem('ngcpJwt')
	if (jwt !== null) {
		config.headers.Authorization = 'Bearer ' + jwt
	}
	config.url = appConfig.ngcpPanelUrl + config.url
	return config
}, function (error) {
	return Promise.reject(error)
})
