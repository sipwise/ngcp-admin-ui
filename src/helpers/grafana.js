export const GRAFANA_JWT_COOKIE = 'grafana_jwt'
export const GRAFANA_ADMIN_COOKIE = 'grafana_admin'
export const GRAFANA_COOKIE_MAX_AGE = 300
export const GRAFANA_COOKIE_REFRESH_INTERVAL = 120000

function setGrafanaCookie (name, value, maxAge) {
    const secure = window.location.protocol === 'https:' ? '; Secure' : ''
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/grafana; max-age=${maxAge}; SameSite=Strict${secure}`
}

export function setGrafanaAuthCookies ({ jwt, isAdminPage }) {
    if (!jwt) {
        return
    }
    setGrafanaCookie(GRAFANA_JWT_COOKIE, jwt, GRAFANA_COOKIE_MAX_AGE)
    setGrafanaCookie(GRAFANA_ADMIN_COOKIE, isAdminPage ? 'yes' : 'no', GRAFANA_COOKIE_MAX_AGE)
}

export function deleteGrafanaAuthCookies () {
    [
        GRAFANA_JWT_COOKIE,
        GRAFANA_ADMIN_COOKIE
    ].forEach((name) => setGrafanaCookie(name, '', 0))
}

export function getGrafanaRequestBaseUrl () {
    return `${window.location.origin}/grafana`
}

export function buildGrafanaUrl (baseUrl, path, searchParams = {}) {
    const url = new URL(`${baseUrl.replace(/\/+$/, '')}/${String(path ?? '').replace(/^\/+/, '')}`)
    Object.entries(searchParams).forEach(([key, value]) => url.searchParams.set(key, value))
    return url
}
