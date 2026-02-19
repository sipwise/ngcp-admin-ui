export function commitWizardConfiguration (state, payload) {
    state.setId = payload?.rule.set_id
    state.rule = payload?.rule
    state.conditions = payload?.conditions
    state.actions = payload?.actions
}

export function commitWizardRuleState (state, id) {
    state.ruleId = id
    state.ruleUrl = `/v2/header-manipulations/sets/${state.setId}/rules/${state.ruleId}/`
    setRuleIdForWizardDirectives(state, ['conditions', 'actions'])
}

function setRuleIdForWizardDirectives (state, directives) {
    for (const directive of directives) {
        if (state[directive]) {
            for (const element of state[directive]) {
                element.rule_id = state.ruleId
            }
        }
    }
}

export function commitStoreInitialState (state, rules) {
    state.setId = null
    state.ruleId = ''
    state.rule = null
    state.conditions = null
    state.actions = null
}
