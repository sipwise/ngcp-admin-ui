import {
	LocalStorage
} from 'quasar'

export default async ({ router, store }) => {
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
	await store.dispatch('user/loadUser')
}
