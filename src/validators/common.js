import validator from 'validator'
import { testPattern } from 'quasar/src/utils/patterns'

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

export function isColor (value, allowEmpty = true) {
    const validColor = testPattern.anyColor(value)
    return allowEmpty ? validColor || !value || String(value).length < 1 : validColor
}
