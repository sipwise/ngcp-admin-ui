import Vue from 'vue'
import VueI18n from 'vue-i18n'
import messages from 'src/i18n'

Vue.use(VueI18n)

Vue.prototype.$t = function (...args) {
	const result = this.$i18n.t.apply(this.$i18n, args)
	if (result === '') {
		return args[0]
	}
	return result
}
Vue.prototype.$tc = function (...args) {
	const result = this.$i18n.tc.apply(this.$i18n, args)
	if (result === '') {
		return args[0]
	}
	return result
}

export const defaultLocale = 'en-us'

export const i18n = new VueI18n({
	locale: defaultLocale,
	fallbackLocale: defaultLocale,
	messages
})

export default ({ app }) => {
	app.i18n = i18n
}
