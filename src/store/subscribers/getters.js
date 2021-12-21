import { i18n } from 'boot/i18n'

export function lockLevelOptions () {
    return [
        {
            value: null,
            label: i18n.t('None')
        },
        {
            value: 1,
            label: i18n.t('Foreign')
        },
        {
            value: 2,
            label: i18n.t('Outgoing')
        },
        {
            value: 3,
            label: i18n.t('All calls')
        },
        {
            value: 4,
            label: i18n.t('Global')
        },
        {
            value: 5,
            label: i18n.t('Ported')
        }
    ]
}
