import {
	setJwt,
	hasJwt
} from '../auth'
import {
	PATH_LOGIN,
	PATH_RECOVER_PASSWORD,
	PATH_ERROR_404,
	PATH_ENTRANCE,
	QUERY_PARAM_AUTH_V1
} from 'src/router/common'

export default async ({ router, store, redirect }) => {
	router.beforeEach((to, from, next) => {
		const isDifferentPath = to.path !== PATH_LOGIN && to.path !== PATH_RECOVER_PASSWORD && to.path !== PATH_ERROR_404
		if (!hasJwt() && (to.path === '/' || isDifferentPath)) {
			next(PATH_LOGIN)
		} else if (hasJwt() && (to.path === '/' || to.path === PATH_LOGIN)) {
			next(PATH_ENTRANCE)
		} else {
			next()
		}
	})
	try {
		const searchParams = new URLSearchParams(location.search)
		if (searchParams.has(QUERY_PARAM_AUTH_V1)) {
			setJwt(searchParams.get(QUERY_PARAM_AUTH_V1))
		}
	} catch (err) {
		console.error(err)
	}
}
