
export default ({ app, Vue }) => {
	Vue.prototype.$validators = {
		required: val => (val !== null && val !== undefined && val !== '') || app.i18n.t('validators.required')
	}
}
