export function filterContracts (state, payload) {
    const contracts = payload.contracts
    const page = payload.page ?? 0

    if (page > 1) {
        state.filteredContracts = [...state.filteredContracts, ...contracts]
    } else {
        state.filteredContracts = contracts
    }
}

export function filterSystemContacts (state, contacts) {
    state.filteredSystemContacts = contacts
}

export function customerContacts (state, contacts) {
    state.customerContacts = contacts
}
export function allContracts (state, { items, page }) {
    state.allContracts = page > 1
        ? [...state.allContracts, ...items]
        : items
}
export function allCustomers (state, { items, page }) {
    state.allCustomers = page > 1
        ? [...state.allCustomers, ...items]
        : items
}
