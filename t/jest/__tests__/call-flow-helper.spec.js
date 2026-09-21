import { decodeCallId, encodeCallId } from 'src/helpers/callFlow'

describe('callflow helper', () => {
    it('round-trips a plain call-id', () => {
        const callId = 'abcd1234@10.0.0.1'
        expect(decodeCallId(encodeCallId(callId))).toBe(callId)
    })

    it('round-trips a call-id that would contain base64 padding', () => {
        const callId = 'a'
        expect(decodeCallId(encodeCallId(callId))).toBe(callId)
    })

    it('produces a URL-safe alphabet with no padding', () => {
        const encoded = encodeCallId('>>>???///+++@@@')
        expect(encoded).not.toMatch(/[+/=]/)
    })

    it('decodes plain (non-url-safe) base64 produced by the legacy btoa call sites', () => {
        const callId = 'legacy-call-id@10.0.0.1'
        const legacyEncoded = btoa(callId).replace(/=+$/, '')
        expect(decodeCallId(legacyEncoded)).toBe(callId)
    })

    it('handles nullish input without throwing', () => {
        expect(encodeCallId(undefined)).toBe('')
        expect(decodeCallId(undefined)).toBe('')
    })
})
