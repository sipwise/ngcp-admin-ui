import { i18n } from 'boot/i18n'

export function customerStatusOptions () {
    return [
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
export function subscriberCommonPbxHuntPolicyOptions () {
    return [
        {
            label: i18n.global.t('Serial Ringing'),
            value: 'serial'
        },
        {
            label: i18n.global.t('Parallel Ringing'),
            value: 'parallel'
        },
        {
            label: i18n.global.t('Random Ringing'),
            value: 'random'
        },
        {
            label: i18n.global.t('Circular Ringing'),
            value: 'circular'
        }
    ]
}
export function subscriberCommonPbxHuntCancelModeOptions () {
    return [
        {
            label: i18n.global.t('Using Cancel'),
            value: 'cancel'
        },
        {
            label: i18n.global.t('Using Bye'),
            value: 'bye'
        }
    ]
}
