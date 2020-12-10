
import validator from 'validator'
import isCidr from 'is-cidr'

export function ip (value) {
	if (value === undefined || value === null) {
		return false
	}
	return validator.isIP(value) || isCidr(value) === 4 || isCidr(value) === 6
}
