import { i18n } from 'boot/i18n'
import { PLATFORM_CARRIER, PLATFORM_CE, PLATFORM_PRO } from 'src/constants'

export const CUSTOM_ANNOUNCEMENT_DESTINATION = 'sip:custom-hours@app.local'

const ALL_PLATFORMS = [PLATFORM_CE, PLATFORM_PRO, PLATFORM_CARRIER]
const PRO_PLATFORMS = [PLATFORM_PRO, PLATFORM_CARRIER]

export const DESTINATION_TYPES = [
    { platformVersions: ALL_PLATFORMS, label: 'Voicemail', value: (n) => `sip:vmu${n}@voicebox.local`, test: (v) => /^sip:vmu\d+@voicebox\.local$/.test(v) },
    { platformVersions: ALL_PLATFORMS, label: 'Conference', value: (n) => `sip:conf=${n}@conference.local`, test: (v) => /^sip:conf=\d+@conference\.local$/.test(v) },
    { platformVersions: ALL_PLATFORMS, label: 'Custom Announcement', value: () => CUSTOM_ANNOUNCEMENT_DESTINATION, test: (v) => v === CUSTOM_ANNOUNCEMENT_DESTINATION },
    { platformVersions: PRO_PLATFORMS, label: 'Fax2Mail', value: (n) => `sip:fax=${n}@fax2mail.local`, test: (v) => /^sip:fax=\d+@fax2mail\.local$/.test(v) },
    { platformVersions: PRO_PLATFORMS, label: 'Calling Card', value: () => 'sip:callingcard@app.local', test: (v) => v === 'sip:callingcard@app.local' },
    { platformVersions: PRO_PLATFORMS, label: 'Call Through', value: () => 'sip:callthrough@app.local', test: (v) => v === 'sip:callthrough@app.local' },
    { platformVersions: PRO_PLATFORMS, pbxOnly: true, label: 'Manager Secretary', value: (n) => `sip:${n}@managersecretary.local`, test: (v) => /^sip:\d+@managersecretary\.local$/.test(v) },
    { platformVersions: PRO_PLATFORMS, pbxOnly: true, label: 'Auto Attendant', value: () => 'sip:auto-attendant@app.local', test: (v) => v === 'sip:auto-attendant@app.local' },
    { platformVersions: PRO_PLATFORMS, pbxOnly: true, label: 'Office Hours Announcement', value: () => 'sip:office-hours@app.local', test: (v) => v === 'sip:office-hours@app.local' }
]

export function getDestinationLabel (destination) {
    if (!destination) {
        return ''
    }
    const matchedType = DESTINATION_TYPES.find(({ test }) => test(destination.destination))
    if (matchedType) {
        return i18n.global.t(matchedType.label)
    }
    return destination.destination || destination.simple_destination || ''
}

export function formatDestinationWithTimeout (destination) {
    const label = getDestinationLabel(destination)
    if (!label) {
        return ''
    }
    const hasTimeout = destination.timeout !== null && destination.timeout !== undefined && destination.timeout !== ''
    if (hasTimeout) {
        return i18n.global.t('{destination} for {timeout}s', {
            destination: label,
            timeout: destination.timeout
        })
    }
    return label
}

export const MONTHS = [
    { value: '1', label: 'January' },
    { value: '2', label: 'February' },
    { value: '3', label: 'March' },
    { value: '4', label: 'April' },
    { value: '5', label: 'May' },
    { value: '6', label: 'June' },
    { value: '7', label: 'July' },
    { value: '8', label: 'August' },
    { value: '9', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
]

export const WEEKDAYS = [
    { value: '1', label: 'Sunday' },
    { value: '2', label: 'Monday' },
    { value: '3', label: 'Tuesday' },
    { value: '4', label: 'Wednesday' },
    { value: '5', label: 'Thursday' },
    { value: '6', label: 'Friday' },
    { value: '7', label: 'Saturday' }
]

function getLabelForValue (options, value) {
    const option = options.find((entry) => entry.value === String(value))
    return option ? i18n.global.t(option.label) : value
}

function getMonthName (value) {
    return getLabelForValue(MONTHS, value)
}

function getWeekdayName (value) {
    return getLabelForValue(WEEKDAYS, value)
}

const identity = (value) => value

const TIME_ENTRY_FIELDS = [
    { field: 'year', label: () => i18n.global.t('Year'), format: identity },
    { field: 'month', label: () => i18n.global.t('Month'), format: getMonthName },
    { field: 'mday', label: () => i18n.global.t('Day'), format: identity },
    { field: 'wday', label: () => i18n.global.t('Weekday'), format: getWeekdayName },
    { field: 'hour', label: () => i18n.global.t('Hour'), format: identity },
    { field: 'minute', label: () => i18n.global.t('Minute'), format: identity }
]

function formatTimeFieldValue (value, format) {
    if (value === null || value === undefined || value === '') {
        return ''
    }
    if (typeof value === 'string' && value.includes('-')) {
        const [start, end] = value.split('-')
        return `${format(start)} - ${format(end)}`
    }
    return `${format(value)}`
}

export function getTimeEntryColumnLabels () {
    return TIME_ENTRY_FIELDS.map(({ label }) => label())
}

export function getTimeEntryRowValues (time) {
    return TIME_ENTRY_FIELDS.map(({ field, format }) => formatTimeFieldValue(time?.[field], format))
}

export function getModeLabel (mode) {
    return mode === 'blacklist' ? i18n.global.t('Blacklist') : i18n.global.t('Whitelist')
}

export function timesetLabel (mapping) {
    return mapping?.timeset || i18n.global.t('Always')
}

export function sourceLabel (mapping) {
    return mapping?.sourceset || i18n.global.t('All sources')
}

export function bNumberLabel (mapping) {
    return mapping?.bnumberset || i18n.global.t('Any number')
}

export function destinationSetLabel (mapping) {
    return mapping?.destinationset || i18n.global.t('No destination')
}

export function formatEnable (mappings) {
    if (!mappings?.length) {
        return '-'
    }
    return mappings.map((item) => item.enabled ? i18n.global.t('Yes') : i18n.global.t('No')).join('\n')
}

export function formatPSTN (mappings) {
    if (!mappings?.length) {
        return '-'
    }
    return mappings.map((item) => item.use_redirection ? i18n.global.t('Yes') : i18n.global.t('No')).join('\n')
}
