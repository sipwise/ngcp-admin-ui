import { useDataContext } from 'src/composables/useDataContext'
import { INVOICE_TEMPLATE_RESOURCE } from 'src/helpers/invoice-templates'

export function useInvoiceTemplateContext ({ resourceId, autoLoad = true } = {}) {
    const { object: template, loading, load, reload } = useDataContext({
        resourceObjectId: 'invoiceTemplateContext',
        resource: INVOICE_TEMPLATE_RESOURCE,
        resourceId,
        resourceExpand: ['reseller_id'],
        autoLoad
    })

    return { template, loading, load, reload }
}
