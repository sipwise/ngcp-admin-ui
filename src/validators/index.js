import {
    i18n
} from 'boot/i18n'

export const errorMessages = {
    ip () {
        return i18n.global.tc('Input must be a valid IPv4 or IPv6')
    },
    minValue (params) {
        return i18n.global.tc('Only values higher than {min} are allowed', params)
    },
    integer () {
        return i18n.global.tc('Only none decimal numbers are allowed')
    },
    required () {
        return i18n.global.tc('Input is required')
    },
    email () {
        return i18n.global.tc('Input must be a valid email address')
    },
    domainOrIP () {
        return i18n.global.tc('Input must be a valid domain or ip')
    },
    numeric () {
        return i18n.global.tc('Input must be a valid number')
    },
    between (params) {
        return i18n.global.tc('Input must be between {min} and {max}', params)
    },
    passwordStrength () {
        return i18n.global.tc('Input is considered as a weak password')
    },
    passwordDigits () {
        return i18n.global.tc('Password must contain at least 3 digits.')
    },
    passwordLength () {
        return i18n.global.tc('Password must be at least 12 characters long')
    },
    passwordLowercase () {
        return i18n.global.tc('Password must contain at least 3 lowercase letters.')
    },
    passwordUppercase () {
        return i18n.global.tc('Password must contain at least 3 uppercase letters.')
    },
    passwordChars () {
        return i18n.global.tc('Password must contain at least 3 special chars.')
    },
    sameAsPassword () {
        return i18n.global.tc('Password has to be the same')
    },
    minLength (params) {
        return i18n.global.tc('Input must be at least {min} characters', params)
    },
    maxLength (params) {
        return i18n.global.tc('Input must be no longer than {max} characters', params)
    },
    isIBAN () {
        return i18n.global.tc('Input a valid IBAN')
    },
    isBIC () {
        return i18n.global.tc('Input a valid BIC or SWIFT')
    },
    isTime () {
        return i18n.global.tc('Input a valid time in HH:MM or HH:MM:ss format')
    },
    numberRequired () {
        return i18n.global.tc('Phone number is required')
    },
    onlyDigits () {
        return i18n.global.tc('Only digits are allowed')
    },
    isValidRegExp () {
        return i18n.global.tc('Invalid regular expression')
    },
    date () {
        return i18n.global.tc('Input must be a valid date for e.g : YYYY-MM')
    }
}
