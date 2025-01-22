import { i18n } from 'boot/i18n'

export default {
    filteredContracts: [],
    filteredSystemContacts: [],
    customerContacts: [],
    allContracts: [],
    allCustomers: [],
    statusOptions: [
        {
            value: 'active',
            label: i18n.global.t('Active')
        },
        {
            value: 'pending',
            label: i18n.global.t('Pending')
        },
        {
            value: 'locked',
            label: i18n.global.t('Locked')
        },
        {
            value: 'terminated',
            label: i18n.global.t('Terminated')
        }
    ]
}
