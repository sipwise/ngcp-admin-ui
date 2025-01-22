import { i18n } from 'boot/i18n'
import { initAPI } from 'src/api/ngcpAPI'
import { initPanelAPI } from 'src/api/ngcpPanelAPI'
import appConfig from 'src/config/app'

export default async ({ store }) => {
    async function doLogout () {
        await store.dispatch('user/logout')
    }

    function getLogoutMessage () {
        return i18n.global.t('Your session has expired. Please log in again.')
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
