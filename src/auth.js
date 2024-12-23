import jwtDecode from 'jwt-decode'
import {
    deleteLocal,
    getLocal,
    setLocal
} from 'src/local-storage'

export function getJwt () {
    return getLocal('jwt')
}

export function hasJwt () {
    return getJwt() !== null
}

export function setJwt (jwt) {
    const decodedJwt = jwtDecode(jwt)
    setLocal('jwt', jwt)
    setLocal('adminId', decodedJwt.id)
}

export function deleteJwt () {
    deleteLocal('jwt')
    deleteLocal('adminId')
}

export function getAdminId () {
    return getLocal('adminId')
}
