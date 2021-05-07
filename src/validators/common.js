import validator from 'validator'

export function isBIC (value) {
    if (value && value !== '') {
        return value && value !== '' && validator.isBIC(value)
    }
    return true
}

export function isIBAN (value) {
    if (value && value !== '') {
        return value && value !== '' && validator.isIBAN(value)
    }
    return true
}
