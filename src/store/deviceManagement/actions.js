import { apiPost, apiPut, apiGet, apiDownloadFile } from 'src/api/ngcpAPI'
import { createEmptyTxtFile } from 'src/helpers/file'

export async function createDeviceModel ({ commit }, payload) {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    const formData = formDataPayload(payload)
    return await apiPost({
        resource: 'pbxdevicemodels',
        data: formData,
        config: config
    })
}
function formDataPayload (payload) {
    const formData = new FormData()
    const keys = ['front_image', 'mac_image', 'front_thumbnail']
    keys.forEach(key => {
        if (!payload[key]) {
            payload[key] = createEmptyTxtFile()
        }
        formData.append(key, payload[key])
    })

    formData.append('json', JSON.stringify(payload))

    return formData
}
export async function getDeviceModelImage (data) {
    const response = await apiGet({
        resource: 'pbxdevicemodelimages',
        resourceId: data.id,
        config: {
            responseType: 'blob'
        }
    })
    return URL.createObjectURL(response.data)
}
export async function addNewPreference ({ commit }, data) {
    data.payload.max_occur = data.payload.max_occur === false ? 0 : 1
    return await apiPost({
        resource: 'preferencesmetaentries',
        data: data.payload
    })
}
export async function fetchDeviceModel (context, payload) {
    const result = {
        front_image: null,
        front_thumb: null,
        front_mac: null
    }
    const types = ['front_mac', 'front_thumb', 'front_image']
    const logoDatas = {
        resource: 'pbxdevicemodelimages',
        resourceId: payload.id,
        config: {
            responseType: 'blob'
        }
    }
    const logoRequests = types.map(type => {
        const dataWithType = {
            ...logoDatas,
            config: {
                ...logoDatas.config,
                params: {
                    type: type
                }
            }
        }
        return apiGet(dataWithType)
    })
    try {
        const [logoResponses] = await Promise.allSettled([Promise.allSettled(logoRequests)])
        if (logoResponses.status === 'fulfilled') {
            logoResponses.value.forEach((response, index) => {
                if (response.status === 'fulfilled') {
                    result[types[index]] = new File([response.value.data], types[index])
                }
            })
        }
    } finally {
        context.commit('storeDeviceModelImages', result)
    }
}
export async function updateDeviceModel ({ state }, payload) {
    const resource = 'pbxdevicemodels'
    const formData = new FormData()
    const { data } = payload
    const fileFields = [
        { key: 'front_image', formKey: 'front_image' },
        { key: 'front_mac', formKey: 'mac_image' },
        { key: 'front_thumbnail', formKey: 'front_thumbnail' }
    ]

    fileFields.forEach(({ key, formKey }) => {
        formData.append(formKey, data[key] || createEmptyTxtFile())
    })

    formData.append('json', JSON.stringify(data))

    const apiDatas = {
        resource: resource,
        resourceId: payload.id,
        data: formData
    }

    return await apiPut(apiDatas)
}
export async function createDeviceFirmware ({ commit }, payload) {
    console.log(payload)
    const blobData = new Blob([payload.filename], { type: 'application/octet-stream' })
    const config = {
        headers: {
            Accept: 'application/octet-stream',
            'Content-Type': 'application/octet-stream'
        },
        params: {
            device_id: payload.device_id,
            version: payload.version,
            tag: payload.tag,
            filename: payload.filename.name
        }
    }
    return await apiPost({
        resource: 'pbxdevicefirmwares',
        data: blobData,
        config: config
    })
}
export async function apiDownloadFirmwareFile ({ commit }, data) {
    const apiGetOptions = {
        resource: 'pbxdevicefirmwarebinaries',
        resourceId: data.id,
        config: {
            responseType: 'blob',
            headers: {
                Accept: 'application/json'
            }
        }
    }

    await apiDownloadFile({
        apiGetOptions,
        defaultFileName: data.filename,
        defaultContentType: 'application/octet-stream'
    })
}
export async function updateDeviceFirmware ({ commit }, { id, data }) {
    // eslint-disable-next-line camelcase
    const { filename, firmwareFile, device_id, version, tag } = data
    const isFileObject = typeof filename === 'object'
    const blobData = new Blob([isFileObject ? filename : firmwareFile], { type: 'application/octet-stream' })
    const config = {
        headers: {
            Accept: 'application/octet-stream',
            'Content-Type': 'application/octet-stream'
        },
        params: {
            device_id,
            version,
            tag,
            filename: isFileObject ? filename.name : filename
        }
    }

    return await apiPut({
        resource: 'pbxdevicefirmwares',
        resourceId: id,
        data: blobData,
        config
    })
}
export async function getFirmwareFile ({ commit }, id) {
    const response = await apiGet({
        resource: 'pbxdevicefirmwarebinaries',
        resourceId: id,
        config: {
            responseType: 'blob'
        }
    })
    return new File([response.data], 'File', { type: 'application/octet-stream' })
}
export async function createDeviceConfiguration ({ commit }, payload) {
    const config = {
        headers: {
            'Content-Type': payload.content_type
        },
        params: {
            device_id: payload.device_id,
            version: payload.version
        }
    }
    return await apiPost({
        resource: 'pbxdeviceconfigs',
        data: payload.content,
        config: config
    })
}
export async function getDeviceConfigfiles ({ commit }, payload) {
    const res = await apiGet({
        resource: 'pbxdeviceconfigfiles',
        resourceId: payload.id
    })
    commit('storeContentConfiguration', res?.data || null)
}
export async function updateDeviceConfiguration ({ commit }, payload) {
    const data = payload.data
    const config = {
        headers: {
            'Content-Type': data.content_type
        },
        params: {
            device_id: data.device_id,
            version: data.version
        }
    }
    return await apiPut({
        resource: 'pbxdeviceconfigs',
        resourceId: payload.id,
        data: data.content,
        config: config
    })
}
export async function apiDownloadConfigurationFile ({ commit }, data) {
    const apiGetOptions = {
        resource: 'pbxdeviceconfigfiles',
        resourceId: data.id
    }

    await apiDownloadFile({
        apiGetOptions
    })
}
export async function createDeviceProfile ({ commit }, payload) {
    return await apiPost({
        resource: 'pbxdeviceprofiles',
        data: payload
    })
}
export async function updateDeviceProfile ({ commit }, payload) {
    return await apiPut({
        resource: 'pbxdeviceprofiles',
        resourceId: payload.id,
        data: payload.data
    })
}
