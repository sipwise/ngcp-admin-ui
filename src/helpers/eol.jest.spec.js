import { getEolStatus } from 'src/helpers/eol'

const now = new Date('2026-01-01T00:00:00Z')

function platformInfo ({ expires = '2026-12-31T23:59:59Z', lts = true, type = 'sppro' } = {}) {
    return {
        type,
        release_info: {
            'mr26.0.1': { expires, lts },
            this: { release: 'mr26.0.1', type }
        }
    }
}

describe('getEolStatus', () => {
    it.each([
        ['resellers', platformInfo(), 'adminReseller'],
        ['reseller masters', platformInfo(), 'adminResellerMaster'],
        ['customer care agents', platformInfo(), 'adminCcare'],
        ['customer care superusers', platformInfo(), 'adminCcareSuperuser'],
        ['lawful intercept admins', platformInfo(), 'adminLintercept'],
        ['logged-out users', platformInfo(), undefined],
        ['CE in platform info', { ...platformInfo(), type: 'spce' }, 'adminSuperuser'],
        ['CE in release info', { ...platformInfo({ type: 'spce' }), type: 'sppro' }, 'adminSuperuser'],
        ['missing platform info', null, 'adminSuperuser'],
        ['a missing release', { type: 'sppro', release_info: {} }, 'adminSuperuser'],
        ['missing release details', { type: 'sppro', release_info: { this: { release: 'mr26.0.1', type: 'sppro' } } }, 'adminSuperuser'],
        ['a missing platform type', platformInfo({ type: null }), 'adminSuperuser'],
        ['an invalid expiry date', platformInfo({ expires: 'invalid' }), 'adminSuperuser'],
        ['an LTS release with EOL over a year away', platformInfo({ expires: '2027-01-01T00:00:01Z' }), 'adminSuperuser'],
        ['an LTS release just over a year after leap day', platformInfo({ expires: '2025-02-28T00:00:00.001Z' }), 'adminSuperuser', new Date('2024-02-29T00:00:00Z')],
        ['a non-LTS release with EOL over a year away', platformInfo({ expires: '2027-01-01T00:00:01Z', lts: false }), 'adminSuperuser']
    ])('hides the notice for %s', (description, info, role, today = now) => {
        expect(getEolStatus(info, role, today)).toBeNull()
    })

    it.each([
        ['shows yellow with exactly one year left', { expires: '2027-01-01T00:00:00Z' }, 'warning', false],
        ['shows yellow with exactly six months left', { expires: '2026-07-01T00:00:00Z' }, 'warning', false],
        ['shows red with less than six months left', { expires: '2026-06-30T23:59:59Z' }, 'negative', false],
        ['marks the release expired at its EOL time', { expires: '2026-01-01T00:00:00Z' }, 'negative', true],
        ['shows red for a release expired well past its EOL date', { expires: '2025-12-31T23:59:59Z' }, 'negative', true],
        ['counts August 31 to February 28 as six months', { expires: '2026-02-28T00:00:00Z' }, 'warning', false, new Date('2025-08-31T00:00:00Z')],
        ['counts August 31 to February 29 as six months in a leap year', { expires: '2024-02-29T00:00:00Z' }, 'warning', false, new Date('2023-08-31T00:00:00Z')],
        ['shows yellow for a non-LTS release with EOL months away', { expires: '2026-12-31T23:59:59Z', lts: false }, 'warning', false],
        ['shows red for a non-LTS release with EOL under six months away', { expires: '2026-06-30T23:59:59Z', lts: false }, 'negative', false],
        ['still marks a non-LTS release as expired once past its EOL date', { expires: '2025-12-31T23:59:59Z', lts: false }, 'negative', true],
        ['also shows the notice for superuser masters', { expires: '2026-06-30T23:59:59Z' }, 'negative', false, now, 'adminSuperuserMaster'],
        ['also shows the notice for read-only superusers', { expires: '2026-06-30T23:59:59Z' }, 'negative', false, now, 'adminSuperuserReadOnly']
    ])('%s', (description, release, color, expired, today = now, role = 'adminSuperuser') => {
        expect(getEolStatus(platformInfo(release), role, today)).toEqual({
            color,
            expired,
            expiresAt: new Date(release.expires),
            release: 'mr26.0.1'
        })
    })

    it('falls back to the platform type when the release has none', () => {
        const info = platformInfo()
        delete info.release_info.this.type
        expect(getEolStatus(info, 'adminSuperuser', now)?.color).toBe('warning')
    })
})
