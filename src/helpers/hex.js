// Hex-encodes an arbitrary string (UTF-8 bytes -> lowercase hex)
// (e.g. "default/name-test" -> "64656661756c742f6e616d652d74657374").
export function encodeHex (text) {
    return Array.from(new TextEncoder().encode(text))
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('')
}

export function decodeHex (hex) {
    const bytes = hex.match(/.{2}/g)?.map((byte) => parseInt(byte, 16)) ?? []
    return new TextDecoder().decode(new Uint8Array(bytes))
}
