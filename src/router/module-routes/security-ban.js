import { i18n } from 'boot/i18n'

export default [
    {
        name: 'securityBans',
        path: '/security',
        component: () => import('pages/AuiPageSecurityBans'),
        meta: {
            $p: {
                operation: 'read',
                resource: ['entity.bannedips', 'entity.bannedusers']
            },
            get label () {
                return i18n.global.tc('Security Bans')
            },
            icon: 'fas fa-ban'
        }
    }
]
