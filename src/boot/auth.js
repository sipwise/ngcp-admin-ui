import {
	LocalStorage
} from 'quasar'

export default ({ router }) => {
	router.beforeEach((to, from, next) => {
		const jwt = LocalStorage.getItem('ngcpJwt')
		if (to.path !== '/login/admin' && jwt === null) {
			next('/login/admin')
		} else if (to.path === '/login' && jwt !== null) {
			next('/login/admin')
		} else if (to.path === '/' && jwt !== null) {
			next('/dashboard')
		} else {
			next()
		}
	})
}
