import saveAs from 'file-saver'
import _ from 'lodash'
import {
    apiDelete, apiDownloadFile, apiGet, apiGetList, apiPatchReplace, apiPost, apiPut, apiPutMinimal
} from 'src/api/ngcpAPI'
import { ajaxGet } from 'src/api/ngcpPanelAPI'

const minValue = 3
const generateSymbols = '!@#$%^&*()_+~`|}{[]:;?><,./-='
const generateNumbers = '0123456789'
const generateLowercase = 'abcdefghijklmnopqrstuvwxyz'
const generateUppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
const generateLength = 12
/**
 * TODO: temporary "ajax" implementation until the API will provide "Download CSV" implementation for customer Phonebook Entries
 */
export async function downloadPhonebookCSV (context, subscriberId = 0) {
    const config = {
        headers: {
            Accept: 'text/csv'
        }
    }
    const apiGetOptions = {
        resource: `v2/subscribers/${subscriberId}/phonebook`,
        config
    }
    const res = await apiGet(apiGetOptions)
    saveAs(new Blob([res.data], { type: 'text/csv' }), 'subscriber_phonebook.csv')
}

/**
 * TODO: temporary "deleteAction" for the DataTable until the API will have native implementation of deletion the CallthroughCLI
 */
export async function ajaxDeleteCallthroughCLI (context, options) {
    const id = options.resourceId
    const subscriberId = options.resourceDefaultFilters.subscriberId
    const deleteURL = `/subscriber/${subscriberId}/preferences/ccmappings/${id}/delete`
    try {
        await ajaxGet(deleteURL, { maxRedirects: 0 })
    } catch (e) {
        if (e?.response?.status === 404) {
            // suppressing auto-redirection error after deletion. Axios "maxRedirects: 0" doesn't work
        } else {
            throw e
        }
    }
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
    const apiGetOptions = {
        resource: 'voicemailgreetings',
        resourceId: id,
        config: {
            params: { format: 'wav' },
            responseType: 'blob'
        }
    }

    await apiDownloadFile({
        apiGetOptions,
        defaultFileName: fileName,
        defaultContentType: 'audio/x-wav'
    })
}

export async function loadReminder ({ commit }, subscriberId) {
    const res = await apiGetList({
        resource: 'reminders',
        params: {
            page: 1,
            rows: 1,
            subscriber_id: subscriberId
        }
    })
    commit('commitReminderData', res.items.pop() || null)
}

export async function updateReminder (context, payload) {
    if (payload?.id) {
        return apiPut({
            resource: 'reminders',
            resourceId: payload.id,
            data: payload
        })
    }
    return apiPost({
        resource: 'reminders',
        resourceId: payload.id,
        data: payload
    })
}

export async function createSubscriberLocationMapping ({ commit }, data) {
    return await apiPost({ resource: 'subscriberlocationmappings', data })
}

export async function createRegisteredDevice (_context, payload) {
    return apiPost({
        resource: 'subscriberregistrations',
        data: {
            subscriber_id: payload.subscriber_id,
            contact: payload.contactUri,
            q: payload.priority,
            socket: payload.outboundSocket,
            nat: payload.nat,
            expires: payload.expires
        }
    })
}

export async function createSubscriberTrustedSource ({ commit }, data) {
    return await apiPost({ resource: 'trustedsources', data })
}

/**
 * TODO: temporary "deleteAction" for the DataTable until the API will have native implementation of deletion the SpeedDial
 */
export async function ajaxDeleteSpeedDial (context, options) {
    const id = options.resourceId
    const subscriberId = options.resourceDefaultFilters.subscriberId
    const deleteURL = `/subscriber/${subscriberId}/preferences/speeddial/${id}/delete`
    try {
        await ajaxGet(deleteURL, { maxRedirects: 0 })
    } catch (e) {
        if (e?.response?.status === 404) {
            // suppressing auto-redirection error after deletion. Axios "maxRedirects: 0" doesn't work
        } else {
            throw e
        }
    }
}
export async function ajaxDeleteAutoAttendant (context, options) {
    const id = options.resourceId
    const subscriberId = options.resourceDefaultFilters.subscriberId
    const deleteURL = `/subscriber/${subscriberId}/preferences/autoattendant/${id}/delete`
    try {
        await ajaxGet(deleteURL, { maxRedirects: 0 })
    } catch (e) {
        if (e?.response?.status === 404) {
            // suppressing auto-redirection error after deletion. Axios "maxRedirects: 0" doesn't work
        } else {
            throw e
        }
    }
}

export async function updateSubscriberLocationMapping (context, payload) {
    const params = {}
    if (payload.subscriber_id) {
        params.subscriber_id = payload.subscriber_id
    }
    await apiPutMinimal({
        resource: 'subscriberlocationmappings',
        resourceId: payload.id,
        data: payload,
        config: {
            params
        }
    })
}

export async function updateSubscriberTrustedSource (context, payload) {
    const params = {}
    if (payload.subscriber_id) {
        params.subscriber_id = payload.subscriber_id
    }
    await apiPutMinimal({
        resource: 'trustedsources',
        resourceId: payload.id,
        data: payload,
        config: {
            params
        }
    })
}

export async function updateSubscriberCCmappings (context, payload) {
    await apiPutMinimal({
        resource: 'ccmapentries',
        resourceId: payload.subscriber_id,
        data: payload
    })
}

export async function updateFaxServerSettings (context, payload) {
    await apiPutMinimal({
        resource: 'faxserversettings',
        resourceId: payload.id,
        data: payload
    })
}

export async function updateMailToFaxSettings (context, payload) {
    await apiPutMinimal({
        resource: 'mailtofaxsettings',
        resourceId: payload.id,
        data: payload
    })
}

export async function apiDownloadvoicemailRecording (context, voicemailId = 0) {
    const apiGetOptions = {
        resource: 'voicemailrecordings',
        resourceId: voicemailId,
        config: {
            responseType: 'blob'
        }
    }

    await apiDownloadFile({
        apiGetOptions,
        defaultFileName: `voicemail-${voicemailId}.wav`,
        defaultContentType: 'audio/x-wav'
    })
}

export async function loadSpeedDials ({ commit }, subscriberId) {
    const res = await apiGet({
        resource: 'speeddials',
        resourceId: subscriberId
    })
    commit('commitSpeedDials', res?.data.speeddials || null)
}

export async function updateSubscriberSpeedDials (context, payload) {
    await apiPutMinimal({
        resource: 'speeddials',
        resourceId: payload.subscriber_id,
        data: payload.data
    })
}
export async function loadOutboundSocket ({ commit }) {
    const res = await apiGet({
        resource: 'peeringserverpreferencedefs'
    })
    commit('commitOutboundSockets', res?.data.outbound_socket.enum_values || null)
}
export async function updateSubscriberAutoAttendant (context, payload) {
    await apiPutMinimal({
        resource: 'autoattendants',
        resourceId: payload.subscriber_id,
        data: payload.data
    })
}
export async function createSourceSet ({ commit }, data) {
    return apiPost({ resource: 'cfsourcesets', data })
}
export async function updateSourceSet (context, payload) {
    await apiPutMinimal({
        resource: 'cfsourcesets',
        resourceId: payload.id,
        data: payload
    })
}
export async function createBNumberSet ({ commit }, data) {
    return apiPost({ resource: 'cfbnumbersets', data })
}
export async function updateBNumberSet (context, payload) {
    await apiPutMinimal({
        resource: 'cfbnumbersets',
        resourceId: payload.id,
        data: payload
    })
}
export async function createDestinationSet ({ commit }, data) {
    data.destinations.forEach((destination) => {
        if (destination.destination === 'uri') {
            destination.destination = destination.simple_destination
        }
    })
    return apiPost({ resource: 'cfdestinationsets', data })
}
export async function updateDestinationSet (context, payload) {
    payload.destinations.forEach((destination) => {
        if (destination.destination === 'uri') {
            destination.destination = destination.simple_destination
        }
    })
    await apiPutMinimal({
        resource: 'cfdestinationsets',
        resourceId: payload.id,
        data: payload
    })
}
export async function createTimeSet ({ commit }, data) {
    const processTimeFields = (time, startField, endField, newField) => {
        if (time[startField] && time[endField]) {
            time[newField] = `${time[startField]}-${time[endField]}`
        } else if (time[startField]) {
            time[newField] = time[startField]
        } else if (time[endField]) {
            time[newField] = null
        }
        delete time[startField]
        delete time[endField]
    }
    data.times.forEach((time) => {
        processTimeFields(time, 'startMonth', 'endMonth', 'month')
        processTimeFields(time, 'startYear', 'endYear', 'year')
        processTimeFields(time, 'startDay', 'endDay', 'mday')
        processTimeFields(time, 'startWDay', 'endWDay', 'wday')
        processTimeFields(time, 'startHour', 'endHour', 'hour')
        processTimeFields(time, 'startMinute', 'endMinute', 'minute')
    })
    return apiPost({ resource: 'cftimesets', data })
}
export async function updateTimeSet (context, data) {
    const processTimeFields = (time, startField, endField, newField) => {
        if (time[startField] && time[endField]) {
            time[newField] = `${time[startField]}-${time[endField]}`
        } else if (time[startField]) {
            time[newField] = time[startField]
        } else if (time[endField]) {
            time[newField] = null
        }
        delete time[startField]
        delete time[endField]
    }
    data.times.forEach((time) => {
        processTimeFields(time, 'startMonth', 'endMonth', 'month')
        processTimeFields(time, 'startYear', 'endYear', 'year')
        processTimeFields(time, 'startDay', 'endDay', 'mday')
        processTimeFields(time, 'startWDay', 'endWDay', 'wday')
        processTimeFields(time, 'startHour', 'endHour', 'hour')
        processTimeFields(time, 'startMinute', 'endMinute', 'minute')
    })
    return apiPutMinimal({
        resource: 'cftimesets',
        resourceId: data.id,
        data
    })
}
export async function updateMapping (context, payload) {
    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.id,
        data: payload
    })
}
async function getSubscriberGroupMemberIds (subscriberId) {
    const res = await apiGet({
        resource: 'subscribers',
        resourceId: subscriberId
    })
    return res.data.pbx_groupmember_ids
}

async function updateGroupMemberIds (subscriberId, groupMemberIds) {
    return apiPatchReplace({
        resource: 'subscribers',
        resourceId: subscriberId,
        field: 'pbx_groupmember_ids',
        value: groupMemberIds
    })
}

function moveElement (array, fromIndex, toIndex) {
    const element = array[fromIndex]
    array.splice(fromIndex, 1)
    array.splice(toIndex, 0, element)
}

export async function moveGroupMember ({ commit }, { groupMemberId, subscriberId, direction }) {
    const groupMemberIds = await getSubscriberGroupMemberIds(subscriberId)
    const index = groupMemberIds.indexOf(groupMemberId)

    if (index === -1) {
        return
    }

    if (direction === 'up' && index > 0) {
        moveElement(groupMemberIds, index, index - 1)
    } else if (direction === 'down' && index < groupMemberIds.length - 1) {
        moveElement(groupMemberIds, index, index + 1)
    }

    return updateGroupMemberIds(subscriberId, groupMemberIds)
}

export async function moveGroupMemberUp ({ commit }, { groupMemberId, subscriberId }) {
    return moveGroupMember({ commit }, { groupMemberId, subscriberId, direction: 'up' })
}

export async function moveGroupMemberDown ({ commit }, { groupMemberId, subscriberId }) {
    return moveGroupMember({ commit }, { groupMemberId, subscriberId, direction: 'down' })
}

export async function generateGeneralPassword () {
    const getRandomValues = (buf) => crypto.getRandomValues(buf)
    const getRandomInt = (max) => {
        const randomBuffer = new Uint32Array(1)
        getRandomValues(randomBuffer)
        return Math.floor(randomBuffer[0] / (0xFFFFFFFF + 1) * max)
    }
    const getRandomChar = (charset) => charset[getRandomInt(charset.length)]

    const charGroups = [
        generateNumbers,
        generateLowercase,
        generateUppercase,
        generateSymbols
    ]

    let password = charGroups.flatMap((group) =>
        Array.from({ length: minValue }, () => getRandomChar(group))
    ).join('')

    while (password.length < generateLength) {
        const allChars = charGroups.join('')
        password += getRandomChar(allChars)
    }

    password = password.split('').sort(() => getRandomInt(2) - 0.5).join('')

    return password
}
