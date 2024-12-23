import { errorMessages } from 'src/validators'
import ValidatorIsFQDN from 'validator/es/lib/isFQDN'
import { withParams } from 'vuelidate'

export default ({ app }) => {
    app.config.globalProperties.$errMsg = (v$) => {
        if (v$ && v$.length) {
            if (v$[0].$validator && errorMessages[v$[0].$validator]) {
                return errorMessages[v$[0].$validator](v$[0].$params, v$[0])
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
