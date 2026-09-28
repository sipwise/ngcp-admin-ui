import { decodeHex, encodeHex } from 'src/helpers/hex'

describe('hex helper', () => {
    it('encodes a plain string to lowercase hex', () => {
        expect(encodeHex('default/name-test')).toBe('64656661756c742f6e616d652d74657374')
    })

    it('decodes hex back to the original string', () => {
        expect(decodeHex('64656661756c742f6e616d652d74657374')).toBe('default/name-test')
    })

    it('round-trips a name containing spaces, slashes and dashes unambiguously', () => {
        const original = 'my reseller/my template-name with spaces'
        expect(decodeHex(encodeHex(original))).toBe(original)
    })

    it('round-trips non-ASCII characters correctly', () => {
        const original = 'reseller-ü/tëmplate'
        expect(decodeHex(encodeHex(original))).toBe(original)
    })
})
