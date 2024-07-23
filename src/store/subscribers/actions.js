import { ajaxDownloadCsv, ajaxGet } from 'src/api/ngcpPanelAPI'
import { apiDelete, apiGet, apiGetList, apiPost, apiPut, apiPutMinimal, apiDownloadFile, apiPatchReplace } from 'src/api/ngcpAPI'
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
    } else {
        return apiPost({
            resource: 'reminders',
            resourceId: payload.id,
            data: payload
        })
    }
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
            params: params
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
            params: params
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
export async function createSubscriberHeaderRule ({ commit }, data) {
    return await apiPost({ resource: 'headerrules', data })
}
export async function updateSubscriberHeaderRule (context, payload) {
    await apiPut({
        resource: 'headerrules',
        resourceId: payload.id,
        data: payload
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
    data.destinations.forEach(destination => {
        if (destination.destination === 'uri') {
            destination.destination = destination.simple_destination
        }
    })
    return apiPost({ resource: 'cfdestinationsets', data })
}
export async function updateDestinationSet (context, payload) {
    payload.destinations.forEach(destination => {
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
    data.times.forEach(time => {
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
    data.times.forEach(time => {
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
        data: data
    })
}
export async function loadDestinationSet ({ commit }, subscriberId) {
    const res = await apiGet({
        resource: 'cfdestinationsets',
        config: {
            params: { subscriber_id: subscriberId }
        }
    })
    commit('commitDestinationSet', res?.data.items || null)
}
export async function loadTimeSet ({ commit }, subscriberId) {
    const res = await apiGet({
        resource: 'cftimesets',
        config: {
            params: { subscriber_id: subscriberId }
        }
    })
    commit('commitTimeSet', res?.data.items || null)
}
export async function loadSourceSet ({ commit }, subscriberId) {
    const res = await apiGet({
        resource: 'cfsourcesets',
        config: {
            params: { subscriber_id: subscriberId }
        }
    })
    commit('commitSourceSet', res?.data.items || null)
}
export async function loadBNumberSet ({ commit }, subscriberId) {
    const res = await apiGet({
        resource: 'cfbnumbersets',
        config: {
            params: { subscriber_id: subscriberId }
        }
    })
    commit('commitBNumberSet', res?.data.items || null)
}
export async function loadMapping ({ commit }, subscriberId) {
    const res = await apiGet({
        resource: 'cfmappings',
        resourceId: subscriberId
    })
    await commit('commitMappings', res?.data)
    return res
}
export async function updateCfU (context, payload) {
    const cfu = await Promise.all(payload.cfu.map(async (item) => {
        const [destinationsData, timeData, sourceData, bNumberData] = await Promise.all([
            processDestinationSet(item, payload.subscriber_id),
            processTimeSet(item, payload.subscriber_id),
            processSourceSet(item, payload.subscriber_id),
            processBNumberSet(item, payload.subscriber_id)
        ])

        return {
            enabled: item.enabled,
            use_redirection: item.use_redirection,
            ...destinationsData,
            ...timeData,
            ...sourceData,
            ...bNumberData
        }
    }))

    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: {
            ...payload,
            cfu
        }
    })
}
export async function processDestinationSet (obj, subscriberId) {
    if (obj.destinationset_id === 'none') {
        const response = await apiPost({
            resource: 'cfdestinationsets',
            data: {
                name: obj.destinationset,
                destinations: obj.destinations.map(item => {
                    if (item.destination === 'uri') {
                        item.destination = item.simple_destination
                    }
                    return item
                }),
                subscriber_id: subscriberId
            }
        })

        return {
            destinations: response.data.destinations,
            destinationset_id: response.data.id,
            destinationset: response.data.name
        }
    }

    const existingDestinationSet = await apiGet({
        resource: 'cfdestinationsets',
        resourceId: obj.destinationset_id,
        config: {
            params: { subscriber_id: subscriberId }
        }
    })

    return {
        destinations: existingDestinationSet.data.destinations,
        destinationset_id: existingDestinationSet.data.id,
        destinationset: existingDestinationSet.data.name
    }
}
export async function processTimeSet (obj, subscriberId) {
    if (obj.timeset_id === 'none') {
        const response = await createTimeSet({}, {
            name: obj.timeset,
            times: obj.times.map((item) => item),
            subscriber_id: subscriberId
        })

        return {
            times: response.data.times,
            timeset: response.data.name,
            timeset_id: response.data.id
        }
    }

    if (obj.timeset_id === null) {
        return {
            times: obj.times,
            timeset: obj.timeset,
            timeset_id: obj.timeset_id
        }
    }

    const existingTimeSet = await apiGet({
        resource: 'cftimesets',
        resourceId: obj.timeset_id,
        config: {
            params: { subscriber_id: subscriberId }
        }
    })

    return {
        times: existingTimeSet.data.times,
        timeset: existingTimeSet.data.name,
        timeset_id: existingTimeSet.data.id
    }
}
export async function processSourceSet (obj, subscriberId) {
    if (obj.sourceset_id === 'none') {
        const response = await createSourceSet({}, {
            name: obj.sourceset,
            is_regex: obj.is_regex_sourceset,
            mode: obj.mode_sourceset,
            sources: obj.sources.map((item) => item),
            subscriber_id: subscriberId
        })

        return {
            sourceset_id: response.data.id,
            sourceset: response.data.name,
            is_regex_sourceset: response.data.is_regex,
            mode_sourceset: response.data.mode,
            sources: response.data.sources
        }
    }

    if (obj.sourceset_id === null) {
        return {
            sourceset_id: obj.sourceset_id,
            sourceset: obj.sourceset,
            is_regex_sourceset: obj.is_regex_sourceset,
            mode_sourceset: obj.mode_sourceset,
            sources: obj.sources
        }
    }

    const existingSourceSet = await apiGet({
        resource: 'cfsourcesets',
        resourceId: obj.sourceset_id,
        config: {
            params: { subscriber_id: subscriberId }
        }
    })

    return {
        sourceset_id: existingSourceSet.data.id,
        sourceset: existingSourceSet.data.name,
        is_regex_sourceset: existingSourceSet.data.is_regex,
        mode_sourceset: existingSourceSet.data.mode,
        sources: existingSourceSet.data.sources
    }
}
export async function processBNumberSet (obj, subscriberId) {
    if (obj.bnumberset_id === 'none') {
        const response = await createBNumberSet({}, {
            name: obj.bnumberset,
            is_regex: obj.is_regex_bnumberset,
            mode: obj.mode_bnumberset,
            bnumbers: obj.bnumbers.map((item) => item),
            subscriber_id: subscriberId
        })

        return {
            bnumbers: response.data.bnumbers,
            bnumberset: response.data.name,
            bnumberset_id: response.data.id,
            is_regex_bnumberset: response.data.is_regex,
            mode_bnumberset: response.data.mode
        }
    }

    if (obj.bnumberset_id === null) {
        return {
            bnumbers: obj.bnumbers,
            bnumberset: obj.bnumberset,
            bnumberset_id: obj.id,
            is_regex_bnumberset: obj.bnumberset_id,
            mode_bnumberset: obj.mode_bnumberset
        }
    }

    const existingBNumberSets = await apiGet({
        resource: 'cfbnumbersets',
        resourceId: obj.bnumberset_id,
        config: {
            params: { subscriber_id: subscriberId }
        }
    })

    return {
        bnumbers: existingBNumberSets.data.bnumbers,
        bnumberset: existingBNumberSets.data.name,
        bnumberset_id: existingBNumberSets.data.id,
        is_regex_bnumberset: existingBNumberSets.data.is_regex,
        mode_bnumberset: existingBNumberSets.data.mode
    }
}
export async function updateCfB (context, payload) {
    const cfb = await processCFItems(payload.cfb, payload.subscriber_id)

    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: {
            ...payload,
            cfb
        }
    })
}
export async function updateCfNA (context, payload) {
    const cfna = await processCFItems(payload.cfna, payload.subscriber_id)

    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: {
            ...payload,
            cfna
        }
    })
}
export async function updateCfS (context, payload) {
    const cfs = await processCFItems(payload.cfs, payload.subscriber_id)

    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: {
            ...payload,
            cfs
        }
    })
}
export async function updateCfR (context, payload) {
    const cfr = await processCFItems(payload.cfr, payload.subscriber_id)

    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: {
            ...payload,
            cfr
        }
    })
}
export async function updateCfO (context, payload) {
    const cfo = await processCFItems(payload.cfr, payload.subscriber_id)

    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: {
            ...payload,
            cfo
        }
    })
}
export async function updateCfT (context, payload) {
    const cft = await processCFItems(payload.cft, payload.subscriber_id)

    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: {
            ...payload,
            cft
        }
    })
}
async function processCFItems (obj, subscriberId) {
    return Promise.all(obj.map(async (item) => {
        const [destinationsData, timeData, sourceData, bNumberData] = await Promise.all([
            processDestinationSet(item, subscriberId),
            processTimeSet(item, subscriberId),
            processSourceSet(item, subscriberId),
            processBNumberSet(item, subscriberId)
        ])

        return {
            enabled: item.enabled,
            use_redirection: item.use_redirection,
            ...destinationsData,
            ...timeData,
            ...sourceData,
            ...bNumberData
        }
    }))
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

    if (index === -1) return

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
