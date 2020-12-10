import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'
import {
	getLocal
} from 'src/storage'

import {
	errorMessages
} from 'src/validators'

Vue.use(VueI18n)

export const defaultLocale = getLocal('language') || 'en-us'

export const i18n = new VueI18n({
	locale: defaultLocale,
	fallbackLocale: defaultLocale,
	formatFallbackMessages: true,
	messages
})

Vue.prototype.$errMsg = ($v) => {
	if ($v && $v.$params && Object.keys($v.$params).length > 0) {
		let errMsgKey
		Object.keys($v.$params).forEach((key) => {
			if ($v[key] === false && !errMsgKey) {
				errMsgKey = key
			}
		})
		if (errMsgKey && errorMessages[errMsgKey]) {
			return errorMessages[errMsgKey]($v.$params[errMsgKey], $v)
		}
	}
	return ''
}

export default ({ app }) => {
	app.i18n = i18n
}
