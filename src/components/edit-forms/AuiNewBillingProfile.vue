<template>
    <q-form>
        <div
            class="row"
        >
            <div
                class="col-md-6 col-xs-12"
            >
                <q-list
                    dense
                >
                    <q-item>
                        <q-item-section>
                            <aui-select-reseller
                                v-model="reseller_id"
                                dense
                                class="aui-required"
                                :error="$v.reseller_id.$error"
                                :error-message="$errMsg($v.reseller_id)"
                                @blur="$v.reseller_id.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="handle"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Handle')"
                                :error="$v.handle.$error"
                                :error-message="$errMsg($v.handle)"
                                :disable="loading"
                                @blur="$v.handle.$touch()"
                            >
                                <q-tooltip>
                                    {{ $t('A unique identifier string (only alphanumeric chars and _).') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="name"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Name')"
                                :error="$v.name.$error"
                                :error-message="$errMsg($v.name)"
                                :disable="loading"
                                @blur="$v.name.$touch()"
                            >
                                <q-tooltip>
                                    {{ $t('A human readable profile name.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-toggle
                                v-model="prepaid"
                                class="q-pb-md"
                                :label="$t('Prepaid')"
                                :disable="loading"
                            >
                                <q-tooltip>
                                    {{ $t('Whether customers using this profile are handled prepaid.') }}
                                </q-tooltip>
                            </q-toggle>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-select
                                v-model="prepaid_library"
                                class="q-pb-md"
                                :options="billingProfilePrepaidLibraryOptions"
                                :label="$t('Prepaid library')"
                                dense
                                :disable="loading"
                            >
                                <q-tooltip>
                                    {{ $t('Which prepaid rating library to use.') }}
                                </q-tooltip>
                            </q-select>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-toggle
                                v-model="advice_of_charge"
                                class="q-pb-md"
                                :label="$t('Advice of charge')"
                                :disable="loading"
                            >
                                <q-tooltip>
                                    {{ $t('Enable Advice of Charge support for the billing profile.') }}
                                </q-tooltip>
                            </q-toggle>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="interval_charge"
                                clearable
                                dense
                                :label="$t('Interval charge')"
                                :error="$v.interval_charge.$error"
                                :error-message="$errMsg($v.interval_charge)"
                                :disable="loading"
                                @blur="$v.interval_charge.$touch()"
                            >
                                <q-tooltip>
                                    {{ $t('The base fee charged (a monthly fixed fee, e.g. 100) in cents. This fee can be used on the invoice') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="interval_free_time"
                                clearable
                                dense
                                :label="$t('Interval free time')"
                                :error="$v.interval_free_time.$error"
                                :error-message="$errMsg($v.interval_free_time)"
                                :disable="loading"
                                @blur="$v.interval_free_time.$touch()"
                            >
                                <q-tooltip>
                                    {{ $t('The included free minutes per billing interval (in seconds, e.g. 60000 for 1000 free minutes)') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="interval_free_cash"
                                clearable
                                dense
                                :label="$t('Interval free cash')"
                                :error="$v.interval_free_cash.$error"
                                :error-message="$errMsg($v.interval_free_cash)"
                                :disable="loading"
                                @blur="$v.interval_free_cash.$touch()"
                            >
                                <q-tooltip>
                                    {{ $t('The included free money per billing interval (in cents, e.g. 10000)') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div
                class="col-md-6 col-xs-12"
            >
                <q-list
                    dense
                >
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="fraud_interval_limit"
                                clearable
                                dense
                                :label="$t('Fraud monthly limit')"
                                :error="$v.fraud_interval_limit.$error"
                                :error-message="$errMsg($v.fraud_interval_limit)"
                                :disable="loading"
                                @blur="$v.fraud_interval_limit.$touch()"
                            >
                                <q-tooltip>
                                    {{ $t('The fraud detection threshold per month (in cents, e.g. 10000)') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-select
                                v-model="fraud_interval_lock"
                                class="q-pb-md"
                                :options="billingProfileFraudIntervalLockOptions"
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
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="fraud_interval_notify"
                                clearable
                                dense
                                :label="$t('Fraud monthly notify')"
                                :error="$v.fraud_interval_notify.$error"
                                :error-message="$t('Only comma separated email addresses are allowed')"
                                :disable="loading"
                                @blur="$v.fraud_interval_notify.$touch()"
                            >
                                <q-tooltip>
                                    {{ $t('Comma separated list of Email addresses to send notifications when thresholds are exceeded') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="fraud_daily_limit"
                                clearable
                                dense
                                :label="$t('Fraud daily limit')"
                                :error="$v.fraud_daily_limit.$error"
                                :error-message="$errMsg($v.fraud_daily_limit)"
                                :disable="loading"
                                @blur="$v.fraud_daily_limit.$touch()"
                            >
                                <q-tooltip>
                                    {{ $t('The fraud detection threshold per day (in cents, e.g. 10000)') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-select
                                v-model="fraud_daily_lock"
                                class="q-pb-md"
                                :options="billingProfileFraudIntervalLockOptions"
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
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="fraud_daily_notify"
                                clearable
                                dense
                                :label="$t('Fraud daily notify')"
                                :error="$v.fraud_daily_notify.$error"
                                :error-message="$t('Only comma separated email addresses are allowed')"
                                :disable="loading"
                                @blur="$v.fraud_daily_notify.$touch()"
                            >
                                <q-tooltip>
                                    {{ $t('Comma separated list of Email addresses to send notifications when thresholds are exceeded') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-toggle
                                v-model="fraud_use_reseller_rates"
                                class="q-pb-md"
                                :label="$t('Fraud use reseller rates')"
                                :disable="loading"
                            >
                                <q-tooltip>
                                    {{ $t("User rates of the reseller's billing profile for fraud control.") }}
                                </q-tooltip>
                            </q-toggle>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="currency"
                                clearable
                                dense
                                :label="$t('Currency')"
                            >
                                <q-tooltip>
                                    {{ $t('The currency symbol or ISO code, used on invoices and webinterfaces.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </q-form>
</template>

<script>
import {
    required,
    numeric,
    email
} from 'vuelidate/lib/validators'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'
import AuiSelectReseller from 'components/AuiSelectReseller'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import { mapGetters } from 'vuex'
const commaSeparatedEmails = (value) => {
    if (typeof value === 'undefined' || value === null || value === '') {
        return true
    }
    const emails = String(value).split(',').map(e => e.trim())
        .reduceRight(function removeTrailingCommas (acc, e) {
            if (acc.length !== 0 || e.length !== 0) {
                acc.push(e)
            }
            return acc
        }, [])
    const containsErrors = emails.some(e => e.length === 0 || !email(e))
    return emails.length === 0 || !containsErrors
}
export default {
    name: 'AuiNewBillingProfile',
    components: {
        AuiSelectReseller
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            reseller_id: null,
            handle: null,
            name: null,
            prepaid: false,
            prepaid_library: 'libswrate',
            advice_of_charge: false,
            interval_charge: 0,
            interval_free_time: 0,
            interval_free_cash: 0,
            fraud_interval_limit: 0,
            fraud_interval_lock: 0,
            fraud_interval_notify: null,
            fraud_daily_limit: 0,
            fraud_daily_lock: 0,
            fraud_daily_notify: null,
            fraud_use_reseller_rates: false,
            currency: null
        }
    },
    validations: {
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

    },
    computed: {
        ...mapWaitingGetters({
            processingCreateBillingProfile: 'processing createBillingProfile'
        }),
        ...mapGetters('billing', [
            'billingProfilePrepaidLibraryOptions',
            'billingProfileFraudIntervalLockOptions'
        ])
    },
    watch: {
        processingCreateBillingProfile (value) {
            this.$emit('processing', value)
        }
    },
    methods: {
        ...mapWaitingActions('billing', {
            createBillingProfile: 'processing billing profile'
        }),
        async submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const submitData = {
                    reseller_id: this.reseller_id,
                    handle: this.handle,
                    name: this.name,
                    prepaid: this.prepaid,
                    prepaid_library: this.prepaid_library,
                    advice_of_charge: this.advice_of_charge,
                    interval_charge: this.interval_charge,
                    interval_free_time: this.interval_free_time,
                    interval_free_cash: this.interval_free_cash,
                    fraud_interval_limit: this.fraud_interval_limit,
                    fraud_interval_lock: this.fraud_interval_lock,
                    fraud_interval_notify: this.fraud_interval_notify,
                    fraud_daily_limit: this.fraud_daily_limit,
                    fraud_daily_lock: this.fraud_daily_lock,
                    fraud_daily_notify: this.fraud_daily_notify,
                    fraud_use_reseller_rates: this.fraud_use_reseller_rates,
                    currency: this.currency
                }
                await this.createBillingProfile(submitData)
                this.$emit('saved', submitData)
                showGlobalSuccessMessage(this.$t('New billing profile created successfully'))
            }
        }
    }
}
</script>
