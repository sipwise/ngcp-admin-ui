export default function () {
    return {
        callId: null,
        frames: [],
        skippedPacketCount: 0,
        // Raw pcap bytes per call-id leg (primary/b2b/pbx), kept so "Download PCAP"
        // can merge them into a single file without re-fetching.
        legBuffers: {},
        // Legs that failed to fetch or parse - `[{ leg, message }]` - kept separate
        // from skippedPacketCount so the UI can tell "no SIP traffic on this leg"
        // apart from "this leg failed to load".
        legErrors: []
    }
}
