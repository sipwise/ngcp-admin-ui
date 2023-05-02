import { i18n } from 'boot/i18n'
import _ from 'lodash'
import { apiGetList } from 'src/api/ngcpAPI'
import { checkExistence } from 'src/store/storeGenerator'

export function gSelectLazyNames ({ namespace, generatorName }) {
    const prefix = (namespace) ? namespace + '/' : ''

    const actionName = prefix + generatorName
    const mutationName = prefix + generatorName + 'Success'
    const getterDefaultOptionsName = prefix + generatorName + 'Options'

    const storeDataName = prefix + generatorName + '_data'
    const storeDataTotalCountName = prefix + generatorName + '_dataTotalCount'
    const storeLoadingFlagName = prefix + generatorName + '_loading'
    const storeRequestParamsName = prefix + generatorName + '_requestParams'

    return {
        actionName,
        mutationName,
        getterDefaultOptionsName,

        storeDataName,
        storeDataTotalCountName,
        storeLoadingFlagName,
        storeRequestParamsName
    }
}

export function gSelectLazyGenerator (storeModule, configItem) {
    const configDefaults = {
        name: '',
        accumulateData: true,
        apiOptions: {},
        actionPayloadTransformationFn: undefined,
        defaultOptionsGetterFn: undefined,
        injectOptionForEmptyList: false
    }

    const config = {
        ...configDefaults,
        ...configItem
    }
    const { name: generatorName } = config
    const names = gSelectLazyNames({ namespace: '', generatorName })

    createState(storeModule, names, config)
    createMutations(storeModule, names, config)
    createGetters(storeModule, names, config)
    createActions(storeModule, names, config)

    return storeModule
}

function createState (storeModule, names) {
    const {
        storeDataName, storeDataTotalCountName, storeLoadingFlagName, storeRequestParamsName
    } = names

    // Create State
    function initStateElements (state) {
        state[storeDataName] = []
        state[storeDataTotalCountName] = 0
        state[storeRequestParamsName] = {}
        state[storeLoadingFlagName] = false
    }

    switch (typeof storeModule.state) {
    case 'undefined':
    case 'function': {
        const originalStateFunc = storeModule.state || (() => ({}))
        storeModule.state = function () {
            const result = originalStateFunc.call(storeModule)
            initStateElements(result)
            return result
        }
        break
    }
    case 'object':
        storeModule.state = (storeModule.state !== null) ? storeModule.state : {}
        initStateElements(storeModule.state)
        break
    }
}

function createMutations (storeModule, names, config) {
    const {
        mutationName,
        storeDataName, storeDataTotalCountName, storeRequestParamsName
    } = names
    const { name: generatorName } = config

    // Create Mutations
    checkExistence({ storeModule, element: 'mutations', subElement: mutationName, generatorName })
    storeModule.mutations = {
        ...storeModule.mutations,
        ...({
            [mutationName] (state, {
                data,
                dataTotalCount,
                params,
                concatenate = false
            }) {
                state[storeRequestParamsName] = params
                if (concatenate) {
                    state[storeDataName] = [...state[storeDataName], ...data]
                } else {
                    state[storeDataName] = data
                    state[storeDataTotalCountName] = dataTotalCount
                }
            }
        })
    }
}

function createGetters (storeModule, names, config) {
    const {
        getterDefaultOptionsName, storeDataName
    } = names

    const {
        name: generatorName,
        defaultOptionsGetterFn,
        injectOptionForEmptyList
    } = config

    // Create Getters
    if (typeof defaultOptionsGetterFn === 'function') {
        const EMPTY_OPTIONS_LIST = [{
            get label () {
                return i18n.global.tc('No data available')
            },
            disable: true
        }]

        checkExistence({
            storeModule, element: 'getters', subElement: getterDefaultOptionsName, generatorName
        })
        storeModule.getters = {
            ...storeModule.getters,
            ...({
                [getterDefaultOptionsName] (state) {
                    if (state[storeDataName].length) {
                        return state[storeDataName].map(defaultOptionsGetterFn)
                    } else {
                        return (injectOptionForEmptyList) ? EMPTY_OPTIONS_LIST : []
                    }
                }
            })
        }
    }
}

function createActions (storeModule, names, config) {
    const {
        actionName, mutationName,
        storeDataName, storeDataTotalCountName, storeRequestParamsName
    } = names

    const { name: generatorName, actionPayloadTransformationFn, accumulateData, apiOptions } = config

    checkExistence({
        storeModule, element: 'actions', subElement: actionName, generatorName
    })
    storeModule.actions = {
        ...storeModule.actions,
        ...({
            async [actionName] ({
                commit,
                state
            }, payload) {
                let params = payload
                if (typeof actionPayloadTransformationFn === 'function') {
                    params = actionPayloadTransformationFn(payload)
                }

                const forceCacheInvalidation = !params.page || params.page <= 0
                if (forceCacheInvalidation) {
                    params.page = 1
                    params.rows = params.rows || 10
                }
                const dataCachedAlready =
                    _.isEqual(params, state[storeRequestParamsName]) ||
                    params.page * params.rows <= state[storeDataName].length

                const someRequestParamsChanged = !_.isEqual({
                    ...params,
                    ...{ page: 0 }
                }, {
                    ...state[storeRequestParamsName],
                    ...{ page: 0 }
                })
                let invalidateCache = !accumulateData || forceCacheInvalidation || someRequestParamsChanged

                if (invalidateCache || !dataCachedAlready) {
                    if (!invalidateCache && params.page > state[storeRequestParamsName].page + 1) {
                        /* We are trying to request more further page than just next page. For example page #1 is cached
                           but the page #3 was requested instead of #2.
                           So, because we guarantee that cache is linear without gaps (required for infinite scrolling)
                           we have to request all not cached pages with the requested page. */
                        throw new Error('You cannot skip not cached pages. ' +
                            `Expected page #${state[storeRequestParamsName].page + 1} but requested page #${params.page}`)
                    }

                    let response = await apiGetList({
                        ...apiOptions,
                        params
                    })

                    if (!invalidateCache && response.totalItems !== state[storeDataTotalCountName]) {
                        // "totalItems" changed, so something changed on backend side and we should reload all cached items
                        response = await apiGetList({
                            ...apiOptions,
                            params: {
                                ...params,
                                page: 1,
                                rows: params.page * params.rows
                            }
                        })
                        invalidateCache = true
                    }

                    commit(mutationName, {
                        data: _.get(response, 'items', []),
                        dataTotalCount: _.get(response, 'totalItems', 0),
                        params,
                        concatenate: !invalidateCache
                    })
                }
            }
        })
    }
}
