export function commitCallFlowData (state, { callId, frames, skippedPacketCount, legBuffers, legErrors }) {
    state.callId = callId
    state.frames = frames
    state.skippedPacketCount = skippedPacketCount
    state.legBuffers = legBuffers
    state.legErrors = legErrors
}

export function commitCallFlowReset (state) {
    state.callId = null
    state.frames = []
    state.skippedPacketCount = 0
    state.legBuffers = {}
    state.legErrors = []
}
