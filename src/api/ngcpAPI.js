import _ from 'lodash'
import axios from 'axios'
import {
    API_REQUEST_DEFAULT_TIMEOUT,
    authTokenInterceptor,
    getInterceptorRejectionFunction,
    handleRequestError,
    HTTP_STATUS_OK_END,
    HTTP_STATUS_OK_START
} from 'src/api/common'

import { MAX_ITEMS_FOR_ALL_ROWS_REQ } from 'src/constants'

export const httpApi = axios.create({
    timeout: API_REQUEST_DEFAULT_TIMEOUT
})

export function initAPI ({ baseURL, logoutFunc }) {
    httpApi.defaults.baseURL = baseURL

    const interceptorRejection = getInterceptorRejectionFunction(logoutFunc)

    httpApi.interceptors.request.use(authTokenInterceptor, interceptorRejection)
    httpApi.interceptors.request.use(function normaliseApiRequestBody (config) {
        if (config.method === 'POST') {
            config.headers['Content-Type'] = 'application/json'
            if (config.data === undefined || config.data === null) {
                config.data = {}
            }
        } else if (config.method === 'PATCH') {
            config.headers['Content-Type'] = 'application/json-patch+json'
        }
        return config
    }, interceptorRejection)

    httpApi.interceptors.response.use(function normaliseApiResponseBody (response) {
        if (_.isObject(response.data)) {
            if (_.has(response.data, 'total_count')) {
                response.data.items = []
                if (_.has(response.data, '_embedded')) {
                    const pathParts = _.get(response, 'config.url', '')
                        .split('/').filter(item => item !== '')
                    if (pathParts.length > 0) {
                        const items = _.get(response.data, '_embedded.ngcp:' + pathParts[0], [])
                        items.forEach(item => {
                            delete item._links
                        })
                        response.data.items = items
                    }
                }
                response.data.totalCount = response.data.total_count
                delete response.data.total_count
            }
            delete response.data._links
        }
        return response
    }, interceptorRejection)
}

export async function apiGet (options = {
    path: undefined,
    resource: undefined,
    resourceId: undefined,
    config: {}
}) {
    let path = options.path
    if (options.resource && options.resourceId) {
        path = options.resource + '/' + options.resourceId
    } else if (options.resource) {
        path = options.resource + '/'
    }
    return httpApi.get(path, options.config).catch(handleRequestError)
}

export async function apiGetList (options = {
    resource: undefined,
    rows: 10,
    headers: {},
    params: {}
}) {
    const res = await apiGet({
        resource: options.resource,
        config: {
            headers: options.headers,
            params: options.params
        }
    })
    const items = _.get(res.data, 'items', [])
    const totalCount = _.get(res.data, 'totalCount', 0)
    let lastPage = 1
    if (_.isNumber(totalCount)) {
        lastPage = Math.ceil(totalCount / options.rows)
        if (lastPage === 0) {
            lastPage = 1
        }
    }
    return {
        items: items,
        lastPage: lastPage,
        totalItems: totalCount
    }
}

export async function apiGetPaginatedList (options, pagination) {
    const descending = _.get(pagination, 'descending', false)
    const orderBy = _.get(pagination, 'sortBy', '')
    const orderByDirection = (descending === true) ? 'desc' : 'asc'
    const filter = _.trim(_.get(options, 'filter', ''))
    const rowsPerPage = Number(_.get(pagination, 'rowsPerPage', -1))
    let params = {
        page: _.get(pagination, 'page', 1),
        rows: _.get(pagination, 'rowsPerPage', 10)
    }
    if (orderBy !== '') {
        params.order_by = orderBy
        params.order_by_direction = orderByDirection
    }
    if (options.resourceSearchField && options.filter && filter !== '') {
        params[options.resourceSearchField] = '*' + filter + '*'
    }
    if (options.resourceDefaultFilters) {
        params = { ...params, ...options.resourceDefaultFilters }
    }
    const newOptions = _.merge({}, options, {
        params: params
    })
    if (rowsPerPage === -1 || rowsPerPage === 0) {
        delete newOptions.params.page
        if (rowsPerPage === 0) {
            newOptions.params.rows = MAX_ITEMS_FOR_ALL_ROWS_REQ
        } else {
            delete newOptions.params.rows
        }
    }
    return apiGetList(newOptions)
}

export async function apiFetchEntity (resource, resourceId, config) {
    const res = await apiGet({
        resource: resource,
        resourceId: resourceId,
        config: config
    })
    return res.data
}

export async function apiUpdateEntity (resource, resourceId, data) {
    const res = await apiPut({
        resource: resource,
        resourceId: resourceId,
        data: data
    })
    return res.data
}

/**
 * Performs multiple get requests in parallel.
 * @param options
 * @param options.resources {Array<{
 *     resource: <String>,
 *     resourceId: <String>
 * }>}
 * @returns {Promise<Array<Object>>}
 */
export async function apiGetInParallel (options) {
    const requests = []
    const clonedOptions = _.clone(options)
    delete clonedOptions.resources
    for (const item of options.resources) {
        clonedOptions.resource = item.resource
        clonedOptions.resourceId = item.resourceId
        requests.push(apiGet(clonedOptions))
    }
    return Promise.all(requests)
}

/**
 * Fetches all related entities according to the relations definition.
 * @example The following example is going to fetch the related contact entity.
 * The key "contact_id" in the relations object hast to match the related
 * field "contact_id" in the entity. The "name" property is an alias for the
 * actual object, which is delivered afterwards. If this property "name" is
 * not set, the key "contact_id" is used instead. The property "resource"
 * contains the endpoint where to fetch the object from.
 * apiFetchRelatedEntities({
 *     id: 123,
 *     ...
 *     contact_id: 456
 * }, {
 *     contact_id: {
 *         name: contact,
 *         resource: 'contacts'
 *     }
 * })
 * @example The next example shows an array containing ids of related objects.
 * To be able to fetch an array of related objects, we need to mark the relation.
 * If the property "type" is set to "Array", the function considers "contacts"
 * as Array of ids and starts to fetch all related objects.
 * apiFetchRelatedEntities({
 *     id: 123,
 *     ...
 *     contacts: [456, 789, 987, 654]
 * }, {
 *     contacts: {
 *         type: Array,
 *         resource: 'contacts'
 *     }
 * })
 * @example The last example is the most complex one. It shows how to fetch
 * multiple different relations which are packed in an array of objects.
 * apiFetchRelatedEntities({
 *     id: 123,
 *     ...
 *     billing_profiles: [{
 *         profile: 1,
 *         network: 2
 *     }, {
 *         profile: 3,
 *         network: 4
 *     }]
 * }, {
 *     contacts: {
 *         type: Array,
 *         resources: {
 *             profile: {
 *                 resource: 'billingprofiles'
 *             },
 *             network: {
 *                 resource: 'billingnetworks'
 *             }
 *         }
 *     }
 * })
 * @param entity {Object} Contains the main entity
 * @param relations {Object} Contains a definition of relation the entity has
 * @returns {Promise<Object>}
 */
export async function apiFetchRelatedEntities (entity, relations) {
    const requests = []
    const relatedObjects = {}
    const resourceKeyIndexMap = {}
    const objectPathResourceKeyMap = {}

    const request = (objectPath, resource, resourceId) => {
        const resourceKey = resource + '-' + resourceId
        objectPathResourceKeyMap[objectPath] = resourceKey
        if (!resourceKeyIndexMap[resourceKey]) {
            resourceKeyIndexMap[resourceKey] = requests.length
            requests.push(apiFetchEntity(
                resource,
                resourceId
            ))
        }
    }

    Object.entries(relations).forEach((relationEntry) => {
        const [relationKey, relation] = relationEntry
        if (relation.required && !_.has(entity, relationKey)) {
            throw new Error('No property found for relation ' + relationKey)
        }
        let finalRelationKey = relationKey
        if (relation.name) {
            finalRelationKey = relation.name
        }
        if (relation.type && relation.type === Array && relation.resources) {
            entity[relationKey].forEach((subEntity, subEntityIndex) => {
                Object.entries(relation.resources).forEach((subRelationEntry) => {
                    const [subRelationKey, subRelation] = subRelationEntry
                    let finalSubRelationKey = subRelationKey
                    if (subRelation.name) {
                        finalSubRelationKey = subRelation.name
                    }
                    if (subEntity[subRelationKey] !== undefined && subEntity[subRelationKey] !== null) {
                        request(finalRelationKey + '.' + subEntityIndex + '.' + finalSubRelationKey,
                            subRelation.resource, subEntity[subRelationKey])
                    }
                })
            })
        } else if (relation.type && relation.type === Array && relation.resource) {
            entity[relationKey].forEach((resourceId, resourceIdIndex) => {
                if (resourceId !== undefined && resourceId !== null) {
                    request(finalRelationKey + '.' + resourceIdIndex,
                        relation.resource, resourceId)
                }
            })
        } else if (entity[relationKey] !== undefined && entity[relationKey] !== null) {
            request(finalRelationKey, relation.resource, entity[relationKey])
        }
    })
    const result = await Promise.all(requests)
    Object.entries(objectPathResourceKeyMap).forEach((entry) => {
        const [objectPath, resourceKey] = entry
        _.set(relatedObjects, objectPath, result[resourceKeyIndexMap[resourceKey]])
    })
    return relatedObjects
}

export async function apiPatch (options = {
    path: undefined,
    resource: undefined,
    resourceId: undefined,
    method: undefined,
    field: undefined,
    value: undefined,
    config: {}
}) {
    let path = options.path
    if (options.resource && options.resourceId) {
        path = options.resource + '/' + options.resourceId
    } else if (options.resource) {
        path = options.resource + '/'
    }
    return httpApi.patch(path, [{
        op: options.method,
        path: '/' + options.field,
        value: options.value
    }], _.merge({
        headers: {
            Prefer: 'return=minimal'
        }
    }, options.config, {
        headers: {
            'Content-Type': 'application/json-patch+json'
        }
    })).catch(handleRequestError)
}

export async function apiPatchReplace (options) {
    try {
        const res = await apiPatch(_.merge(options, {
            method: 'replace'
        }))
        return res.status >= HTTP_STATUS_OK_START &&
            res.status <= HTTP_STATUS_OK_END
    } catch (err) {
        if (err.response && err.response.status === 422) {
            const res = await apiPatch(_.merge(options, {
                method: 'add'
            }))
            return res.status >= HTTP_STATUS_OK_START &&
                res.status <= HTTP_STATUS_OK_END
        } else {
            throw err
        }
    }
}

export async function apiPatchReplaceFull (options) {
    const defaultConfig = {
        headers: {
            Prefer: 'return=representation'
        }
    }
    try {
        const res = await apiPatch(_.merge(options, {
            method: 'replace',
            config: defaultConfig
        }))
        return res.data
    } catch (err) {
        if (err.response && err.response.status === 422) {
            const res = await apiPatch(_.merge(options, {
                method: 'add',
                config: defaultConfig
            }))
            return res.data
        } else {
            throw err
        }
    }
}

export async function apiPatchRemoveFull (options = {
    resource: undefined,
    resourceId: undefined,
    field: undefined,
    value: undefined,
    config: {}
}) {
    const res = await apiPatch(_.merge(options, {
        method: 'remove',
        config: {
            headers: {
                Prefer: 'return=representation'
            }
        }
    }))
    return res.data
}

export async function apiPost (options = {
    resource: undefined,
    data: undefined,
    config: {}
}) {
    let path = options.path
    if (options.resource) {
        path = options.resource + '/'
    }
    return httpApi.post(path, options.data, _.merge({
        headers: {
            Prefer: 'return=representation'
        }
    }, options.config)).catch(handleRequestError)
}

export async function apiPostBlob (options = {
    resource: undefined,
    data: undefined,
    config: {}
}) {
    return apiPost(_.merge(options, {
        config: {
            responseType: 'blob'
        }
    }))
}

export async function apiPostMinimal (options = {
    resource: undefined,
    data: undefined,
    config: {}
}) {
    return apiPost(_.merge(options, {
        config: {
            headers: {
                Prefer: 'return=minimal'
            }
        }
    }))
}

export async function apiPut (options = {
    path: undefined,
    resource: undefined,
    resourceId: undefined,
    data: undefined,
    config: {}
}) {
    let path = options.path
    if (options.resource && options.resourceId) {
        path = options.resource + '/' + options.resourceId
    } else if (options.resource) {
        path = options.resource + '/'
    }
    return httpApi.put(path, options.data, _.merge({
        headers: {
            Prefer: 'return=representation'
        }
    }, options.config)).catch(handleRequestError)
}

export async function apiPutMinimal (options) {
    return apiPut(_.merge(options, {
        config: {
            headers: {
                Prefer: 'return=minimal'
            }
        }
    }))
}

export async function apiDelete (options = {
    path: undefined,
    resource: undefined,
    resourceId: undefined,
    config: {}
}) {
    let path = options.path
    if (options.resource && options.resourceId) {
        path = options.resource + '/' + options.resourceId
    } else if (options.resource) {
        path = options.resource + '/'
    }
    return httpApi.delete(path, options.config).catch(handleRequestError)
}

export async function apiFetchEntityAndRelations (resource, resourceId, relations) {
    const entity = await apiFetchEntity(resource, resourceId)
    const relatedEntities = await apiFetchRelatedEntities(entity, relations)
    return {
        entity,
        relatedEntities
    }
}
