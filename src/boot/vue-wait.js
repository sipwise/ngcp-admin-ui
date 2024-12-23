import { WAIT_PAGE } from 'src/constants'
import { createVueWait } from 'vue-wait'

export default ({ app, store }) => {
    app.config.globalProperties.$initWait = () => {
        const VueWait = createVueWait({
            useVuex: true,
            vuexModuleName: 'wait',
            registerDirective: true
        })
        app.use(VueWait)
    }
    app.config.globalProperties.$waitPage = ($wait) => {
        return $wait.is(WAIT_PAGE)
    }
}
