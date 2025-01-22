import { i18n } from 'boot/i18n'

export function isAdminLoading (state) {
    return state.adminState === 'requesting'
}

export function hasAdminFailed (state) {
    return state.adminState === 'failed'
}

export function isAdminUpdating (state) {
    return state.adminUpdateState === 'requesting'
}

export function hasAdminUpdateSucceeded (state) {
    return state.adminUpdateState === 'succeeded'
}

export function hasAdminUpdateFailed (state) {
    return state.adminUpdateState === 'failed'
}

export function adminRolesList () {
    // TODO: should be obtained via API when an appropriate endpoint be ready (DB: billing.acl_roles)
    return [
        {
            value: 'system',
            label: i18n.global.t('System')
        },
        {
            value: 'admin',
            label: i18n.global.t('Admin')
        },
        {
            value: 'reseller',
            label: i18n.global.t('Reseller')
        },
        {
            value: 'ccareadmin',
            label: i18n.global.t('Customer Care Admin')
        },
        {
            value: 'ccare',
            label: i18n.global.t('Customer Care')
        },
        {
            value: 'lintercept',
            label: i18n.global.t('Lawful Intercept')
        }
    ].map((item) => {
        item.label = `${item.value} - ${item.label}`
        return item
    })
}

export function authModeOptions () {
    return [
        {
            label: i18n.global.t('Local'),
            value: 'local'
        },
        {
            label: i18n.global.t('LDAP'),
            value: 'ldap'
        }
    ]
}
