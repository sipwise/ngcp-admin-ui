import { INVOICE_TEMPLATES_RESOURCE } from 'src/api/invoice-templates'
import { useDataContext } from 'src/composables/useDataContext'

export function useInvoiceTemplateContext ({ resourceId, autoLoad = true } = {}) {
    const { object: template, loading, load, reload } = useDataContext({
        resourceObjectId: 'invoiceTemplateContext',
        resource: INVOICE_TEMPLATES_RESOURCE,
        resourceId,
        resourceExpand: ['reseller_id'],
        autoLoad
    })

    return { template, loading, load, reload }
}
