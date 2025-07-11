<template>
    <aui-reseller-form
        layout="6"
        data-cy="aui-select-reseller"
        dense-list
        :reseller-id="resellerIdValue"
        :reseller-id-acl="resellerIdAcl && !resellerId && !subscriberId && !customerId"
        :reseller-id-error="resellerIdHasError"
        :reseller-id-error-message="resellerIdGetError"
        @update:model-value="resellerIdUpdate"
    >
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <template
            #col-1
        >
            <aui-base-form-field
                v-if="aclField('name')"
                :required="true"
            >
                <q-input
                    v-model="formData.name"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    dense
                    :label="$t('Name')"
                    data-cy="phonebook-name"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('number')"
                :required="true"
            >
                <q-input
                    v-model="formData.number"
                    :error="hasFieldError('number')"
                    :error-message="getFieldError('number')"
                    dense
                    :label="$t('Number')"
                    data-cy="phonebook-number"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                v-if="aclField('shared') && subscriberId"
            >
                <q-toggle
                    v-model="formData.shared"
                    :error="false"
                    :label="$t('Shared')"
                    data-cy="phonebook-shared"
                />
            </aui-base-form-field>
        </template>
    </aui-reseller-form>
</template>
<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import resellerForm from 'src/mixins/reseller-form'
export default {
    name: 'AuiPhonebookForm',
    components: { AuiBaseFormField, AuiResellerForm },
    mixins: [resellerForm],
    props: {
        resellerId: {
            type: [String, Number],
            default: undefined
        },
        subscriberId: {
            type: [String, Number],
            default: undefined
        },
        customerId: {
            type: [String, Number],
            default: undefined
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    computed: {
        aclEntity () {
            if (this.customerId) {
                return 'customerphonebookentries'
            } else if (this.subscriberId) {
                return 'subscriberphonebookentries'
            }
            return 'resellerphonebookentries'
        },
        getInitialData () {
            if (this.initialFormData) {
                return {
                    reseller_id: this.initialFormData.reseller_id,
                    name: this.initialFormData.name,
                    number: this.initialFormData.number,
                    shared: this.initialFormData.shared
                }
            }
            return {
                reseller_id: null,
                name: '',
                number: '',
                shared: false
            }
        }
    },
    methods: {
        getValidations () {
            return {
                ...((!this.resellerId && !this.subscriberId && !this.customerId) ? this.resellerIdGetValidation() : {}),
                name: {
                    required
                },
                number: {
                    required
                }
            }
        },
        prepareSubmitData (data) {
            if (this.resellerId) {
                data.reseller_id = this.resellerId
                delete data.shared
            }
            if (this.subscriberId) {
                data.subscriber_id = this.subscriberId
                delete data.reseller_id
            }
            if (this.customerId) {
                data.customer_id = this.customerId
                delete data.reseller_id
                delete data.shared
            }
            return data
        }
    }
}
</script>
