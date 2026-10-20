import { jwtDecode } from 'jwt-decode'
import { deleteGrafanaAuthCookies } from 'src/helpers/grafana'
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
    deleteGrafanaAuthCookies()
}

export function getAdminId () {
    return getLocal('adminId')
}
