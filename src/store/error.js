import {
	ResponseError
} from 'src/api/common'

export function resetGlobalActionError (context) {
	context.commit('user/resetGlobalUserError', null, { root: true })
}

export function handleGlobalActionError (context, err) {
	if (err instanceof ResponseError) {
		context.commit('user/globalUserError', err.message, { root: true })
	} else {
		console.error(err)
	}
}
