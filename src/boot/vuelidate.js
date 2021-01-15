import Vuelidate, { withParams } from 'vuelidate'
import _ from 'lodash'
import ValidatorIsFQDN from 'validator/es/lib/isFQDN'

export default ({ Vue, app }) => {
	Vue.use(Vuelidate)
	Vue.prototype.$errorMessage = (def) => {
		let message = null
		_.forEach(def.$params, (param, validatorName) => {
			if (def[validatorName] === false) {
				const validationParamsOptions = getValidationParamsOptions(param)
				if (validationParamsOptions.options.length) {
					message = app.i18n.t(
						'validators.' + validatorName + ' {' + validationParamsOptions.options.join('} {') + '}',
						validationParamsOptions.values
					)
				} else {
					message = app.i18n.t('validators.' + validatorName)
				}
			}
		})
		return message
	}
}

/**
 * Extracts additional configuration options of the validation rule (vuelidate lib)
 * @example
 *   if we have validation rule "between: between(12, 34)" the function should return
 *   {options:["between.min","between.max"], values:{"between.min":0,"between.max":100}}
 *   which can be used for more precise and parameter based translation messages.
 *   In case it is a more complex validation like "customBetween: or(between(1, 5), between(10, 15))"
 *   the result will look like
 *   {options:["or.$sub[0].between.min","or.$sub[0].between.max", "or.$sub[1].between.min","or.$sub[1].between.max"] ...}
 * @returns {{values: {}, options: []}}
 */
function getValidationParamsOptions (validationParam) {
	const result = {
		options: [],
		values: {}
	}
	const validationType = validationParam.type
	const subValidations = validationParam.$sub || []

	const paramOptions = Object.entries(validationParam).filter(([key]) => !['type', '$sub'].includes(key))
	paramOptions.forEach(([optionName, value]) => {
		const optionPath = validationType + '.' + optionName
		result.options.push(optionPath)
		result.values[optionPath] = value
	})
	subValidations.forEach((subParam, index) => {
		const subResults = getValidationParamsOptions(subParam)
		subResults.options.forEach(subOptionPath => {
			const optionPath = `${validationType}.$sub[${index}].${subOptionPath}`
			result.options.push(optionPath)
			result.values[optionPath] = subResults.values[subOptionPath]
		})
	})
	return result
}

// *** Custom validations compatible with "vuelidate" lib ***
// Important: if you change any of following functions please check that you do not affect  translations messages
//   like 'validators.<validation function name> ...' or 'validators.zzz ... {<validation function name>.<option value>}...'
export const isFQDN = withParams(
	{ type: 'isFQDN' },
	// eslint-disable-next-line no-sequences
	(str) => ValidatorIsFQDN((str === null) ? '' : str, { require_tld: false })
)

/*
//// example of the validation function wrapper with parameters
// import ValidatorEquals from 'validator/es/lib/equals'
export function equals (comparisonValue) {
	return withParams(
		{
			type: 'equals',
			comparison: comparisonValue

		},
		// eslint-disable-next-line no-sequences
		(str) => ValidatorEquals((str === null) ? '' : str, comparisonValue)
	)
}
*/
