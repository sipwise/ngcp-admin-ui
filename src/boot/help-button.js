import { store } from 'src/boot/store'
import { configHelpButtonMap } from 'src/help-button-map'

export default async () => {
    initHelpButtonMap(store)
    store.watch(
        () => store.state.user?.platformInfo,
        () => initHelpButtonMap(store),
        { deep: true }
    )
}

function initHelpButtonMap (store) {
    if (store.state.user?.platformInfo) {
        const version = store.state.user.platformInfo.ngcp_version
        const typePath = store.state.user.platformInfo.type === 'sppro' ? 'pro' : 'ce'

        configHelpButtonMap({
            baseUrl: `${location.origin}/handbook/${typePath}/${version}`
        })
    }
}
