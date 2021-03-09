
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
