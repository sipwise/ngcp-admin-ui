import { i18n } from 'boot/i18n'

export function customerStatusOptions () {
    return [
        {
            value: 'active',
            label: i18n.global.tc('Active')
        },
        {
            value: 'pending',
            label: i18n.global.tc('Pending')
        },
        {
            value: 'locked',
            label: i18n.global.tc('Locked')
        },
        {
            value: 'terminated',
            label: i18n.global.tc('Terminated')
        }
    ]
}
