
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
export function commitOutboundSockets (state, payload) {
    state.outboundSockets = payload
}
export function commitDestinationSet (state, payload) {
    state.destinationSet = payload
}
export function commitTimeSet (state, payload) {
    state.timeSet = payload
}
export function commitSourceSet (state, payload) {
    state.sourceSet = payload
}
export function commitBNumberSet (state, payload) {
    state.bnumberSet = payload
}
export async function commitMappings (state, payload) {
    state.cfu = payload
}
