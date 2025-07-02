import { store } from 'src/boot/store'
import { configHelpButtonMap } from 'src/help-button-map'

export default async () => {
    store.watch(
        () => store.state.user?.platformInfo,
        () => initHelpButtonMap(store),
        {
            deep: true
        }
    )
}

function initHelpButtonMap (store) {
    if (store.state.user?.platformInfo) {
        const baseUrl = 'https://www.sipwise.com/doc'
        const version = store.state.user.platformInfo.ngcp_version
        let versionPath = version

        // Todo: Get current release version from the single source of truth
        // Workaround for development and review
        const latestRelease = 'mr10.3.1'
        if (version === 'trunk') {
            versionPath = latestRelease
        }

        let typePath = 'spce/ce'
        if (store.state.user.platformInfo.type === 'sppro') {
            typePath = 'sppro/pro'
        }
        configHelpButtonMap({
            baseUrl: `${baseUrl}/${versionPath}/${typePath}/${versionPath}`
        })
    }
}
