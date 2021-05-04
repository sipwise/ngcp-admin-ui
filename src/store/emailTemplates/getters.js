import { i18n } from 'boot/i18n'
import { emailTemplateLabel } from 'src/filters/resource'

const EMPTY_OPTIONS_LIST = [{
    label: i18n.t('No data available'),
    disable: true
}]

export function filteredEmailTemplatesAsOptions (state) {
    if (state.filteredEmailTemplates.length) {
        return state.filteredEmailTemplates.map(template => {
            return {
                label: emailTemplateLabel(template),
                value: template.id
            }
        })
    } else {
        return EMPTY_OPTIONS_LIST
    }
}

export function filteredInvoiceTemplatesAsOptions (state) {
    if (state.filteredInvoiceTemplates.length) {
        return state.filteredInvoiceTemplates.map(template => {
            return {
                label: [template.id, template.name].join(' - '),
                value: template.id
            }
        })
    } else {
        return EMPTY_OPTIONS_LIST
    }
}
