
import appConfig from '../config/app'

export default async ({ Vue, store }) => {
	Vue.prototype.$appConfig = appConfig
	store.$appConfig = appConfig
}
