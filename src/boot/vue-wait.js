import VueWait from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'

export default ({ Vue, app, store }) => {
    Vue.use(VueWait)
    app.wait = new VueWait({
        useVuex: true,
        vuexModuleName: 'wait',
        registerDirective: true
    })
    Vue.prototype.$waitPage = () => {
        return store.getters['wait/is'](WAIT_PAGE)
    }
}
