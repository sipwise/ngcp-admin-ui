import { i18n } from 'boot/i18n'

export function modeOptions () {
    return [
        {
            value: 'whitelist',
            label: i18n.global.t('Whitelist')
        },
        {
            value: 'blacklist',
            label: i18n.global.t('Blacklist')
        }
    ]
}
