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
            <aui-base-form-field>
                <aui-select-profile-package
                    v-model="formData.package_id"
                    dense
                    :initial-option="initialProfilePackageOptions"
                    :disable="loading"
                    :error="hasFieldError('package_id')"
                    :error-message="getFieldError('package_id')"
                >
                    <template
                        #after
                    >
                        <aui-create-button
                            :to="{ name: 'billingProfilePackageCreation' }"
                            :label="$t('Create Profile Package')"
                            :form-data="formData"
                        />
                    </template>
                </aui-select-profile-package>
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.code"
                    clearable
                    dense
                    :label="$t('Code')"
                    data-cy="vouchers-code"
                    :error="hasFieldError('code')"
                    :error-message="getFieldError('code')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.amount"
                    clearable
                    dense
                    :label="$t('Amount')"
                    data-cy="vouchers-amount"
                    :error="hasFieldError('amount')"
                    :error-message="getFieldError('amount')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
                <q-tooltip>
                    {{ $t('Amount in cents') }}
                </q-tooltip>
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model="formData.valid_until"
                    class="col q-mr-md"
                    dense
                    clearable
                    readonly
                    mask="####-##-## ##:##:##"
                    :label="$t('Valid Until')"
                    :error="hasFieldError('valid_until')"
                    :error-message="getFieldError('valid_until')"
                >
                    <template #prepend>
                        <q-icon
                            name="event"
                            class="cursor-pointer"
                        >
                            <q-popup-proxy
                                transition-show="scale"
                                transition-hide="scale"
                            >
                                <q-date
                                    v-model="formData.valid_until"
                                    mask="YYYY-MM-DD HH:mm:ss"
                                >
                                    <div class="row items-center justify-end">
                                        <q-btn
                                            v-close-popup
                                            label="Close"
                                            color="primary"
                                            flat
                                        />
                                    </div>
                                </q-date>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                    <template #append>
                        <q-icon
                            name="access_time"
                            class="cursor-pointer"
                        >
                            <q-popup-proxy
                                transition-show="scale"
                                transition-hide="scale"
                            >
                                <q-time
                                    v-model="formData.valid_until"
                                    mask="YYYY-MM-DD HH:mm:ss"
                                    with-seconds
                                >
                                    <div class="row items-center justify-end">
                                        <q-btn
                                            v-close-popup
                                            label="Close"
                                            color="primary"
                                            flat
                                        />
                                    </div>
                                </q-time>
                            </q-popup-proxy>
                        </q-icon>
                    </template>
                </q-input>
            </aui-base-form-field>
        </template>
    </aui-reseller-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    integer,
    minValue,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectPbxCustomer from 'components/AuiSelectPbxCustomer'
import AuiSelectProfilePackage from 'components/AuiSelectProfilePackage'
import AuiCreateButton from 'components/buttons/AuiCreateButton'
import AuiCreateResellerButton from 'components/buttons/AuiCreateResellerButton'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import resellerFormMixin from 'src/mixins/reseller-form'
export default {
    name: 'AuiNewBillingVoucher',
    components: {
        AuiCreateResellerButton,
        AuiBaseFormField,
        AuiResellerForm,
        AuiSelectPbxCustomer,
        AuiCreateButton,
        AuiSelectProfilePackage
    },
    mixins: [resellerFormMixin],
    props: {
        reseller: {
            type: Object,
            default: null
        },
        customer: {
            type: Object,
            default: null
        },
        contact: {
            type: Object,
            default: null
        },
        package: {
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
        aclEntity () {
            return 'vouchers'
        },
        getInitialData () {
            return {
                reseller_id: this.initialFormData?.reseller_id || null,
                code: this.initialFormData?.code || null,
                amount: this.initialFormData?.amount || null,
                customer_id: this.initialFormData?.customer_id || null,
                package_id: this.initialFormData?.package_id || null,
                valid_until: this.initialFormData?.valid_until || ''
            }
        },
        initialProfilePackageOptions () {
            if (this.package) {
                return {
                    label: `${this.package.id} - ${this.package.name}`,
                    value: this.package.id
                }
            }
            return null
        }
    },
    watch: {
        // This resets the customer data to null when the reseller changes
        'formData.reseller_id' () {
            this.formData.customer_id = null
            this.resetCustomer = true
            this.getInitialCustomerOptions()
        }
    },
    methods: {
        getValidations () {
            return {
                reseller_id: {
                    required
                },
                code: {
                    required
                },
                valid_until: {
                    required
                },
                amount: {
                    required,
                    integer,
                    minValue: minValue(0)
                }
            }
        },
        getInitialCustomerOptions () {
            if (!this.resetCustomer && this.customer && this.contact) {
                return {
                    label: `${this.customer.id} - ${this.contact.email}`,
                    value: this.customer.id
                }
            }
            return null
        }
    }
}
</script>
