import Vue from 'vue'
import axios from 'axios'
import {
	LocalStorage
} from 'quasar'

Vue.prototype.$axios = axios

axios.interceptors.request.use(function (config) {
	const jwt = LocalStorage.getItem('ngcpJwt')
	if (jwt !== null) {
		config.headers.Authorization = 'Bearer ' + jwt
	}
	return config
}, function (error) {
	return Promise.reject(error)
})
