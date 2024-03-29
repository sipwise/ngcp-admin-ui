import { i18n } from 'boot/i18n'

export function lockLevelOptions () {
    return [
        {
            value: null,
            label: i18n.global.tc('None')
        },
        {
            value: 1,
            label: i18n.global.tc('Foreign')
        },
        {
            value: 2,
            label: i18n.global.tc('Outgoing')
        },
        {
            value: 3,
            label: i18n.global.tc('All calls')
        },
        {
            value: 4,
            label: i18n.global.tc('Global')
        },
        {
            value: 5,
            label: i18n.global.tc('Ported')
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
