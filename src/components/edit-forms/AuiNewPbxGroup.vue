<template>
    <aui-base-form
        :layout="$attrs.layout || '6-6'"
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
            <aui-base-form-field>
                <q-input
                    :model-value="$t('PBX Group')"
                    :label="$t('Type')"
                    readonly
                    dense
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.display_name"
                    dense
                    clearable
                    :label="$t('Name')"
                    data-cy="pbxgroup-display_name"
                    :disable="loading"
                    :error="hasFieldError('display_name')"
                    :error-message="getFieldError('display_name')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.pbx_extension"
                    dense
                    clearable
                    :label="$t('Extension')"
                    data-cy="pbxgroup-pbx_extension"
                    :disable="loading"
                    :error="hasFieldError('pbx_extension')"
                    :error-message="getFieldError('pbx_extension')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.pbx_hunt_policy"
                    :options="subscriberCommonPbxHuntPolicyOptions"
                    emit-value
                    map-options
                    dense
                    :label="$t('Hunting Policy')"
                    data-cy="pbxgroup-pbx_hunt_policy"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.pbx_hunt_timeout"
                    dense
                    clearable
                    :label="$t('Hunting Timeout')"
                    data-cy="pbxgroup-pbx_hunt_timeout"
                    :disable="loading"
                    :error="hasFieldError('pbx_hunt_timeout')"
                    :error-message="getFieldError('pbx_hunt_timeout')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-select
                    v-model="formData.pbx_hunt_cancel_mode"
                    :options="subscriberCommonPbxHuntCancelModeOptions"
                    emit-value
                    map-options
                    dense
                    :label="$t('Cancel Mode')"
                    data-cy="pbxgroup-pbx_hunt_cancel_mode"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <aui-select-numbers
                    v-model="seatAliasNumbers"
                    :initial-options="aliasNumberInitialOptions"
                    :customer-id="customerId"
                    :error="false"
                    @update:model-value="updateSeatAliasNumbers"
                />
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import {
    integer,
    required,
    helpers,
    numeric
} from '@vuelidate/validators'
import _ from 'lodash'
import AuiSelectNumbers from 'components/AuiSelectNumbers'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseFormField from 'components/AuiBaseFormField'
import { formatPhoneNumber } from 'src/filters/resource'
import useValidate from '@vuelidate/core'
export default {
    name: 'AuiNewPbxGroup',
    components: {
        AuiBaseFormField,
        AuiBaseForm,
        AuiSelectNumbers
    },
    mixins: [baseFormMixin],
    props: {
        customerId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            v$: useValidate(),
            aliasNumberRanges: [],
            seatAliasNumbers: [],
            seatUnassignedAliasNumbers: []
        }
    },
    computed: {
        getInitialData () {
            if (this.initialFormData) {
                return {
                    customer_id: this.customerId,
                    domain_id: this.initialFormData.domain_id,
                    display_name: this.initialFormData.display_name,
                    username: this.initialFormData.username,
                    password: this.initialFormData.password,
                    alias_numbers: this.initialFormData.alias_numbers ?? [],
                    is_pbx_group: this.initialFormData.is_pbx_group,
                    is_pbx_pilot: this.initialFormData.is_pbx_pilot,
                    pbx_extension: this.initialFormData.pbx_extension,
                    pbx_hunt_timeout: this.initialFormData.pbx_hunt_timeout,
                    pbx_hunt_cancel_mode: this.initialFormData.pbx_hunt_cancel_mode

                }
            } else {
                return {
                    display_name: null,
                    pbx_extension: null,
                    pbx_hunt_policy: 'serial',
                    pbx_hunt_timeout: 10,
                    pbx_hunt_cancel_mode: 'cancel',
                    alias_numbers: []
                }
            }
        },
        aliasNumberInitialOptions () {
            return this.formData.alias_numbers.map((number) => {
                return {
                    value: number.id || number.number_id,
                    label: formatPhoneNumber(number, '')
                }
            })
        },
        aliasNumberValues () {
            const values = []
            this.formData.alias_numbers.forEach((number) => {
                values.push(number.id || number.number_id)
            })
            return values
        },
        aliasNumbers: {
            get () {
                return this.formData.alias_numbers.map((number) => {
                    return {
                        id: number.number_id,
                        cc: number.cc,
                        ac: number.ac,
                        sn: number.sn,
                        is_devid: number.is_devid
                    }
                })
            },
            set (aliasNumbers) {
                if (aliasNumbers && aliasNumbers.length > 0) {
                    this.formData.alias_numbers = aliasNumbers.map((number) => {
                        return {
                            number_id: number.id,
                            cc: number.cc,
                            ac: number.ac,
                            sn: number.sn,
                            is_devid: number.is_devid
                        }
                    })
                }
            }
        }
    },
    watch: {
        'formData.alias_numbers': {
            handler () {
                this.seatAliasNumbers = this.aliasNumberValues
            },
            immediate: true
        }
    },
    methods: {
        getValidations () {
            const validations = {
                display_name:
                    !this.initialFormData
                        ? { required }
                        : {},
                pbx_extension: {
                    required
                },
                pbx_hunt_timeout: {
                    required,
                    integer
                },
                alias_numbers: {
                    $each: helpers.forEach({
                        ac: {
                            numeric
                        },
                        cc: {
                            required,
                            numeric
                        },
                        sn: {
                            required,
                            numeric
                        }
                    })
                }
            }
            return validations
        },
        additionalSubmitData () {
            return {
                seatAliasNumbers: this.seatAliasNumbers,
                seatUnassignedAliasNumbers: this.seatUnassignedAliasNumbers
            }
        },
        hasAdditionalUnsavedData () {
            return (this.aliasNumberRanges && this.aliasNumberRanges.length > 0) ||
                (!_.isEqual(this.aliasNumberValues.sort(), this.seatAliasNumbers.sort()))
        },
        postReset () {
            this.seatAliasNumbers = this.aliasNumberValues
        },
        updateSeatAliasNumbers () {
            this.seatUnassignedAliasNumbers = _.difference(this.aliasNumberValues, this.seatAliasNumbers)
        }
    }
}
</script>
