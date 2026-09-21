/**
 * Encodes a SIP Call-ID into a base64url string safe to use as a Vue-router path
 * segment. Plain base64 (as previously done ad hoc via `btoa(callId)` at a couple
 * of call sites) can contain `+` and `/`, which are unsafe/ambiguous in a URL path -
 * this encodes to the URL-safe alphabet and strips padding.
 *
 * @param {string} callId
 * @returns {string}
 */
export function encodeCallId (callId) {
    return btoa(callId ?? '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '')
}

/**
 * Reverses encodeCallId(). Also accepts plain (non-url-safe) base64 with or
 * without padding, so it can decode call-ids encoded by the previous ad hoc
 * `btoa(callId)` call sites during the migration.
 *
 * @param {string} encodedCallId
 * @returns {string}
 */
export function decodeCallId (encodedCallId) {
    const base64 = (encodedCallId ?? '')
        .replace(/-/g, '+')
        .replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    return atob(padded)
}
