import { i18n } from 'boot/i18n'
export const INVOICE_TEMPLATE_RESOURCE = 'v2/templates/invoices'

const PATCHABLE_FIELDS = ['name', 'reseller_id', 'call_direction']

export function getInvoiceTemplateCategoryOptions () {
    return [
        { value: 'customer', label: i18n.global.t('Customer') },
        { value: 'reseller', label: i18n.global.t('Reseller') },
        { value: 'peer', label: i18n.global.t('Peer') },
        { value: 'did', label: i18n.global.t('DID') }
    ]
}

export function getInvoiceTemplateCallDirectionOptions () {
    return [
        { value: 'in', label: i18n.global.t('Incoming') },
        { value: 'out', label: i18n.global.t('Outgoing') },
        { value: 'in_out', label: i18n.global.t('Incoming and Outgoing') }
    ]
}

export function isResellerRequired (category) {
    return ['customer', 'did'].includes(category)
}

export function toInvoiceTemplateFormData (template) {
    return {
        name: template.name,
        reseller_id: template.reseller_id ?? null,
        type: template.type,
        call_direction: template.call_direction,
        category: template.category
    }
}

export function buildInvoiceTemplatePayload ({
    name, reseller_id: resellerId,
    type, call_direction: callDirection,
    category
}) {
    return {
        name,
        type,
        call_direction: callDirection,
        category,
        ...(isResellerRequired(category) && resellerId
            ? { reseller_id: resellerId }
            : {})
    }
}

export function buildInvoiceTemplatePatch (initial, current) {
    return PATCHABLE_FIELDS
        .filter((field) => (initial[field] ?? null) !== (current[field] ?? null))
        .map((field) => ({ op: 'replace', path: `/${field}`, value: current[field] ?? null }))
}
