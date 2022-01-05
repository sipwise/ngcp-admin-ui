
import ProxyAutorefreshContext from 'src/plugins/proxy-autorefresh-context'

export default async ({ Vue, store, router }) => {
    Vue.use(ProxyAutorefreshContext, { store, router })
}
