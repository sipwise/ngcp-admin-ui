<template>
    <aui-base-form>
        <slot
            name="actions"
            :loading="loading"
            :has-unsaved-data="hasUnsavedData"
            :has-invalid-data="hasInvalidData"
            :reset="reset"
            :submit="submit"
        />
        <div
            class="row"
        >
            <div
                class="col-md-6 col-sm-12"
            >
                <q-list
                    dense
                >
                    <q-item>
                        <q-item-section>
                            <aui-select-contract
                                v-model="formData.contract_id"
                                dense
                                class="aui-required"
                                :is-reseller="true"
                                :initial-option="initialContractOption"
                                :disable="loading"
                                :error="$v.formData.contract_id.$error"
                                :error-message="$errMsg($v.formData.contract_id)"
                                @blur="$v.formData.contract_id.$touch()"
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
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.name"
                                dense
                                clearable
                                class="aui-required"
                                :label="$t('Name')"
                                data-cy="reseller-name"
                                :disable="loading"
                                :error="$v.formData.name.$error"
                                :error-message="$errMsg($v.formData.name)"
                                @blur="$v.formData.name.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-selection-reseller-status
                                v-model="formData.status"
                                dense
                                :label="$t('Status')"
                                :disable="loading"
                                :error="false"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-toggle
                                v-model="formData.enable_rtc"
                                class="col"
                                :label="$t('WebRTC')"
                                data-cy="web-rtc-flag"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </aui-base-form>
</template>

<script>
import {
    required
} from 'vuelidate/lib/validators'
import AuiSelectContract from 'components/AuiSelectContract'
import AuiSelectionResellerStatus from 'components/AuiSelectionResellerStatus'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import AuiCreateButton from 'components/buttons/AuiCreateButton'
export default {
    name: 'AuiNewReseller',
    components: {
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
    validations: {
        formData: {
            contract_id: {
                required
            },
            name: {
                required
            }
        }
    },
    computed: {
        initialContractOption () {
            if (this.contract && this.contact) {
                return {
                    label: this.contract.id + ' - ' + this.contact.email,
                    value: this.contract.id
                }
            }
            return null
        },
        getInitialData () {
            if (this.initialFormData) {
                return {
                    contract_id: this.initialFormData.contract_id,
                    name: this.initialFormData.name,
                    status: this.initialFormData.status,
                    enable_rtc: this.initialFormData.enable_rtc
                }
            } else {
                return {
                    contract_id: null,
                    name: null,
                    status: 'active',
                    enable_rtc: false
                }
            }
        }
    }
}
</script>
