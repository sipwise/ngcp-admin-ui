import { useWait } from 'src/composables/useWait'
import { WAIT_PAGE } from 'src/constants'
import { computed } from 'vue'
import { useStore } from 'vuex'

export function useInvoiceTemplates () {
    const store = useStore()
    const { waitFor, is } = useWait()

    const loading = computed(() => is(WAIT_PAGE).value)

    function dispatchWaiting (action, payload) {
        return waitFor(WAIT_PAGE, () => store.dispatch(`invoiceTemplates/${action}`, payload))
    }

    const createInvoiceTemplate = (payload) => dispatchWaiting('createInvoiceTemplate', payload)
    const updateInvoiceTemplate = (payload) => dispatchWaiting('updateInvoiceTemplate', payload)
    const fetchInvoiceTemplate = (id) => dispatchWaiting('fetchInvoiceTemplate', id)
    const fetchInvoiceTemplateVars = (id) => dispatchWaiting('fetchInvoiceTemplateVars', id)
    const fetchInvoiceTemplatePreview = (id) => dispatchWaiting('fetchInvoiceTemplatePreview', id)
    const fetchInvoiceTemplateContent = (id) => dispatchWaiting('fetchInvoiceTemplateContent', id)
    const uploadInvoiceTemplate = (payload) => dispatchWaiting('uploadInvoiceTemplate', payload)

    return {
        loading,
        createInvoiceTemplate,
        updateInvoiceTemplate,
        fetchInvoiceTemplate,
        fetchInvoiceTemplateVars,
        fetchInvoiceTemplatePreview,
        fetchInvoiceTemplateContent,
        uploadInvoiceTemplate
    }
}
