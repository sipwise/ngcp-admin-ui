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
            <aui-base-form-field
                required 
            >
                <aui-select-zone
                    v-model="formData.billing_zone_id"
                    dense
                    data-cy="aui-select-zone"
                    :initial-option="zoneInitialOption"
                    :disable="loading"
                    :billing-profile-id="billingProfileId"
                    :error="hasFieldError('billing_zone_id')"
                    :error-message="getFieldError('billing_zone_id')"
                >
                    <template
                        #after
                    >
                        <aui-create-button
                            :to="{ name: 'billingZoneCreation' }"
                            :label="$t('Create Zones')"
                            :form-data="formData"
                        />
                    </template>
                </aui-select-zone>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.match_mode"
                    :options="matchModeOptions"
                    data-cy="bilingfees-match_mode"
                    emit-value
                    map-options
                    dense
                    :label="$t('Match Mode')"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.source"
                    clearable
                    dense
                    :label="$t('Source')"
                    data-cy="billingfees-source"
                    :error="hasFieldError('source')"
                    :error-message="getFieldError('source')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.destination"
                    clearable
                    dense
                    :label="$t('Destination')"
                    data-cy="billingfees-destination"
                    :error="hasFieldError('destination')"
                    :error-message="getFieldError('destination')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.direction"
                    :options="directionOptions"
                    data-cy="bilingfees-direction"
                    emit-value
                    map-options
                    dense
                    :label="$t('Direction')"
                    :disable="loading"
                    :error="false"
                />
            </aui-base-form-field>
            <aui-form-field-group-headline
                :headline="$t('ONPEAK')"
            />
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.onpeak_init_rate"
                    clearable
                    dense
                    :label="$t('Init rate')"
                    data-cy="billingfees-onpeak_init_rate"
                    :error="hasFieldError('onpeak_init_rate')"
                    :error-message="getFieldError('onpeak_init_rate')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.onpeak_init_interval"
                    clearable
                    dense
                    :label="$t('Init interval')"
                    data-cy="billingfees-onpeak_init_interval"
                    :error="hasFieldError('onpeak_init_interval')"
                    :error-message="getFieldError('onpeak_init_interval')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.onpeak_follow_rate"
                    clearable
                    dense
                    :label="$t('Follow rate')"
                    data-cy="billingfees-onpeak_follow_rate"
                    :error="hasFieldError('onpeak_follow_rate')"
                    :error-message="getFieldError('onpeak_follow_rate')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.onpeak_follow_interval"
                    clearable
                    dense
                    :label="$t('Follow interval')"
                    data-cy="billingfees-onpeak_follow_interval"
                    :error="hasFieldError('onpeak_follow_interval')"
                    :error-message="getFieldError('onpeak_follow_interval')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.onpeak_extra_rate"
                    clearable
                    dense
                    :label="$t('Extra rate')"
                    data-cy="billingfees-onpeak_extra_rate"
                    :error="hasFieldError('onpeak_extra_rate')"
                    :error-message="getFieldError('onpeak_extra_rate')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.onpeak_extra_second"
                    clearable
                    dense
                    :label="$t('Extra second')"
                    data-cy="billingfees-onpeak_extra_second"
                    :error="hasFieldError('onpeak_extra_second')"
                    :error-message="getFieldError('onpeak_extra_second')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.onpeak_use_free_time"
                    :label="$t('Use free time')"
                    data-cy="billingfees-onpeak_use_free_time"
                    :disable="loading"
                />
            </aui-base-form-field>
        </template>
        <template
            #col-2
        >
            <aui-form-field-group-headline
                :headline="$t('OFFPEAK')"
            />
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.offpeak_init_rate"
                    clearable
                    dense
                    :label="$t('Init rate')"
                    data-cy="billingfees-offpeak_init_rate"
                    :error="hasFieldError('offpeak_init_rate')"
                    :error-message="getFieldError('offpeak_init_rate')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.offpeak_init_interval"
                    clearable
                    dense
                    :label="$t('Init interval')"
                    data-cy="billingfees-offpeak_init_interval"
                    :error="hasFieldError('offpeak_init_interval')"
                    :error-message="getFieldError('offpeak_init_interval')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.offpeak_follow_rate"
                    clearable
                    dense
                    :label="$t('Follow rate')"
                    data-cy="billingfees-offpeak_follow_rate"
                    :error="hasFieldError('offpeak_follow_rate')"
                    :error-message="getFieldError('offpeak_follow_rate')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.offpeak_follow_interval"
                    clearable
                    dense
                    :label="$t('Follow interval')"
                    data-cy="billingfees-offpeak_follow_interval"
                    :error="hasFieldError('offpeak_follow_interval')"
                    :error-message="getFieldError('offpeak_follow_interval')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.offpeak_extra_rate"
                    clearable
                    dense
                    :label="$t('Extra rate')"
                    data-cy="billingfees-offpeak_extra_rate"
                    :error="hasFieldError('offpeak_extra_rate')"
                    :error-message="getFieldError('offpeak_extra_rate')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.offpeak_extra_second"
                    clearable
                    dense
                    :label="$t('Extra second')"
                    data-cy="billingfees-offpeak_extra_second"
                    :error="hasFieldError('offpeak_extra_second')"
                    :error-message="getFieldError('offpeak_extra_second')"
                    :disable="loading"
                    @keyup.enter="submit"
                />
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.offpeak_use_free_time"
                    :label="$t('Use free time')"
                    data-cy="billingfees-offpeak_use_free_time"
                    :disable="loading"
                />
            </aui-base-form-field>
            <aui-form-field-group-headline
                :headline="$t('Aoc pulse amount per message')"
            />
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.aoc_pulse_amount_per_message"
                    clearable
                    dense
                    data-cy="billingfees-aoc_pulse_amount_per_message"
                    :error="hasFieldError('aoc_pulse_amount_per_message')"
                    :error-message="getFieldError('aoc_pulse_amount_per_message')"
                    :disable="loading"
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
    required,
    numeric,
    integer,
    minValue
} from '@vuelidate/validators'
import { idAndZoneLabel } from 'src/filters/resource'
import AuiFormFieldGroupHeadline from 'components/AuiFormFieldGroupHeadline'
import AuiSelectZone from 'components/AuiSelectZone'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import AuiCreateButton from 'components/buttons/AuiCreateButton'
import AuiBaseFormField from 'components/AuiBaseFormField'
export default {
    name: 'AuiNewBillingFees',
    components: {
        AuiBaseFormField,
        AuiCreateButton,
        AuiBaseForm,
        AuiSelectZone,
        AuiFormFieldGroupHeadline
    },
    mixins: [baseFormMixin],
    props: {
        zones: {
            type: Object,
            default: null
        },
        billingProfileId: {
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
                billing_zone_id: {
                    required
                },
                destination: {
                    required
                },
                onpeak_init_rate: {
                    numeric
                },
                onpeak_init_interval: {
                    minValue: minValue(1),
                    numeric,
                    integer,
                    required
                },
                onpeak_follow_rate: {
                    numeric
                },
                onpeak_follow_interval: {
                    minValue: minValue(1),
                    numeric,
                    integer,
                    required
                },
                offpeak_init_rate: {
                    numeric
                },
                offpeak_init_interval: {
                    minValue: minValue(1),
                    numeric,
                    integer,
                    required
                },
                offpeak_follow_rate: {
                    numeric
                },
                offpeak_follow_interval: {
                    minValue: minValue(1),
                    numeric,
                    integer,
                    required
                },
                onpeak_extra_rate: {
                    numeric
                },
                onpeak_extra_second: {
                    numeric,
                    integer
                },
                offpeak_extra_rate: {
                    numeric
                },
                offpeak_extra_second: {
                    numeric,
                    integer
                },
                aoc_pulse_amount_per_message: {
                    numeric
                }
            }
        }
    },
    computed: {
        ...mapGetters('billing', [
            'matchModeOptions',
            'directionOptions'
        ]),
        getDefaultData () {
            return {
                billing_zone_id: null,
                match_mode: 'regex_longest_pattern',
                source: '',
                destination: '',
                direction: 'out',
                onpeak_init_rate: 0,
                onpeak_init_interval: 60,
                onpeak_follow_rate: 0,
                onpeak_follow_interval: 60,
                offpeak_init_rate: 0,
                offpeak_init_interval: 60,
                offpeak_follow_rate: 0,
                offpeak_follow_interval: 60,
                onpeak_use_free_time: false,
                offpeak_use_free_time: false,
                onpeak_extra_rate: 0,
                onpeak_extra_second: null,
                offpeak_extra_rate: 0,
                offpeak_extra_second: null,
                aoc_pulse_amount_per_message: 0,
                billing_profile_id: this.billingProfileId

            }
        },
        zoneInitialOption () {
            return this.zones
                ? {
                    label: idAndZoneLabel(this.zones),
                    value: this.zones.id
                }
                : null
        }
    }
}
</script>
