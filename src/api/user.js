import { apiGet, apiGetList } from 'src/api/ngcpAPI'

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
        // TODO: request a comment from @Hans-Peter why we are suppressing exceptions here
        return {}
    }
}

export async function getPlatformInfo () {
    return apiGet({
        resource: 'platforminfo'
    })
}
