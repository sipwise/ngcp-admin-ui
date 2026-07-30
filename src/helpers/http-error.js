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
