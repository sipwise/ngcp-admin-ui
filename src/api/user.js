import { apiGet, apiGetList } from 'src/api/ngcpAPI'
import { markErrorAsHandled } from 'src/helpers/errorHandling'

export async function getCapabilities () {
    const capabilities = {}
    const res = await apiGetList({
        resource: 'capabilities'
    })
    res.items.forEach((item) => {
        capabilities[item.name] = item.enabled
    })
    return capabilities
}

export async function getCapabilitiesWithoutError () {
    try {
        return await getCapabilities()
    } catch (err) {
        if (err?.response?.status === 403) {
            markErrorAsHandled(err, '403 suppressed')
            return {}
        }
        throw err
    }
}

export async function getPlatformInfo () {
    const res = await apiGet({
        resource: 'platforminfo'
    })
    return res.data
}
