import {
    i18n
} from 'boot/i18n'

export const errorMessages = {
    ip () {
        return i18n.t('Input must be a valid IPv4 or IPv6')
    },
    minValue (params) {
        return i18n.t('Only values higher than {min} are allowed', params)
    },
    integer () {
        return i18n.t('Only none decimal numbers are allowed')
    },
    required () {
        return i18n.t('Input is required')
    },
    email () {
        return i18n.t('Input must be a valid email address')
    },
    domainOrIP () {
        return i18n.t('Input must be a valid domain or ip')
    },
    numeric () {
        return i18n.t('Input must be a valid number')
    },
    between (params) {
        return i18n.t('Input must be between {min} and {max}', params)
    },
    passwordStrength () {
        return i18n.t('Input is considered as a weak password')
    },
    sameAsPassword () {
        return i18n.t('Password has to be the same')
    },
    minLength (params) {
        return i18n.t('Input must be at least {min} characters', params)
    },
    maxLength (params) {
        return i18n.t('Input must be no longer than {max} characters', params)
    },
    isIBAN () {
        return i18n.t('Input a valid IBAN')
    },
    isBIC () {
        return i18n.t('Input a valid BIC or SWIFT')
    },
    isTime () {
        return i18n.t('Input a valid time in HH:MM or HH:MM:ss format')
    },
    numberRequired () {
        return i18n.t('Phone number is required')
    },
    onlyDigits () {
        return i18n.t('Only digits are allowed')
    }
}
