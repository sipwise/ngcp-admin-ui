import { Readable } from 'stream'
import pcapParser from 'pcap-parser'

import { parseSipPcapData } from 'src/helpers/sip-pcap-parser'

const PCAP_GLOBAL_HEADER_SIZE = 24
const PCAP_MAGIC_LE = 0xd4c3b2a1
const PCAP_MAGIC_LE_NS = 0x4d3cb2a1

// Reads the pcap global header's link-layer type ("network") field, honoring
// that buffer's own byte order as declared by its magic number.
function getPcapLinkType (buffer) {
    const view = new DataView(buffer)
    const magic = view.getUint32(0, false)
    const littleEndian = magic === PCAP_MAGIC_LE || magic === PCAP_MAGIC_LE_NS
    return view.getUint32(20, littleEndian)
}

/**
 * Concatenates pcap buffers (e.g. one per call-id leg) into one valid pcap file:
 * keeps the first buffer's global header, and appends only the packet records of
 * the rest. A buffer with a different link-layer type than the first is dropped
 * rather than merged in, since its packets would be misdeclared under the first
 * buffer's header.
 *
 * Used to build a single downloadable .pcap file out of legs fetched separately.
 *
 * @param {Array<ArrayBuffer>} buffers
 * @returns {ArrayBuffer|null} null if no buffer contained a valid global header
 */
export function mergePcapBuffers (buffers) {
    const validBuffers = (buffers || [])
        .filter((buffer) => buffer && buffer.byteLength >= PCAP_GLOBAL_HEADER_SIZE)

    if (validBuffers.length === 0) {
        return null
    }

    const primaryLinkType = getPcapLinkType(validBuffers[0])
    const compatibleBuffers = validBuffers.filter(
        (buffer, index) => index === 0 || getPcapLinkType(buffer) === primaryLinkType
    )

    const parts = [new Uint8Array(compatibleBuffers[0])]
    for (let i = 1; i < compatibleBuffers.length; i++) {
        parts.push(new Uint8Array(compatibleBuffers[i], PCAP_GLOBAL_HEADER_SIZE))
    }

    const totalLength = parts.reduce((sum, part) => sum + part.byteLength, 0)
    const merged = new Uint8Array(totalLength)
    let writeOffset = 0
    parts.forEach((part) => {
        merged.set(part, writeOffset)
        writeOffset += part.byteLength
    })

    return merged.buffer
}

// `Readable.from()` isn't implemented by `stream-browserify`'s bundled
// `readable-stream` in the browser (throws "Readable.from is not available in
// the browser") - push a single already-complete chunk instead, which is
// supported everywhere.
function bufferToReadable (buffer) {
    const readable = new Readable()
    readable.push(buffer)
    readable.push(null)
    return readable
}

function formatTimestamp (microseconds) {
    const seconds = Math.floor(microseconds / 1000000)
    const remainder = microseconds - (seconds * 1000000)
    return `${seconds}.${String(remainder).padStart(6, '0')}`
}

// sip-pcap-parser only extracts the method from the start-line, not the
// request-URI this feature's frame contract needs - so it's re-derived here.
function getRequestUri (sipHeader) {
    const parts = sipHeader.split(/\s+/)
    return parts.length === 3 ? parts[1] : null
}

function mapMessageToFrame (message, index, leg) {
    return {
        id: `${leg}-${index}`,
        leg,
        // Raw per-leg capture position (1-based, all packets, not just SIP) -
        // overwritten by mergeFramesByTimestamp() with the merged-order
        // position, which is what the diagram actually displays.
        packet_number: message.packet_number,
        timestamp: formatTimestamp(message.timestamp ?? 0),
        src_ip: message.src,
        src_port: message.src_port,
        dst_ip: message.dst,
        dst_port: message.dst_port,
        transport: message.protocol,
        method: message.method,
        request_uri: message.type === 'request' ? getRequestUri(message.sip_header) : null,
        status_code: message.response_code,
        reason_phrase: message.response_message,
        call_id: message.call_id,
        payload: message.unparsed.toString('utf8')
    }
}

/**
 * Counts link-layer packets in a pcap capture without decoding them. Used only
 * as a fallback when `parseSipPcapData` fails before finishing (see
 * `extractCallFlowFrames`) - on success its own packet count is reused instead.
 *
 * @param {Buffer} pcapBuffer
 * @returns {Promise<number>}
 */
function countPackets (pcapBuffer) {
    return new Promise((resolve) => {
        let count = 0
        let parser

        try {
            parser = pcapParser.parse(bufferToReadable(pcapBuffer))
        } catch {
            resolve(count)
            return
        }

        parser.on('packet', () => {
            count++
        })
        parser.on('end', () => resolve(count))
        parser.on('error', () => resolve(count))
    })
}

/**
 * Runs `src/helpers/sip-pcap-parser` (also used standalone, and the only one of
 * the two that supports TCP reassembly and IPv6) over one pcap buffer, producing
 * the frame objects the diagram needs. `leg` tags each frame with which call-id
 * variant (primary/b2b/pbx) it was fetched for.
 *
 * @param {ArrayBuffer} pcapArrayBuffer
 * @param {{ leg?: string }} [options]
 * @returns {Promise<{ frames: Array<Object>, skippedCount: number, totalPackets: number, error: string|null }>}
 */
export async function extractCallFlowFrames (pcapArrayBuffer, { leg = 'primary' } = {}) {
    const pcapBuffer = Buffer.from(pcapArrayBuffer)

    const [ok, result, packetCount] = await parseSipPcapData(pcapBuffer)

    if (!ok) {
        // `result` is the parser's error message, surfaced so a real parse
        // failure isn't mistaken for a leg with no SIP traffic. Parsing
        // stopped early, so count packets separately for totalPackets.
        const totalPackets = await countPackets(pcapBuffer)
        return { frames: [], skippedCount: totalPackets, totalPackets, error: result }
    }

    const frames = result.map((message, index) => mapMessageToFrame(message, index, leg))

    return {
        frames,
        skippedCount: Math.max(packetCount - frames.length, 0),
        totalPackets: packetCount,
        error: null
    }
}

// Splits "seconds.microseconds" into integer parts, compared separately -
// parsing the combined value as one float can lose precision at unix-epoch
// magnitudes and invert the order of frames microseconds apart.
function parseTimestampParts (timestamp) {
    const [secondsPart, microsecondsPart = '0'] = String(timestamp).split('.')
    return [Number(secondsPart), Number(microsecondsPart)]
}

/**
 * Merges frame lists from multiple call legs into one chronologically ordered
 * list, renumbering `packet_number` to its 1-based position in that order (see
 * the field comment in mapMessageToFrame() above).
 *
 * @param {Array<Array<Object>>} frameLists
 * @returns {Array<Object>}
 */
export function mergeFramesByTimestamp (frameLists) {
    return frameLists
        .flat()
        .slice()
        .sort((a, b) => {
            const [aSeconds, aMicroseconds] = parseTimestampParts(a.timestamp)
            const [bSeconds, bMicroseconds] = parseTimestampParts(b.timestamp)
            return aSeconds - bSeconds || aMicroseconds - bMicroseconds
        })
        .map((frame, index) => ({ ...frame, packet_number: index + 1 }))
}

/**
 * Derives the sequence-diagram "node" key for a frame endpoint - `ip:port` when
 * ports are considered, or bare `ip` when they aren't (folding e.g. every port a
 * SIP proxy uses into a single lane/alias-editor row).
 *
 * @param {string} ip
 * @param {number|string} port
 * @param {{ considerPorts?: boolean }} [options]
 * @returns {string}
 */
export function callFlowNodeKey (ip, port, { considerPorts = true } = {}) {
    return considerPorts ? `${ip}:${port}` : ip
}

/**
 * Unique list of node keys that appear as either sender or receiver across the
 * given frames, in first-seen order - the vertical lanes of the sequence diagram,
 * and the rows of the node alias editor. Shared by the Vuex getter and the diagram
 * component so the two always agree on how nodes are keyed.
 *
 * @param {Array<Object>} frames
 * @param {{ considerPorts?: boolean }} [options]
 * @returns {Array<string>}
 */
export function computeCallFlowNodes (frames, { considerPorts = true } = {}) {
    const nodes = []
    const seen = new Set()
    const addNode = (key) => {
        if (!seen.has(key)) {
            seen.add(key)
            nodes.push(key)
        }
    }
    frames.forEach((frame) => {
        addNode(callFlowNodeKey(frame.src_ip, frame.src_port, { considerPorts }))
        addNode(callFlowNodeKey(frame.dst_ip, frame.dst_port, { considerPorts }))
    })
    return nodes
}

/**
 * Derives a "which element is this" label for each node key from the platform's
 * `call_flow` role map (role -> "ip:port", from `GET /api/platforminfo`), keyed
 * like computeCallFlowNodes/callFlowNodeKey. Roles sharing one endpoint (e.g.
 * b2b/pbx/sbc on a single-server deployment) are joined with "/" instead of
 * one overwriting the other.
 *
 * @param {Object<string, string>} callFlowRoles
 * @param {{ considerPorts?: boolean }} [options]
 * @returns {Object<string, string>} node key -> joined role label(s)
 */
export function computeCallFlowRoleLabels (callFlowRoles, { considerPorts = true } = {}) {
    const labels = {}
    Object.entries(callFlowRoles || {}).forEach(([role, hostPort]) => {
        if (typeof hostPort !== 'string' || hostPort === '') {
            return
        }
        const separatorIndex = hostPort.lastIndexOf(':')
        const ip = separatorIndex === -1 ? hostPort : hostPort.slice(0, separatorIndex)
        const port = separatorIndex === -1 ? undefined : hostPort.slice(separatorIndex + 1)
        const key = callFlowNodeKey(ip, port, { considerPorts })
        const roleLabel = role.toUpperCase()
        labels[key] = labels[key] ? `${labels[key]}/${roleLabel}` : roleLabel
    })
    return labels
}
