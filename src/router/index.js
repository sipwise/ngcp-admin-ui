import { createRouter, createWebHashHistory } from 'vue-router'

import routes from './routes'

export default function (/* { store, ssrContext } */) {
    const Router = createRouter({
        scrollBehavior: () => ({ left: 0, top: 0 }),
        routes,

        // Leave this as is and make changes in quasar.config.js instead!
        // quasar.config.js -> build -> vueRouterMode
        // quasar.config.js -> build -> publicPath
        history: createWebHashHistory()
    })

    return Router
}
