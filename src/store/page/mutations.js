import Vue from 'vue'

export function contextSucceeded (state, {
    resource,
    resourceId,
    resourceExpand,
    resourceRelations,
    resourceObject,
    resourceRelatedObjects = null,
    resourceRelatedSubObjects = null
}) {
    state.resource = resource
    state.resourceId = resourceId
    state.resourceExpand = resourceExpand
    state.resourceRelations = resourceRelations
    state.resourceObject = resourceObject
    state.resourceRelatedObjects = resourceRelatedObjects
    state.resourceRelatedSubObjects = resourceRelatedSubObjects
}

export function resetContext (state) {
    state.resource = null
    state.resourceId = null
    state.resourceExpand = null
    state.resourceRelations = null
    state.resourceObject = null
    state.resourceRelatedObjects = null
    state.resourceRelatedSubObjects = null
}

export function setCurrentSubContext (state, subContextRoute) {
    state.subContextRoute = subContextRoute
}

export function destroyDataContext (state, { resourceObjectId }) {
    delete state[resourceObjectId]
    delete state[resourceObjectId + '_Resource']
    delete state[resourceObjectId + '_ResourceId']
    delete state[resourceObjectId + '_ResourceExpand']
    delete state[resourceObjectId + '_ResourceFilters']
}

export function dataContextLoaded (state, {
    resource,
    resourceId,
    resourceExpand,
    resourceFilters,
    resourceObjectId,
    resourceObject
}) {
    Vue.set(state, resourceObjectId + '_Resource', resource)
    Vue.set(state, resourceObjectId + '_ResourceId', resourceId)
    Vue.set(state, resourceObjectId + '_ResourceExpand', resourceExpand)
    Vue.set(state, resourceObjectId + '_ResourceFilters', resourceFilters)
    Vue.set(state, resourceObjectId, resourceObject)
}
