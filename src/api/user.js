import { apiGetList } from 'src/api/ngcpAPI'

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
        return {}
    }
}
