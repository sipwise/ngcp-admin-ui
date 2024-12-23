import _ from 'lodash'
import {
    apiFetchEntity,
    apiFetchRelatedEntities
} from 'src/api/ngcpAPI'
import { WAIT_PAGE } from 'src/constants'

async function fetchRelations (resourceObject, resourceRelations) {
    let resourceRelatedObjects = {}
    const resourceRelatedSubObjects = {}
    if (resourceRelations) {
        resourceRelatedObjects = await apiFetchRelatedEntities(resourceObject, resourceRelations)
        const subRequests = []
        const subRequestKeys = []
        Object.entries(resourceRelations).forEach((relationEntry) => {
            const [relationKey, relation] = relationEntry
            const finalRelationKey = _.get(relation, 'name', relationKey)
            if (relation.relations) {
                subRequests.push(apiFetchRelatedEntities(resourceRelatedObjects[finalRelationKey], relation.relations))
                subRequestKeys.push(finalRelationKey)
            }
        })
        const subRequestResults = await Promise.all(subRequests)
        subRequestKeys.forEach((subRequestKey, index) => {
            _.set(resourceRelatedSubObjects, subRequestKey, subRequestResults[index])
        })
    }
    return {
        resourceRelatedObjects,
        resourceRelatedSubObjects
    }
}

export async function loadDataContext ({ commit }, {
    resource,
    resourceId,
    resourceExpand,
    resourceObjectId,
    resourceFilters,
    resourceRelations
}) {
    const requestConfig = {
        params: {}
    }
    if (resourceExpand) {
        requestConfig.params = _.merge(requestConfig.params, {
            expand: resourceExpand.join(',')
        })
    }
    if (resourceFilters) {
        requestConfig.params = _.merge(requestConfig.params, resourceFilters)
    }
    const resourceObject = await apiFetchEntity(resource, resourceId, requestConfig)
    commit('dataContextLoaded', {
        resource,
        resourceId,
        resourceExpand,
        resourceFilters,
        resourceObjectId,
        resourceObject,
        resourceRelations,
        ...(await fetchRelations(resourceObject, resourceRelations))
    })
}

export async function reloadDataContext ({ dispatch, state }, resourceObjectId) {
    dispatch('loadDataContext', {
        resourceObjectId,
        resource: state[`${resourceObjectId}_Resource`],
        resourceId: state[`${resourceObjectId}_ResourceId`],
        resourceExpand: state[`${resourceObjectId}_ResourceExpand`],
        resourceFilters: state[`${resourceObjectId}_ResourceFilters`],
        resourceRelations: state[`${resourceObjectId}_ResourceRelations`]
    })
}

export async function loadContext ({ dispatch, commit }, {
    resource,
    resourceId,
    resourceExpand,
    resourceRelations,
    reset = true
}) {
    try {
        if (reset) {
            commit('resetContext')
        }
        let requestConfig = null
        if (resourceExpand) {
            requestConfig = {
                params: {
                    expand: resourceExpand.join(',')
                }
            }
        }
        await dispatch('wait/start', WAIT_PAGE, { root: true })
        const resourceObject = await apiFetchEntity(resource, resourceId, requestConfig)
        commit('contextSucceeded', {
            resource,
            resourceId,
            resourceExpand,
            resourceRelations,
            resourceObject,
            ...(await fetchRelations(resourceObject, resourceRelations))
        })
    } finally {
        await dispatch('wait/end', WAIT_PAGE, { root: true })
    }
}

export async function reloadContext ({ dispatch, state }) {
    await dispatch('loadContext', {
        resource: state.resource,
        resourceId: state.resourceId,
        resourceExpand: state.resourceExpand,
        resourceRelations: state.resourceRelations,
        reset: false
    })
}

export async function setContext ({ dispatch, commit }, {
    resource,
    resourceId,
    resourceExpand,
    resourceRelations,
    resourceObject,
    resourceRelatedObjects,
    resourceRelatedSubObjects
}) {
    commit('contextSucceeded', {
        resource,
        resourceId,
        resourceExpand,
        resourceRelations,
        resourceObject,
        resourceRelatedObjects,
        resourceRelatedSubObjects
    })
}

export async function navigateToSubContext ({ commit }, { subContext }) {
    commit('setCurrentSubContext', subContext)
    await this.$router.push({ name: subContext.route })
}
