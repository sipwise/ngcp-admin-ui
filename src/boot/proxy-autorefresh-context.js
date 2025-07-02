import { store } from 'src/boot/store'
import ProxyAutorefreshContext from 'src/plugins/proxy-autorefresh-context'

export default async ({ app, router }) => {
    app.use(ProxyAutorefreshContext, { store, router })
}
