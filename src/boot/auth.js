import {
	setJwt,
	hasJwt,
	deleteJwt
} from '../auth'

export default async ({ router, store }) => {
	router.beforeEach((to, from, next) => {
		const dashboardForwards = [
			'/',
			'/login/admin'
		]
		if (!hasJwt() && to.path !== '/login/admin') {
			next('/login/admin')
		} else if (hasJwt() && dashboardForwards.indexOf(to.path) > -1) {
			next('/dashboard')
		} else {
			next()
		}
	})
	try {
		const searchParams = new URLSearchParams(location.search)
		if (searchParams.has('v1_auth')) {
			setJwt(searchParams.get('v1_auth'))
			document.location.href = '/#/dashboard'
		} else {
			await store.dispatch('user/loadUser')
		}
	} catch (err) {
		deleteJwt()
		router.push({ path: '/login/admin' })
	}
}
