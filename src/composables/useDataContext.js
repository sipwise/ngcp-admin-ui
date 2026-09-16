import { useWait } from 'src/composables/useWait'
import { WAIT_PAGE } from 'src/constants'
import {
    computed,
    getCurrentScope,
    onMounted,
    onScopeDispose,
    toValue,
    watch
} from 'vue'
import { useStore } from 'vuex'

// Composition API equivalent of components/AuiDataContext.vue
export function useDataContext ({
    resourceObjectId,
    resource,
    resourceId,
    resourceExpand,
    resourceFilters,
    resourceRelations,
    autoLoad = true
}) {
    const store = useStore()
    const { waitFor, is } = useWait()

    const object = computed(() => store.state.page[toValue(resourceObjectId)])
    const loading = computed(() => is(WAIT_PAGE).value)

    let loadedResourceObjectId

    // Value-equality key for "which resource are we currently pointing at".
    // Router navigation replaces `route.params` on every change, so a getter
    // like `() => route.params.id` re-evaluates when you only switch tabs
    // under the same resource. Comparing the serialised value (rather than a
    // fresh array/object) keeps the watcher below quiet in that case.
    const resourceKey = computed(() => JSON.stringify([
        toValue(resourceId) ?? null,
        toValue(resourceFilters) ?? null
    ]))

    async function load () {
        const requestedKey = resourceKey.value
        loadedResourceObjectId = toValue(resourceObjectId)
        await waitFor(WAIT_PAGE, () => store.dispatch('page/loadDataContext', {
            resource: toValue(resource),
            resourceId: toValue(resourceId),
            resourceExpand: toValue(resourceExpand),
            resourceRelations: toValue(resourceRelations),
            resourceFilters: toValue(resourceFilters),
            resourceObjectId: loadedResourceObjectId
        }))
        if (resourceKey.value !== requestedKey) {
            // The id/filters changed again while this request was in flight.
            // If it resolved after a newer request for the current key, its
            // (now stale) response just overwrote the correct data — recover
            // by loading the current key's data again. This doesn't prevent
            // the one-tick flash of stale data; avoiding that needs request
            // cancellation.
            await load()
        }
    }

    function reload () {
        return waitFor(WAIT_PAGE, () => store.dispatch('page/reloadDataContext', toValue(resourceObjectId)))
    }

    function destroy () {
        store.dispatch('page/destroyDataContext', { resourceObjectId: loadedResourceObjectId ?? toValue(resourceObjectId) })
    }

    function getRelatedObject (name) {
        return store.state.page[`${toValue(resourceObjectId)}_ResourceRelatedObjects`]?.[name]
    }

    function getRelatedSubObject (name) {
        return store.state.page[`${toValue(resourceObjectId)}_ResourceRelatedSubObjects`]?.[name]
    }

    if (autoLoad) {
        onMounted(load)

        // The id this context is keyed by can change while the component stays
        // mounted (e.g. /subscriber/5/... -> /subscriber/12/... reuses the same
        // page instance). Destroy first: `loadDataContext` only commits once the
        // request resolves, so without this the whole subtree keeps rendering
        // the *previous* resource until then
        watch(resourceKey, async () => {
            destroy()
            if (toValue(resourceId) === undefined || toValue(resourceId) === null) {
                return
            }
            await load()
        })

        // In normal use (a synchronous, top-level `<script setup>` call) this
        // is always true. It just avoids a dev-mode console warning if this
        // ever gets called somewhere without an active component — e.g.
        // after an `await`, or from a plain function.
        if (getCurrentScope()) {
            onScopeDispose(destroy)
        }
    }

    return { object, loading, load, reload, destroy, getRelatedObject, getRelatedSubObject }
}
