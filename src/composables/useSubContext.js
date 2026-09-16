import { useWait } from 'src/composables/useWait'
import { WAIT_PAGE } from 'src/constants'
import { computed } from 'vue'
import { useStore } from 'vuex'

// Composition API equivalent of mixins/sub-context.js: reads the single
// "current" resource context that AuiBaseSubContext.vue's Options API
// consumers populate via loadContext/setContext into the `page` Vuex module.
export function useSubContext () {
    const store = useStore()
    const { waitFor, is } = useWait()

    const resourceObject = computed(() => store.state.page.resourceObject)
    const resourceRelatedObjects = computed(() => store.state.page.resourceRelatedObjects)
    const resourceRelatedSubObjects = computed(() => store.state.page.resourceRelatedSubObjects)
    const loading = computed(() => is(WAIT_PAGE).value)

    function reload () {
        return waitFor(WAIT_PAGE, () => store.dispatch('page/reloadContext'))
    }

    return { resourceObject, resourceRelatedObjects, resourceRelatedSubObjects, loading, reload }
}
