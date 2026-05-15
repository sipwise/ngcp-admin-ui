export function filterTimeSets (state, payload) {
    const timesets = payload.timesets
    const page = payload.page ?? 0

    if (page > 1) {
        state.filteredTimeSets = [...state.filteredTimeSets, ...timesets]
    } else {
        state.filteredTimeSets = timesets
    }
}
