<template>
    <aui-base-form
        layout="6"
        dense-list
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
                required
            >
                <aui-select-contract
                    v-model="formData.contract_id"
                    dense
                    data-cy="aui-select-contract"
                    :is-reseller="true"
                    :initial-option="initialContractOption"
                    :disable="loading"
                    :error="hasFieldError('contract_id')"
                    :error-message="getFieldError('contract_id')"
                >
                    <template
                        #after
                    >
                        <aui-create-button
                            :to="{ name: 'contractCreateReseller' }"
                            :label="$t('Create Contract')"
                            :form-data="formData"
                        />
                    </template>
                </aui-select-contract>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.name"
                    dense
                    clearable
                    class="aui-required"
                    :label="$t('Name')"
                    data-cy="reseller-name"
                    :disable="loading"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-selection-reseller-status
                    v-model="formData.status"
                    dense
                    :label="$t('Status')"
                    data-cy="reseller-status"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import { required } from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectContract from 'components/AuiSelectContract'
import AuiSelectionResellerStatus from 'components/AuiSelectionResellerStatus'
import AuiCreateButton from 'components/buttons/AuiCreateButton'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
export default {
    name: 'AuiNewReseller',
    components: {
        AuiBaseFormField,
        AuiCreateButton,
        AuiBaseForm,
        AuiSelectContract,
        AuiSelectionResellerStatus
    },
    mixins: [baseFormMixin],
    props: {
        reseller: {
            type: Object,
            default: null
        },
        contract: {
            type: Object,
            default: null
        },
        contact: {
            type: Object,
            default: null
        },
        resettable: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    validations () {
        return {
            formData: {
                contract_id: {
                    required
                },
                name: {
                    required
                }
            }
        }
    },
    computed: {
        initialContractOption () {
            if (this.contract && this.contact) {
                return {
                    label: `${this.contract.id} - ${this.contact.email}`,
                    value: this.contract.id
                }
            }
            return null
        },
        getDefaultData () {
            return {
                contract_id: null,
                name: null,
                status: 'active'
            }
        }
    }
}
</script>
