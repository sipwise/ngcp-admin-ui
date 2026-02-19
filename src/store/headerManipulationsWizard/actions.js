import { apiDelete } from 'src/api/ngcpAPI'

export async function createHeaderManipulationWizardRule ({ state, dispatch }) {
    if (!state.rule) {
        return null
    }

    const res = await dispatch('headerRuleSets/createHeaderRule', {
        set_id: state.setId,
        payload: state.rule
    }, { root: true })
    return res?.data?.items?.[0]
}

export async function createHeaderManipulationWizardRuleConditions ({ state, dispatch }) {
    if (!Array.isArray(state.conditions) || state.conditions.length === 0) {
        return []
    }

    const requests = state.conditions.map(async (condition) => {
        const resource = `v2/header-manipulations/sets/${state.setId}/rules/${state.ruleId}/conditions`
        const res = await dispatch('headerRuleSets/createHeaderRuleCondition', {
            set_id: state.setId,
            rule_id: state.ruleId,
            subscriber_id: null,
            payload: condition
        }, { root: true })
        return { deleteUrl: `${resource}/${res?.data?.items?.[0]?.id}` }
    })

    return requests
}

export async function createHeaderManipulationWizardRuleActions ({ state, dispatch }) {
    if (!Array.isArray(state.actions) || state.actions.length === 0) {
        return []
    }

    const requests = state.actions.map(async (action) => {
        const resource = `v2/header-manipulations/sets/${state.setId}/rules/${state.ruleId}/actions`
        const res = await dispatch('headerRuleSets/createHeaderRuleAction', {
            set_id: state.setId,
            rule_id: state.ruleId,
            subscriber_id: null,
            payload: action
        }, { root: true })
        return { deleteUrl: `${resource}/${res?.data?.items?.[0]?.id}` }
    })

    return requests
}
export function setWizardConfiguration ({ commit }, payload) {
    commit('commitWizardConfiguration', payload)
}

export function setWizardRuleState ({ commit }, ruleId, ruleUrl) {
    commit('commitWizardRuleState', ruleId)
}

export function destroyWizardStore ({ commit }) {
    commit('commitStoreInitialState')
}

export async function rollbackWizardProgress ({ state }, results) {
    const fulfilledPaths = results
        .filter((item) => item.status === 'fulfilled')
        .map((item) => ({ path: item.value.deleteUrl }))
    await Promise.allSettled(rollbackConditionsAndActionsCreation(fulfilledPaths))
    await Promise.allSettled([rollbackRuleCreation(state.ruleUrl)])
}

function rollbackConditionsAndActionsCreation (options) {
    return options.map((option) => apiDelete(option))
}

function rollbackRuleCreation (ruleUrl) {
    return apiDelete({ path: ruleUrl })
}
