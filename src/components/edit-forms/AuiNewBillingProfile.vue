<template>
    <aui-reseller-form
        layout="6-6"
        dense-list
        :reseller="reseller"
        :reseller-id-acl="resellerIdAcl && !resellerId"
        :hide-reseller-select="hideResellerSelect"
        :reseller-id="formData.reseller_id"
        :reseller-id-error="resellerIdHasError"
        :reseller-id-error-message="resellerIdGetError"
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
            #col-1
        >
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.handle"
                    clearable
                    dense
                    :label="$t('Handle')"
                    data-cy="billingprofiles-handle"
                    :error="hasFieldError('handle')"
                    :error-message="getFieldError('handle')"
                    :disable="loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('A unique identifier string (only alphanumeric chars and _).') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field
                required
            >
                <q-input
                    v-model.trim="formData.name"
                    clearable
                    dense
                    :label="$t('Name')"
                    data-cy="billingprofiles-name"
                    :error="hasFieldError('name')"
                    :error-message="getFieldError('name')"
                    :disable="loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('A human readable profile name.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.ignore_domain"
                    class="q-pb-md"
                    :label="$t('Ignore domain')"
                    data-cy="billingprofiles-ignore_domain"
                    :error="false"
                    :disable="loading"
                >
                    <q-tooltip>
                        {{ $t('Ignore SIP domain part when matching fees') }}
                    </q-tooltip>
                </q-toggle>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.prepaid"
                    class="q-pb-md"
                    :label="$t('Prepaid')"
                    data-cy="billingprofiles-prepaid"
                    :error="false"
                    :disable="loading"
                >
                    <q-tooltip>
                        {{ $t('Whether customers using this profile are handled prepaid.') }}
                    </q-tooltip>
                </q-toggle>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.prepaid_library"
                    class="q-pb-md"
                    :options="billingProfilePrepaidLibraryOptions"
                    :label="$t('Prepaid library')"
                    data-cy="billingprofiles-prepaid_library"
                    :error="false"
                    dense
                    :disable="loading"
                >
                    <q-tooltip>
                        {{ $t('Which prepaid rating library to use.') }}
                    </q-tooltip>
                </q-select>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.advice_of_charge"
                    class="q-pb-md"
                    :label="$t('Advice of charge')"
                    data-cy="billingprofiles-advice_of_charge"
                    :error="false"
                    :disable="loading"
                >
                    <q-tooltip>
                        {{ $t('Enable Advice of Charge support for the billing profile.') }}
                    </q-tooltip>
                </q-toggle>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.interval_charge"
                    clearable
                    dense
                    :label="$t('Interval charge')"
                    data-cy="billingprofiles-interval_charge"
                    :error="hasFieldError('interval_charge')"
                    :error-message="getFieldError('interval_charge')"
                    :disable="loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The base fee charged (a monthly fixed fee, e.g. 100) in cents. This fee can be used on the invoice') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.interval_free_time"
                    clearable
                    dense
                    :label="$t('Interval free time')"
                    data-cy="billingprofiles-interval_free_time"
                    :error="hasFieldError('interval_free_time')"
                    :error-message="getFieldError('interval_free_time')"
                    :disable="loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The included free minutes per billing interval (in seconds, e.g. 60000 for 1000 free minutes)') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.interval_free_cash"
                    clearable
                    dense
                    :label="$t('Interval free cash')"
                    data-cy="billingprofiles-interval_free_cash"
                    :error="hasFieldError('interval_free_cash')"
                    :error-message="getFieldError('interval_free_cash')"
                    :disable="loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The included free money per billing interval (in cents, e.g. 10000)') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
        </template>
        <template
            #col-2
        >
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.fraud_interval_limit"
                    clearable
                    dense
                    :label="$t('Fraud monthly limit')"
                    data-cy="billingprofiles-fraud_interval_limit"
                    :error="hasFieldError('fraud_interval_limit')"
                    :error-message="getFieldError('fraud_interval_limit')"
                    :disable="loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The fraud detection threshold per month (in cents, e.g. 10000)') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.fraud_interval_lock"
                    class="q-pb-md"
                    :options="billingProfileFraudIntervalLockOptions"
                    data-cy="billingprofiles-fraud_interval_lock"
                    :label="$t('Fraud monthly lock')"
                    emit-value
                    map-options
                    dense
                    :disable="loading"
                >
                    <q-tooltip>
                        {{ $t('Options to lock customer if the monthly limit is exceeded.') }}
                    </q-tooltip>
                </q-select>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.fraud_interval_notify"
                    clearable
                    dense
                    :label="$t('Fraud monthly notify')"
                    data-cy="billingprofiles-fraud_interval_notify"
                    :error="hasFieldError('fraud_interval_notify')"
                    :error-message="$t('Input must be a one or more valid email addresses separated by comma')"
                    :disable="loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('Comma separated list of Email addresses to send notifications when thresholds are exceeded') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.fraud_daily_limit"
                    clearable
                    dense
                    :label="$t('Fraud daily limit')"
                    data-cy="billingprofiles-fraud_daily_limit"
                    :error="hasFieldError('fraud_daily_limit')"
                    :error-message="getFieldError('fraud_daily_limit')"
                    :disable="loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The fraud detection threshold per day (in cents, e.g. 10000)') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-select
                    v-model="formData.fraud_daily_lock"
                    class="q-pb-md"
                    :options="billingProfileFraudIntervalLockOptions"
                    data-cy="billingprofiles-fraud_daily_lock"
                    :label="$t('Fraud daily lock')"
                    emit-value
                    map-options
                    dense
                    :disable="loading"
                >
                    <q-tooltip>
                        {{ $t('Options to lock customer if the daily limit is exceeded.') }}
                    </q-tooltip>
                </q-select>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.fraud_daily_notify"
                    clearable
                    dense
                    :label="$t('Fraud daily notify')"
                    data-cy="billingprofiles-fraud_daily_notify"
                    :error="hasFieldError('fraud_daily_notify')"
                    :error-message="$t('Input must be a one or more valid email addresses separated by comma')"
                    :disable="loading"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('Comma separated list of Email addresses to send notifications when thresholds are exceeded') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-toggle
                    v-model="formData.fraud_use_reseller_rates"
                    class="q-pb-md"
                    :label="$t('Fraud use reseller rates')"
                    data-cy="billingprofiles-fraud_use_reseller_rates"
                    :disable="loading"
                >
                    <q-tooltip>
                        {{ $t("User rates of the reseller's billing profile for fraud control.") }}
                    </q-tooltip>
                </q-toggle>
            </aui-base-form-field>
            <aui-base-form-field>
                <q-input
                    v-model.trim="formData.currency"
                    clearable
                    dense
                    :label="$t('Currency')"
                    data-cy="billingprofiles-currency"
                    @keyup.enter="submit"
                >
                    <q-tooltip>
                        {{ $t('The currency symbol or ISO code, used on invoices and webinterfaces.') }}
                    </q-tooltip>
                </q-input>
            </aui-base-form-field>
        </template>
    </aui-reseller-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    numeric,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiResellerForm from 'components/edit-forms/AuiResellerForm'
import resellerFormMixin from 'src/mixins/reseller-form'
import { commaSeparatedEmails } from 'src/validators/common'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiNewBillingProfile',
    components: {
        AuiResellerForm,
        AuiBaseFormField
    },
    mixins: [resellerFormMixin],
    props: {
        reseller: {
            type: Object,
            default: null
        },
        resellerId: {
            type: Number,
            default: null
        },
        isClone: {
            type: Boolean,
            default: false
        },
        hideResellerSelect: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            v$: useValidate()
        }
    },
    computed: {
        ...mapGetters('billing', [
            'billingProfilePrepaidLibraryOptions',
            'billingProfileFraudIntervalLockOptions'
        ]),
        aclEntity () {
            return 'billingprofiles'
        },
        getInitialData () {
            return {
                reseller_id: this.initialFormData?.reseller_id || null,
                handle: this.isClone ? `${this.initialFormData?.handle}_duplicate` : (this.initialFormData?.handle || null),
                name: this.isClone ? `${this.initialFormData?.name}_duplicate` : (this.initialFormData?.name || null),
                ignore_domain: this.initialFormData?.ignore_domain || false,
                prepaid: this.initialFormData?.prepaid || false,
                prepaid_library: this.initialFormData?.prepaid_library || 'libswrate',
                advice_of_charge: this.initialFormData?.advice_of_charge || false,
                interval_charge: this.initialFormData?.interval_charge || 0,
                interval_free_time: this.initialFormData?.interval_free_time || 0,
                interval_free_cash: this.initialFormData?.interval_free_cash || 0,
                fraud_interval_limit: this.initialFormData?.fraud_daily_limit || null,
                fraud_interval_lock: this.initialFormData?.fraud_interval_lock || 0,
                fraud_interval_notify: this.initialFormData?.fraud_interval_notify || null,
                fraud_daily_limit: this.initialFormData?.fraud_daily_limit || null,
                fraud_daily_lock: this.initialFormData?.fraud_daily_lock || 0,
                fraud_daily_notify: this.initialFormData?.fraud_daily_notify || null,
                fraud_use_reseller_rates: this.initialFormData?.fraud_use_reseller_rates || false,
                currency: this.initialFormData?.currency || null
            }
        }
    },
    methods: {
        getValidations () {
            return {
                reseller_id: {
                    required
                },
                handle: {
                    required
                },
                name: {
                    required
                },
                interval_charge: {
                    numeric
                },
                interval_free_time: {
                    numeric
                },
                interval_free_cash: {
                    numeric
                },
                fraud_interval_limit: {
                    numeric
                },
                fraud_interval_notify: {
                    commaSeparatedEmails
                },
                fraud_daily_limit: {
                    numeric
                },
                fraud_daily_notify: {
                    commaSeparatedEmails
                }
            }
        }
    }
}
</script>
