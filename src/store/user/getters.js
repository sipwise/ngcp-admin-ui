import { i18n } from 'boot/i18n'
import _ from 'lodash'
import { internalPermissions } from 'src/acl'
import { PLATFORM_CE } from 'src/constants'

export function isEntityCreationRequesting (state) {
    return state.entityCreationState === 'requesting'
}

export function hasEntityCreationFailed (state) {
    return state.entityCreationState === 'failed'
}

export function entityCreationError (state) {
    return state.entityCreationError
}

export function isEntityUpdateRequesting (state) {
    return state.entityUpdateState === 'requesting'
}

export function hasEntityUpdateFailed (state) {
    return state.entityUpdateState === 'failed'
}

export function entityUpdateError (state) {
    return state.entityUpdateError
}

export function entityLoaded (state) {
    return state.entityLoaded
}

export function isEntityLoadRequesting (state) {
    return state.entityLoadState === 'requesting'
}

export function hasEntityLoadFailed (state) {
    return state.entityUpdateState === 'failed'
}

export function entityLoadError (state) {
    return state.entityUpdateError
}

export function isLoggedIn (state) {
    return state.loginState === 'succeeded' && state.user !== null
}

export function OTPSecret (state) {
    return state.OTPSecret
}

export function userName (state) {
    const login = _.get(state.user, 'login', null)
    if (login !== null) {
        return login
    }
    const email = _.get(state.user, 'email', null)
    if (email !== null) {
        return email
    }
    const role = _.get(state.user, 'role', null)
    if (role !== null) {
        return role
    }
    return i18n.global.t('UnknownUser')
}

export function userId (state) {
    return _.get(state, 'user.id', null)
}

export function isDialogRequesting (state) {
    return state.dialogState === 'requesting'
}

export function hasDialogSucceeded (state) {
    return state.dialogState === 'succeeded'
}

export function hasDialogFailed (state) {
    return state.dialogState === 'failed'
}

export function dialogError (state) {
    return state.dialogError
}

export function isSuperUser (state) {
    return state.user !== null && state.user.is_superuser
}

export function isMaster (state) {
    return state.user !== null && state.user.is_master
}

export function isCustomerCare (state) {
    return state.user !== null && state.user.is_ccare
}

export function isSystem (state) {
    return state.user !== null && state.user.is_system
}

export function isLawfulIntercept (state) {
    return state.user !== null && state.user.lawful_intercept
}

export function userRole (state) {
    return state?.user?.role
}

export function isReseller (state, getters) {
    return getters.userRole === 'reseller'
}

export function internalRole (state) {
    const user = state.user
    if (!user) {
        return null
    }

    const isMaster = user.is_master
    const isReadOnly = user.read_only
    const isSuperUser = (user.role === 'admin' && user.is_superuser) || user.role === 'system'
    const isSuperUserMaster = isSuperUser && isMaster
    const isSystem = user.role === 'admin' && user.is_system
    const isCCareAdmin = user.role === 'ccareadmin' || (user.is_ccare && isSuperUser)
    const isCustomerCare = user.role === 'ccare' || user.is_ccare

    if (user.role === 'lintercept' || user.lawful_intercept) {
        return 'adminLintercept'
    }
    if (isCCareAdmin) {
        return isReadOnly ? 'adminCcareSuperuserReadOnly' : 'adminCcareSuperuser'
    }
    if (isCustomerCare) {
        return isReadOnly ? 'adminCcareReadOnly' : 'adminCcare'
    }
    if (isSystem || isSuperUserMaster) {
        return isReadOnly
            ? 'adminSuperuserMasterReadOnly'
            : 'adminSuperuserMaster'
    }
    if (isSuperUser && !isMaster) {
        return isReadOnly
            ? 'adminSuperuserReadOnly'
            : 'adminSuperuser'
    }
    if (user.role === 'reseller') {
        if (isMaster) {
            return isReadOnly
                ? 'adminResellerMasterReadOnly'
                : 'adminResellerMaster'
        }
        return isReadOnly ? 'adminResellerReadOnly' : 'adminReseller'
    }
    return null
}

export function permissions (state, getters) {
    if (getters.internalRole === null) {
        return {}
    }
    return internalPermissions[getters.internalRole]
}

export function hasCapability (state) {
    return (capability) => {
        return _.get(state.capabilities, capability, false)
    }
}

export function isMaintenanceMode (state) {
    return _.get(state.platformInfo, 'maintenance_mode', null)
}

export function hasLicenses (state) {
    const platformVersion = state?.platformInfo?.type
    return (license) => {
        if (platformVersion && license && platformVersion !== PLATFORM_CE) {
            return license.every((i) => state.platformInfo?.licenses?.includes(i))
        }
        return true
    }
}

export function passwordRequirements (state) {
    return state.platformInfo?.security?.password || []
}

export function hasPasswordChangeSucceeded (state) {
    return state.passwordChangeState === 'succeeded'
}

export function hasPasswordChangeFailed (state) {
    return state.passwordChangeState === 'failed'
}

export function passwordChangeError (state) {
    return state.passwordChangeError
}
export function canUserResetPassword (state) {
    return state.user.can_reset_password
}

export function sipExternalSbc (state) {
    const value = state.platformInfo?.sip?.external_sbc
    if (value === null || value === undefined) {
        return null
    }
    const values = Array.isArray(value) ? value : [value]
    return values.map((item) => `<${item};lr>`)
}
