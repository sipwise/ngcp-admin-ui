import { i18n } from 'boot/i18n'

export default [
    {
        name: 'maliciousCallList',
        path: '/maliciouscall',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.maliciouscalls'
            },
            get label () {
                return i18n.t('Malicious Calls')
            },
            icon: 'fas fa-phone-alt',
            proxy: true,
            platformInfo: 'malicious_call'
        }
    },
    {
        name: 'maliciousCallCatchAll',
        path: '/maliciouscall/*',
        component: () => import('pages/Proxy'),
        meta: {
            $p: {
                operation: 'update',
                resource: 'entity.maliciouscalls'
            },
            proxy: true,
            platformInfo: 'malicious_call'
        }
    }
]
