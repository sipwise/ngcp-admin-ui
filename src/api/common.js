import _ from 'lodash'
import { getJwt, hasJwt } from 'src/auth'
import { getCurrentLangAsV1Format } from 'src/i18n'
import { showGlobalErrorMessage } from 'src/helpers/ui'
import { isErrorNotHandled, markErrorAsHandled } from 'src/helpers/errorHandling'
// import { apiGet } from 'src/api/ngcpAPI'
import axios from 'axios'
import {
    Platform
} from 'quasar'

export const HTTP_STATUS_OK_START = 200
export const HTTP_STATUS_OK_END = 299
export const API_REQUEST_DEFAULT_TIMEOUT = 30000
export const ContentType = {
    json: 'application/json',
    jsonPatch: 'application/json-patch+json'
}
const GET_HEADERS = {
    Accept: ContentType.json,
    Authorization: 'Bearer ' + getJwt()
}
export const Prefer = {
    minimal: 'return=minimal',
    representation: 'return=representation'
}
const PATCH_HEADERS = {
    'Content-Type': ContentType.jsonPatch,
    Prefer: Prefer.minimal
}
const POST_HEADERS = {
    Accept: ContentType.json,
    'Content-Type': ContentType.json,
    Prefer: Prefer.representation,
    Authorization: 'Bearer ' + getJwt()
}
export const httpApi = axios.create({
    timeout: API_REQUEST_DEFAULT_TIMEOUT
})
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
export function groupFilterPayloadTransformation (payload) {
    if (typeof payload === 'string') {
        payload = {
            filter: payload
        }
    }
    const filter = _.trim(_.get(payload, 'filter', ''))
    delete payload.filter
    if (_.isString(filter) && filter.length > 0) {
        if (/^\d+$/.test(filter)) {
            payload.username = '*' + filter + '*'
        } else {
            payload.display_name = '*' + filter + '*'
        }
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
export async function post (options) {
    options = options || {}
    options = _.merge({
        headers: POST_HEADERS
    }, options)
    let path = options.path
    if (options.resource !== undefined) {
        path = '/api/' + options.resource + '/'
    }
    try {
        const res = await httpApi.post(path, options.body, {
            headers: options.headers
        })
        const hasBody = res.data !== undefined && res.data !== null && res.data !== ''
        if (hasBody) {
            return normalizeEntity(getJsonBody(res.data))
        } else if (!hasBody && res?.headers?.location) {
            return _.last(res.headers.location.split('/'))
        } else {
            return null
        }
    } catch (err) {
        handleResponseError(err)
    }
}
export async function get (options) {
    options = options || {}
    options = _.merge({
        headers: GET_HEADERS
    }, options)
    let requestOptions = {
        headers: options.headers
    }
    if (options.params) {
        requestOptions = {
            ...requestOptions,
            params: options.params
        }
    }
    if (options.blob === true) {
        requestOptions.responseType = 'blob'
    }
    let path = options.path
    if (options.resource !== undefined && options.resourceId !== undefined) {
        path = 'api/' + options.resource + '/' + options.resourceId
    }
    try {
        const res = await httpApi.get(path, requestOptions).catch(handleRequestError)
        let body = null
        if (options.blob === true) {
            body = URL.createObjectURL(res.data)
        } else {
            body = normalizeEntity(getJsonBody(res.data))
        }
        return body
    } catch (err) {
        handleResponseError(err)
    }
}
function handleResponseError (err) {
    const code = _.get(err, 'response.data.code', null)
    const message = _.get(err, 'response.data.message', null)
    if (code !== null && message !== null) {
        throw new ApiResponseError(err.response.data.code, err.response.data.message)
    } else {
        throw err
    }
}
export class ApiResponseError extends Error {
    constructor (code, message) {
        super()
        this.code = code
        this.status = code
        this.message = message
    }
}
export function getJsonBody (body) {
    if (_.isString(body)) {
        try {
            return JSON.parse(body)
        } catch (err) {
            return body
        }
    }
    return body
}
export function normalizeEntity (entity) {
    if (entity && entity._links) {
        delete entity._links
    }
    return entity
}
export function getAsBlob (options) {
    return new Promise((resolve, reject) => {
        options = options || {}
        options = _.merge(options, {
            blob: true
        })
        get(options).then((body) => {
            resolve(body)
        }).catch((err) => {
            reject(err)
        })
    })
}
export function toFileId (options) {
    return [
        options.soundSetId,
        options.soundHandle
    ].join('-')
}
export async function getSoundFile (options) {
    return new Promise((resolve, reject) => {
        getAsBlob({
            path: '/api/soundfilerecordings/' + options.id + '/',
            params: {
                format: Platform.mozilla ? 'ogg' : 'mp3'
            },
            headers: {
                Authorization: 'Bearer ' + getJwt()
            }
        }).then((result) => {
            resolve(result)
        }).catch((err) => {
            reject(err)
        })
    })
}
export function getSoundFileById (options) {
    return new Promise((resolve, reject) => {
        get({
            path: '/api/soundfiles/' + options.id + '/'
        }).then((soundfile) => {
            resolve(soundfile)
        }).catch((err) => {
            reject(err)
        })
    })
}
export function uploadSoundFiles (options) {
    return new Promise((resolve, reject) => {
        const formData = new FormData()

        if (options.soundFileData) {
            formData.append('json', JSON.stringify({
                loopplay: options.soundFileData !== null,
                set_id: options.soundSetId,
                handle: options.soundHandle,
                filename: options.soundFileData.name
            }))
            formData.append('soundfile', options.soundFileData)
            const initializedSoundFiles = httpApi.interceptors.request.use(function (config) {
                options.initialized(config)

                if (hasJwt()) {
                    if (config.headers) {
                        config.headers = {
                            ...config.headers,
                            Authorization: 'Bearer ' + getJwt()
                        }
                    } else {
                        config = {
                            ...config,
                            headers: {
                                Authorization: 'Bearer ' + getJwt()
                            }
                        }
                    }
                }
                if (config.method === 'POST' && (config.data === undefined || config.data === null)) {
                    config.data = {}
                }
                if (config.params) {
                    config.params = {
                        ...config.params,
                        lang: getCurrentLangAsV1Format()
                    }
                } else {
                    config.params = {
                        lang: getCurrentLangAsV1Format()
                    }
                }
                return config
            })
            httpApi.post('/api/soundfiles/', formData, {
                onUploadProgress (progressEvent) {
                    if (progressEvent.lengthComputable) {
                        options.progressed(Math.ceil((progressEvent.loaded / progressEvent.total) * 100))
                    }
                }
            }).then((res) => {
                const fileId = _.last(res.headers.location.split(/\//))
                return Promise.all([
                    get({ path: '/api/soundfiles/' + fileId + '/' }),
                    getSoundFile({ id: fileId })
                ])
            }).then((res) => {
                httpApi.interceptors.request.eject(initializedSoundFiles)
                resolve({
                    soundFile: res[0],
                    soundFileUrl: res[1]
                })
            }).catch((err) => {
                httpApi.interceptors.request.eject(initializedSoundFiles)
                reject(err)
            })
        } else {
            post({
                resource: 'soundfiles',
                body: {
                    loopplay: false,
                    set_id: options.soundSetId,
                    handle: options.soundHandle,
                    use_parent: false
                }
            }).then(async (id) => {
                const res = await getSoundFileById({ id })
                resolve({
                    soundFile: res,
                    soundFileUrl: null
                })
            }).catch((err) => {
                reject(err)
            })
        }
    })
}
export async function patch (operation, options) {
    options = options || {}
    options = _.merge({
        headers: PATCH_HEADERS
    }, options)
    const body = {
        op: operation,
        path: '/' + options.fieldPath
    }
    if (options.value !== undefined) {
        body.value = options.value
    }
    let path = options.path
    if (options.resource !== undefined && options.resourceId !== undefined) {
        path = 'api/' + options.resource + '/' + options.resourceId
    }
    try {
        return await httpApi.patch(path, [body], {
            headers: options.headers
        })
    } catch (err) {
        handleResponseError(err)
    }
}
export async function patchFull (operation, options) {
    options = options || {}
    options = _.merge(options, {
        headers: {
            Prefer: 'return=representation',
            Authorization: 'Bearer ' + getJwt()
        }
    })
    const res = await patch(operation, options)
    return normalizeEntity(getJsonBody(res.data))
}

export function patchReplaceFull (options) {
    return patchFull('replace', options)
}
export function setLoopPlays (options) {
    return new Promise((resolve, reject) => {
        patchReplaceFull({
            path: '/api/soundfiles/' + options.soundFileId,
            fieldPath: 'loopplay',
            value: (options.loopPlay === true) ? 'true' : 'false'

        }).then((soundFile) => {
            resolve(soundFile)
        }).catch((err) => {
            reject(err)
        })
    })
}
export function setUseParents (options) {
    return new Promise((resolve, reject) => {
        patchReplaceFull({
            path: '/api/soundfiles/' + options.soundFileId,
            fieldPath: 'use_parent',
            value: options.useParent
        }).then((soundFile) => {
            resolve(soundFile)
        }).catch((err) => {
            reject(err)
        })
    })
}
export async function removeSoundFiles (soundFileId) {
    return new Promise((resolve, reject) => {
        httpApi.delete(
            '/api/soundfiles/' + soundFileId,
            {
                headers: {
                    Authorization: 'Bearer ' + getJwt()
                }
            }).then(() => {
            resolve()
        }).catch((err) => {
            if (err.response.status >= 400) {
                reject(new Error(err.response.data.message))
            } else {
                reject(err)
            }
        })
    })
}
