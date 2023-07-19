import { i18n } from 'boot/i18n'
import { contactLabel } from 'src/filters/resource'

const EMPTY_OPTIONS_LIST = [{
    get label () {
        return i18n.global.tc('No data available')
    },
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
            label: contactLabel(contact),
            value: contact.id
        }
    })
}

export function customerContactsAsOptions (state) {
    if (state.customerContacts.length > 0) {
        return state.customerContacts.map(contact => {
            return {
                label: contactLabel(contact),
                value: contact.id
            }
        })
    } else {
        return EMPTY_OPTIONS_LIST
    }
}
