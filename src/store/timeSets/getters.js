export function filteredTimeSetOptions (state) {
    const timesets = []
    state.filteredTimeSets.forEach((timeset) => {
        timesets.push({
            label: `${timeset.id} - ${timeset.name}`,
            value: timeset.id
        })
    })
    return timesets
}
