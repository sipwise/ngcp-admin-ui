import { useWait } from 'src/composables/useWait'
import { WAIT_PAGE } from 'src/constants'
import { computed } from 'vue'
import { useStore } from 'vuex'

export function useInvoiceTemplates () {
    const store = useStore()
    const { waitFor, is } = useWait()

    const loading = computed(() => is(WAIT_PAGE).value)

    function createInvoiceTemplate (payload) {
        return waitFor(WAIT_PAGE, () => store.dispatch('invoiceTemplates/createInvoiceTemplate', payload))
    }

    function updateInvoiceTemplate (payload) {
        return waitFor(WAIT_PAGE, () => store.dispatch('invoiceTemplates/updateInvoiceTemplate', payload))
    }

    return {
        loading,
        createInvoiceTemplate,
        updateInvoiceTemplate
    }
}
