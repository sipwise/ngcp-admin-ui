import { i18n } from 'boot/i18n'
import { createAdvancedJournalRoute } from 'src/router/common'

export default [
    {
        name: 'maliciousCallList',
        path: '/maliciouscall',
        component: () => import('pages/malicious-calls/AuiMaliciousCallsList'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.maliciouscalls'
            },
            get label () {
                return i18n.global.t('Malicious Calls')
            },
            icon: 'fas fa-phone-alt',
            root: true,
            platformInfo: 'malicious_call'
        }
    },
    createAdvancedJournalRoute({
        name: 'maliciousCallJournalAdvanced',
        path: '/maliciouscalls/journal',
        resource: 'maliciouscalls',
        parentPath: 'maliciousCallList'
    })
]
