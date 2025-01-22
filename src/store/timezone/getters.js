import { i18n } from 'boot/i18n'

const EMPTY_OPTIONS_LIST = [{
    get label () {
        return i18n.global.t('No data available')
    },
    disable: true
}]
export function timezonesAsOptions (state) {
    if (state.timezones.length > 0) {
        return state.timezones.map((timezone) => {
            return {
                label: `${timezone.name}`,
                value: timezone.name
            }
        })
    }
    return EMPTY_OPTIONS_LIST
}
