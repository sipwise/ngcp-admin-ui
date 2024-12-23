import isCidr from 'is-cidr'
import validator from 'validator'

export function ip (value) {
    if (value === undefined || value === null) {
        return false
    }
    return validator.isIP(value) || isCidr(value) === 4 || isCidr(value) === 6
}
