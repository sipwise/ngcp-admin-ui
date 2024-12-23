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
    delete state[`${resourceObjectId}_Resource`]
    delete state[`${resourceObjectId}_ResourceId`]
    delete state[`${resourceObjectId}_ResourceExpand`]
    delete state[`${resourceObjectId}_ResourceFilters`]
    delete state[`${resourceObjectId}_ResourceRelations`]
    delete state[`${resourceObjectId}_ResourceRelatedObjects`]
    delete state[`${resourceObjectId}_ResourceRelatedSubObjects`]
}

export function dataContextLoaded (state, {
    resource,
    resourceId,
    resourceExpand,
    resourceFilters,
    resourceObjectId,
    resourceObject,
    resourceRelations,
    resourceRelatedObjects,
    resourceRelatedSubObjects
}) {
    state[resourceObjectId] = resourceObject
    state[`${resourceObjectId}_Resource`] = resource
    state[`${resourceObjectId}_ResourceId`] = resourceId
    state[`${resourceObjectId}_ResourceExpand`] = resourceExpand
    state[`${resourceObjectId}_ResourceFilters`] = resourceFilters
    state[`${resourceObjectId}_ResourceRelations`] = resourceRelations
    state[`${resourceObjectId}_ResourceRelatedObjects`] = resourceRelatedObjects
    state[`${resourceObjectId}_ResourceRelatedSubObjects`] = resourceRelatedSubObjects
}
