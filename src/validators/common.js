import { email, helpers } from '@vuelidate/validators'
import _ from 'lodash'
import { patterns } from 'quasar'
import validator from 'validator'
const { testPattern } = patterns

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

export async function numberRequired (value) {
    const ac = _.get(value, 'ac', null)
    const cc = _.get(value, 'cc', null)
    const sn = _.get(value, 'sn', null)
    return ac && cc && sn
}

export async function onlyDigits (value) {
    const ac = _.get(value, 'ac', null)
    const cc = _.get(value, 'cc', null)
    const sn = _.get(value, 'sn', null)
    return !isNaN(ac) && !isNaN(cc) && !isNaN(sn)
}
export function date (value) {
    const regex = /^\d{4}-\d{2}$/
    return regex.test(value)
}
export const validationEndDate = {
    $validator: (value, { start }) => {
        if (!value || !start) {
            return true
        }
        const endDate = new Date(value)
        const startDate = new Date(start)
        return endDate >= startDate
    },
    $message: 'End date cannot be prior to start date'
}
export function commaSeparatedEmails (value) {
    if (typeof value === 'undefined' || value === null || value === '') {
        return true
    }
    const emails = String(value).split(',').map((e) => e.trim())
        .reduceRight(function removeTrailingCommas (acc, e) {
            if (acc.length !== 0 || e.length !== 0) {
                acc.push(e)
            }
            return acc
        }, [])
    const containsErrors = emails.some((e) => e.length === 0 || !email.$validator(e))
    return emails.length === 0 || !containsErrors
}

export const startWith = (params) => helpers.withParams(
    { type: 'startWith', value: params },
    (value) => params.regex.test(value)
)
