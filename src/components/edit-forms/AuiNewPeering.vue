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
                    :is-sippeering="true"
                    :initial-option="initialContractOptions"
                    :disable="loading"
                    :error="hasFieldError('contract_id')"
                    :error-message="getFieldError('contract_id')"
                >
                    <template
                        #after
                    >
                        <aui-create-button
                            :to="{ name: 'contractCreatePeering' }"
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
                    data-cy="peering-name"
                    :disable="loading"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.priority"
                    :options="peeringPriorityOptions"
                    :label="$t('Priority')"
                    data-cy="peering-priority"
                    emit-value
                    map-options
                    dense
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-select-time-set
                    v-model="formData.time_set_id"
                    dense
                    :initial-option="initialTimeSetOption"
                    :disable="loading"
                    :error="hasFieldError('time_set_id')"
                    :error-message="getFieldError('time_set_id')"
                >
                    <template
                        #after
                    >
                        <aui-create-button
                            :to="{ name: 'timeSetCreation' }"
                            :label="$t('Create Time Set')"
                            :form-data="formData"
                        />
                    </template>
                </aui-select-time-set>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.description"
                    dense
                    clearable
                    :label="$t('Description')"
                    data-cy="peering-description"
                    :disable="loading"
                    :error="hasFieldError('description')"
                    :error-message="getFieldError('description')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import useValidate from '@vuelidate/core'
import {
    required
} from '@vuelidate/validators'
import AuiSelectContract from 'components/AuiSelectContract'
import AuiSelectTimeSet from 'components/AuiSelectTimeSet'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import AuiCreateButton from 'components/buttons/AuiCreateButton'
import AuiBaseFormField from 'components/AuiBaseFormField'
export default {
    name: 'AuiNewPeering',
    components: {
        AuiBaseFormField,
        AuiCreateButton,
        AuiBaseForm,
        AuiSelectContract,
        AuiSelectTimeSet
    },
    mixins: [baseFormMixin],
    props: {
        contract: {
            type: Object,
            default: null
        },
        contact: {
            type: Object,
            default: null
        },
        timeset: {
            type: Object,
            default: null
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
        ...mapGetters('peering', [
            'peeringPriorityOptions'
        ]),
        initialContractOptions () {
            if (this.contract && this.contact) {
                return {
                    label: this.contract.id + ' - ' + this.contact.email,
                    value: this.contract.id
                }
            }
            return null
        },
        initialTimeSetOption () {
            return this.timeset
                ? {
                    label: this.timeset.id + ' - ' + this.timeset.name,
                    value: this.timeset.id
                }
                : null
        },
        getDefaultData () {
            return {
                contract_id: null,
                name: null,
                priority: '1',
                time_set_id: null,
                description: null

            }
        }
    }
}
</script>
