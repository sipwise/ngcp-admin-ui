import appConfig from 'src/config/app'
import { initAPI } from 'src/api/ngcpAPI'
import { initPanelAPI } from 'src/api/ngcpPanelAPI'

export default async ({ Vue, store }) => {
    function doLogout () {
        store.dispatch('user/logout')
    }

    initAPI({
        baseURL: appConfig.ngcpApiUrl,
        logoutFunc: doLogout
    })
    initPanelAPI({
        baseURL: appConfig.ngcpPanelUrl,
        logoutFunc: doLogout
    })
}
