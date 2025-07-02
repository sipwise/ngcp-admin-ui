import { hasJwt } from 'src/auth'
import { store } from 'src/boot/store'

export default async () => {
    if (hasJwt()) {
        if (store) {
            await store.dispatch('user/loadUser')
        }
    }
}
