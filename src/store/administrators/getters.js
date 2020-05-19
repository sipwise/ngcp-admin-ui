
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

export function isAdminLoading (state) {
	return state.adminState === 'requesting'
}

export function hasAdminFailed (state) {
	return state.adminState === 'failed'
}

export function adminLoadError (state) {
	return state.adminError
}
