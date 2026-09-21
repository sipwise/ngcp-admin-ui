import {
    computeCallFlowRoleLabels,
    extractCallFlowFrames,
    mergeFramesByTimestamp,
    mergePcapBuffers
} from 'src/lib/callFlow/callFlowFrames'
import {
    buildEthernetFrame,
    buildIpv4Packet,
    buildPcapFile,
    buildSipEthernetFrame
} from 't/jest/__tests__/pcap-builder'

const SAMPLE_INVITE = [
    'INVITE sip:bob@example.com SIP/2.0',
    'Via: SIP/2.0/UDP 10.0.0.1:5060;branch=z9hG4bK776asdhds',
    'Call-ID: abcd1234@10.0.0.1',
    'CSeq: 1 INVITE',
    'Content-Length: 0',
    '',
    ''
].join('\r\n')

const SAMPLE_200_OK = [
    'SIP/2.0 200 OK',
    'Via: SIP/2.0/UDP 10.0.0.1:5060;branch=z9hG4bK776asdhds',
    'Call-ID: abcd1234@10.0.0.1',
    'CSeq: 1 INVITE',
    'Content-Length: 0',
    '',
    ''
].join('\r\n')

const MALFORMED_INVITE = [
    'INVITE sip:bob@example.com SIP/2.0',
    'NotAHeaderLine',
    'Call-ID: abcd1234@10.0.0.1',
    'Content-Length: 0',
    '',
    ''
].join('\r\n')

describe('mergePcapBuffers', () => {
    it('merges multiple pcap buffers into one, keeping a single global header', async () => {
        const frameA = buildSipEthernetFrame({ sipText: SAMPLE_INVITE })
        const frameB = buildSipEthernetFrame({ sipText: SAMPLE_200_OK })
        const bufferA = buildPcapFile({ packets: [{ data: frameA }] })
        const bufferB = buildPcapFile({ packets: [{ data: frameB }] })

        const merged = mergePcapBuffers([bufferA, bufferB])
        const { frames } = await extractCallFlowFrames(merged)

        expect(frames).toHaveLength(2)
    })

    it('returns null when no buffer is valid', () => {
        expect(mergePcapBuffers([null, new ArrayBuffer(2)])).toBeNull()
    })

    it('drops a leg captured with a different link-layer type instead of corrupting the merged file', async () => {
        const frameA = buildSipEthernetFrame({ sipText: SAMPLE_INVITE })
        const frameB = buildSipEthernetFrame({ sipText: SAMPLE_200_OK })
        const bufferA = buildPcapFile({ packets: [{ data: frameA }], linkType: 1 }) // Ethernet
        const bufferB = buildPcapFile({ packets: [{ data: frameB }], linkType: 113 }) // Linux cooked capture

        const merged = mergePcapBuffers([bufferA, bufferB])
        const { frames } = await extractCallFlowFrames(merged)

        // Only bufferA's packet survives - bufferB's packet record was dropped
        // rather than concatenated under bufferA's (Ethernet) link-layer type.
        expect(frames).toHaveLength(1)
    })
})

describe('extractCallFlowFrames', () => {
    it('extracts a SIP frame from a UDP/IPv4 pcap capture', async () => {
        const frame = buildSipEthernetFrame({
            sipText: SAMPLE_INVITE,
            srcIp: '10.0.0.1',
            dstIp: '10.0.0.2',
            srcPort: 5060,
            dstPort: 5080
        })
        const buffer = buildPcapFile({ packets: [{ data: frame, timestampSeconds: 42, timestampMicroseconds: 7 }] })

        const { frames, skippedCount, totalPackets } = await extractCallFlowFrames(buffer, { leg: 'primary' })

        expect(totalPackets).toBe(1)
        expect(skippedCount).toBe(0)
        expect(frames).toHaveLength(1)
        expect(frames[0]).toMatchObject({
            leg: 'primary',
            packet_number: 1,
            timestamp: '42.000007',
            src_ip: '10.0.0.1',
            src_port: 5060,
            dst_ip: '10.0.0.2',
            dst_port: 5080,
            transport: 'UDP',
            method: 'INVITE',
            request_uri: 'sip:bob@example.com',
            call_id: 'abcd1234@10.0.0.1'
        })
    })

    it('skips non-SIP packets instead of failing the whole capture', async () => {
        const nonSipFrame = buildSipEthernetFrame({ sipText: 'this is not sip' })
        const sipFrame = buildSipEthernetFrame({ sipText: SAMPLE_INVITE })
        const buffer = buildPcapFile({ packets: [{ data: nonSipFrame }, { data: sipFrame }] })

        const { frames, skippedCount, totalPackets } = await extractCallFlowFrames(buffer)

        expect(totalPackets).toBe(2)
        expect(skippedCount).toBe(1)
        expect(frames).toHaveLength(1)
        // The skipped non-SIP packet still occupies capture position 1 - the
        // SIP message stays numbered by its own raw-capture position (2), not
        // by its position among only the successfully parsed SIP messages (0).
        expect(frames[0].packet_number).toBe(2)
    })

    it('skips non-IPv4 and other unparseable packets', async () => {
        const arpFrame = buildEthernetFrame({ etherType: 0x0806, payload: new Uint8Array(10) })
        const truncatedTcpFrame = buildEthernetFrame({
            etherType: 0x0800,
            payload: buildIpv4Packet({ protocol: 6, payload: new Uint8Array(10) })
        })
        const buffer = buildPcapFile({ packets: [{ data: arpFrame }, { data: truncatedTcpFrame }] })

        const { frames, skippedCount } = await extractCallFlowFrames(buffer)

        expect(frames).toHaveLength(0)
        expect(skippedCount).toBe(2)
    })

    it('resolves an empty frame list instead of throwing on a non-pcap buffer', async () => {
        const { frames } = await extractCallFlowFrames(new ArrayBuffer(4))

        expect(frames).toEqual([])
    })

    it('parses an Ethernet frame whose destination MAC could be mistaken for a raw IPv4/IPv6 version nibble', async () => {
        // Regression test: a real Ethernet frame's destination MAC can start
        // with a byte whose high nibble is 4 or 6 (e.g. a 40:xx or 6c:xx OUI) -
        // the parser must not misread that as a raw-IP capture's version nibble
        // and skip straight past the actual Ethernet framing.
        const frame = buildSipEthernetFrame({ sipText: SAMPLE_INVITE, destMacFirstByte: 0x40 })
        const buffer = buildPcapFile({ packets: [{ data: frame }] })

        const { frames } = await extractCallFlowFrames(buffer)

        expect(frames).toHaveLength(1)
        expect(frames[0].method).toBe('INVITE')
    })

    it('surfaces the parser error instead of masquerading a parse failure as an empty capture', async () => {
        const frame = buildSipEthernetFrame({ sipText: MALFORMED_INVITE })
        const buffer = buildPcapFile({ packets: [{ data: frame }] })

        const { frames, error } = await extractCallFlowFrames(buffer)

        expect(frames).toEqual([])
        expect(error).toMatch(/malformed SIP header/)
    })
})

describe('mergeFramesByTimestamp', () => {
    it('merges and sorts frames from multiple legs by timestamp', () => {
        const primary = [{ timestamp: '10.000200', leg: 'primary' }, { timestamp: '10.000000', leg: 'primary' }]
        const b2b = [{ timestamp: '10.000100', leg: 'b2b' }]

        const merged = mergeFramesByTimestamp([primary, b2b])

        expect(merged.map((frame) => frame.timestamp)).toEqual(['10.000000', '10.000100', '10.000200'])
    })

    it('renumbers packet_number by position in the merged order instead of keeping each leg\'s own count', () => {
        // Each leg's pcap-derived packet_number restarts at 1 independently -
        // once interleaved chronologically across legs, the displayed number
        // must climb steadily top to bottom instead of jumping around.
        const primary = [
            { timestamp: '10.000200', leg: 'primary', packet_number: 2 },
            { timestamp: '10.000000', leg: 'primary', packet_number: 1 }
        ]
        const b2b = [{ timestamp: '10.000100', leg: 'b2b', packet_number: 1 }]

        const merged = mergeFramesByTimestamp([primary, b2b])

        expect(merged.map((frame) => frame.packet_number)).toEqual([1, 2, 3])
        expect(merged.map((frame) => frame.leg)).toEqual(['primary', 'b2b', 'primary'])
    })
})

describe('computeCallFlowRoleLabels', () => {
    const PLATFORM_CALL_FLOW_ROLES = {
        app: '127.0.0.1:5070',
        b2b: '127.0.0.1:5080',
        lb_ext: '192.168.91.72:5060',
        lb_int: '127.0.0.1:5060',
        pbx: '127.0.0.1:5080',
        proxy: '127.0.0.1:5062',
        sbc: '127.0.0.1:5080'
    }

    it('labels each ip:port node with its uppercased role', () => {
        const labels = computeCallFlowRoleLabels(PLATFORM_CALL_FLOW_ROLES)

        expect(labels['127.0.0.1:5070']).toBe('APP')
        expect(labels['192.168.91.72:5060']).toBe('LB_EXT')
        expect(labels['127.0.0.1:5060']).toBe('LB_INT')
        expect(labels['127.0.0.1:5062']).toBe('PROXY')
    })

    it('joins roles that share the same endpoint instead of overwriting one another', () => {
        const labels = computeCallFlowRoleLabels(PLATFORM_CALL_FLOW_ROLES)

        expect(labels['127.0.0.1:5080']).toBe('B2B/PBX/SBC')
    })

    it('keys by bare ip and merges every role on that ip when considerPorts is off', () => {
        const labels = computeCallFlowRoleLabels(PLATFORM_CALL_FLOW_ROLES, { considerPorts: false })

        expect(labels['127.0.0.1']).toBe('APP/B2B/LB_INT/PBX/PROXY/SBC')
        expect(labels['192.168.91.72']).toBe('LB_EXT')
    })

    it('returns an empty object for a missing or empty role map', () => {
        expect(computeCallFlowRoleLabels(null)).toEqual({})
        expect(computeCallFlowRoleLabels(undefined)).toEqual({})
        expect(computeCallFlowRoleLabels({})).toEqual({})
    })

    it('ignores a role with a non-string or empty endpoint instead of throwing', () => {
        const labels = computeCallFlowRoleLabels({ sbc: '127.0.0.1:5080', bogus: '', missing: null })

        expect(labels).toEqual({ '127.0.0.1:5080': 'SBC' })
    })
})
