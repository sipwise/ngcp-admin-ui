
export function filteredResellerOptions (state) {
	const resellers = []
	state.filteredResellers.forEach((reseller) => {
		resellers.push({
			label: reseller.name,
			value: reseller.id
		})
	})
	return resellers
}
