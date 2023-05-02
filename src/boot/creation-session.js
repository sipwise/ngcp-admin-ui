
import CreationSession from 'src/plugins/creation-session'

export default async ({ app, store, router }) => {
    app.use(CreationSession, { store, router })
}
