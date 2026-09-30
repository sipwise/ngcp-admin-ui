import { useWait } from 'src/composables/useWait'
import { WAIT_PAGE } from 'src/constants'
import { computed } from 'vue'
import { useStore } from 'vuex'

export function useBatchProvisioningTemplates () {
    const store = useStore()
    const { waitFor, is } = useWait()

    const loading = computed(() => is(WAIT_PAGE).value)

    function createTemplate (payload) {
        return waitFor(WAIT_PAGE, () => store.dispatch('batchProvisioningTemplates/createTemplate', payload))
    }

    function updateTemplate (payload) {
        return waitFor(WAIT_PAGE, () => store.dispatch('batchProvisioningTemplates/updateTemplate', payload))
    }

    function submitOpenForm (payload) {
        return waitFor(WAIT_PAGE, () => store.dispatch('batchProvisioningTemplates/submitOpenForm', payload))
    }

    return {
        loading,
        createTemplate,
        updateTemplate,
        submitOpenForm
    }
}
