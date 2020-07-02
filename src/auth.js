import {
	LocalStorage
} from 'quasar'
import jwtDecode from 'jwt-decode'

export function getJwt () {
	return LocalStorage.getItem('ngcpJwt')
}

export function hasJwt () {
	return getJwt() !== null
}

export function setJwt (jwt) {
	const decodedJwt = jwtDecode(jwt)
	LocalStorage.set('ngcpJwt', jwt)
	LocalStorage.set('ngcpAdminId', decodedJwt.id)
}

export function deleteJwt () {
	LocalStorage.remove('ngcpJwt')
	LocalStorage.remove('ngcpAdminId')
}

export function getAdminId () {
	return LocalStorage.getItem('ngcpAdminId')
}
