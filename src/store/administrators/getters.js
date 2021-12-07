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

export function adminCertRequesting (state) {
    return state.adminCertState === 'requesting'
}

export function adminRolesList () {
    // TODO: should be obtained via API when an appropriate endpoint be ready (DB: billing.acl_roles)
    return [
        {
            value: 'system',
            label: i18n.t('System')
        },
        {
            value: 'admin',
            label: i18n.t('Admin')
        },
        {
            value: 'reseller',
            label: i18n.t('Reseller')
        },
        {
            value: 'ccareadmin',
            label: i18n.t('Customer Care Admin')
        },
        {
            value: 'ccare',
            label: i18n.t('Customer Care')
        },
        {
            value: 'lintercept',
            label: i18n.t('Lawful Intercept')
        }
    ].map(item => {
        item.label = `${item.value} - ${item.label}`
        return item
    })
}
