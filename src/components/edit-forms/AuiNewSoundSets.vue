<template>
    <aui-reseller-form
        dense-list
        layout="6"
        :reseller="reseller"
        :reseller-id-acl="resellerIdAcl && !resellerId"
        :reseller-id="formData.reseller_id"
        :reseller-id-error="resellerIdHasError"
        :reseller-id-error-message="resellerIdGetError"
        :isnotdefault-files="isnotdefaultFiles"
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
        <template
            v-if="isnotdefaultFiles"
            #reseller-id-after
        >
            <aui-create-reseller-button
                :form-data="formData"
            />
        </template>
        <template
            #col-1
        >
            <div
                v-if="isnotdefaultFiles"
            >
                <aui-base-form-field>
                    <aui-select-customer
                        v-model="formData.customer_id"
                        dense
                        :initial-option="initialCustomerOptions"
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
                    </aui-select-customer>
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
                        @keyup.enter="submit"
                    />
                </aui-base-form-field>
                <aui-base-form-field>
                    <q-input
                        v-model="formData.description"
                        dense
                        :label="$t('Description')"
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
                    <aui-select-parent
                        v-model="formData.parent_id"
                        dense
                        :initial-option="initialParentOptions"
                        :disable="loading"
                    />
                </aui-base-form-field>
            </div>
            <div
                v-if="isdefaultFiles"
            >
                <aui-base-form-field>
                    <q-select
                        v-model="formData.language"
                        class="q-pb-md"
                        :options="languageSoundSets"
                        :label="$t('Language')"
                        data-cy="soundsets-language"
                        :error="false"
                        dense
                        :disable="loading"
                    />
                </aui-base-form-field>
                <aui-base-form-field>
                    <q-toggle
                        v-model="formData.loopplay"
                        class="q-pb-md"
                        :label="$t('Play in Loop')"
                        data-cy="soundsets-loopplay"
                        :disable="loading"
                    />
                </aui-base-form-field>
                <aui-base-form-field>
                    <q-toggle
                        v-model="formData.replace_existing"
                        class="q-pb-md"
                        :label="$t('Replace existing')"
                        data-cy="soundsets-replace_existing"
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
import AuiSelectCustomer from 'components/AuiSelectCustomer'
import AuiSelectParent from 'components/AuiSelectParent'
import AuiCreateButton from 'components/buttons/AuiCreateButton'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiNewSoundSets',
    components: {
        AuiCreateResellerButton,
        AuiResellerForm,
        AuiBaseFormField,
        AuiSelectCustomer,
        AuiCreateButton,
        AuiSelectParent
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
        customerId: {
            type: Object,
            default: null
        },
        parentId: {
            type: Object,
            default: null
        },
        parent: {
            type: Object,
            default: null
        },
        isdefaultFiles: {
            type: Boolean,
            default: false
        },
        isnotdefaultFiles: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
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
        getDefaultData () {
            return {
                reseller_id: null,
                customer_id: null,
                parent_id: null,
                name: '',
                description: '',
                expose_to_customer: false,
                language: '',
                loopplay: false,
                replace_existing: false,
                copy_from_default: true
            }
        },
        initialCustomerOptions () {
            if (this.customer && this.customerId) {
                return {
                    label: this.customerId.id + ' - ' + this.customer.email,
                    value: this.customerId.id
                }
            }
            return null
        },
        initialParentOptions () {
            if (this.parent && this.parentId) {
                return {
                    label: this.parentId + ' - ' + this.parent,
                    value: this.parentId
                }
            }
            return null
        }
    },
    created () {
        this.formData.loopplay = false
        this.formData.replace_existing = false
        if (this.isdefaultFiles) {
            this.formData.language = 'en'
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
        }
    }
}
</script>
