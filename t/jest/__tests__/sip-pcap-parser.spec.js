import fs from 'fs'
import path from 'path'

import { parseSipPcapData } from 'src/helpers/sip-pcap-parser'

const fixturePath = path.join(
    __dirname,
    '../fixtures/sip-pcap-parser/example.pcap'
)

describe('parseSipPcapData', () => {
    it('rejects non-Buffer input', async () => {
        const [ok, result] = await parseSipPcapData('not-a-buffer')
        expect(ok).toBe(false)
        expect(result).toBe('PCAP data must be a Buffer')
    })

    it('finds no SIP messages in data that is not a valid PCAP capture', async () => {
        const [ok, result] = await parseSipPcapData(Buffer.from('not a pcap'))
        expect(ok).toBe(true)
        expect(result).toEqual([])
    })

    it('parses the SIP messages out of a PCAP capture, in order', async () => {
        const pcapData = fs.readFileSync(fixturePath)
        const [ok, result] = await parseSipPcapData(pcapData)

        expect(ok).toBe(true)
        expect(Array.isArray(result)).toBe(true)
        expect(result).toHaveLength(11)

        expect(result.map((message) => message.type)).toEqual([
            'request', 'request', 'request', 'request',
            'request', 'request', 'request', 'request',
            'response', 'response', 'response'
        ])

        expect(result[0]).toMatchObject({
            protocol: 'UDP',
            type: 'request',
            method: 'OPTIONS',
            response_code: null,
            call_id: '545f77af5712c544-3325@127.0.0.1'
        })

        expect(result.at(-1)).toMatchObject({
            protocol: 'UDP',
            type: 'response',
            method: null,
            response_code: 408,
            call_id: '545f77af5712c544-3325@127.0.0.1'
        })

        result.forEach((message, index) => {
            expect(Buffer.isBuffer(message.body)).toBe(true)
            expect(Buffer.isBuffer(message.unparsed)).toBe(true)
            expect(Array.isArray(message.headers)).toBe(true)
            expect(Number.isInteger(message.packet_number)).toBe(true)
            expect(message.packet_number).toBeGreaterThan(0)
            if (index > 0) {
                // Matches this capture's own chronological packet order - not
                // guaranteed in general (see call-flow.spec.js for a case where
                // a skipped non-SIP packet makes this non-contiguous).
                expect(message.packet_number).toBeGreaterThan(result[index - 1].packet_number)
            }
        })
    })
})
