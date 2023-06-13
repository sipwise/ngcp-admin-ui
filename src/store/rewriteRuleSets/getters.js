
export function filteredRewriteRuleSetOptions (state) {
    const rewriteRuleSets = []
    state.filteredRewriteRuleSets.forEach((rewriteRuleSet) => {
        rewriteRuleSets.push({
            label: rewriteRuleSet.name,
            value: rewriteRuleSet.name
        })
    })
    return rewriteRuleSets
}
export function fieldList () {
    return [
        {
            value: 'callee',
            label: 'Callee'
        },
        {
            value: 'caller',
            label: 'Caller'
        }
    ]
}
export function directionList () {
    return [
        {
            value: 'in',
            label: 'Inbound'
        },
        {
            value: 'out',
            label: 'Outbound'
        },
        {
            value: 'lnp',
            label: 'LNP'
        }
    ]
}
