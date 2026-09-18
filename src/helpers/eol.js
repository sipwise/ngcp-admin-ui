import { PLATFORM_CE } from 'src/constants'

const EOL_NOTICE_ROLES = [
    'adminSuperuser',
    'adminSuperuserReadOnly',
    'adminSuperuserMaster',
    'adminSuperuserMasterReadOnly'
]

function addUtcMonths (date, months) {
    const result = new Date(date)
    const day = result.getUTCDate()
    result.setUTCDate(1)
    result.setUTCMonth(result.getUTCMonth() + months)
    result.setUTCDate(Math.min(day, new Date(Date.UTC(result.getUTCFullYear(), result.getUTCMonth() + 1, 0)).getUTCDate()))
    return result
}

export function getEolStatus (platformInfo, internalRole, now = new Date()) {
    const releaseInfo = platformInfo?.release_info
    const installed = releaseInfo?.this
    const release = installed?.release
    const releaseDetails = releaseInfo?.[release]
    const expiresAt = new Date(releaseDetails?.expires)

    if (!EOL_NOTICE_ROLES.includes(internalRole) ||
        !release ||
        !releaseDetails ||
        Number.isNaN(expiresAt.getTime()) ||
        (!installed.type && !platformInfo?.type) ||
        installed.type === PLATFORM_CE ||
        platformInfo?.type === PLATFORM_CE) {
        return null
    }

    const expired = expiresAt <= now

    if (expiresAt > addUtcMonths(now, 12)) {
        return null
    }

    return {
        color: expiresAt >= addUtcMonths(now, 6) ? 'warning' : 'negative',
        expired,
        expiresAt,
        release
    }
}
