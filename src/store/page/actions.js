import {
    apiFetchEntity,
    apiFetchRelatedEntities
} from 'src/api/common'
import {
    WAIT_CONTEXT_AWARE_PAGE
} from 'src/constants'

export async function loadContext ({ dispatch, commit }, {
    resource,
    resourceId,
    resourceRelations,
    reset = true
}) {
    try {
        if (reset) {
            commit('resetContext')
        }
        await dispatch('wait/start', WAIT_CONTEXT_AWARE_PAGE, { root: true })
        const resourceObject = await apiFetchEntity(resource, resourceId)
        let resourceRelatedObjects = null
        if (resourceRelations) {
            resourceRelatedObjects = await apiFetchRelatedEntities(resourceObject, resourceRelations)
        }
        commit('contextSucceeded', {
            resource: resource,
            resourceId: resourceId,
            resourceRelations: resourceRelations,
            resourceObject: resourceObject,
            resourceRelatedObjects: resourceRelatedObjects
        })
    } finally {
        await dispatch('wait/end', WAIT_CONTEXT_AWARE_PAGE, { root: true })
    }
}

export async function reloadContext ({ dispatch, state }) {
    dispatch('loadContext', {
        resource: state.resource,
        resourceId: state.resourceId,
        resourceRelations: state.resourceRelations,
        reset: false
    })
}

export async function navigateToSubContext ({ commit }, { subContext }) {
    commit('navigateToSubContext', subContext)
    await this.$router.push({ name: subContext.route })
}
