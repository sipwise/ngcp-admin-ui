import { i18n } from 'boot/i18n'

export function filteredNcosLevelOptions (state) {
    const ncosLevels = []
    state.filteredNcosLevels.forEach((ncosLevel) => {
        ncosLevels.push({
            label: ncosLevel.level,
            value: ncosLevel.level
        })
    })
    return ncosLevels
}

export function modeOptions () {
    return [
        {
            value: 'whitelist',
            label: i18n.t('Whitelist')
        },
        {
            value: 'blacklist',
            label: i18n.t('Blacklist')
        }
    ]
}
