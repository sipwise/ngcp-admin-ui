<template>
    <aui-base-form
        layout="6-6"
        dense-list
    >
        <slot
            v-if="canEdit"
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
            <aui-form-field-group-headline
                icon="event_repeat"
                :headline="$t('Monthly Settings')"
            />
            <aui-customer-fraud-limit-data
                :is-billing-profile-source="isBillingProfileSourceMonthly"
                :source="sourceMonthly"
                :fraud-limit="fraudLimitMonthly"
                :lock-level="lockeLevelMonthly"
                :notify="notifyMonthly"
            />
            <aui-customer-fraud-limit-settings
                :notify-data="formData.fraud_interval_notify"
                :limit-data="formData.fraud_interval_limit"
                :lock-level-data="formData.fraud_interval_lock"
                :is-monthly="true"
                :loading="loading"
                class="q-mb-md"
                @input="updateSettings($event)"
            />
        </template>
        <template
            #col-2
        >
            <aui-form-field-group-headline
                icon="update"
                :headline="$t('Daily Settings')"
            />
            <aui-customer-fraud-limit-data
                :is-billing-profile-source="isBillingProfileSourceDaily"
                :source="sourceDaily"
                :fraud-limit="fraudLimitDaily"
                :lock-level="lockLevelDaily"
                :notify="notifyDaily"
            />
            <aui-customer-fraud-limit-settings
                :notify-data="formData.fraud_daily_notify"
                :limit-data="formData.fraud_daily_limit"
                :lock-level-data="formData.fraud_daily_lock"
                :is-monthly="false"
                :loading="loading"
                class="q-mb-md"
                @input="updateSettings($event)"
            />
        </template>
    </aui-base-form>
</template>

<script>
import baseFormMixin from 'src/mixins/base-form'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiCustomerFraudLimitSettings from 'components/AuiCustomerFraudLimitSettings'
import _ from 'lodash'
import AuiFormFieldGroupHeadline from 'components/AuiFormFieldGroupHeadline'
import AuiCustomerFraudLimitData from 'components/AuiCustomerFraudLimitData'
export default {
    name: 'AuiCustomerFraudLimitsForm',
    components: { AuiCustomerFraudLimitData, AuiFormFieldGroupHeadline, AuiBaseForm, AuiCustomerFraudLimitSettings },
    mixins: [baseFormMixin],
    props: {
        customerId: {
            type: Number,
            required: true
        }
    },
    computed: {
        isBillingProfileSourceMonthly () {
            return this.initialFormData.current_fraud_interval_source === 'billing_profile'
        },
        sourceMonthly () {
            return _.startCase(this.initialFormData.current_fraud_interval_source)
        },
        fraudLimitMonthly () {
            return this.initialFormData.current_fraud_interval_limit
        },
        lockeLevelMonthly () {
            return this.initialFormData?.current_fraud_interval_lock?.toString()
        },
        notifyMonthly () {
            return this.initialFormData.current_fraud_interval_notify
        },
        isBillingProfileSourceDaily () {
            return this.initialFormData.current_fraud_daily_source === 'billing_profile'
        },
        sourceDaily () {
            return _.startCase(this.initialFormData.current_fraud_daily_source)
        },
        fraudLimitDaily () {
            return this.initialFormData.current_fraud_daily_limit
        },
        lockLevelDaily () {
            return this.initialFormData?.current_fraud_daily_lock?.toString()
        },
        notifyDaily () {
            return this.initialFormData.current_fraud_daily_notify
        },
        getInitialData () {
            if (this.initialFormData) {
                return {
                    fraud_interval_limit: this.initialFormData.fraud_interval_limit,
                    fraud_interval_lock: this.initialFormData.fraud_interval_lock === 0 ? null : this.initialFormData.fraud_interval_lock,
                    fraud_interval_notify: this.emailsStringToArray(this.initialFormData.fraud_interval_notify),
                    fraud_daily_limit: this.initialFormData.fraud_daily_limit,
                    fraud_daily_lock: this.initialFormData.fraud_daily_lock === 0 ? null : this.initialFormData.fraud_daily_lock,
                    fraud_daily_notify: this.emailsStringToArray(this.initialFormData.fraud_daily_notify)
                }
            } else {
                return {
                    fraud_interval_limit: null,
                    fraud_interval_lock: null,
                    fraud_interval_notify: [],
                    fraud_daily_limit: null,
                    fraud_daily_lock: null,
                    fraud_daily_notify: []
                }
            }
        },
        canEdit () {
            return this.$aclCan('update', 'entity.subscribers')
        }
    },
    methods: {
        emailsStringToArray (emailsString) {
            let emailsArray = []
            if (emailsString) {
                emailsArray = emailsString.split(',')
                emailsArray.map((email) => {
                    return email.trim()
                })
            }
            return emailsArray
        },
        updateSettings (data) {
            if (data.isMonthly) {
                this.formData.fraud_interval_limit = data.limit
                this.formData.fraud_interval_lock = data.lockLevel
                this.formData.fraud_interval_notify = data.notify
            } else {
                this.formData.fraud_daily_limit = data.limit
                this.formData.fraud_daily_lock = data.lockLevel
                this.formData.fraud_daily_notify = data.notify
            }
        },
        prepareSubmitData (submitData) {
            if (this.formData.fraud_daily_limit === null || this.formData.fraud_daily_limit === '') {
                submitData.fraud_daily_limit = null
                submitData.fraud_daily_lock = null
                submitData.fraud_daily_notify = null
            }
            if (submitData.fraud_daily_limit && this.formData.fraud_daily_notify.length > 0) {
                submitData.fraud_daily_notify = this.formData.fraud_daily_notify.join(',')
            } else {
                submitData.fraud_daily_notify = null
            }
            if (this.formData.fraud_interval_limit === null || this.formData.fraud_interval_limit === '') {
                submitData.fraud_interval_limit = null
                submitData.fraud_interval_lock = null
                submitData.fraud_interval_notify = null
            }
            if (submitData.fraud_interval_notify && this.formData.fraud_interval_notify.length > 0) {
                submitData.fraud_interval_notify = this.formData.fraud_interval_notify.join(',')
            } else {
                submitData.fraud_interval_notify = null
            }
            return submitData
        }
    }
}
</script>
