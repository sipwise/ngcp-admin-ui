import _ from 'lodash'
import { getJwt } from 'src/auth'
import { showGlobalErrorMessage } from 'src/helpers/ui'
import { isErrorNotHandled, markErrorAsHandled } from 'src/helpers/errorHandling'

export const HTTP_STATUS_OK_START = 200
export const HTTP_STATUS_OK_END = 299
export const API_REQUEST_DEFAULT_TIMEOUT = 30000

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
            if (String(error?.response?.data?.message).toLowerCase() === 'invalid user') {
                error.response.data.message = getLogoutMessage()
            }
            setTimeout(async () => {
                if (isErrorNotHandled(error, '403 suppressed')) {
                    if (isErrorNotHandled(error, ['global', 'last-chance notification'])) {
                        showGlobalErrorMessage(error)
                    }
                    if (typeof logoutFunc === 'function') {
                        await logoutFunc()
                    }
                    markErrorAsHandled(error)
                }
            }, 0)
        }
        return Promise.reject(error)
    }
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
