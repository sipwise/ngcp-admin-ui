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
                    <aui-base-form-field
                        required
                        class="q-mb-md"
                    >
                        <q-btn-toggle
                            v-model="formData.type"
                            :options="productOptions"
                            style="border: 1px solid var(--q-color-primary)"
                            :label="$t('Product')"
                            no-wrap
                            no-caps
                            spread
                            unelevated
                            toggle-color="primary"
                            :readonly="productOptions.length === 1 || hasEntityData"
                            :disable="loading || hasEntityData"
                            :error="v$.formData.type.$errors.length > 0"
                            :error-message="$errMsg(v$.formData.type.$errors)"
                        />
                    </aui-base-form-field>
                    <aui-base-form-field
                        required
                    >
                        <aui-select-contact
                            v-model="formData.contact_id"
                            :initial-option="contactInitialOptions"
                            :reseller-id="resellerId"
                            type="customer"
                            data-cy="aui-select-contact"
                            :disable="loading"
                            :error="v$.formData.contact_id.$errors.length > 0"
                            :error-message="$errMsg(v$.formData.contact_id.$errors)"
                            dense
                            clearable
                            @input-data="selectContact($event)"
                        >
                            <template
                                #after
                            >
                                <aui-create-button
                                    :to="{ name: 'contactCreateCustomer' }"
                                    :label="$t('Create Contact')"
                                    :form-data="formData"
                                />
                            </template>
                        </aui-select-contact>
                    </aui-base-form-field>
                    <aui-base-form-field>
                        <q-input
                            v-model.trim="formData.max_subscribers"
                            type="number"
                            clearable
                            dense
                            :label="$t('Max Subscribers')"
                            data-cy="customer-max-subscribers"
                            :disable="loading"
                            :error="false"
                            @keyup.enter="submit"
                        >
                            <q-tooltip>
                                {{ $t('Optionally set the maximum number of subscribers for this contract. Leave empty for unlimited.') }}
                            </q-tooltip>
                        </q-input>
                    </aui-base-form-field>
                    <aui-base-form-field
                        required
                    >
                        <q-select
                            v-model="formData.status"
                            :options="customerStatusOptions"
                            :label="$t('Status')"
                            data-cy="customer-status"
                            emit-value
                            map-options
                            dense
                            :disable="loading"
                            :error="v$.formData.status.$errors.length > 0"
                            :error-message="$errMsg(v$.formData.status.$errors)"
                        />
                    </aui-base-form-field>
                    <aui-base-form-field>
                        <q-input
                            v-model.trim="formData.external_id"
                            clearable
                            dense
                            :label="$t('External #')"
                            data-cy="customer-external-id"
                            :disable="loading"
                            :error="false"
                            @keyup.enter="submit"
                        >
                            <q-tooltip>
                                {{ $t('A non-unique external ID e.g., provided by a 3rd party provisioning') }}
                            </q-tooltip>
                        </q-input>
                    </aui-base-form-field>
                    <aui-base-form-field>
                        <q-input
                            v-model.trim="formData.vat_rate"
                            dense
                            type="number"
                            :label="$t('VAT Rate')"
                            data-cy="customer-vat-rate"
                            :disable="loading"
                            :error="v$.formData.vat_rate.$errors.length > 0"
                            :error-message="$errMsg(v$.formData.vat_rate.$errors)"
                            @keyup.enter="submit"
                        >
                            <q-tooltip>
                                {{ $t('The VAT rate in percentage (e.g. 20).') }}
                            </q-tooltip>
                        </q-input>
                    </aui-base-form-field>
                    <aui-base-form-field>
                        <q-toggle
                            v-model="formData.add_vat"
                            style="padding-bottom: 20px"
                            dense
                            :label="$t('Charge VAT')"
                            data-cy="customer-charge-vat"
                            :disable="loading"
                            :error="false"
                        >
                            <q-tooltip>
                                {{ $t('Whether to charge VAT in invoices.') }}
                            </q-tooltip>
                        </q-toggle>
                    </aui-base-form-field>
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
                    <aui-base-form-field>
                        <aui-select-lazy
                            v-model="formData.subscriber_email_template_id"
                            :initial-option="subscriberEmailTemplateInitialOptions"
                            :label="$t('Subscriber Creation Email Template')"
                            store-generator-name="selectLazy/emailTemplatesList"
                            :store-action-params="{
                                resellerId: (contact || resellerId) ? contact?.reseller_id || resellerId : null
                            }"
                            :load-initially="false"
                            :disable="loading || !formData.contact_id"
                            :error="false"
                            dense
                            clearable
                        >
                            <template
                                #after
                            >
                                <aui-create-button
                                    :to="{ name: 'emailTemplateCreation' }"
                                    :label="$t('Create Template')"
                                    :form-data="formData"
                                />
                            </template>
                        </aui-select-lazy>
                    </aui-base-form-field>
                    <aui-base-form-field>
                        <aui-select-lazy
                            v-model="formData.passreset_email_template_id"
                            :initial-option="passwordResetEmailTemplateInitialOptions"
                            :label="$t('Password Reset Email Template')"
                            store-generator-name="selectLazy/emailTemplatesList"
                            :store-action-params="{
                                resellerId: (contact || resellerId) ? contact?.reseller_id || resellerId : null
                            }"
                            :load-initially="false"
                            :disable="loading || !formData.contact_id"
                            :error="false"
                            dense
                            clearable
                        >
                            <template
                                #after
                            >
                                <aui-create-button
                                    :to="{ name: 'emailTemplateCreation' }"
                                    :label="$t('Create Template')"
                                    :form-data="formData"
                                />
                            </template>
                        </aui-select-lazy>
                    </aui-base-form-field>
                    <aui-base-form-field>
                        <aui-select-lazy
                            v-model="formData.invoice_email_template_id"
                            :initial-option="invoiceEmailTemplateInitialOptions"
                            :label="$t('Invoice Email Template')"
                            store-generator-name="selectLazy/emailTemplatesList"
                            :store-action-params="{
                                resellerId: (contact || resellerId) ? contact?.reseller_id || resellerId : null
                            }"
                            :load-initially="false"
                            :disable="loading || !formData.contact_id"
                            :error="false"
                            dense
                            clearable
                        >
                            <template
                                #after
                            >
                                <aui-create-button
                                    :to="{ name: 'emailTemplateCreation' }"
                                    :label="$t('Create Template')"
                                    :form-data="formData"
                                />
                            </template>
                        </aui-select-lazy>
                    </aui-base-form-field>
                    <aui-base-form-field>
                        <aui-select-lazy
                            v-model="formData.invoice_template_id"
                            :initial-option="invoiceTemplateInitialOptions"
                            :label="$t('Invoice Template')"
                            store-generator-name="selectLazy/invoiceTemplatesList"
                            :store-action-params="{
                                resellerId: (contact || resellerId) ? contact?.reseller_id || resellerId : null
                            }"
                            :load-initially="false"
                            :disable="loading || !formData.contact_id"
                            :error="false"
                            dense
                            clearable
                        >
                            <template
                                #after
                            >
                                <aui-create-button
                                    :to="{ name: 'invoiceTemplateCreation' }"
                                    :label="$t('Create Template')"
                                    :form-data="formData"
                                />
                            </template>
                        </aui-select-lazy>
                    </aui-base-form-field>
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
                    <aui-base-form-field
                        required
                    >
                        <aui-select-lazy
                            v-model="formData.billing_profile_id"
                            :initial-option="billingProfileInitialOptions"
                            :label="$t('Active Billing Profile')"
                            data-cy="aui-select-billing-profile"
                            store-generator-name="selectLazy/billingProfilesList"
                            :store-action-params="{
                                resellerId: (contact || resellerId) ? contact?.reseller_id || resellerId : null
                            }"
                            :load-initially="false"
                            :disable="loading"
                            label-color="primary"
                            filled
                            dense
                            :error="v$.formData.billing_profile_id.$errors.length > 0"
                            :error-message="$errMsg(v$.formData.billing_profile_id.$errors)"
                        >
                            <template
                                #after
                            >
                                <aui-create-button
                                    :to="{ name: 'billingProfileCreation' }"
                                    :label="$t('Create Billing Profile')"
                                    :form-data="formData"
                                />
                            </template>
                        </aui-select-lazy>
                    </aui-base-form-field>
                    <aui-base-form-field>
                        <aui-select-lazy
                            v-model="formData.profile_package_id"
                            :initial-option="profilePackageInitialOptions"
                            :label="$t('Profile Package')"
                            store-generator-name="selectLazy/profilePackagesList"
                            :store-action-params="{
                                resellerId: (contact || resellerId) ? contact?.reseller_id || resellerId : null
                            }"
                            :load-initially="false"
                            :disable="loading"
                            label-color="primary"
                            filled
                            clearable
                            dense
                            :error="false"
                        >
                            <template
                                #after
                            >
                                <aui-create-button
                                    :to="{ name: 'billingProfilePackageCreation' }"
                                    :label="$t('Create Profile Package')"
                                    :form-data="formData"
                                />
                            </template>
                        </aui-select-lazy>
                    </aui-base-form-field>
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
                        <q-item
                            v-for="(editableProfile, index) in editableProfiles"
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
                                            v-model="formData.billing_profiles[index].profile_id"
                                            class="aui-required"
                                            :label="$t('Billing Profile')"
                                            store-generator-name="selectLazy/billingProfilesList"
                                            :store-action-params="{
                                                resellerId: (contact || resellerId) ? contact?.reseller_id || resellerId : null
                                            }"
                                            :initial-option="billingProfilesInitialOption(index)"
                                            :error="v$.$error && v$.formData.billing_profiles.$each.$response.$errors[index].profile_id.length > 0"
                                            :error-message="$errMsg(v$.formData.billing_profiles.$each.$response.$errors[index].profile_id)"
                                            :load-initially="false"
                                            :disable="loading"
                                            dense
                                        />
                                    </div>
                                    <div
                                        class="col-6"
                                    >
                                        <aui-select-lazy
                                            v-model="formData.billing_profiles[index].network_id"
                                            class="aui-required"
                                            :label="$t('Billing Network')"
                                            store-generator-name="selectLazy/billingNetworksList"
                                            :store-action-params="{
                                                resellerId: (contact || resellerId) ? contact?.reseller_id || resellerId : null
                                            }"
                                            :initial-option="billingNetworksInitialOption(index)"
                                            :error="v$.$error && v$.formData.billing_profiles.$each.$response.$errors[index].network_id.length > 0"
                                            :error-message="$errMsg(v$.formData.billing_profiles.$each.$response.$errors[index].network_id)"
                                            :load-initially="false"
                                            :disable="loading"
                                            dense
                                        />
                                    </div>
                                    <div
                                        class="col-12"
                                    >
                                        <aui-input-date-time-period
                                            :value="{
                                                start: formData.billing_profiles[index].start,
                                                stop: formData.billing_profiles[index].stop
                                            }"
                                            dense
                                            column-gutter-size="sm"
                                            :disable="loading"
                                            :error-start="v$.$error && v$.formData.billing_profiles.$each.$response.$errors[index].start.length > 0"
                                            :error-message-start="$errMsg(v$.formData.billing_profiles.$each.$response.$errors[index].start)"
                                            :error-stop="v$.$error && v$.formData.billing_profiles.$each.$response.$errors[index].stop.length > 0"
                                            :error-message-stop="$errMsg(v$.formData.billing_profiles.$each.$response.$errors[index].stop)"
                                            @input="setBillingProfilePeriod(index, $event)"
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
                </q-list>
                <q-list
                    v-if="initialFormData && allBillingProfilesItems && allBillingProfilesItems.length > 0"
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
                        :active="billingProfileItem.profile.id === formData.billing_profile_id &&
                            index === initialFormData.billing_profiles.length"
                        :disable="loading"
                    >
                        <q-item-section
                            avatar
                        >
                            <q-icon
                                v-if="index < initialFormData.billing_profiles.length"
                                name="date_range"
                            />
                            <q-icon
                                v-else-if="index === initialFormData.billing_profiles.length"
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
    </aui-base-form>
</template>

<script>
import useValidate from '@vuelidate/core'
import {
    between, helpers, numeric,
    required
} from '@vuelidate/validators'
import AuiBaseFormField from 'components/AuiBaseFormField'
import AuiSelectContact from 'components/AuiSelectContact'
import AuiCreateButton from 'components/buttons/AuiCreateButton'
import AuiBaseForm from 'components/edit-forms/AuiBaseForm'
import AuiInputDateTimePeriod from 'components/input/AuiInputDateTimePeriod'
import AuiSelectLazy from 'components/input/AuiSelectLazy'
import _ from 'lodash'
import {
    billingNetworkLabel,
    billingProfileLabel,
    contactLabel,
    emailTemplateLabel,
    profilePackageLabel
} from 'src/filters/resource'
import baseFormMixin from 'src/mixins/base-form'
import { mapGetters } from 'vuex'

export default {
    name: 'AuiNewCustomer',
    components: {
        AuiSelectContact,
        AuiBaseFormField,
        AuiCreateButton,
        AuiBaseForm,
        AuiInputDateTimePeriod,
        AuiSelectLazy
    },
    mixins: [baseFormMixin],
    props: {
        initialContact: {
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
        },
        resellerId: {
            type: Number,
            default: null
        }
    },
    data () {
        return {
            v$: useValidate(),
            contact: null
        }
    },
    validations () {
        return {
            formData: {
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
                    between: this.formData.add_vat ? between(1, 100) : between(0, 100)
                },
                billing_profile_id: {
                    required
                },
                billing_profiles: {
                    $each: helpers.forEach({
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
                    })
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
        billingProfilesInitialOption (index) {
            return (index) => {
                if (this.billingProfiles && this.billingProfiles[index]) {
                    return {
                        label: billingProfileLabel(this.billingProfiles[index].profile),
                        value: this.billingProfiles[index].profile.id
                    }
                }
                return null
            }
        },
        billingNetworksInitialOption (index) {
            return (index) => {
                if (this.billingProfiles && this.billingProfiles[index]) {
                    return {
                        label: billingNetworkLabel(this.billingProfiles[index].network),
                        value: this.billingProfiles[index].network.id
                    }
                }
                return null
            }
        },
        editableProfiles () {
            const profiles = []
            if (this.formData.billing_profiles && this.formData.billing_profiles.length > 0) {
                this.formData.billing_profiles.forEach((profile, index) => {
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
            if (this.initialFormData && this.initialFormData.all_billing_profiles && this.allBillingProfiles) {
                this.initialFormData.all_billing_profiles.forEach((profile, index) => {
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
            }
            return null
        },
        billingProfileInitialOptions () {
            if (this.billingProfile) {
                return {
                    label: billingProfileLabel(this.billingProfile),
                    value: this.billingProfile.id
                }
            }
            return null
        },
        profilePackageInitialOptions () {
            if (this.profilePackage) {
                return {
                    label: profilePackageLabel(this.profilePackage),
                    value: this.profilePackage.id
                }
            }
            return null
        },
        subscriberEmailTemplateInitialOptions () {
            if (this.subscriberEmailTemplate) {
                return {
                    label: emailTemplateLabel(this.subscriberEmailTemplate),
                    value: this.subscriberEmailTemplate.id
                }
            }
            return null
        },
        passwordResetEmailTemplateInitialOptions () {
            if (this.passwordResetEmailTemplate) {
                return {
                    label: emailTemplateLabel(this.passwordResetEmailTemplate),
                    value: this.passwordResetEmailTemplate.id
                }
            }
            return null
        },
        invoiceEmailTemplateInitialOptions () {
            if (this.invoiceEmailTemplate) {
                return {
                    label: emailTemplateLabel(this.invoiceEmailTemplate),
                    value: this.invoiceEmailTemplate.id
                }
            }
            return null
        },
        invoiceTemplateInitialOptions () {
            if (this.invoiceTemplate) {
                return {
                    label: this.invoiceTemplate.name,
                    value: this.invoiceTemplate.id
                }
            }
            return null
        },
        getInitialData () {
            if (this.initialFormData) {
                return {
                    type: this.initialFormData.type,
                    contact_id: this.initialFormData.contact_id,
                    max_subscribers: this.initialFormData.max_subscribers,
                    status: this.initialFormData.status,
                    external_id: this.initialFormData.external_id,
                    vat_rate: this.initialFormData.vat_rate,
                    add_vat: this.initialFormData.add_vat,
                    subscriber_email_template_id: this.initialFormData.subscriber_email_template_id,
                    passreset_email_template_id: this.initialFormData.passreset_email_template_id,
                    invoice_email_template_id: this.initialFormData.invoice_email_template_id,
                    invoice_template_id: this.initialFormData.invoice_template_id,
                    billing_profile_id: this.initialFormData.billing_profile_id,
                    billing_profiles: _.cloneDeep(this.initialFormData.billing_profiles),
                    profile_package_id: this.initialFormData.profile_package_id
                }
            }
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
    mounted () {
        this.contact = this.initialContact
    },
    methods: {
        addInterval () {
            this.formData.billing_profiles.push({
                start: null,
                stop: null,
                profile_id: null,
                network_id: null
            })
        },
        deleteInterval (index) {
            this.formData.billing_profiles.splice(index, 1)
        },
        setBillingProfilePeriod (index, period) {
            this.formData.billing_profiles[index].start = period.start
            this.formData.billing_profiles[index].stop = period.stop
        },
        prepareSubmitData (submitData) {
            if (this.initialFormData && this.initialFormData.billing_profile_id === submitData.billing_profile_id) {
                delete submitData.billing_profile_id
            }
            if (this.initialFormData && this.initialFormData.profile_package_id === submitData.profile_package_id) {
                delete submitData.profile_package_id
            }
            return submitData
        },
        selectContact (contact) {
            this.contact = contact
        }
    }
}
</script>
