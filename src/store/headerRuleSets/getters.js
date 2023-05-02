import { i18n } from 'boot/i18n'

export function filteredHeaderRuleSetOptions (state) {
    const headerRuleSets = []
    state.filteredHeaderRuleSets.forEach((headerRuleSet) => {
        headerRuleSets.push({
            label: headerRuleSet.name,
            value: headerRuleSet.name
        })
    })
    return headerRuleSets
}

export function directionOptions () {
    return [
        {
            value: 'inbound',
            label: i18n.global.tc('Inbound')
        },
        {
            value: 'local',
            label: i18n.global.tc('Local')
        },
        {
            value: 'peer',
            label: i18n.global.tc('Peer')
        },
        {
            value: 'outbound',
            label: i18n.global.tc('Outbound')
        },
        {
            value: 'call_forward_inbound',
            label: i18n.global.tc('Call Forward Inbound')
        },
        {
            value: 'call_forward_outbound',
            label: i18n.global.tc('Call Forward Outbound')
        },
        {
            value: 'reply',
            label: i18n.global.tc('Reply')
        }
    ]
}
