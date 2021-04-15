
export function contextSucceeded (state, {
    resource,
    resourceId,
    resourceRelations,
    resourceObject,
    resourceRelatedObjects = null
}) {
    state.resource = resource
    state.resourceId = resourceId
    state.resourceRelations = resourceRelations
    state.resourceObject = resourceObject
    state.resourceRelatedObjects = resourceRelatedObjects
}

export function resetContext (state) {
    state.resource = null
    state.resourceId = null
    state.resourceRelations = null
    state.resourceObject = null
    state.resourceRelatedObjects = null
}

export function setCurrentSubContext (state, subContextRoute) {
    state.subContextRoute = subContextRoute
}
