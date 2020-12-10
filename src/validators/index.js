import {
	i18n
} from 'boot/i18n'

export const errorMessages = {
	ip () {
		return i18n.t('Input must be a valid IPv4 or IPv6')
	},
	minValue (params) {
		return i18n.t('Only values higher than {min} are allowed', params)
	},
	integer () {
		return i18n.t('Only none decimal numbers are allowed')
	}
}
