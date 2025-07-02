import routes from 'src/router/routes'
import { createRouter, createWebHashHistory } from 'vue-router'

/*
Our router setup is done in a boot file (/boot/router.js),
which is automatically loaded by Quasar when the app starts.
Here we are exporting the actual router instead of the function that returns
the router (SSR pattern) so that you can import and use the router singleton
anywhere in the code.
*/

const router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    // Leave this as is and make changes in quasar.config.js instead!
    // quasar.config.js -> build -> vueRouterMode
    // quasar.config.js -> build -> publicPath
    history: createWebHashHistory()
})

export default router
