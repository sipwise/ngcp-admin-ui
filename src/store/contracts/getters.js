import { i18n } from 'boot/i18n'

const EMPTY_OPTIONS_LIST = [{
	label: i18n.t('No data available'),
	disable: true
}]

export function filteredContractOptions (state) {
	const contracts = []
	state.filteredContracts.forEach((contract) => {
		contracts.push({
			label: contract.id + ' - ' + contract.contact_email,
			value: contract.id
		})
	})
	return contracts
}

export function filteredSystemContactsAsOptions (state) {
	return state.filteredSystemContacts.map(contact => {
		return {
			label: contact.email,
			value: contact.id
		}
	})
}

export function customerContactsAsOptions (state) {
	if (state.customerContacts.length > 0) {
		return state.customerContacts.map(contact => {
			return {
				label: contact.email,
				value: contact.id
			}
		})
	} else {
		return EMPTY_OPTIONS_LIST
	}
}
