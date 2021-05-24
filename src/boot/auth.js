import {
    setJwt,
    hasJwt
} from '../auth'
import {
    PATH_LOGIN,
    PATH_RECOVER_PASSWORD,
    PATH_ERROR_404,
    PATH_ENTRANCE,
    QUERY_PARAM_AUTH_V1,
    PATH_ERROR_403
} from 'src/router/common'

const publicPaths = [
    PATH_LOGIN,
    PATH_RECOVER_PASSWORD,
    PATH_ERROR_404,
    PATH_ERROR_403
]

export default async ({ router, store, redirect }) => {
    router.beforeEach((to, from, next) => {
        if (!hasJwt() && publicPaths.indexOf(to.path) === -1) {
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
        // TODO: why we are suppressing an exception here?
    }
}
