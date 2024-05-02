import { ajaxDownloadCsv, ajaxGet } from 'src/api/ngcpPanelAPI'
import { apiDelete, apiGet, apiGetList, apiPost, apiPut, apiPutMinimal, apiDownloadFile } from 'src/api/ngcpAPI'
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
    const [res, resTimeSet, resSourceSet, resBNumberSet] = await Promise.all([
        extractDestinations(payload, 'cfu'),
        extractTimeSet(payload, 'cfu'),
        extractSourceSet(payload, 'cfu'),
        extractBNumberSet(payload, 'cfu')
    ])

    function updateSetId (pItem, resultSet, setProperty, setIdProperty) {
        const matchingResItem = resultSet.lastItems.find(rItem => rItem.name === pItem[setProperty])
        if (matchingResItem && pItem[setIdProperty] === 'none') {
            pItem[setIdProperty] = matchingResItem.id
        }
    }

    payload.cfu.forEach(pItem => {
        updateSetId(pItem, res, 'destinationset', 'destinationset_id')
        updateSetId(pItem, resTimeSet, 'timeset', 'timeset_id')
        updateSetId(pItem, resSourceSet, 'sourceset', 'sourceset_id')
        updateSetId(pItem, resBNumberSet, 'bnumberset', 'bnumberset_id')
    })
    await new Promise(resolve => setTimeout(resolve, 1000))
    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: payload
    })
}
export async function extractDestinations (data, filterKey) {
    const result = data[filterKey].filter(item => item.destinationset_id === 'none')
        .map(item => ({
            name: item.destinationset,
            destinations: item.destinations.map(d => {
                if (d.destination === 'uri') {
                    d.destination = d.simple_destination
                }
                return d
            }),
            subscriber_id: data.subscriber_id
        }))
    const size = result.length
    for (const item of result) {
        await apiPost({ resource: 'cfdestinationsets', data: item })
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
    const res = await apiGet({
        resource: 'cfdestinationsets',
        config: {
            params: { subscriber_id: data.subscriber_id }
        }
    })
    const itemsLength = res.data.items.length
    const lastItems = res.data.items.slice(itemsLength - size, itemsLength)
    const lastItemsObject = {
        lastItems: lastItems
    }
    return lastItemsObject
}
export async function extractTimeSet (data, filterKey) {
    const result = data[filterKey].filter(item => item.timeset_id === 'none')
        .map(item => ({
            name: item.timeset,
            times: item.times.map(d => {
                return d
            }),
            subscriber_id: data.subscriber_id
        }))
    const size = result.length
    for (const item of result) {
        await createTimeSet({}, item)
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
    const res = await apiGet({
        resource: 'cftimesets',
        config: {
            params: { subscriber_id: data.subscriber_id }
        }
    })
    const itemsLength = res.data.items.length
    const lastItems = res.data.items.slice(itemsLength - size, itemsLength)
    const lastItemsObject = {
        lastItems: lastItems
    }
    return lastItemsObject
}
export async function extractSourceSet (data, filterKey) {
    const result = data[filterKey].filter(item => item.sourceset_id === 'none')
        .map(item => ({
            name: item.sourceset,
            is_regex: item.is_regex_sourceset,
            mode: item.mode_sourceset,
            sources: item.sources.map(d => {
                return d
            }),
            subscriber_id: data.subscriber_id
        }))
    const size = result.length
    for (const item of result) {
        await createSourceSet({}, item)
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
    const res = await apiGet({
        resource: 'cfsourcesets',
        config: {
            params: { subscriber_id: data.subscriber_id }
        }
    })
    const itemsLength = res.data.items.length
    const lastItems = res.data.items.slice(itemsLength - size, itemsLength)
    const lastItemsObject = {
        lastItems: lastItems
    }
    return lastItemsObject
}
export async function extractBNumberSet (data, filterKey) {
    const result = data[filterKey].filter(item => item.bnumberset_id === 'none')
        .map(item => ({
            name: item.bnumberset,
            is_regex: item.is_regex_bnumberset,
            mode: item.mode_bnumberset,
            bnumbers: item.bnumbers.map(d => {
                return d
            }),
            subscriber_id: data.subscriber_id
        }))
    const size = result.length
    for (const item of result) {
        await createBNumberSet({}, item)
        await new Promise(resolve => setTimeout(resolve, 1000))
    }
    const res = await apiGet({
        resource: 'cfbnumbersets',
        config: {
            params: { subscriber_id: data.subscriber_id }
        }
    })
    const itemsLength = res.data.items.length
    const lastItems = res.data.items.slice(itemsLength - size, itemsLength)
    const lastItemsObject = {
        lastItems: lastItems
    }
    return lastItemsObject
}
export async function updateCfB (context, payload) {
    const [res, resTimeSet, resSourceSet, resBNumberSet] = await Promise.all([
        extractDestinations(payload, 'cfb'),
        extractTimeSet(payload, 'cfb'),
        extractSourceSet(payload, 'cfb'),
        extractBNumberSet(payload, 'cfb')
    ])

    function updateSetId (pItem, resultSet, setProperty, setIdProperty) {
        const matchingResItem = resultSet.lastItems.find(rItem => rItem.name === pItem[setProperty])
        if (matchingResItem && pItem[setIdProperty] === 'none') {
            pItem[setIdProperty] = matchingResItem.id
        }
    }

    payload.cfb.forEach(pItem => {
        updateSetId(pItem, res, 'destinationset', 'destinationset_id')
        updateSetId(pItem, resTimeSet, 'timeset', 'timeset_id')
        updateSetId(pItem, resSourceSet, 'sourceset', 'sourceset_id')
        updateSetId(pItem, resBNumberSet, 'bnumberset', 'bnumberset_id')
    })
    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: payload
    })
}
export async function updateCfNA (context, payload) {
    const [res, resTimeSet, resSourceSet, resBNumberSet] = await Promise.all([
        extractDestinations(payload, 'cfna'),
        extractTimeSet(payload, 'cfna'),
        extractSourceSet(payload, 'cfna'),
        extractBNumberSet(payload, 'cfna')
    ])

    function updateSetId (pItem, resultSet, setProperty, setIdProperty) {
        const matchingResItem = resultSet.lastItems.find(rItem => rItem.name === pItem[setProperty])
        if (matchingResItem && pItem[setIdProperty] === 'none') {
            pItem[setIdProperty] = matchingResItem.id
        }
    }

    payload.cfna.forEach(pItem => {
        updateSetId(pItem, res, 'destinationset', 'destinationset_id')
        updateSetId(pItem, resTimeSet, 'timeset', 'timeset_id')
        updateSetId(pItem, resSourceSet, 'sourceset', 'sourceset_id')
        updateSetId(pItem, resBNumberSet, 'bnumberset', 'bnumberset_id')
    })
    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: payload
    })
}
export async function updateCfS (context, payload) {
    const [res, resTimeSet, resSourceSet, resBNumberSet] = await Promise.all([
        extractDestinations(payload, 'cfs'),
        extractTimeSet(payload, 'cfs'),
        extractSourceSet(payload, 'cfs'),
        extractBNumberSet(payload, 'cfs')
    ])

    function updateSetId (pItem, resultSet, setProperty, setIdProperty) {
        const matchingResItem = resultSet.lastItems.find(rItem => rItem.name === pItem[setProperty])
        if (matchingResItem && pItem[setIdProperty] === 'none') {
            pItem[setIdProperty] = matchingResItem.id
        }
    }

    payload.cfs.forEach(pItem => {
        updateSetId(pItem, res, 'destinationset', 'destinationset_id')
        updateSetId(pItem, resTimeSet, 'timeset', 'timeset_id')
        updateSetId(pItem, resSourceSet, 'sourceset', 'sourceset_id')
        updateSetId(pItem, resBNumberSet, 'bnumberset', 'bnumberset_id')
    })
    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: payload
    })
}
export async function updateCfR (context, payload) {
    const [res, resTimeSet, resSourceSet, resBNumberSet] = await Promise.all([
        extractDestinations(payload, 'cfr'),
        extractTimeSet(payload, 'cfr'),
        extractSourceSet(payload, 'cfr'),
        extractBNumberSet(payload, 'cfr')
    ])

    function updateSetId (pItem, resultSet, setProperty, setIdProperty) {
        const matchingResItem = resultSet.lastItems.find(rItem => rItem.name === pItem[setProperty])
        if (matchingResItem && pItem[setIdProperty] === 'none') {
            pItem[setIdProperty] = matchingResItem.id
        }
    }

    payload.cfr.forEach(pItem => {
        updateSetId(pItem, res, 'destinationset', 'destinationset_id')
        updateSetId(pItem, resTimeSet, 'timeset', 'timeset_id')
        updateSetId(pItem, resSourceSet, 'sourceset', 'sourceset_id')
        updateSetId(pItem, resBNumberSet, 'bnumberset', 'bnumberset_id')
    })
    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: payload
    })
}
export async function updateCfO (context, payload) {
    const [res, resTimeSet, resSourceSet, resBNumberSet] = await Promise.all([
        extractDestinations(payload, 'cfo'),
        extractTimeSet(payload, 'cfo'),
        extractSourceSet(payload, 'cfo'),
        extractBNumberSet(payload, 'cfo')
    ])

    function updateSetId (pItem, resultSet, setProperty, setIdProperty) {
        const matchingResItem = resultSet.lastItems.find(rItem => rItem.name === pItem[setProperty])
        if (matchingResItem && pItem[setIdProperty] === 'none') {
            pItem[setIdProperty] = matchingResItem.id
        }
    }

    payload.cfo.forEach(pItem => {
        updateSetId(pItem, res, 'destinationset', 'destinationset_id')
        updateSetId(pItem, resTimeSet, 'timeset', 'timeset_id')
        updateSetId(pItem, resSourceSet, 'sourceset', 'sourceset_id')
        updateSetId(pItem, resBNumberSet, 'bnumberset', 'bnumberset_id')
    })
    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: payload
    })
}
export async function updateCfT (context, payload) {
    const [res, resTimeSet, resSourceSet, resBNumberSet] = await Promise.all([
        extractDestinations(payload, 'cft'),
        extractTimeSet(payload, 'cft'),
        extractSourceSet(payload, 'cft'),
        extractBNumberSet(payload, 'cft')
    ])

    function updateSetId (pItem, resultSet, setProperty, setIdProperty) {
        const matchingResItem = resultSet.lastItems.find(rItem => rItem.name === pItem[setProperty])
        if (matchingResItem && pItem[setIdProperty] === 'none') {
            pItem[setIdProperty] = matchingResItem.id
        }
    }

    payload.cft.forEach(pItem => {
        updateSetId(pItem, res, 'destinationset', 'destinationset_id')
        updateSetId(pItem, resTimeSet, 'timeset', 'timeset_id')
        updateSetId(pItem, resSourceSet, 'sourceset', 'sourceset_id')
        updateSetId(pItem, resBNumberSet, 'bnumberset', 'bnumberset_id')
    })
    await apiPutMinimal({
        resource: 'cfmappings',
        resourceId: payload.subscriber_id,
        data: payload
    })
}
