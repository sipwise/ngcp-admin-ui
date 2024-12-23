export function addBillingInterval (state, billingProfile) {
    state.billingProfileIntervals.push(billingProfile)
}

export function resetBillingIntervals (state) {
    state.billingProfileIntervals = []
}

export function editBillingInterval (state, { index, field, value }) {
    state.billingProfileIntervals[index][field] = value
}

export function deleteBillingInterval (state, index) {
    state.billingProfileIntervals.splice(index, 1)
}
