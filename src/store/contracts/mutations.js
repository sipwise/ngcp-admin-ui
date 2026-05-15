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
export function allContracts (state, contracts) {
    state.allContracts = contracts
}
export function allCustomers (state, contracts) {
    state.allCustomers = contracts
}
