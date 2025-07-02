import { store } from 'src/boot/store'
import CreationSession from 'src/plugins/creation-session'

export default async ({ app, router }) => {
    app.use(CreationSession, { store, router })
}
