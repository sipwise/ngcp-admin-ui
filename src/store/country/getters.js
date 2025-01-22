import { i18n } from 'boot/i18n'

const EMPTY_OPTIONS_LIST = [{
    get label () {
        return i18n.global.t('No data available')
    },
    disable: true
}]
export function countriesAsOptions (state) {
    if (state.countries.length > 0) {
        return state.countries.map((country) => {
            return {
                label: `${country.name}`,
                value: country.id
            }
        })
    }
    return EMPTY_OPTIONS_LIST
}
