import { ajaxDownloadCsv } from 'src/api/ngcpPanelAPI'
import { apiDelete, apiGet, apiGetList, apiPost, apiPut } from 'src/api/ngcpAPI'
import saveAs from 'file-saver'
import _ from 'lodash'

/**
 * TODO: temporary "ajax" implementation until the API will provide "Download CSV" implementation for customer Phonebook Entries
 */
export async function ajaxDownloadPhonebookCSV (context, subscriberId = 0) {
    await ajaxDownloadCsv({
        url: `/subscriber/${subscriberId}/phonebook_download_csv`,
        defaultFileName: 'subscriber_phonebook_entries.csv'
    })
}

export async function loadVoicemailSettings ({ commit }, subscriberId) {
    const res = await apiGet({
        resource: 'voicemailsettings',
        resourceId: subscriberId
    })
    commit('commitVoicemailSettings', res?.data || null)
}

export async function updateVoicemailSettings (context, payload) {
    return apiPut({
        resource: 'voicemailsettings',
        resourceId: payload.id,
        data: payload
    })
}

export async function loadVoicemailGreetings ({ commit }, subscriberId) {
    const res = await apiGetList({
        resource: 'voicemailgreetings',
        params: {
            subscriber_id: subscriberId
        }
    })
    commit('commitVoicemailGreetings', res?.items || [])
}

export async function loadVoicemailGreetingFile ({ commit }, options) {
    const res = await apiGet({
        resource: 'voicemailgreetings',
        resourceId: options.id,
        config: {
            params: { format: options.format },
            responseType: 'blob'
        }
    })
    return URL.createObjectURL(res.data)
}

export async function deleteVoicemailGreeting ({ commit }, greetingId) {
    await apiDelete({
        resource: 'voicemailgreetings',
        resourceId: greetingId
    })
}

export async function createNewGreeting ({ commit }, { formData, onProgress, cancelToken }) {
    await apiPost({
        resource: 'voicemailgreetings',
        data: formData,
        config: {
            cancelToken,
            onUploadProgress (e) {
                if (e.lengthComputable) {
                    if (typeof onProgress === 'function') {
                        onProgress(Math.ceil((e.loaded / e.total) * 100))
                    }
                }
            }
        }
    })
}

export async function getVoicemailGreetingByType ({ commit }, { subscriberId, type }) {
    const res = await apiGetList({
        resource: 'voicemailgreetings',
        params: {
            subscriber_id: subscriberId,
            type
        }
    })
    return res
}

export async function uploadVoicemailGreeting ({ commit, dispatch }, options) {
    const formData = new FormData()
    const fields = _.clone(options.data)
    fields.dir = fields.type
    delete fields.type
    delete fields.file
    const json = JSON.stringify(fields)
    formData.append('json', json)
    if (options.data.file) {
        formData.append('greetingfile', options.data.file)
    }
    let greetingId = options.data.id
    if (!greetingId) {
        const greetings = await dispatch('getVoicemailGreetingByType', {
            subscriberId: options.data.subscriber_id,
            dir: options.data.type
        })

        if (_.some(greetings.items, { dir: options.data.type })) {
            greetingId = greetings.items[0].id
        }
    }
    if (greetingId) {
        await dispatch('deleteVoicemailGreeting', greetingId)
    }

    await dispatch('createNewGreeting', { formData, onProgress: options.onProgress, cancelToken: options.cancelToken })
}

export async function downloadVoicemailGreetingFile ({ commit }, { id, type, fileName }) {
    const res = await apiGet({
        resource: 'voicemailgreetings',
        resourceId: id,
        config: {
            params: { format: 'wav' },
            responseType: 'blob'
        }
    })
    saveAs(new Blob([res.data], { type: res.headers['content-type'] || 'audio/x-wav' }), fileName)
}
