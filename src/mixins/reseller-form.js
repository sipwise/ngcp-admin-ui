import baseFormMixin from 'src/mixins/base-form'
import { required } from 'vuelidate/lib/validators'

export default {
    mixins: [baseFormMixin],
    computed: {
        resellerIdFieldName () {
            return 'reseller_id'
        },
        resellerIdValue () {
            return this.formData[this.resellerIdFieldName]
        },
        resellerIdAcl () {
            return this.aclField(this.resellerIdFieldName)
        },
        resellerIdHasError () {
            return this.hasFieldError(this.resellerIdFieldName)
        },
        resellerIdGetError () {
            return this.getFieldError(this.resellerIdFieldName)
        }
    },
    methods: {
        resellerIdUpdate (resellerId) {
            this.formData[this.resellerIdFieldName] = resellerId
        },
        resellerIdGetValidation () {
            return {
                [this.resellerIdFieldName]: {
                    required
                }
            }
        }
    }
}
