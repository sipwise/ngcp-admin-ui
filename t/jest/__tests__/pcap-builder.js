// Hand-builds raw pcap/Ethernet/IPv4/UDP byte fixtures for tests that exercise
// src/lib/callFlow/callFlowFrames.js and src/helpers/sip-pcap-parser.js against
// the real `pcap-parser` package rather than a mock of it.

export function concatUint8Arrays (arrays) {
    const totalLength = arrays.reduce((sum, arr) => sum + arr.length, 0)
    const result = new Uint8Array(totalLength)
    let offset = 0
    arrays.forEach((arr) => {
        result.set(arr, offset)
        offset += arr.length
    })
    return result
}

function ipv4ToBytes (ip) {
    return new Uint8Array(ip.split('.').map(Number))
}

function textToBytes (text) {
    return new TextEncoder().encode(text)
}

export function buildEthernetFrame ({
    etherType = 0x0800,
    destMacFirstByte = 0x00,
    payload = new Uint8Array()
} = {}) {
    const header = new Uint8Array(14)
    header[0] = destMacFirstByte
    new DataView(header.buffer).setUint16(12, etherType, false)
    return concatUint8Arrays([header, payload])
}

export function buildIpv4Packet ({
    protocol = 17,
    srcIp = '10.0.0.1',
    dstIp = '10.0.0.2',
    ihlWords = 5,
    payload = new Uint8Array()
} = {}) {
    const headerLength = ihlWords * 4
    const header = new Uint8Array(headerLength)
    const view = new DataView(header.buffer)
    view.setUint8(0, (4 << 4) | ihlWords)
    view.setUint16(2, headerLength + payload.length, false)
    view.setUint8(9, protocol)
    header.set(ipv4ToBytes(srcIp), 12)
    header.set(ipv4ToBytes(dstIp), 16)
    return concatUint8Arrays([header, payload])
}

export function buildUdpDatagram ({ srcPort = 5060, dstPort = 5060, payload = new Uint8Array() } = {}) {
    const header = new Uint8Array(8)
    const view = new DataView(header.buffer)
    view.setUint16(0, srcPort, false)
    view.setUint16(2, dstPort, false)
    view.setUint16(4, 8 + payload.length, false)
    return concatUint8Arrays([header, payload])
}

export function buildSipEthernetFrame ({ sipText, srcIp, dstIp, srcPort, dstPort, etherType, ipProtocol, destMacFirstByte } = {}) {
    const udp = buildUdpDatagram({ srcPort, dstPort, payload: textToBytes(sipText) })
    const ip = buildIpv4Packet({ srcIp, dstIp, payload: udp, protocol: ipProtocol })
    return buildEthernetFrame({ etherType, payload: ip, destMacFirstByte })
}

export function buildPcapFile ({ packets, magic = 0xa1b2c3d4, littleEndian = true, linkType = 1 } = {}) {
    const globalHeader = new Uint8Array(24)
    const globalView = new DataView(globalHeader.buffer)
    globalView.setUint32(0, magic, littleEndian)
    globalView.setUint16(4, 2, littleEndian)
    globalView.setUint16(6, 4, littleEndian)
    globalView.setInt32(8, 0, littleEndian)
    globalView.setUint32(12, 0, littleEndian)
    globalView.setUint32(16, 65535, littleEndian)
    globalView.setUint32(20, linkType, littleEndian)

    const parts = [globalHeader]
    packets.forEach(({ data, timestampSeconds = 0, timestampMicroseconds = 0, capturedLengthOverride } = {}) => {
        const recordHeader = new Uint8Array(16)
        const recordView = new DataView(recordHeader.buffer)
        recordView.setUint32(0, timestampSeconds, littleEndian)
        recordView.setUint32(4, timestampMicroseconds, littleEndian)
        recordView.setUint32(8, capturedLengthOverride ?? data.length, littleEndian)
        recordView.setUint32(12, data.length, littleEndian)
        parts.push(recordHeader, data)
    })

    return concatUint8Arrays(parts).buffer
}
