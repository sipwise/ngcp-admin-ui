<template>
    <aui-reseller-form
        dense-list
        layout="6"
        :reseller="reseller"
        :reseller-id-acl="resellerIdAcl"
        :reseller-id="formData.reseller_id"
        :reseller-id-error="resellerIdHasError"
        :reseller-id-error-message="resellerIdGetError"
        :hide-reseller-select="isCustomerDetails"
        @update:modelValue="resellerIdUpdate"
    >
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <template #reseller-id-after>
            <aui-create-reseller-button
                :form-data="formData"
            />
        </template>
        <template
            #col-1
        >
            <div>
                <aui-base-form-field>
                    <aui-select-pbx-customer
                        v-model="formData.customer_id"
                        dense
                        :reseller-id="formData.reseller_id"
                        :initial-option="getInitialCustomerOptions()"
                        :disable="loading"
                        :error="hasFieldError('customer_id')"
                        :error-message="getFieldError('customer_id')"
                    >
                        <template
                            #after
                        >
                            <aui-create-button
                                :to="{ name: 'customerCreation' }"
                                :label="$t('Create Customer')"
                                :form-data="formData"
                            />
                        </template>
                    </aui-select-pbx-customer>
                </aui-base-form-field>
                <aui-base-form-field
                    required
                >
                    <q-input
                        v-model="formData.name"
                        :error="hasFieldError('name')"
                        :error-message="getFieldError('name')"
                        dense
                        :label="$t('Name')"
                        data-cy="soundsets-name"
                        @keyup.enter="submit"
                    />
                </aui-base-form-field>
                <aui-base-form-field>
                    <q-input
                        v-model="formData.description"
                        dense
                        :label="$t('Description')"
                        data-cy="soundsets-description"
                        @keyup.enter="submit"
                    />
                </aui-base-form-field>
                <aui-base-form-field>
                    <q-toggle
                        v-model="formData.expose_to_customer"
                        class="q-pb-md"
                        :label="$t('Expose to customer')"
                        data-cy="soundsets-expose_to_customer"
                        :disable="loading"
                    />
                </aui-base-form-field>
                <aui-base-form-field>
                    <q-tooltip>
                        {{ $t('If active and a customer is selected, this soundset will be used for all existing and new subscribers of that customer, unless a specific soundset is set for the subscriber.') }}
                    </q-tooltip>
                    <q-checkbox
                        v-model="formData.contract_default"
                        class="q-pb-md"
                        :label="$t('Default for Subscribers')"
                        data-cy="soundsets-default_for_subscribers"
                        :disable="loading"
                    />
                </aui-base-form-field>
                <aui-base-form-field>
                    <aui-select-parent
                        v-model="formData.parent_id"
                        dense
                        :reseller-id="formData.reseller_id"
                        :initial-option="getInitialParentOptions()"
                        :omit-value="initialFormData?.id"
                        :disable="loading"
                    />
                </aui-base-form-field>
            </div>
        </template>
    </aui-reseller-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    required
} from '@vuelidate/validators'
import resellerFormMixin from 'src/mixins/reseller-form'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiCreateResellerButton from 'components/buttons/AuiCreateResellerButton'
import AuiSelectParent from 'components/AuiSelectParent'
import AuiSelectPbxCustomer from 'components/AuiSelectPbxCustomer'
import AuiCreateButton from 'components/buttons/AuiCreateButton'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiNewSoundSets',
    components: {
        AuiCreateResellerButton,
        AuiResellerForm,
        AuiBaseFormField,
        AuiSelectPbxCustomer,
        AuiCreateButton,
        AuiSelectParent
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
            resetCustomer: false,
            v$: useValidate()
        }
    },
    computed: {
        ...mapGetters('soundSets', [
            'languageSoundSets'
        ]),
        aclEntity () {
            return 'soundsets'
        },
        getInitialData () {
            return {
                reseller_id: this.initialFormData?.reseller_id || null,
                customer_id: this.initialFormData?.customer_id || null,
                name: this.initialFormData?.name || null,
                parent_id: this.initialFormData?.parent_id || null,
                description: this.initialFormData?.description || null,
                expose_to_customer: this.initialFormData?.expose_to_customer || false,
                contract_default: this.initialFormData?.contract_default || false
            }
        }
    },
    watch: {
        // This resets the customer and parent data to null when the reseller changes
        'formData.reseller_id' () {
            this.formData.customer_email = null
            this.formData.customer_id = null
            this.resetCustomer = true
            this.formData.parent_id = null
            this.formData.parent_name = null
            this.getInitialCustomerOptions()
            this.getInitialParentOptions()
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
                }
            }
        },
        getInitialCustomerOptions () {
            if (!this.resetCustomer && this.initialFormData?.customer_id && this.initialFormData?.customer_email) {
                return {
                    label: `${this.initialFormData?.customer_id} - ${this.initialFormData?.customer_email}`,
                    value: this.initialFormData?.customer_id
                }
            }
            return null
        },
        getInitialParentOptions () {
            if (!this.resetCustomer && this.initialFormData?.parent_id && this.initialFormData?.parent_name) {
                return {
                    label: `${this.initialFormData?.parent_id} - ${this.initialFormData?.parent_name}`,
                    value: this.initialFormData?.parent_id
                }
            }
            return null
        }
    }
}
</script>
