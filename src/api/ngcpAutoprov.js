import axios from 'axios'
import {
    API_REQUEST_DEFAULT_TIMEOUT,
    authTokenInterceptor,
    getInterceptorRejectionFunction,
    handleRequestError
} from 'src/api/common'

export const httpAutoprov = axios.create({
    timeout: API_REQUEST_DEFAULT_TIMEOUT
})

export function initAutoprov ({ baseURL, logoutFunc, getLogoutMessage }) {
    httpAutoprov.defaults.baseURL = baseURL

    const interceptorRejection = getInterceptorRejectionFunction(logoutFunc, getLogoutMessage)

    httpAutoprov.interceptors.request.use(authTokenInterceptor, interceptorRejection)

    httpAutoprov.interceptors.request.use(function injectSessionHeader (config) {
        config.headers['X-NGCP-Admin-UI'] = '1'
        return config
    }, interceptorRejection)

    httpAutoprov.interceptors.response.use(undefined, interceptorRejection)
}

/**
 * Make a secure GET request to the autoprov config endpoint.
 * @param {Object} options
 * @param {Object} options.config - Axios config (headers, params, responseType, etc.)
 * @param {string} options.identifier - Identifier for the autoprov config
 * @returns {Promise} Resolves with the response data or rejects with an error object containing message and code
 */

export async function apiGetAutoprovConfig ({ config = {}, identifier } = {}) {
    try {
        const response = await httpAutoprov.get(
            `/device/autoprov/config/${identifier}`,
            config
        )
        return response.data
    } catch (err) {
        if (err.response) {
            err.response = {
                ...err.response,
                data: {
                    message: err.response.data,
                    code: err.response.status
                }
            }
        }

        handleRequestError(err)
    }
}
