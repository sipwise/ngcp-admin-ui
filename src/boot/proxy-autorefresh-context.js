
import ProxyAutorefreshContext from 'src/plugins/proxy-autorefresh-context'

export default async ({ app, store, router }) => {
    app.use(ProxyAutorefreshContext, { store, router })
}
