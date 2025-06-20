<template>
    <aui-reseller-form
        dense-list
        layout="6"
        :reseller="reseller"
        :reseller-id-acl="resellerIdAcl"
        :reseller-id="formData.reseller_id"
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
            #reseller-id-after
        >
            <aui-create-reseller-button
                :form-data="formData"
            />
        </template>
        <template
            #col-1
        >
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.name"
                    clearable
                    dense
                    :label="$t('Name')"
                    data-cy="ncos-set-name"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.description"
                    clearable
                    dense
                    :label="$t('Description')"
                    data-cy="ncos-set-description"
                    :error="hasFieldError('description')"
                    :error-message="getFieldError('description')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.expose_to_customer"
                    class="q-pb-md"
                    :label="$t('Expose to customer')"
                    data-cy="ncoslevels-expose_to_customer"
                    :error="false"
                    :disable="loading"
                />
            </aui-base-form-field>
        </template>
    </aui-reseller-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiCreateResellerButton from 'components/buttons/AuiCreateResellerButton'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import resellerFormMixin from 'src/mixins/reseller-form'
export default {
    name: 'AuiNewNCOSSet',
    components: {
        AuiCreateResellerButton,
        AuiResellerForm,
        AuiBaseFormField
    },
    mixins: [resellerFormMixin],
    props: {
        reseller: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    computed: {
        aclEntity () {
            return 'ncos'
        },
        initialResellerOption () {
            if (this.reseller) {
                return {
                    label: this.reseller.name,
                    value: this.reseller.id
                }
            }
            return null
        },
        getInitialData () {
            if (this.initialFormData) {
                return {
                    reseller_id: this.initialFormData.reseller_id,
                    name: this.initialFormData.name,
                    description: this.initialFormData.description,
                    expose_to_customer: this.initialFormData.expose_to_customer
                }
            }
            return {
                reseller_id: null,
                name: null,
                description: null,
                expose_to_customer: false
            }
        }
    },
    methods: {
        getValidations () {
            return {
                reseller_id: {
                    required
                },
                name: {
                    required
                },
                description: {
                    required
                }
            }
        },
        prepareSubmitData (data) {
            if (data.id) {
                delete data.id
            }
            return data
        }
    }
}
</script>
