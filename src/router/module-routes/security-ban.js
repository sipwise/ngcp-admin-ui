import { i18n } from 'boot/i18n'
import { LICENSES } from 'src/constants'

export default [
    {
        name: 'securityBans',
        path: '/securitybans',
        redirect: (to) => {
            return { name: 'securityBansWebSubsPage', params: to.params }
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.securitybans'
            },
            get label () {
                return i18n.global.t('Security Bans')
            },
            icon: 'fas fa-ban',
            licenses: [LICENSES.device_provisioning, LICENSES.pbx],
            root: true
        }
    },
    {
        name: 'securityBansSipIpsPage',
        path: '/securitybans/ips',
        component: () => import('pages/security-bans/AuiSecurityBansPage'),
        props: {
            showBannedSipIps: true
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.bannedips'
            },
            get label () {
                return i18n.global.t('Banned SIP IPs')
            },
            licenses: [LICENSES.device_provisioning, LICENSES.pbx],
            goToPathRewrite: ({ url }) => {
                url.pathname = '/security'
                return url
            },
            parentPath: 'securityBans'
        }
    },
    {
        name: 'securityBansSipUsersPage',
        path: '/securitybans/users',
        component: () => import('pages/security-bans/AuiSecurityBansPage'),
        props: {
            showBannedSipUsers: true
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.bannedusers'
            },
            get label () {
                return i18n.global.t('Banned SIP Users')
            },
            licenses: [LICENSES.device_provisioning, LICENSES.pbx],
            goToPathRewrite: ({ url }) => {
                url.pathname = '/security'
                return url
            },
            parentPath: 'securityBans'
        }
    },
    {
        name: 'securityBansWebAdminsPage',
        path: '/securitybans/admins',
        component: () => import('pages/security-bans/AuiSecurityBansPage'),
        props: {
            showBannedWebAdmins: true
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.bannedadmins'
            },
            get label () {
                return i18n.global.t('Banned Web Admins')
            },
            licenses: [LICENSES.device_provisioning, LICENSES.pbx],
            goToPathRewrite: ({ url }) => {
                url.pathname = '/security'
                return url
            },
            parentPath: 'securityBans'
        }
    },
    {
        name: 'securityBansWebSubsPage',
        path: '/securitybans/subs',
        component: () => import('pages/security-bans/AuiSecurityBansPage'),
        props: {
            showBannedWebSubs: true
        },
        meta: {
            $p: {
                operation: 'read',
                resource: 'entity.bannedsubs'
            },
            get label () {
                return i18n.global.t('Banned Web Subs')
            },
            licenses: [LICENSES.device_provisioning, LICENSES.pbx],
            goToPathRewrite: ({ url }) => {
                url.pathname = '/security'
                return url
            },
            parentPath: 'securityBans'
        }
    }
]
