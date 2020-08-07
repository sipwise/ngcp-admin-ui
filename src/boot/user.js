
import {
	hasJwt
} from 'src/auth'

export default async ({ router, store, redirect }) => {
	if (hasJwt()) {
		await store.dispatch('user/loadUser')
	}
}
