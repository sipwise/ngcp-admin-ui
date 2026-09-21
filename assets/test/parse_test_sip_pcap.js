#!/usr/bin/env nodejs

'use strict'

/* eslint-disable no-console -- this is a manual CLI inspection script, console output is the point */

const assert = require('assert')
const fs = require('fs/promises')
const path = require('path')

const { parseSipPcapData } = require('../sip-pcap-parser')

async function main () {
    const pcapFile = process.argv[2]

    if (!pcapFile) {
        console.error(
            'Usage: node test/sip-pcap-parser.test.js <path-to-pcap-file>'
        )
        process.exitCode = 1
        return
    }

    const filePath = path.resolve(pcapFile)
    const data = await fs.readFile(filePath)
    const [ok, result] = await parseSipPcapData(data)

    assert.strictEqual(
        ok,
        true,
        `PCAP parsing failed: ${result}`
    )

    assert.ok(
        Array.isArray(result),
        'Expected the parser result to be an array'
    )

    console.log(`Successfully parsed ${result.length} SIP message(s)`)

    if (result.length > 0) {
        console.dir(result, { depth: null, colors: true })
        console.log('Raw unparsed messages:')
        for (const msg of result) {
            console.log(msg.unparsed.toString('latin1'))
        }
        console.log('Message bodies:')
        for (const msg of result) {
            const textBody = msg.body.toString('latin1')
            if (textBody) {
                console.log(`Body of: ${msg.sip_header}`)
                console.log(textBody)
            }
        }
    }
}

main().catch((error) => {
    console.error(error)
    process.exitCode = 1
})
