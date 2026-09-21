/**
 * SIP PCAP parser
 * Copyright (C) 2026 Sipwise GmbH <support@sipwise.com>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: GPL-3.0-or-later
 *
 * Version: 1.0.0
 * Date: 2026-09-02
 *
 * Usage
 *
 *   import { parseSipPcapData } from 'src/helpers/sip-pcap-parser'
 *
 *   const [ok, result, packetCount] = await parseSipPcapData(pcapData)
 *
 *   if (ok) {
 *       // result is an array of parsed SIP messages
 *       console.log(result)
 *   } else {
 *       // result is an error message string
 *       console.error(result)
 *   }
 *
 * Return values:
 *
 *   Success:
 *     [true, Array<object>, number]
 *     (the number is the count of link-layer packets seen in the capture,
 *     including ones that were not SIP)
 *
 *   Failure:
 *     [false, string]
 *
 * The parser supports Ethernet II, Linux SSL, Linux SSL v2 + IPv4/IPv6 + UDP/TCP packets.
 *
 * UDP packets are treated independently.
 *
 * TCP stream reassembly is performed.
 */

import { Readable } from 'stream'
import pcapParser from 'pcap-parser'

const CRLF_CRLF = Buffer.from('\r\n\r\n')

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

function extractTransportPayload (frame) {
    if (!Buffer.isBuffer(frame) || frame.length === 0) {
        return null
    }

    /*
     * Ethernet II. Checked first, ahead of the raw-IP guess below, since a
     * recognized EtherType (or VLAN tag) at a fixed offset is a much more
     * specific signal than a single nibble - a real Ethernet frame's
     * destination MAC can easily start with a byte whose high nibble is 4 or
     * 6, which would otherwise be misread as an IPv4/IPv6 version nibble.
     */
    if (frame.length >= 14) {
        const etherType = frame.readUInt16BE(12)

        if (etherType === 0x0800) {
            return extractIPv4TransportPayload(frame, 14)
        }

        if (etherType === 0x86dd) {
            return extractIPv6TransportPayload(frame, 14)
        }

        /*
         * VLAN-tagged Ethernet.
         */
        if (
            etherType === 0x8100 ||
            etherType === 0x88a8 ||
            etherType === 0x9100
        ) {
            if (frame.length < 18) {
                return null
            }

            const vlanEtherType =
                frame.readUInt16BE(16)

            if (vlanEtherType === 0x0800) {
                return extractIPv4TransportPayload(frame, 18)
            }

            if (vlanEtherType === 0x86dd) {
                return extractIPv6TransportPayload(frame, 18)
            }
        }
    }

    /*
     * Linux cooked capture, SLL.
     */
    if (frame.length >= 16) {
        const sllProtocol =
            frame.readUInt16BE(14)

        if (sllProtocol === 0x0800) {
            return extractIPv4TransportPayload(frame, 16)
        }

        if (sllProtocol === 0x86dd) {
            return extractIPv6TransportPayload(frame, 16)
        }
    }

    /*
     * Linux cooked capture v2, SLL2.
     */
    if (frame.length >= 20) {
        const sll2Protocol =
            frame.readUInt16BE(0)

        if (sll2Protocol === 0x0800) {
            return extractIPv4TransportPayload(frame, 20)
        }

        if (sll2Protocol === 0x86dd) {
            return extractIPv6TransportPayload(frame, 20)
        }
    }

    /*
     * Raw IPv4 or IPv6 capture. Tried last, only once none of the known
     * link-layer framings above matched, since the IP version nibble alone
     * can coincidentally match non-IP framing.
     */
    const ipVersion = frame[0] >> 4

    if (ipVersion === 4) {
        return extractIPv4TransportPayload(frame, 0)
    }

    if (ipVersion === 6) {
        return extractIPv6TransportPayload(frame, 0)
    }

    return null
}

function extractIPv4TransportPayload (frame, ipOffset = 0) {
    if (!Buffer.isBuffer(frame)) {
        return null
    }

    if (frame.length < ipOffset + 20) {
        return null
    }

    const version =
        frame[ipOffset] >> 4

    if (version !== 4) {
        return null
    }

    const ipHeaderLength =
        (frame[ipOffset] & 0x0f) * 4

    if (ipHeaderLength < 20) {
        return null
    }

    if (frame.length < ipOffset + ipHeaderLength) {
        return null
    }

    const totalIpLength =
        frame.readUInt16BE(ipOffset + 2)

    if (totalIpLength < ipHeaderLength) {
        return null
    }

    const ipPacketEnd =
        Math.min(
            ipOffset + totalIpLength,
            frame.length
        )

    const protocol =
        frame[ipOffset + 9]

    if (protocol !== 6 && protocol !== 17) {
        return null
    }

    /*
     * Ignore fragmented IPv4 packets.
     */
    const flagsAndFragmentOffset =
        frame.readUInt16BE(ipOffset + 6)

    const fragmentOffset =
        flagsAndFragmentOffset & 0x1fff

    const moreFragments =
        (flagsAndFragmentOffset & 0x2000) !== 0

    if (fragmentOffset !== 0 || moreFragments) {
        return null
    }

    const sourceAddress =
        Array.from(
            frame.subarray(
                ipOffset + 12,
                ipOffset + 16
            )
        ).join('.')

    const destinationAddress =
        Array.from(
            frame.subarray(
                ipOffset + 16,
                ipOffset + 20
            )
        ).join('.')

    const transportOffset =
        ipOffset + ipHeaderLength

    if (frame.length < transportOffset + 8) {
        return null
    }

    const sourcePort =
        frame.readUInt16BE(transportOffset)

    const destinationPort =
        frame.readUInt16BE(transportOffset + 2)

    let transportHeaderLength
    let sequenceNumber = null
    let payloadEnd

    if (protocol === 17) {
        /*
         * UDP header.
         */
        transportHeaderLength = 8

        const udpLength =
            frame.readUInt16BE(transportOffset + 4)

        if (udpLength < 8) {
            return null
        }

        payloadEnd =
            Math.min(
                transportOffset + udpLength,
                ipPacketEnd
            )
    } else {
        /*
         * TCP header.
         */
        if (frame.length < transportOffset + 20) {
            return null
        }

        transportHeaderLength =
            (frame[transportOffset + 12] >> 4) * 4

        if (transportHeaderLength < 20) {
            return null
        }

        if (
            frame.length <
            transportOffset + transportHeaderLength
        ) {
            return null
        }

        sequenceNumber =
            frame.readUInt32BE(transportOffset + 4)

        payloadEnd = ipPacketEnd
    }

    const payloadOffset =
        transportOffset + transportHeaderLength

    if (payloadOffset > payloadEnd) {
        return null
    }

    return {
        protocol: protocol === 6 ? 'TCP' : 'UDP',
        sourceAddress,
        destinationAddress,
        sourcePort,
        destinationPort,
        sequenceNumber,
        payload: frame.subarray(
            payloadOffset,
            payloadEnd
        )
    }
}

function extractIPv6TransportPayload (frame, ipOffset = 0) {
    if (!Buffer.isBuffer(frame)) {
        return null
    }

    if (frame.length < ipOffset + 40) {
        return null
    }

    const version =
        frame[ipOffset] >> 4

    if (version !== 6) {
        return null
    }

    const ipv6PayloadLength =
        frame.readUInt16BE(ipOffset + 4)

    const ipv6PayloadEnd =
        Math.min(
            ipOffset + 40 + ipv6PayloadLength,
            frame.length
        )

    const sourceAddress =
        frame.subarray(
            ipOffset + 8,
            ipOffset + 24
        ).toString('hex')

    const destinationAddress =
        frame.subarray(
            ipOffset + 24,
            ipOffset + 40
        ).toString('hex')

    let nextHeader =
        frame[ipOffset + 6]

    let transportOffset =
        ipOffset + 40

    /*
     * Skip common IPv6 extension headers.
     */
    let extensionHeaderCount = 0
    const maxExtensionHeaders = 16

    while (
        nextHeader === 0 ||   // Hop-by-Hop
        nextHeader === 43 ||  // Routing
        nextHeader === 44 ||  // Fragment
        nextHeader === 51 ||  // Authentication Header
        nextHeader === 60     // Destination Options
    ) {
        extensionHeaderCount++

        if (
            extensionHeaderCount >
            maxExtensionHeaders
        ) {
            return null
        }

        if (
            transportOffset >= ipv6PayloadEnd
        ) {
            return null
        }

        if (nextHeader === 44) {
            /*
             * IPv6 Fragment header is always 8 bytes.
             */
            if (
                transportOffset + 8 >
                ipv6PayloadEnd
            ) {
                return null
            }

            const fragmentInformation =
                frame.readUInt16BE(
                    transportOffset + 2
                )

            const fragmentOffset =
                (fragmentInformation >> 3) & 0x1fff

            const moreFragments =
                (fragmentInformation & 0x0001) !== 0

            /*
             * Ignore fragmented IPv6 packets.
             */
            if (
                fragmentOffset !== 0 ||
                moreFragments
            ) {
                return null
            }

            nextHeader =
                frame[transportOffset]

            transportOffset += 8
            continue
        }

        if (nextHeader === 51) {
            /*
             * Authentication Header length:
             * (Payload Len + 2) * 4 bytes.
             */
            if (
                transportOffset + 2 >
                ipv6PayloadEnd
            ) {
                return null
            }

            const headerLength =
                (frame[transportOffset + 1] + 2) * 4

            if (
                headerLength < 8 ||
                transportOffset + headerLength >
                ipv6PayloadEnd
            ) {
                return null
            }

            nextHeader =
                frame[transportOffset]

            transportOffset += headerLength
            continue
        }

        /*
         * Hop-by-Hop, Routing, and Destination Options:
         * (Hdr Ext Len + 1) * 8 bytes.
         */
        if (
            transportOffset + 2 >
            ipv6PayloadEnd
        ) {
            return null
        }

        const headerLength =
            (frame[transportOffset + 1] + 1) * 8

        if (
            headerLength < 8 ||
            transportOffset + headerLength >
            ipv6PayloadEnd
        ) {
            return null
        }

        nextHeader =
            frame[transportOffset]

        transportOffset += headerLength
    }

    if (nextHeader !== 6 && nextHeader !== 17) {
        return null
    }

    if (transportOffset + 8 > ipv6PayloadEnd) {
        return null
    }

    const sourcePort =
        frame.readUInt16BE(transportOffset)

    const destinationPort =
        frame.readUInt16BE(transportOffset + 2)

    let transportHeaderLength
    let sequenceNumber = null
    let payloadEnd

    if (nextHeader === 17) {
        /*
         * UDP header.
         */
        transportHeaderLength = 8

        const udpLength =
            frame.readUInt16BE(transportOffset + 4)

        if (udpLength < 8) {
            return null
        }

        payloadEnd =
            Math.min(
                transportOffset + udpLength,
                ipv6PayloadEnd
            )
    } else {
        /*
         * TCP header.
         */
        if (transportOffset + 20 > ipv6PayloadEnd) {
            return null
        }

        transportHeaderLength =
            (frame[transportOffset + 12] >> 4) * 4

        if (transportHeaderLength < 20) {
            return null
        }

        if (
            transportOffset + transportHeaderLength >
            ipv6PayloadEnd
        ) {
            return null
        }

        sequenceNumber =
            frame.readUInt32BE(transportOffset + 4)

        payloadEnd = ipv6PayloadEnd
    }

    const payloadOffset =
        transportOffset + transportHeaderLength

    if (payloadOffset > payloadEnd) {
        return null
    }

    return {
        protocol: nextHeader === 6 ? 'TCP' : 'UDP',
        sourceAddress,
        destinationAddress,
        sourcePort,
        destinationPort,
        sequenceNumber,
        payload: frame.subarray(
            payloadOffset,
            payloadEnd
        )
    }
}

function isSipStartLine (data) {
    return (
        /^[!#$%&'*+\-.^_`|~0-9A-Za-z]+[ \t]+\S+[ \t]+SIP\/2\.0$/i
            .test(data) ||
        /^SIP\/2\.0[ \t]+\d{3}[ \t]+[^\r\n]*$/i
            .test(data)
    )
}

function getPacketTimestampMicroseconds (packet) {
    const header = packet?.header

    if (!header) {
        return null
    }

    const seconds =
        header.timestampSeconds ??
        header.ts_sec ??
        header.tv_sec

    const microseconds =
        header.timestampMicroseconds ??
        header.ts_usec ??
        header.tv_usec ??
        0

    const secondsNumber = Number(seconds)
    const microsecondsNumber = Number(microseconds)

    if (
        !Number.isFinite(secondsNumber) ||
        !Number.isFinite(microsecondsNumber) ||
        !Number.isInteger(secondsNumber) ||
        !Number.isInteger(microsecondsNumber) ||
        secondsNumber < 0 ||
        microsecondsNumber < 0 ||
        microsecondsNumber >= 1000000
    ) {
        return null
    }

    const timestamp =
        secondsNumber * 1000000 +
        microsecondsNumber

    return Number.isSafeInteger(timestamp)
        ? timestamp
        : null
}

function getSipStartLineFields (startLine) {
    const requestMatch =
        startLine.match(
            /^([!#$%&'*+\-.^_`|~0-9A-Za-z]+)[ \t]+\S+[ \t]+SIP\/2\.0$/i
        )

    if (requestMatch) {
        return {
            type: 'request',
            method: requestMatch[1],
            response_code: null,
            response_message: null
        }
    }

    const responseMatch =
        startLine.match(
            /^SIP\/2\.0[ \t]+(\d{3})[ \t]+([^\r\n]*)$/i
        )

    if (responseMatch) {
        const message =
            responseMatch[2].trim()

        return {
            type: 'response',
            method: null,
            response_code: Number(responseMatch[1]),
            response_message:
                message === '' ? null : message
        }
    }

    return {
        type: null,
        method: null,
        response_code: null,
        response_message: null
    }
}

function parseSipMessage (message, packetNumber) {
    if (!Buffer.isBuffer(message)) {
        return {
            ok: false,
            ignored: false,
            error:
                `Packet ${packetNumber}: SIP message is not a Buffer`
        }
    }

    const sipMessage = message

    const sipText =
        sipMessage.toString('latin1')

    const firstLineEnd =
        sipText.search(/\r?\n/)

    if (firstLineEnd === -1) {
        return {
            ok: false,
            ignored: true
        }
    }

    const data =
        sipText.slice(0, firstLineEnd)

    if (!isSipStartLine(data)) {
        return {
            ok: false,
            ignored: true
        }
    }

    const headerEnd =
        sipMessage.indexOf(CRLF_CRLF)

    if (headerEnd === -1) {
        return {
            ok: false,
            ignored: false,
            error:
                `Packet ${packetNumber}: incomplete SIP headers`
        }
    }

    const headerText =
        sipMessage
            .subarray(0, headerEnd)
            .toString('latin1')

    const lines =
        headerText.split('\r\n')

    /*
     * Remove the SIP start line.
     */
    lines.shift()

    const unfoldedLines = []

    for (const line of lines) {
        if (
            (line.startsWith(' ') || line.startsWith('\t')) &&
            unfoldedLines.length > 0
        ) {
            const previousLine =
                unfoldedLines.pop()

            unfoldedLines.push(
                `${previousLine} ${line.trim()}`
            )
        } else {
            unfoldedLines.push(line)
        }
    }

    const headers = []

    for (const line of unfoldedLines) {
        const separator =
            line.indexOf(':')

        if (separator <= 0) {
            return {
                ok: false,
                ignored: false,
                error:
                    `Packet ${packetNumber}: malformed SIP header`
            }
        }

        headers.push({
            name: line.slice(0, separator).trim(),
            value: line.slice(separator + 1).trim()
        })
    }

    const bodyStart =
        headerEnd + CRLF_CRLF.length

    const body =
        sipMessage.subarray(bodyStart)

    const startLineFields = getSipStartLineFields(data)

    return {
        ok: true,
        sip_header: data,
        type: startLineFields.type,
        method: startLineFields.method,
        response_code: startLineFields.response_code,
        response_message: startLineFields.response_message,
        headers,
        body,
        raw: message
    }
}

function getContentLength (headerText) {
    const match =
        headerText.match(
            /(?:^|\r\n)(?:Content-Length|l)\s*:\s*(\d+)\s*(?:\r\n|$)/i
        )

    if (!match) {
        return 0
    }

    const contentLength =
        Number(match[1])

    if (
        !Number.isSafeInteger(contentLength) ||
        contentLength < 0
    ) {
        throw new Error(
            'Invalid SIP Content-Length'
        )
    }

    return contentLength
}

function extractCompleteSipMessages (flow) {
    const messages = []

    while (true) {
        const headerEnd =
            flow.stream.indexOf(CRLF_CRLF)

        if (headerEnd === -1) {
            break
        }

        const headerBytes =
            flow.stream.subarray(0, headerEnd)

        const headerText =
            headerBytes.toString('ascii')

        const bodyLength =
            getContentLength(headerText)

        const completeMessageLength =
            headerEnd + 4 + bodyLength

        if (
            flow.stream.length <
            completeMessageLength
        ) {
            /*
             * The SIP message body is incomplete.
             */
            break
        }

        const message =
            flow.stream.subarray(
                0,
                completeMessageLength
            )

        flow.stream =
            flow.stream.subarray(
                completeMessageLength
            )

        messages.push(message)
    }

    return messages
}

class TcpReassembler {
    constructor () {
        this.flows = new Map()
    }

    getFlowKey (transport) {
        return [
            transport.protocol,
            transport.sourceAddress,
            transport.sourcePort,
            transport.destinationAddress,
            transport.destinationPort
        ].join('|')
    }

    add (transport) {
        const key =
            this.getFlowKey(transport)

        let flow =
            this.flows.get(key)

        if (!flow) {
            flow = {
                nextSequence: null,
                pending: new Map(),
                stream: Buffer.alloc(0)
            }

            this.flows.set(key, flow)
        }

        let sequence =
            transport.sequenceNumber

        let payload =
            transport.payload

        if (
            !Number.isInteger(sequence) ||
            !Buffer.isBuffer(payload) ||
            payload.length === 0
        ) {
            return []
        }

        /*
         * This works for normal PCAP captures that do not cross
         * the 32-bit TCP sequence-number wrap boundary.
         */
        if (flow.nextSequence === null) {
            flow.nextSequence = sequence
        }

        /*
         * Ignore data already consumed. This handles retransmissions.
         */
        if (
            sequence + payload.length <=
            flow.nextSequence
        ) {
            return []
        }

        /*
         * Trim an overlap with already-consumed data.
         */
        if (sequence < flow.nextSequence) {
            const overlap =
                flow.nextSequence - sequence

            payload =
                payload.subarray(overlap)

            sequence =
                flow.nextSequence
        }

        if (payload.length === 0) {
            return []
        }

        const existing =
            flow.pending.get(sequence)

        if (
            !existing ||
            payload.length > existing.length
        ) {
            flow.pending.set(
                sequence,
                payload
            )
        }

        /*
         * Drain all segments that now connect to the stream.
         */
        while (true) {
            let selectedSequence = null
            let selectedPayload = null

            for (
                const [
                    pendingSequence,
                    pendingPayload
                ] of flow.pending
            ) {
                const pendingEnd =
                    pendingSequence +
                    pendingPayload.length

                if (
                    pendingSequence <=
                    flow.nextSequence &&
                    pendingEnd > flow.nextSequence
                ) {
                    selectedSequence =
                        pendingSequence

                    selectedPayload =
                        pendingPayload

                    break
                }
            }

            if (
                selectedPayload === null
            ) {
                break
            }

            flow.pending.delete(
                selectedSequence
            )

            const offset =
                Math.max(
                    0,
                    flow.nextSequence -
                    selectedSequence
                )

            const contiguousPayload =
                selectedPayload.subarray(offset)

            if (contiguousPayload.length === 0) {
                continue
            }

            flow.stream =
                Buffer.concat([
                    flow.stream,
                    contiguousPayload
                ])

            flow.nextSequence +=
                contiguousPayload.length
        }

        return extractCompleteSipMessages(flow)
    }
}

export function parseSipPcapData (pcapData) {
    return new Promise((resolve) => {
        if (!Buffer.isBuffer(pcapData)) {
            resolve([
                false,
                'PCAP data must be a Buffer'
            ])
            return
        }

        let parser

        try {
            parser = pcapParser.parse(bufferToReadable(pcapData))
        } catch (error) {
            resolve([
                false,
                `Could not parse PCAP data: ${error.message}`
            ])
            return
        }

        const parsedSipPackets = []
        const tcpReassembler = new TcpReassembler()

        let packetNumber = 0
        let finished = false

        function fail (message) {
            if (finished) {
                return
            }

            finished = true
            resolve([false, message])
        }

        parser.on('packet', function (packet) {
            if (finished) {
                return
            }

            packetNumber++

            if (
                !packet ||
                !Buffer.isBuffer(packet.data)
            ) {
                fail(
                    `Packet ${packetNumber}: packet data is not a Buffer`
                )
                return
            }

            const transport = extractTransportPayload(packet.data)

            /*
             * PCAP files commonly contain non-IP, ARP, ICMP,
             * or otherwise unsupported packets. Skip them.
             */
            if (!transport) {
                return
            }

            /*
             * TCP ACKs and other control packets have no payload.
             */
            if (
                !transport.payload ||
                transport.payload.length === 0
            ) {
                return
            }

            let sipMessages

            try {
                if (transport.protocol === 'TCP') {
                    sipMessages = tcpReassembler.add(transport)
                } else {
                    /*
                     * UDP preserves datagram boundaries.
                     */
                    sipMessages = [
                        transport.payload
                    ]
                }
            } catch (error) {
                fail(
                    `Packet ${packetNumber}: ` +
                    `TCP reassembly failed: ${error.message}`
                )
                return
            }

            for (const sipMessage of sipMessages) {
                const parsedSipMessage =
                    parseSipMessage(
                        sipMessage,
                        packetNumber
                    )

                if (parsedSipMessage.ignored) {
                    /*
                    * The complete application message was not SIP.
                    */
                    continue
                }

                if (!parsedSipMessage.ok) {
                    fail(parsedSipMessage.error)
                    return
                }

                const packetTimestamp = getPacketTimestampMicroseconds(packet)

                const callIdHeader =
                    parsedSipMessage.headers.find(
                        (header) =>
                            header.name.toLowerCase() === 'call-id'
                    )

                const callId = callIdHeader?.value ?? null

                parsedSipPackets.push({
                    packet_number: packetNumber,

                    protocol: transport.protocol,
                    src: transport.sourceAddress,
                    dst: transport.destinationAddress,
                    src_port: transport.sourcePort,
                    dst_port: transport.destinationPort,

                    call_id: callId,

                    timestamp: packetTimestamp,
                    sip_header: parsedSipMessage.sip_header,

                    method: parsedSipMessage.method,
                    response_code: parsedSipMessage.response_code,
                    response_message: parsedSipMessage.response_message,
                    type: parsedSipMessage.type,

                    headers: parsedSipMessage.headers,
                    body: parsedSipMessage.body,
                    unparsed: parsedSipMessage.raw
                })
            }
        })

        parser.on('end', function () {
            if (finished) {
                return
            }

            finished = true
            resolve([
                true,
                parsedSipPackets,
                packetNumber
            ])
        })

        parser.on('error', function (error) {
            fail(
                `PCAP parser error after packet ${packetNumber}: ${error.message}`
            )
        })
    })
}
