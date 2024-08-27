import { apiPost, apiPut, apiGet } from 'src/api/ngcpAPI'
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
