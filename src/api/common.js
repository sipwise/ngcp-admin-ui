import _ from 'lodash'
import { getJwt } from 'src/auth'

export const HTTP_STATUS_OK_START = 200
export const HTTP_STATUS_OK_END = 299
export const API_REQUEST_DEFAULT_TIMEOUT = 10000

export function handleRequestError (err) {
    // Note: Axios library adds some extra fields to the exceptions data. So, if you need to recreate an exception
    //       with some specific error class (based on "Error" class) you should copy there all extra fields from
    //       the original exception. Or you can just modify data directly in the exception as we did below.
    if (err.response) {
        err.message = _.get(err, 'response.data.message', err.message)
    }
    throw err
}

export function authTokenInterceptor (config) {
    const jwt = getJwt()
    if (jwt !== null) {
        config.headers.Authorization = 'Bearer ' + jwt
    }
    return config
}

export function getInterceptorRejectionFunction (logoutFunc, getLogoutMessage) {
    return function interceptorRejection (error) {
        // detecting user session expiration
        if (
            error?.response?.status === 401 ||
            (error?.response?.status === 403 && String(error?.response?.data?.message).toLowerCase() === 'invalid user') ||
            String(error?.headers?.location).endsWith('/login')
        ) {
            if (typeof logoutFunc === 'function') {
                logoutFunc()
            }
            if (String(error?.response?.data?.message).toLowerCase() === 'invalid user') {
                error.response.data.message = getLogoutMessage()
            }
        }
        return Promise.reject(error)
    }
}

export function generateResellerFilterParams (payload) {
    const filter = _.trim(_.get(payload, 'filter', ''))
    const resellerId = _.get(payload, 'resellerId', null)
    const params = {}
    if (_.isString(payload) && filter.length > 0) {
        params.name = '*' + payload + '*'
    } else if (_.isString(filter) && filter.length > 0) {
        params.name = '*' + filter + '*'
    }
    if (resellerId !== null) {
        params.reseller_id = resellerId
    }
    if (payload.page && payload.rows) {
        params.rows = payload.rows
        params.page = payload.page
    }
    return params
}

export function defaultFilterPayloadTransformation (payload) {
    if (typeof payload === 'string') {
        payload = {
            filter: payload
        }
    }
    const filter = _.trim(_.get(payload, 'filter', ''))
    delete payload.filter
    if (_.isString(filter) && filter.length > 0) {
        payload.name = '*' + filter + '*'
    }
    return payload
}

export function resellerPayloadTransformation (payload) {
    const resellerId = _.get(payload, 'resellerId', null)
    delete payload.resellerId
    if (resellerId !== null) {
        payload.reseller_id = resellerId
    }
    return payload
}
