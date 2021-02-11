import { i18n } from 'boot/i18n'

const EMPTY_OPTIONS_LIST = [{
	label: i18n.t('No data available'),
	disable: true
}]
export function profilePackagesAsOptions (state) {
	if (state.profilePackages.length > 0) {
		return state.profilePackages.map(profile => {
			return {
				label: `#${profile.id} ${profile.name} (${i18n.t('Reseller Id')}: ${profile.reseller_id})`,
				value: profile.id
			}
		})
	} else {
		return EMPTY_OPTIONS_LIST
	}
}
