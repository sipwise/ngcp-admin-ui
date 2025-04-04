import { i18n } from 'boot/i18n'

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

export function resellerStatusOptions () {
    return [
        {
            value: 'active',
            label: i18n.global.t('Active')
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
