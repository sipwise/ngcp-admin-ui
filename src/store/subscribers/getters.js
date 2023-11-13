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
