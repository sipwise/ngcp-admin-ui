import validator from 'validator'
import { testPattern } from 'quasar/src/utils/patterns'
import { numeric } from 'vuelidate/lib/validators'
import _ from 'lodash'

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

export function isTime (value) {
    if (!value || typeof value !== 'string' || value.length < 1) {
        return false
    }
    const time = value.split(':')
    return [2, 3].includes(time.length) &&
        parseInt(time[0], 10) >= 0 && parseInt(time[0], 10) <= 23 &&
        parseInt(time[1], 10) >= 0 && parseInt(time[1], 10) <= 59 &&
        (time.length === 2 || (parseInt(time[2], 10) >= 0 && parseInt(time[2], 10) <= 59))
}

export async function onlyDigits (value) {
    const ac = _.get(value, 'ac', null)
    const cc = _.get(value, 'cc', null)
    const sn = _.get(value, 'sn', null)
    return numeric(ac) && numeric(cc) && numeric(sn)
}
