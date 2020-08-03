import {
	LocalStorage
} from 'quasar'
import jwtDecode from 'jwt-decode'

export function getJwt () {
	return LocalStorage.getItem('aui_jwt')
}

export function hasJwt () {
	return getJwt() !== null
}

export function setJwt (jwt) {
	const decodedJwt = jwtDecode(jwt)
	LocalStorage.set('aui_jwt', jwt)
	LocalStorage.set('aui_adminId', decodedJwt.id)
}

export function deleteJwt () {
	LocalStorage.remove('aui_jwt')
	LocalStorage.remove('aui_adminId')
}

export function getAdminId () {
	return LocalStorage.getItem('aui_adminId')
}
