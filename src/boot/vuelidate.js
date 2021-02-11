import Vuelidate, {
	withParams
} from 'vuelidate'
import ValidatorIsFQDN from 'validator/es/lib/isFQDN'
import {
	errorMessages
} from 'src/validators'

export default ({ Vue }) => {
	Vue.use(Vuelidate)
	Vue.prototype.$errMsg = ($v) => {
		if ($v && $v.$params && Object.keys($v.$params).length > 0) {
			let errMsgKey
			Object.keys($v.$params).forEach((key) => {
				if ($v[key] === false && !errMsgKey) {
					errMsgKey = key
				}
			})
			if (errMsgKey && errorMessages[errMsgKey]) {
				return errorMessages[errMsgKey]($v.$params[errMsgKey], $v)
			}
		}
		return ''
	}
}

// *** Custom validations compatible with "vuelidate" lib ***
// Important: if you change any of following functions please check that you do not affect  translations messages
//   like 'validators.<validation function name> ...' or 'validators.zzz ... {<validation function name>.<option value>}...'
export const isFQDN = withParams(
	{ type: 'isFQDN' },
	(str) => ValidatorIsFQDN((str === null || str === undefined) ? '' : str, { require_tld: false })
)
