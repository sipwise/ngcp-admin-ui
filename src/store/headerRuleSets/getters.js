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
            label: i18n.global.t('A-Leg Inbound')
        },
        {
            value: 'local',
            label: i18n.global.t('Local')
        },
        {
            value: 'peer',
            label: i18n.global.t('Peer')
        },
        {
            value: 'a_ outbound',
            label: i18n.global.t('A-Leg Outbound')
        },
        {
            value: 'b_outbound',
            label: i18n.global.t('B-Leg Outbound')
        },
        {
            value: 'cf_inbound',
            label: i18n.global.t('Call Forward Inbound')
        },
        {
            value: 'cf_outbound',
            label: i18n.global.t('Call Forward Outbound')
        },
        {
            value: 'reply',
            label: i18n.global.t('Reply')
        }
    ]
}
export function matchType () {
    return [
        {
            value: 'header',
            label: i18n.global.t('header')
        },
        {
            value: 'preference',
            label: i18n.global.t('preference')
        },
        {
            value: 'avp',
            label: i18n.global.t('avp')
        }
    ]
}
export function matchPart () {
    return [
        {
            value: 'full',
            label: i18n.global.t('full')
        },
        {
            value: 'username',
            label: i18n.global.t('username')
        },
        {
            value: 'domain',
            label: i18n.global.t('domain')
        },
        {
            value: 'port',
            label: i18n.global.t('port')
        }
    ]
}
export function expression () {
    return [
        {
            value: 'is',
            label: i18n.global.t('is')
        },
        {
            value: 'contains',
            label: i18n.global.t('contains')
        },
        {
            value: 'matches',
            label: i18n.global.t('matches')
        },
        {
            value: 'regexp',
            label: i18n.global.t('regexp')
        }
    ]
}
export function valueType () {
    return [
        {
            value: 'input',
            label: i18n.global.t('input')
        },
        {
            value: 'preference',
            label: i18n.global.t('preference')
        },
        {
            value: 'avp',
            label: i18n.global.t('avp')
        }
    ]
}
export function rewriterules () {
    return [
        {
            value: 'caller_in',
            label: i18n.global.t('Inbound for Caller')
        },
        {
            value: 'callee_in',
            label: i18n.global.t('Inbound for Callee')
        },
        {
            value: 'caller_out',
            label: i18n.global.t('Outbound for Caller')
        },
        {
            value: 'callee_out',
            label: i18n.global.t('Outbound for Callee')
        }
    ]
}
export function actionType () {
    return [
        {
            value: 'set',
            label: i18n.global.t('set')
        },
        {
            value: 'add',
            label: i18n.global.t('add')
        },
        {
            value: 'remove',
            label: i18n.global.t('remove')
        },
        {
            value: 'rsub',
            label: i18n.global.t('rsub')
        },
        {
            value: 'header',
            label: i18n.global.t('header')
        },
        {
            value: 'preference',
            label: i18n.global.t('preference')
        }
    ]
}
export function headerRuleConditionValues (state) {
    return state.conditionValues.map((data) => data.value)
}
