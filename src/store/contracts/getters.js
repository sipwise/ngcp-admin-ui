export function filteredContractOptions (state) {
	const contracts = []
	state.filteredContracts.forEach((contract) => {
		contracts.push({
			label: contract.contact_email,
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
	return state.customerContacts.map(contact => {
		return {
			label: contact.email,
			value: contact.id
		}
	})
}
