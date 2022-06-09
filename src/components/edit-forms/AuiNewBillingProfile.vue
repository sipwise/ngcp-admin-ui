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
                class="col-md-6 col-xs-12"
            >
                <q-list
                    dense
                >
                    <q-item
                        v-if="!resellerId"
                    >
                        <q-item-section>
                            <aui-select-reseller
                                v-model="formData.reseller_id"
                                dense
                                class="aui-required"
                                :error="$v.formData.reseller_id.$error"
                                :error-message="$errMsg($v.formData.reseller_id)"
                                @blur="$v.formData.reseller_id.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="formData.handle"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Handle')"
                                :error="$v.formData.handle.$error"
                                :error-message="$errMsg($v.formData.handle)"
                                :disable="loading"
                                @keyup.enter="submit"
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
                                v-model.trim="formData.name"
                                clearable
                                dense
                                class="aui-required"
                                :label="$t('Name')"
                                :error="$v.formData.name.$error"
                                :error-message="$errMsg($v.formData.name)"
                                :disable="loading"
                                @keyup.enter="submit"
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
                                v-model="formData.ignore_domain"
                                class="q-pb-md"
                                :label="$t('Ignore domain')"
                                :disable="loading"
                            >
                                <q-tooltip>
                                    {{ $t('Ignore SIP domain part when matching fees') }}
                                </q-tooltip>
                            </q-toggle>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-toggle
                                v-model="formData.prepaid"
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
                                v-model="formData.prepaid_library"
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
                                v-model="formData.advice_of_charge"
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
                                v-model.trim="formData.interval_charge"
                                clearable
                                dense
                                :label="$t('Interval charge')"
                                :error="$v.formData.interval_charge.$error"
                                :error-message="$errMsg($v.formData.interval_charge)"
                                :disable="loading"
                                @keyup.enter="submit"
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
                                v-model.trim="formData.interval_free_time"
                                clearable
                                dense
                                :label="$t('Interval free time')"
                                :error="$v.formData.interval_free_time.$error"
                                :error-message="$errMsg($v.formData.interval_free_time)"
                                :disable="loading"
                                @keyup.enter="submit"
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
                                v-model.trim="formData.interval_free_cash"
                                clearable
                                dense
                                :label="$t('Interval free cash')"
                                :error="$v.formData.interval_free_cash.$error"
                                :error-message="$errMsg($v.formData.interval_free_cash)"
                                :disable="loading"
                                @keyup.enter="submit"
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
                                v-model.trim="formData.fraud_interval_limit"
                                clearable
                                dense
                                :label="$t('Fraud monthly limit')"
                                :error="$v.formData.fraud_interval_limit.$error"
                                :error-message="$errMsg($v.formData.fraud_interval_limit)"
                                :disable="loading"
                                @keyup.enter="submit"
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
                                v-model="formData.fraud_interval_lock"
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
                                v-model.trim="formData.fraud_interval_notify"
                                clearable
                                dense
                                :label="$t('Fraud monthly notify')"
                                :error="$v.formData.fraud_interval_notify.$error"
                                :error-message="$t('Only comma separated email addresses are allowed')"
                                :disable="loading"
                                @keyup.enter="submit"
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
                                v-model.trim="formData.fraud_daily_limit"
                                clearable
                                dense
                                :label="$t('Fraud daily limit')"
                                :error="$v.formData.fraud_daily_limit.$error"
                                :error-message="$errMsg($v.formData.fraud_daily_limit)"
                                :disable="loading"
                                @keyup.enter="submit"
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
                                v-model="formData.fraud_daily_lock"
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
                                v-model.trim="formData.fraud_daily_notify"
                                clearable
                                dense
                                :label="$t('Fraud daily notify')"
                                :error="$v.formData.fraud_daily_notify.$error"
                                :error-message="$t('Only comma separated email addresses are allowed')"
                                :disable="loading"
                                @keyup.enter="submit"
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
                                v-model="formData.fraud_use_reseller_rates"
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
                                v-model.trim="formData.currency"
                                clearable
                                dense
                                :label="$t('Currency')"
                                @keyup.enter="submit"
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
    </aui-base-form>
</template>

<script>
import {
    required,
    numeric,
    email
} from 'vuelidate/lib/validators'
import AuiSelectReseller from 'components/AuiSelectReseller'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import baseFormMixin from 'src/mixins/base-form'
import { mapGetters } from 'vuex'
// Todo: Create unit test for this validator
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
        AuiBaseForm,
        AuiSelectReseller
    },
    mixins: [baseFormMixin],
    props: {
        resellerId: {
            type: Number,
            default: null
        }
    },
    validations: {
        formData: {
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
    },
    computed: {
        ...mapGetters('billing', [
            'billingProfilePrepaidLibraryOptions',
            'billingProfileFraudIntervalLockOptions'
        ]),
        getInitialData () {
            if (this.initialFormData) {
                return {
                    reseller_id: this.initialFormData.reseller_id,
                    handle: this.initialFormData.handle,
                    name: this.initialFormData.name,
                    ignore_domain: this.initialFormData.ignore_domain,
                    prepaid: this.initialFormData.prepaid,
                    prepaid_library: this.initialFormData.prepaid_library,
                    advice_of_charge: this.initialFormData.advice_of_charge,
                    interval_charge: this.initialFormData.interval_charge,
                    interval_free_time: this.initialFormData.interval_free_time,
                    interval_free_cash: this.initialFormData.interval_free_cash,
                    fraud_interval_limit: this.initialFormData.fraud_interval_limit,
                    fraud_interval_lock: this.initialFormData.fraud_interval_lock,
                    fraud_interval_notify: this.initialFormData.fraud_interval_notify,
                    fraud_daily_limit: this.initialFormData.fraud_daily_limit,
                    fraud_daily_lock: this.initialFormData.fraud_daily_lock,
                    fraud_daily_notify: this.initialFormData.fraud_daily_notify,
                    fraud_use_reseller_rates: this.initialFormData.fraud_use_reseller_rates,
                    currency: this.initialFormData.currency
                }
            } else {
                return {
                    reseller_id: this.resellerId,
                    handle: null,
                    name: null,
                    ignore_domain: false,
                    prepaid: false,
                    prepaid_library: 'libswrate',
                    advice_of_charge: false,
                    interval_charge: 0,
                    interval_free_time: 0,
                    interval_free_cash: 0,
                    fraud_interval_limit: null,
                    fraud_interval_lock: 0,
                    fraud_interval_notify: null,
                    fraud_daily_limit: null,
                    fraud_daily_lock: 0,
                    fraud_daily_notify: null,
                    fraud_use_reseller_rates: false,
                    currency: null
                }
            }
        }
    }
}
</script>
