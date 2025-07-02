import { WAIT_PAGE } from 'src/constants'
import { createVueWait } from 'vue-wait'

export default ({ app }) => {
    const VueWait = createVueWait({
        useVuex: true,
        vuexModuleName: 'wait',
        registerDirective: true
    })
    app.use(VueWait)

    // Add helper methods to global properties
    app.config.globalProperties.$waitPage = ($wait) => {
        return $wait.is(WAIT_PAGE)
    }
}
