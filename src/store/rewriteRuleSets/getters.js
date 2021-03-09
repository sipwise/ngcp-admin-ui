
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
