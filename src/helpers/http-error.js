function extractHtmlErrorTitle (data, status) {
    if (typeof data !== 'string') {
        return null
    }
    const match = data.match(/<title>\s*([^<]*?)\s*<\/title>/i)
    const title = match ? match[1].trim() : null
    return title && title.startsWith(String(status)) ? title : null
}

export function getHttpErrorMessage (err, fallbackMessage) {
    const status = err?.response?.status
    if (!status) {
        return fallbackMessage
    }
    const htmlTitle = extractHtmlErrorTitle(err.response.data, status)
    if (htmlTitle) {
        return htmlTitle
    }
    const statusText = err.response.statusText || err.message
    return statusText ? `${status} ${statusText}` : `${status}`
}

export function capitalizeFirstLetter (str) {
    if (!str) {
        return str
    }
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function defaultEntryFormat (entry) {
    return capitalizeFirstLetter(entry.message)
}

/**
 * The message of an API v2 error body, null when it only repeats the first failure, as for the errors.json errors.
 * For a capped list of such errors only the "100 of 120 errors shown" part is kept.
 */
export function getApiErrorSummary (data) {
    const entries = Array.isArray(data?.errors) ? data.errors : []
    if (!data?.message) {
        return null
    }
    const shown = data.message.match(/\s*\((\d+ of \d+ errors shown)\)$/)
    const message = shown ? data.message.slice(0, shown.index) : data.message
    if (entries.length > 0 && message.toLowerCase() === String(entries[0].message).toLowerCase()) {
        return shown ? shown[1] : null
    }
    return data.message
}

/**
 * Builds the text of an API v2 error body: the message followed by the single failures of errors[].
 * The message is left out when it repeats the first failure.
 */
export function getApiErrorMessage (data, formatEntry = defaultEntryFormat) {
    const entries = Array.isArray(data?.errors) ? data.errors : []
    if (entries.length === 0) {
        return data?.message
    }
    const details = entries.map(formatEntry).join('. ')
    const summary = getApiErrorSummary(data)
    return summary ? `${summary}: ${details}` : details
}

/**
 * The errors[] entries of one item of a bulk request, pointer "/<key>" or "/<key>/...".
 * The key is the index for an array body (POST) and the id for a body keyed by id (PUT/PATCH).
 */
export function getApiErrorEntriesForItem (data, key) {
    const entries = Array.isArray(data?.errors) ? data.errors : []
    const itemPointer = `/${String(key).replaceAll('~', '~0').replaceAll('/', '~1')}`
    return entries.filter(({ pointer }) => pointer === itemPointer || pointer?.startsWith(`${itemPointer}/`))
}
