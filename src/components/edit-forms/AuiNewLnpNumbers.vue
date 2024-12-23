<template>
    <aui-base-form
        layout="6-6"
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
                <q-input
                    v-model.trim="formData.number"
                    dense
                    clearable
                    class="aui-required"
                    :label="$t('Number')"
                    data-cy="lnpnumber-number"
                    :disable="loading"
                    :error="hasFieldError('number')"
                    :error-message="getFieldError('number')"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.routing_number"
                    dense
                    clearable
                    :label="$t('Routing number')"
                    data-cy="lnpnumber-routingnumber"
                    :disable="loading"
                    :error="hasFieldError('routing_number')"
                    :error-message="getFieldError('routing_number')"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('An optional routing number replacling the ported number.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.type"
                    dense
                    clearable
                    :label="$t('Type')"
                    data-cy="lnpnumber-type"
                    :disable="loading"
                    :error="hasFieldError('type')"
                    :error-message="getFieldError('type')"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The optional LNP number type tag, for CDR exports.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model="formData.start"
                    class="col q-mr-md"
                    dense
                    clearable
                    readonly
                    mask="####-##-##"
                    :label="$t('Start')"
                    data-cy="lnpnumber-start"
                    :rules="[ isValidDateTime ]"
                    :error="hasFieldError('start')"
                    :error-message="getFieldError('start')"
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
                                    v-model="formData.start"
                                    mask="YYYY-MM-DD"
                                    @update:model-value="$emit('startInput', {value: start, index: index})"
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
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model="formData.end"
                    class="col"
                    dense
                    clearable
                    readonly
                    mask="####-##-##"
                    :label="$t('End')"
                    data-cy="lnpnumber-end"
                    :rules="[ isValidDateTime, isValidEndTime ]"
                    :error="hasFieldError('end')"
                    :error-message="getFieldError('end')"
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
                                    v-model="formData.end"
                                    mask="YYYY-MM-DD"
                                    @update:model-value="$emit('endInput', {value: stop, index: index})"
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
                </q-input>
            </aui-base-form-field>
        </template>
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    integer,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import { date } from 'quasar'
import baseFormMixin from 'src/mixins/base-form'
import { validationEndDate } from 'src/validators/common'
export default {
    name: 'AuiNewLnpCarrier',
    components: {
        AuiBaseFormField,
        AuiBaseForm
    },
    mixins: [baseFormMixin],
    props: {
        carrier: {
            type: Number,
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
                number: {
                    required,
                    integer
                },
                start: {

                },
                end: {
                    validationEndDate
                }
            }
        }
    },
    computed: {
        getDefaultData () {
            return {
                carrier_id: this.carrier,
                number: '',
                routing_number: '',
                type: '',
                start: '',
                end: ''

            }
        }
    },
    methods: {
        isValidDateTime (datetime) {
            if (datetime && !date.isValid(datetime)) {
                return this.$t('Allowed format: YYYY-MM-DD')
            }
        },
        isValidEndTime (endDateTime) {
            const startDate = new Date(this.formData.start)
            const endDate = new Date(endDateTime)
            if (endDate < startDate) {
                return this.$t('End date cannot be prior to start date')
            }
            return true
        }
    }
}
</script>
