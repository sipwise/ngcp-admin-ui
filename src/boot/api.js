import appConfig from 'src/config/app'
import { initAPI } from 'src/api/ngcpAPI'
import { initPanelAPI } from 'src/api/ngcpPanelAPI'
import { i18n } from 'boot/i18n'

export default async ({ store }) => {
    async function doLogout () {
        await store.dispatch('user/logout')
    }

    function getLogoutMessage () {
        return i18n.global.tc('Your session has expired. Please log in again.')
    }

    initAPI({
        baseURL: appConfig.ngcpApiUrl,
        logoutFunc: doLogout,
        getLogoutMessage
    })
    initPanelAPI({
        baseURL: appConfig.ngcpPanelUrl,
        logoutFunc: doLogout,
        getLogoutMessage
    })
}
