import { i18n } from 'boot/i18n'

const EMPTY_OPTIONS_LIST = [{
    label: i18n.t('No data available'),
    disable: true
}]
export function timezonesAsOptions (state) {
    if (state.timezones.length > 0) {
        return state.timezones.map(timezone => {
            return {
                label: `${timezone.name}`,
                value: timezone.name
            }
        })
    } else {
        return EMPTY_OPTIONS_LIST
    }
}
