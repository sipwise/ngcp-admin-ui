import { i18n } from 'boot/i18n'

export function customerStatusOptions () {
	return [
		{
			value: 'active',
			label: i18n.t('Active')
		},
		{
			value: 'pending',
			label: i18n.t('Pending')
		},
		{
			value: 'locked',
			label: i18n.t('Locked')
		},
		{
			value: 'terminated',
			label: i18n.t('Terminated')
		}
	]
}
