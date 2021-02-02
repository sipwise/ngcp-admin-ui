import { i18n } from 'boot/i18n'

const EMPTY_OPTIONS_LIST = [{
	label: i18n.t('No data available'),
	disable: true
}]
export function billingProfilesAsOptions (state) {
	if (state.billingProfiles.length > 0) {
		return state.billingProfiles.map(profile => {
			return {
				label: `#${profile.id} ${profile.name} ( ${i18n.t('Reseller')}: ${profile.handle} )`,
				value: profile.id
			}
		})
	} else {
		return EMPTY_OPTIONS_LIST
	}
}

export function billingProfileTypeOptions () {
	return [
		{
			value: 'single',
			label: i18n.t('single (actual billing profile)')
		}
	]
}
