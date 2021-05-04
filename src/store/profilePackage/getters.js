import { i18n } from 'boot/i18n'
import { profilePackageLabel } from 'src/filters/resource'

const EMPTY_OPTIONS_LIST = [{
    label: i18n.t('No data available'),
    disable: true
}]
export function profilePackagesAsOptions (state) {
    if (state.profilePackages.length > 0) {
        return state.profilePackages.map(profile => {
            return {
                label: profilePackageLabel(profile),
                value: profile.id
            }
        })
    } else {
        return EMPTY_OPTIONS_LIST
    }
}
