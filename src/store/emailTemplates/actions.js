import { apiGetList } from 'src/api/common'
import _ from 'lodash'

export async function filterEmailTemplatesByReseller ({ commit }, resellerId) {
	const emailTemplates = await apiGetList({
		resource: 'emailtemplates',
		params: {
			reseller_id: resellerId
		}
	})
	commit('filteredEmailTemplates', _.get(emailTemplates, 'items', []))
}

export async function filterInvoiceTemplatesByReseller ({ commit }, resellerId) {
	const invoiceTemplates = await apiGetList({
		resource: 'invoicetemplates',
		params: {
			reseller_id: resellerId
		}
	})
	commit('filteredInvoiceTemplates', _.get(invoiceTemplates, 'items', []))
}
