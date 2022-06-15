
export function commitVoicemailSettings (state, payload) {
    state.voicemailSettings = payload
}

export function commitVoicemailGreetings (state, payload) {
    state.voicemailGreetings = payload
}

export function commitReminderData (state, payload) {
    state.reminderData = payload
}

export function commitSpeedDials (state, payload) {
    state.speedDials = payload
}
