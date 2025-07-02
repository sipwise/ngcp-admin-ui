import {
    hasJwt,
    setJwt
} from 'src/auth'
import { setSessionStorage } from 'src/local-storage'
import {
    PATH_ENTRANCE,
    PATH_ERROR_403,
    PATH_ERROR_404,
    PATH_LOGIN,
    QUERY_PARAM_AUTH_V1
} from 'src/router/common'
const publicPaths = [
    PATH_LOGIN,
    PATH_ERROR_404,
    PATH_ERROR_403
]

export default async ({ router, redirect }) => {
    router.beforeEach((to, from, next) => {
        if (!hasJwt() && !publicPaths.includes(to.path)) {
            if (from?.path === PATH_LOGIN) {
                next(false)
            } else {
                setSessionStorage('preLoginPath', to.fullPath)
                next(PATH_LOGIN)
            }
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
        // eslint-disable-next-line no-console
        console.error(err)
        // TODO: why we are suppressing an exception here?
    }
}
