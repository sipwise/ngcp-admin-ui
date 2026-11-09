import { i18n } from 'boot/i18n'

export function lockLevelOptions () {
    return [
        {
            value: null,
            label: i18n.global.t('None')
        },
        {
            value: 1,
            label: i18n.global.t('Foreign')
        },
        {
            value: 2,
            label: i18n.global.t('Outgoing')
        },
        {
            value: 3,
            label: i18n.global.t('All Calls')
        },
        {
            value: 4,
            label: i18n.global.t('Global')
        },
        {
            value: 5,
            label: i18n.global.t('Ported')
        }
    ]
}
export function filteredOutboundOptions (state) {
    const outbounds = []
    state.outboundSockets.forEach((outbound) => {
        outbounds.push({
            label: outbound.label,
            value: outbound.value
        })
    })
    return outbounds
}
export function autoAttendantKey () {
    return [
        {
            value: '0',
            label: '0'
        },
        {
            value: '1',
            label: '1'
        },
        {
            value: '2',
            label: '2'
        },
        {
            value: '3',
            label: '3'
        },
        {
            value: '4',
            label: '4'
        },
        {
            value: '5',
            label: '5'
        },
        {
            value: '6',
            label: '6'
        },
        {
            value: '7',
            label: '7'
        },
        {
            value: '8',
            label: '8'
        },
        {
            value: '9',
            label: '9'
        },
        {
            value: 'default',
            label: 'default'
        }
    ]
}
export function modeSourceSet () {
    return [
        {
            value: 'whitelist',
            label: 'Whitelist'
        },
        {
            value: 'blacklist',
            label: 'Blacklist'
        }
    ]
}
export function customAnnouncementOptions (state) {
    return state.customAnnouncements.map((item) => ({
        label: item.handle,
        value: item.id
    }))
}
export function yearValue () {
    const currentYear = new Date().getFullYear()
    const yearsRange = 10
    const startYear = currentYear - yearsRange
    const endYear = currentYear + yearsRange
    const years = []
    for (let year = startYear; year <= endYear; year++) {
        years.push({ label: year.toString(), value: year })
    }
    return years
}
export function monthValue () {
    return [
        { label: 'January', value: '1' },
        { label: 'February', value: '2' },
        { label: 'March', value: '3' },
        { label: 'April', value: '4' },
        { label: 'May', value: '5' },
        { label: 'June', value: '6' },
        { label: 'July', value: '7' },
        { label: 'August', value: '8' },
        { label: 'September', value: '9' },
        { label: 'October', value: '10' },
        { label: 'November', value: '11' },
        { label: 'December', value: '12' }
    ]
}
export function dayValue () {
    const days = []
    for (let day = 1; day <= 31; day++) {
        days.push({ label: day.toString(), value: day })
    }
    return days
}
export function weekdayValue () {
    return [
        { label: 'Sunday', value: '1' },
        { label: 'Monday', value: '2' },
        { label: 'Tuesday', value: '3' },
        { label: 'Wednesday', value: '4' },
        { label: 'Thursday', value: '5' },
        { label: 'Friday', value: '6' },
        { label: 'Saturday', value: '7' }
    ]
}
export function hourValue () {
    const hours = []
    for (let hour = 0; hour <= 23; hour++) {
        hours.push({ label: hour.toString(), value: hour })
    }
    return hours
}
export function minuteValue () {
    const hours = []
    for (let hour = 0; hour <= 59; hour++) {
        hours.push({ label: hour.toString(), value: hour })
    }
    return hours
}
