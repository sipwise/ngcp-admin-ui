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
