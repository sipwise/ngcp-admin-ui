
import {
    WAIT_PAGE
} from 'src/constants'
import _ from 'lodash'
import { apiFetchEntity, apiFetchRelatedEntities } from 'src/api/ngcpAPI'

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
        await dispatch('wait/start', WAIT_PAGE, { root: true })
        const resourceObject = await apiFetchEntity(resource, resourceId)
        let resourceRelatedObjects = null
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
        commit('contextSucceeded', {
            resource: resource,
            resourceId: resourceId,
            resourceRelations: resourceRelations,
            resourceObject: resourceObject,
            resourceRelatedObjects: resourceRelatedObjects,
            resourceRelatedSubObjects: resourceRelatedSubObjects
        })
    } finally {
        await dispatch('wait/end', WAIT_PAGE, { root: true })
    }
}

export async function reloadContext ({ dispatch, state }) {
    await dispatch('loadContext', {
        resource: state.resource,
        resourceId: state.resourceId,
        resourceRelations: state.resourceRelations,
        reset: false
    })
}

export async function navigateToSubContext ({ commit }, { subContext }) {
    commit('setCurrentSubContext', subContext)
    await this.$router.push({ name: subContext.route })
}
