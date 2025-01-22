import { i18n } from 'boot/i18n'
import { contactLabel } from 'src/filters/resource'

const EMPTY_OPTIONS_LIST = [{
    get label () {
        return i18n.global.t('No data available')
    },
    disable: true
}]

export function filteredContractOptions (state) {
    const contracts = []
    state.filteredContracts.forEach((contract) => {
        contracts.push({
            label: `${contract.id} - ${contract.contact_email}`,
            value: contract.id
        })
    })
    return contracts
}

export function filteredSystemContactsAsOptions (state) {
    return state.filteredSystemContacts.map((contact) => {
        return {
            label: contactLabel(contact),
            value: contact.id
        }
    })
}

export function customerContactsAsOptions (state) {
    if (state.customerContacts.length > 0) {
        return state.customerContacts.map((contact) => {
            return {
                label: contactLabel(contact),
                value: contact.id
            }
        })
    }
    return EMPTY_OPTIONS_LIST
}
export function filteredAllContracts (state) {
    const contracts = []
    state.allContracts.forEach((contract) => {
        contracts.push({
            label: `${contract.id}-${contract.contact_id_expand.email}-${contract.type}`,
            value: contract.id
        })
    })
    state.allCustomers.forEach((customer) => {
        contracts.push({
            label: `${customer.id}-${customer.contact_id_expand.email}-${customer.type}`,
            value: customer.id
        })
    })
    return contracts
}
