export function countries (state, payload) {
    const countries = payload.countries
    const page = payload.page ?? 0

    if (page > 1) {
        state.countries = [...state.countries, ...countries]
    } else {
        state.countries = countries
    }
}
