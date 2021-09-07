<template>
    <q-form>
        <div
            class="row"
        >
            <div
                class="col-md-5 col-sm-12"
            >
                <q-list
                    dense
                >
                    <q-item-label
                        header
                        class="text-uppercase"
                    >
                        <q-icon
                            name="fas fa-file-alt"
                            size="sm"
                            class="q-mr-sm"
                        />
                        {{ $t('Details') }}
                    </q-item-label>
                    <q-item>
                        <q-item-section>
                            <q-select
                                v-model="data.type"
                                :options="productOptions"
                                class="aui-required"
                                :label="$t('Product')"
                                emit-value
                                map-options
                                dense
                                :readonly="productOptions.length === 1 || customer !== null"
                                :disable="loading"
                                :error="$v.data.type.$error"
                                :error-message="$errMsg($v.data.type)"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-select-lazy
                                v-model="data.contact_id"
                                :initial-option="contactInitialOptions"
                                class="aui-required"
                                :label="$t('Contact')"
                                store-generator-name="selectLazy/customerContactsList"
                                :create-buttons="{ to: { name: 'contactCreateCustomer' }}"
                                :load-initially="false"
                                :disable="loading"
                                :error="$v.data.contact_id.$error"
                                :error-message="$errMsg($v.data.contact_id)"
                                dense
                                clearable
                                @input-data="selectContact($event)"
                            >
                                <template
                                    v-slot:prepend
                                >
                                    <q-icon
                                        name="fas fa-address-card"
                                        size="sm"
                                        class="q-mr-sm"
                                    />
                                </template>
                            </aui-select-lazy>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="data.max_subscribers"
                                type="number"
                                clearable
                                dense
                                :label="$t('Max Subscribers')"
                                :disable="loading"
                                :error="false"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('Optionally set the maximum number of subscribers for this contract. Leave empty for unlimited.') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-select
                                v-model="data.status"
                                :options="customerStatusOptions"
                                class="aui-required"
                                :label="$t('Status')"
                                emit-value
                                map-options
                                dense
                                :disable="loading"
                                :error="$v.data.status.$error"
                                :error-message="$errMsg($v.data.status)"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="data.external_id"
                                clearable
                                dense
                                :label="$t('External #')"
                                :disable="loading"
                                :error="false"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('A non-unique external ID e.g., provided by a 3rd party provisioning') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="data.vat_rate"
                                dense
                                type="number"
                                :label="$t('VAT Rate')"
                                :disable="loading"
                                :error="false"
                                @keyup.enter="submit"
                            >
                                <q-tooltip>
                                    {{ $t('The VAT rate in percentage (e.g. 20).') }}
                                </q-tooltip>
                            </q-input>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-toggle
                                v-model="data.add_vat"
                                style="padding-bottom: 20px"
                                dense
                                :label="$t('Charge VAT')"
                                :disable="loading"
                                :error="false"
                            >
                                <q-tooltip>
                                    {{ $t('Whether to charge VAT in invoices.') }}
                                </q-tooltip>
                            </q-toggle>
                        </q-item-section>
                    </q-item>
                </q-list>
                <q-list
                    dense
                >
                    <q-item-label
                        header
                        class="text-uppercase"
                    >
                        <q-icon
                            name="fas fa-file-code"
                            size="sm"
                            class="q-mr-sm"
                        />
                        {{ $t('Templates') }}
                    </q-item-label>
                    <q-item>
                        <q-item-section>
                            <aui-select-lazy
                                v-model="data.subscriber_email_template_id"
                                :initial-option="subscriberEmailTemplateInitialOptions"
                                :label="$t('Subscriber Creation Email Template')"
                                store-generator-name="selectLazy/emailTemplatesList"
                                :store-action-params="{
                                    resellerId: (contact) ? contact.reseller_id : null
                                }"
                                create-buttons="/emailtemplate/create"
                                :load-initially="false"
                                :disable="loading || !data.contact_id"
                                :error="false"
                                dense
                                clearable
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-select-lazy
                                v-model="data.passreset_email_template_id"
                                :initial-option="passwordResetEmailTemplateInitialOptions"
                                :label="$t('Password Reset Email Template')"
                                store-generator-name="selectLazy/emailTemplatesList"
                                :store-action-params="{
                                    resellerId: (contact) ? contact.reseller_id : null
                                }"
                                create-buttons="/emailtemplate/create"
                                :load-initially="false"
                                :disable="loading || !data.contact_id"
                                :error="false"
                                dense
                                clearable
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-select-lazy
                                v-model="data.invoice_email_template_id"
                                :initial-option="invoiceEmailTemplateInitialOptions"
                                :label="$t('Invoice Email Template')"
                                store-generator-name="selectLazy/emailTemplatesList"
                                :store-action-params="{
                                    resellerId: (contact) ? contact.reseller_id : null
                                }"
                                create-buttons="/emailtemplate/create"
                                :load-initially="false"
                                :disable="loading || !data.contact_id"
                                :error="false"
                                dense
                                clearable
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-select-lazy
                                v-model="data.invoice_template_id"
                                :initial-option="invoiceTemplateInitialOptions"
                                :label="$t('Invoice Template')"
                                store-generator-name="selectLazy/invoiceTemplatesList"
                                :store-action-params="{
                                    resellerId: (contact) ? contact.reseller_id : null
                                }"
                                create-buttons="/invoicetemplate/create"
                                :load-initially="false"
                                :disable="loading || !data.contact_id"
                                :error="false"
                                dense
                                clearable
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div
                class="col-md-7 col-sm-12"
            >
                <q-list
                    dense
                >
                    <q-item-label
                        header
                        class="text-uppercase"
                    >
                        <q-icon
                            name="fas fa-hand-holding-usd"
                            size="sm"
                            class="q-mr-sm"
                        />
                        {{ $t('Billing Profile') }}
                    </q-item-label>
                    <q-item>
                        <q-item-section>
                            <aui-select-lazy
                                v-model="data.billing_profile_id"
                                :initial-option="billingProfileInitialOptions"
                                class="aui-required"
                                :label="$t('Active Billing Profile')"
                                store-generator-name="selectLazy/billingProfilesList"
                                :store-action-params="{
                                    resellerId: (contact) ? contact.reseller_id : null
                                }"
                                :load-initially="false"
                                :disable="loading"
                                label-color="primary"
                                filled
                                dense
                                create-buttons="/billing/create"
                                :error="$v.data.billing_profile_id.$error"
                                :error-message="$errMsg($v.data.billing_profile_id)"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-select-lazy
                                v-model="data.profile_package_id"
                                :initial-option="profilePackageInitialOptions"
                                :label="$t('Profile Package')"
                                store-generator-name="selectLazy/profilePackagesList"
                                :store-action-params="{
                                    resellerId: (contact) ? contact.reseller_id : null
                                }"
                                :load-initially="false"
                                :disable="loading"
                                label-color="primary"
                                filled
                                clearable
                                dense
                                create-buttons="/package/create"
                                :error="false"
                            />
                        </q-item-section>
                    </q-item>
                </q-list>
                <q-list
                    dense
                >
                    <q-item-label
                        header
                        class="text-uppercase"
                    >
                        <q-icon
                            name="date_range"
                            size="sm"
                            class="q-mr-sm"
                        />
                        {{ $t('Scheduled Billing Profiles') }}
                    </q-item-label>
                    <q-item>
                        <q-item-section
                            class="aui-list-item-section-button"
                            side
                        >
                            <q-btn
                                :label="$t('Schedule Billing Profile')"
                                color="primary"
                                icon="add"
                                size="sm"
                                unelevated
                                outline
                                :disable="loading"
                                @click="addInterval"
                            />
                        </q-item-section>
                    </q-item>
                    <template
                        v-if="editableProfiles && editableProfiles.length > 0"
                    >
                        <template
                            v-for="(editableProfile, index) in editableProfiles"
                        >
                            <q-item
                                :key="index"
                            >
                                <q-item-section>
                                    <div
                                        class="row q-col-gutter-x-sm"
                                    >
                                        <div
                                            class="col-6"
                                        >
                                            <aui-select-lazy
                                                :value="editableProfile.profile.id"
                                                class="aui-required"
                                                :label="$t('Billing Profile')"
                                                store-generator-name="selectLazy/billingProfilesList"
                                                :store-action-params="{
                                                    resellerId: (contact) ? contact.reseller_id : null
                                                }"
                                                :initial-option="{
                                                    label: editableProfile.profile.label,
                                                    value: editableProfile.profile.id
                                                }"
                                                :error="$v.data.billing_profiles.$each[index].profile_id.$error"
                                                :error-message="$errMsg($v.data.billing_profiles.$each[index].profile_id)"
                                                :load-initially="false"
                                                :disable="loading"
                                                dense
                                                @input="data.billing_profiles[index].profile_id=$event"
                                            />
                                        </div>
                                        <div
                                            class="col-6"
                                        >
                                            <aui-select-lazy
                                                :value="editableProfile.network.id"
                                                class="aui-required"
                                                :label="$t('Billing Network')"
                                                store-generator-name="selectLazy/billingNetworksList"
                                                :store-action-params="{
                                                    resellerId: (contact) ? contact.reseller_id : null
                                                }"
                                                :initial-option="{
                                                    label: editableProfile.network.label,
                                                    value: editableProfile.network.id
                                                }"
                                                :error="$v.data.billing_profiles.$each[index].network_id.$error"
                                                :error-message="$errMsg($v.data.billing_profiles.$each[index].network_id)"
                                                :load-initially="false"
                                                :disable="loading"
                                                dense
                                                @input="data.billing_profiles[index].network_id=$event"
                                            />
                                        </div>
                                        <div
                                            class="col-12"
                                        >
                                            <aui-input-date-time-period
                                                :value="{
                                                    start: editableProfile.start,
                                                    stop: editableProfile.stop,
                                                }"
                                                dense
                                                column-gutter-size="sm"
                                                :disable="loading"
                                                :error-start="$v.data.billing_profiles.$each[index].start.$error"
                                                :error-message-start="$errMsg($v.data.billing_profiles.$each[index].start)"
                                                :error-stop="$v.data.billing_profiles.$each[index].stop.$error"
                                                :error-message-stop="$errMsg($v.data.billing_profiles.$each[index].stop)"
                                                @input="
                                                    data.billing_profiles[index].start = $event.start
                                                    data.billing_profiles[index].stop = $event.stop"
                                            />
                                        </div>
                                    </div>
                                </q-item-section>
                                <q-item-section
                                    side
                                >
                                    <q-btn
                                        color="negative"
                                        unelevated
                                        dense
                                        icon="delete"
                                        size="sm"
                                        :disable="loading"
                                        @click="deleteInterval(index)"
                                    />
                                </q-item-section>
                            </q-item>
                        </template>
                    </template>
                </q-list>
                <q-list
                    v-if="customer && allBillingProfilesItems && allBillingProfilesItems.length > 0"
                    separator
                >
                    <q-item-label
                        header
                        class="text-uppercase"
                    >
                        <q-icon
                            name="history"
                            size="sm"
                            class="q-mr-sm"
                        />
                        {{ $t('Billing Profile History') }}
                    </q-item-label>
                    <q-item
                        v-for="(billingProfileItem, index) in allBillingProfilesItems"
                        :key="index"
                        :active="billingProfileItem.profile.id === data.billing_profile_id &&
                            index === customer.billing_profiles.length"
                        :disable="loading"
                    >
                        <q-item-section
                            avatar
                        >
                            <q-icon
                                v-if="index < customer.billing_profiles.length"
                                name="date_range"
                            />
                            <q-icon
                                v-else-if="index === customer.billing_profiles.length"
                                name="fas fa-hand-holding-usd"
                            />
                            <q-icon
                                v-else
                                name="remove"
                            />
                        </q-item-section>
                        <q-item-section>
                            <q-item-label>
                                {{ billingProfileItem.profile.label }}
                            </q-item-label>
                            <q-item-label
                                class="text-weight-light"
                            >
                                {{ billingProfileItem.network.label }}
                            </q-item-label>
                            <q-item-label
                                class="text-weight-light"
                            >
                                {{ billingProfileItem.start }} - {{ billingProfileItem.stop }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
        </div>
    </q-form>
</template>

<script>
import _ from 'lodash'
import AuiSelectLazy from 'components/input/AuiSelectLazy'
import { mapGetters } from 'vuex'
import { required } from 'vuelidate/lib/validators'
import AuiInputDateTimePeriod from 'components/input/AuiInputDateTimePeriod'
import numeric from 'vuelidate/lib/validators/numeric'
import between from 'vuelidate/lib/validators/between'
import {
    billingNetworkLabel,
    billingProfileLabel,
    contactLabel,
    emailTemplateLabel,
    profilePackageLabel
} from 'src/filters/resource'
export default {
    name: 'AuiNewCustomer',
    components: {
        AuiInputDateTimePeriod,
        AuiSelectLazy
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        customer: {
            type: Object,
            default: null
        },
        contact: {
            type: Object,
            default: null
        },
        subscriberEmailTemplate: {
            type: Object,
            default: null
        },
        passwordResetEmailTemplate: {
            type: Object,
            default: null
        },
        invoiceEmailTemplate: {
            type: Object,
            default: null
        },
        invoiceTemplate: {
            type: Object,
            default: null
        },
        billingProfile: {
            type: Object,
            default: null
        },
        billingProfiles: {
            type: Array,
            default: null
        },
        allBillingProfiles: {
            type: Array,
            default: null
        },
        profilePackage: {
            type: Object,
            default: null
        }
    },
    data () {
        return {
            data: this.getDynamicData(this.customer)
        }
    },
    validations () {
        return {
            data: {
                type: {
                    required
                },
                contact_id: {
                    required
                },
                status: {
                    required
                },
                max_subscribers: {
                    numeric
                },
                vat_rate: {
                    required,
                    between: between(0, 100)
                },
                billing_profile_id: {
                    required
                },
                billing_profiles: {
                    $each: {
                        profile_id: {
                            required
                        },
                        network_id: {
                            required
                        },
                        start: {
                            required
                        },
                        stop: {
                        }
                    }
                }
            }
        }
    },
    computed: {
        ...mapGetters('user', [
            'hasCapability'
        ]),
        ...mapGetters('customers', [
            'customerStatusOptions'
        ]),
        productOptions () {
            const options = [
                {
                    label: this.$t('Basic SIP Account'),
                    value: 'sipaccount'
                }
            ]
            if (this.hasCapability('cloudpbx')) {
                options.push({
                    label: this.$t('Cloud PBX Account'),
                    value: 'pbxaccount'
                })
            }
            return options
        },
        editableProfiles () {
            const profiles = []
            if (this.data.billing_profiles && this.data.billing_profiles.length > 0) {
                this.data.billing_profiles.forEach((profile, index) => {
                    if (this.billingProfiles && this.billingProfiles[index]) {
                        profiles.push({
                            profile: {
                                id: profile.profile_id,
                                label: billingProfileLabel(this.billingProfiles[index].profile)
                            },
                            network: {
                                id: profile.network_id,
                                label: billingNetworkLabel(this.billingProfiles[index].network)
                            },
                            start: profile.start || profile.effective_start_time,
                            stop: profile.stop
                        })
                    } else {
                        profiles.push({
                            profile: {
                                id: profile.profile_id,
                                label: ''
                            },
                            network: {
                                id: profile.network_id,
                                label: ''
                            },
                            start: profile.start,
                            stop: profile.stop
                        })
                    }
                })
            }
            return profiles
        },
        allBillingProfilesItems () {
            const profiles = []
            if (this.customer && this.customer.all_billing_profiles) {
                this.customer.all_billing_profiles.forEach((profile, index) => {
                    profiles.push({
                        profile: {
                            id: profile.profile_id,
                            label: billingProfileLabel(this.allBillingProfiles[index].profile)
                        },
                        network: {
                            id: profile.network_id,
                            label: billingNetworkLabel(this.allBillingProfiles[index].network)
                        },
                        start: profile.start || profile.effective_start_time,
                        stop: profile.stop
                    })
                })
            }
            return profiles.reverse()
        },
        contactInitialOptions () {
            if (this.contact) {
                return {
                    label: contactLabel(this.contact),
                    value: this.contact.id
                }
            } else {
                return null
            }
        },
        billingProfileInitialOptions () {
            if (this.billingProfile) {
                return {
                    label: billingProfileLabel(this.billingProfile),
                    value: this.billingProfile.id
                }
            } else {
                return null
            }
        },
        profilePackageInitialOptions () {
            if (this.profilePackage) {
                return {
                    label: profilePackageLabel(this.profilePackage),
                    value: this.profilePackage.id
                }
            } else {
                return null
            }
        },
        subscriberEmailTemplateInitialOptions () {
            if (this.subscriberEmailTemplate) {
                return {
                    label: emailTemplateLabel(this.subscriberEmailTemplate),
                    value: this.subscriberEmailTemplate.id
                }
            } else {
                return null
            }
        },
        passwordResetEmailTemplateInitialOptions () {
            if (this.passwordResetEmailTemplate) {
                return {
                    label: emailTemplateLabel(this.passwordResetEmailTemplate),
                    value: this.passwordResetEmailTemplate.id
                }
            } else {
                return null
            }
        },
        invoiceEmailTemplateInitialOptions () {
            if (this.invoiceEmailTemplate) {
                return {
                    label: emailTemplateLabel(this.invoiceEmailTemplate),
                    value: this.invoiceEmailTemplate.id
                }
            } else {
                return null
            }
        },
        invoiceTemplateInitialOptions () {
            if (this.invoiceTemplate) {
                return {
                    label: this.invoiceTemplate.name,
                    value: this.invoiceTemplate.id
                }
            } else {
                return null
            }
        },
        hasUnsavedData () {
            const initialData = this.getDynamicData(this.customer)
            const currentData = this.getDynamicData(this.data)
            return !_.isEqual(initialData, currentData)
        }
    },
    watch: {
        customer (newCustomer) {
            this.data = this.getDynamicData(newCustomer)
        },
        hasUnsavedData (value) {
            this.$emit('has-unsaved-data', value)
            this.$parent.$emit('form-has-unsaved-data', value)
        }
    },
    methods: {
        addInterval () {
            this.data.billing_profiles.push({
                start: null,
                stop: null,
                profile_id: null,
                network_id: null
            })
        },
        deleteInterval (index) {
            this.data.billing_profiles.splice(index, 1)
        },
        submit () {
            this.$v.$touch()
            if (!this.$v.$invalid) {
                const data = {
                    ...this.data
                }
                if (this.customer && this.customer.billing_profile_id === data.billing_profile_id) {
                    delete data.billing_profile_id
                }
                if (this.customer && this.customer.profile_package_id === data.profile_package_id) {
                    delete data.profile_package_id
                }
                if (this.customer) {
                    data.id = this.customer.id
                }
                this.$emit('input', data)
                this.$parent.$emit('form-input', data)
            }
        },
        reset () {
            this.data = this.getDynamicData(this.customer)
            this.$v.$reset()
        },
        getDynamicData (data) {
            if (data) {
                return {
                    type: data.type,
                    contact_id: data.contact_id,
                    max_subscribers: data.max_subscribers,
                    status: data.status,
                    external_id: data.external_id,
                    vat_rate: data.vat_rate,
                    add_vat: data.add_vat,
                    subscriber_email_template_id: data.subscriber_email_template_id,
                    passreset_email_template_id: data.passreset_email_template_id,
                    invoice_email_template_id: data.invoice_email_template_id,
                    invoice_template_id: data.invoice_template_id,
                    billing_profile_id: data.billing_profile_id,
                    billing_profiles: _.cloneDeep(data.billing_profiles),
                    profile_package_id: data.profile_package_id
                }
            } else {
                return {
                    type: 'sipaccount',
                    contact_id: null,
                    max_subscribers: null,
                    status: 'active',
                    external_id: null,
                    vat_rate: 0,
                    add_vat: false,
                    subscriber_email_template_id: null,
                    passreset_email_template_id: null,
                    invoice_email_template_id: null,
                    invoice_template_id: null,
                    billing_profile_id: null,
                    billing_profiles: [],
                    profile_package_id: null
                }
            }
        },
        selectContact (contact) {
            this.contact = contact
        }
    }
}
</script>
