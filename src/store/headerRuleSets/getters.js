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
            value: 'a_inbound',
            label: i18n.global.tc('A-Leg Inbound')
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
            value: 'a_ outbound',
            label: i18n.global.tc('A-Leg Outbound')
        },
        {
            value: 'b_outbound',
            label: i18n.global.tc('B-Leg Outbound')
        },
        {
            value: 'cf_inbound',
            label: i18n.global.tc('Call Forward Inbound')
        },
        {
            value: 'cf_outbound',
            label: i18n.global.tc('Call Forward Outbound')
        },
        {
            value: 'reply',
            label: i18n.global.tc('Reply')
        }
    ]
}
export function matchType () {
    return [
        {
            value: 'header',
            label: i18n.global.tc('header')
        },
        {
            value: 'preference',
            label: i18n.global.tc('preference')
        },
        {
            value: 'avp',
            label: i18n.global.tc('avp')
        }
    ]
}
export function matchPart () {
    return [
        {
            value: 'full',
            label: i18n.global.tc('full')
        },
        {
            value: 'username',
            label: i18n.global.tc('username')
        },
        {
            value: 'domain',
            label: i18n.global.tc('domain')
        },
        {
            value: 'port',
            label: i18n.global.tc('port')
        }
    ]
}
export function expression () {
    return [
        {
            value: 'is',
            label: i18n.global.tc('is')
        },
        {
            value: 'contains',
            label: i18n.global.tc('contains')
        },
        {
            value: 'matches',
            label: i18n.global.tc('matches')
        },
        {
            value: 'regexp',
            label: i18n.global.tc('regexp')
        }
    ]
}
export function valueType () {
    return [
        {
            value: 'input',
            label: i18n.global.tc('input')
        },
        {
            value: 'preference',
            label: i18n.global.tc('preference')
        },
        {
            value: 'avp',
            label: i18n.global.tc('avp')
        }
    ]
}
export function rewriterules () {
    return [
        {
            value: 'caller_in',
            label: i18n.global.tc('Inbound for Caller')
        },
        {
            value: 'callee_in',
            label: i18n.global.tc('Inbound for Callee')
        },
        {
            value: 'caller_out',
            label: i18n.global.tc('Outbound for Caller')
        },
        {
            value: 'callee_out',
            label: i18n.global.tc('Outbound for Callee')
        }
    ]
}
export function actionType () {
    return [
        {
            value: 'set',
            label: i18n.global.tc('set')
        },
        {
            value: 'add',
            label: i18n.global.tc('add')
        },
        {
            value: 'remove',
            label: i18n.global.tc('remove')
        },
        {
            value: 'rsub',
            label: i18n.global.tc('rsub')
        },
        {
            value: 'header',
            label: i18n.global.tc('header')
        },
        {
            value: 'preference',
            label: i18n.global.tc('preference')
        }
    ]
}
export function headerRuleConditionValues (state) {
    return state.conditionValues.map((data) => data.value)
}
