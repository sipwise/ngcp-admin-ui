export function timezones (state, payload) {
    const timezones = payload.timezones
    const page = payload.page ?? 0

    if (page > 1) {
        state.timezones = [...state.timezones, ...timezones]
    } else {
        state.timezones = timezones
    }
}
