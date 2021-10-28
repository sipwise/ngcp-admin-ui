
import CreationSession from 'src/plugins/creation-session'

export default async ({ Vue, store, router }) => {
    Vue.use(CreationSession, { store, router })
}
