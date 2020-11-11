
import appConfig from '../config/app'

export default async ({ Vue, store }) => {
	Vue.prototype.$appConfig = appConfig
	store.$appConfig = appConfig

	window.addEventListener('message', (event) => {
		if (event.data.origin && event.data.origin === 'ngcp-panel') {
			store.commit('user/trackPath', {
				type: event.data.origin,
				path: event.data.path,
				error: event.data.error
			})
		}
	}, false)
}
