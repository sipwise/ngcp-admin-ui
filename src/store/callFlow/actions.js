import saveAs from 'file-saver'
import { apiGet } from 'src/api/ngcpAPI'
import { extractCallFlowFrames, mergeFramesByTimestamp, mergePcapBuffers } from 'src/lib/callFlow/callFlowFrames'

const CALL_ID_LEG_SUFFIXES = {
    primary: '',
    b2b: '_b2b-1',
    pbx: '_pbx-1'
}

async function fetchLegPcap (legCallId) {
    try {
        const res = await apiGet({
            resource: 'sipcaptures',
            resourceId: encodeURIComponent(legCallId),
            config: { responseType: 'arraybuffer' }
        })
        return res.data
    } catch (error) {
        // No packets for this leg is expected (most calls have no B2B/PBX leg) -
        // not a failure of the overall call flow load.
        if (error?.response?.status === 404) {
            return null
        }
        throw error
    }
}

export async function loadCallFlow ({ commit }, { callId }) {
    const legBuffers = {}
    const legErrors = []
    let skippedPacketCount = 0

    // Each leg is fetched and parsed independently, end to end - so a slow
    // or failing leg doesn't hold up or take down the other legs.
    const frameLists = await Promise.all(
        Object.entries(CALL_ID_LEG_SUFFIXES).map(async ([leg, suffix]) => {
            let buffer

            try {
                buffer = await fetchLegPcap(`${callId}${suffix}`)
            } catch (error) {
                legBuffers[leg] = null
                legErrors.push({ leg, message: error?.message ?? String(error) })
                // eslint-disable-next-line no-console
                console.error(`[callFlow] Failed to fetch the ${leg} leg pcap:`, error)
                return []
            }

            legBuffers[leg] = buffer
            if (!buffer) {
                return []
            }

            const { frames, skippedCount, error } = await extractCallFlowFrames(buffer, { leg })
            skippedPacketCount += skippedCount
            if (error) {
                legErrors.push({ leg, message: error })
                // eslint-disable-next-line no-console
                console.error(`[callFlow] Failed to parse the ${leg} leg pcap: ${error}`)
            }
            return frames
        })
    )

    commit('commitCallFlowData', {
        callId,
        frames: mergeFramesByTimestamp(frameLists),
        skippedPacketCount,
        legBuffers,
        legErrors
    })
}

export function downloadCallFlowPcap ({ state }) {
    const buffers = Object.values(state.legBuffers).filter(Boolean)
    const merged = mergePcapBuffers(buffers)
    if (!merged) {
        return
    }
    saveAs(new Blob([merged], { type: 'application/vnd.tcpdump.pcap' }), `${state.callId}.pcap`)
}
