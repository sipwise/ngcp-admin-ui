<template>
    <q-form>
        <div
            class="row"
        >
            <div
                class="col-md-4 col-sm-12"
            >
                <q-list
                    dense
                >
                    <q-item>
                        <q-item-section>
                            <aui-select-contact
                                v-model="contact_id"
                                dense
                                type="customer"
                                :initial-option="initialContactOption"
                                :error="$v.contact_id.$error"
                                :error-message="$errMsg($v.contact_id)"
                                @blur="$v.contact_id.$touch()"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-select
                                v-model="type"
                                :options="productOptions"
                                :label="$t('Product')"
                                :loading="loadingProducts"
                                emit-value
                                map-options
                                dense
                                :error="$v.type.$error"
                                :error-message="$errMsg($v.type)"
                                :disable="loading"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="max_subscribers"
                                clearable
                                dense
                                :label="$t('Max Subscribers')"
                                :error="$v.max_subscribers.$error"
                                :error-message="$errMsg($v.max_subscribers)"
                                :disable="loading"
                                @blur="$v.max_subscribers.$touch()"
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
                                v-model="status"
                                :options="customerStatusOptions"
                                :label="$t('Status')"
                                emit-value
                                map-options
                                dense
                                :disable="loading"
                                :error="false"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-input
                                v-model.trim="external_id"
                                clearable
                                dense
                                :label="$t('External #')"
                                :disable="loading"
                                :error="false"
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
                                v-model.trim="vat_rate"
                                dense
                                :label="$t('VAT Rate')"
                                :disable="loading"
                                :error="$v.vat_rate.$error"
                                :error-message="$errMsg($v.vat_rate)"
                                @blur="$v.vat_rate.$touch()"
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
                                v-model="add_vat"
                                dense
                                :label="$t('Charge VAT')"
                                :disable="loading"
                            >
                                <q-tooltip>
                                    {{ $t('Whether to charge VAT in invoices.') }}
                                </q-tooltip>
                            </q-toggle>
                        </q-item-section>
                    </q-item>
                </q-list>
            </div>
            <div
                class="col-md-4 col-sm-12"
            >
                <q-list
                    dense
                >
                    <q-item>
                        <q-item-section>
                            <q-select
                                v-model="billingProfile"
                                :options="billingProfileTypeOptions"
                                :label="$t('Set Billing Profiles')"
                                emit-value
                                map-options
                                dense
                                :disable="loading"
                                :error="$v.billingProfile.$error"
                                :error-message="$errMsg($v.billingProfile)"
                                @input="billingProfileChanged"
                            >
                                <q-tooltip>
                                    {{ $t('Choose to set a billing profile package or set billing profiles directly.') }}
                                </q-tooltip>
                            </q-select>
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="isSingleBillingProfile"
                    >
                        <q-item-section>
                            <aui-select-lazy
                                v-model="billing_profile_id"
                                :label="$t('Billing Profile')"
                                store-getter="billing/billingProfilesAsOptions"
                                store-action="billing/fetchBillingProfiles"
                                dense
                                :initial-option="initialBillingProfileOption"
                                :disable="loading"
                                :error="$v.billing_profile_id.$error"
                                :error-message="$errMsg($v.billing_profile_id)"
                                :load-initially="false"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="isPackageBillingProfile"
                    >
                        <q-item-section>
                            <aui-select-lazy
                                v-model="profile_package_id"
                                :label="$t('Package')"
                                store-getter="profilePackage/profilePackagesAsOptions"
                                store-action="profilePackage/fetchProfilePackages"
                                dense
                                :disable="loading"
                                :error="$v.profile_package_id.$error"
                                :error-message="$errMsg($v.profile_package_id)"
                                :load-initially="false"
                            />
                        </q-item-section>
                    </q-item>
                    <template
                        v-for="(profile, index) in billingProfileIntervals"
                    >
                        <q-item
                            v-if="isScheduleBillingProfile"
                            :key="index + '-profile'"
                        >
                            <q-item-section>
                                <aui-select-billing-profile
                                    ref="billingProfile"
                                    :initial-value="profile.profile_id"
                                    :initial-option="initialIntervalBillingProfile(index)"
                                    :index="index"
                                    :disable="loading"
                                    @billingProfileSelected="billingProfileSelected"
                                />
                            </q-item-section>
                        </q-item>
                        <q-item
                            v-if="isScheduleBillingProfile"
                            :key="index + '-network'"
                        >
                            <q-item-section>
                                <aui-select-network
                                    :index="index"
                                    :initial-value="profile.network_id"
                                    :initial-option="initialIntervalNetwork(index)"
                                    :disable="loading"
                                    @billingNetworkSelected="billingNetworkSelected"
                                />
                            </q-item-section>
                        </q-item>
                        <q-item
                            v-if="isScheduleBillingProfile"
                            :key="index + '-interval'"
                        >
                            <q-item-section>
                                <aui-input-billing-profile-interval
                                    ref="intervals"
                                    :index="index"
                                    :initial-value="{
                                        start: profile.start,
                                        stop: profile.stop
                                    }"
                                    :disable="loading"
                                    @startInput="onStartInput"
                                    @endInput="onEndInput"
                                />
                            </q-item-section>
                        </q-item>
                        <q-item
                            v-if="isScheduleBillingProfile"
                            :key="index + '-actions'"
                        >
                            <q-item-section>
                                <q-btn
                                    icon="delete"
                                    :label="$t('Delete interval')"
                                    color="negative"
                                    :disable="billingProfileIntervals.length === 1 || loading"
                                    unelevated
                                    size="sm"
                                    @click="deleteInterval(index)"
                                />
                            </q-item-section>
                            <q-item-section>
                                <q-btn
                                    v-if="index === billingProfileIntervals.length - 1 || loading"
                                    icon="add"
                                    :label="$t('Add interval')"
                                    color="primary"
                                    unelevated
                                    size="sm"
                                    @click="addInterval({
                                        profile_id: null,
                                        network_id: null,
                                        start: null,
                                        stop: null
                                    })"
                                />
                            </q-item-section>
                        </q-item>
                    </template>
                </q-list>
            </div>
            <div
                class="col-md-4 col-sm-12"
            >
                <q-list
                    dense
                >
                    <q-item>
                        <q-item-section>
                            <aui-select-lazy
                                v-model="subscriber_email_template_id"
                                :label="$t('Subscriber Creation Email Template')"
                                store-getter="emailTemplates/filteredEmailTemplatesAsOptions"
                                store-action="emailTemplates/filterEmailTemplatesByReseller"
                                :initial-option="initialSubscriberEmailTemplateOption"
                                :filter-customization-function="val => ({ filter: val, resellerId: resellerId })"
                                :load-initially="false"
                                :disable="loading"
                                :error="false"
                                dense
                                clearable
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-select-lazy
                                v-model="passreset_email_template_id"
                                :label="$t('Password Reset Email Template')"
                                store-getter="emailTemplates/filteredEmailTemplatesAsOptions"
                                store-action="emailTemplates/filterEmailTemplatesByReseller"
                                :initial-option="initialPasswordResetEmailTemplateOption"
                                :filter-customization-function="val => ({ filter: val, resellerId: resellerId })"
                                :load-initially="false"
                                :disable="loading"
                                :error="false"
                                dense
                                clearable
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-select-lazy
                                v-model="invoice_email_template_id"
                                :label="$t('Invoice Email Template')"
                                store-getter="emailTemplates/filteredEmailTemplatesAsOptions"
                                store-action="emailTemplates/filterEmailTemplatesByReseller"
                                :initial-option="initialInvoiceEmailTemplateOption"
                                :filter-customization-function="val => ({ filter: val, resellerId: resellerId })"
                                :load-initially="false"
                                :disable="loading"
                                :error="false"
                                dense
                                clearable
                            />
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <aui-select-lazy
                                v-model="invoice_template_id"
                                :label="$t('Invoice Template')"
                                store-getter="emailTemplates/filteredInvoiceTemplatesAsOptions"
                                store-action="emailTemplates/filterInvoiceTemplatesByReseller"
                                :initial-option="initialInvoiceTemplateOption"
                                :filter-customization-function="val => ({ filter: val, resellerId: resellerId })"
                                :load-initially="false"
                                :disable="loading"
                                :error="false"
                                dense
                                clearable
                            />
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
    between,
    numeric
} from 'vuelidate/lib/validators'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'
import { showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiSelectLazy from 'components/input/AuiSelectLazy'
import AuiSelectContact from 'components/AuiSelectContact'
import AuiSelectBillingProfile from 'components/AuiSelectBillingProfile'
import AuiInputBillingProfileInterval from 'components/AuiInputBillingProfileInterval'
import AuiSelectNetwork from 'components/AuiSelectNetwork'
import { mapActions, mapGetters, mapState } from 'vuex'
import { i18n } from 'boot/i18n'
import _ from 'lodash'
import { sortObjectByKey, compareArrayOfObjects } from 'src/helpers/sorting'
export default {
    name: 'AuiNewCustomer',
    components: {
        AuiSelectLazy,
        AuiSelectContact,
        AuiSelectBillingProfile,
        AuiInputBillingProfileInterval,
        AuiSelectNetwork
    },
    props: {
        loading: {
            type: Boolean,
            default: false
        },
        contact: {
            type: Object,
            default: null
        },
        initialBillingProfile: {
            type: Object,
            default: null
        },
        initialResellerId: {
            type: Number,
            default: 0
        },
        initialSubscriberEmailTemplate: {
            type: Object,
            default: null
        },
        initialPassresetEmailTemplate: {
            type: Object,
            default: null
        },
        initialInvoiceEmailTemplate: {
            type: Object,
            default: null
        },
        initialInvoiceTemplate: {
            type: Object,
            default: null
        },
        customer: {
            type: Object,
            default: null
        }
    },
    data () {
        const data = this.getCustomerInitialData()
        return data
    },
    validations () {
        let additionalFields
        if (this.billingProfileDefinition === 'id') {
            additionalFields = {
                billing_profile_id: {
                    required
                }
            }
        }
        if (this.billingProfileDefinition === 'package') {
            additionalFields = {
                profile_package_id: {
                    required
                }
            }
        }
        return {
            ...additionalFields,
            ...{
                contact_id: {
                    required
                },
                billingProfile: {
                    required
                },
                type: {
                    required
                },
                max_subscribers: {
                    numeric
                },
                vat_rate: {
                    required,
                    between: between(0, 100)
                }
            }
        }
    },
    computed: {
        ...mapWaitingGetters({
            processingCreateCustomer: 'processing createCustomer',
            processingUpdateCustomer: 'processing updateCustomer',
            loadingProducts: 'loading Products'
        }),
        ...mapGetters('customers', [
            'customerStatusOptions'
        ]),
        ...mapState('contracts', [
            'customerContacts'
        ]),
        ...mapState('billing', [
            'billingProfiles',
            'billingNetworks'
        ]),
        ...mapState('billing', [
            'billingProfileIntervals'
        ]),
        ...mapGetters('billing', [
            'billingProfileTypeOptions'
        ]),
        billingProfileDefinition () {
            const selectedProfile = this.billingProfileTypeOptions.filter(billingProfile => billingProfile.value === this.billingProfile)[0]
            // if (selectedProfile !== 'profiles') {
            //     this.resetIntervals()
            // }
            return selectedProfile ? selectedProfile.definition : null
        },
        // TODO : remove when /customer endpoint is fixed
        isSingleBillingProfile () {
            return this.billingProfile === 'single' && !this.profile_package_id && (!this.billingProfileIntervals || this.billingProfileIntervals.length < 1)
        },
        // TODO : remove when /customer endpoint is fixed
        isScheduleBillingProfile () {
            return this.billingProfile === 'schedule' || (this.billingProfileIntervals && this.billingProfileIntervals.length < 0)
        },
        // TODO : remove when /customer endpoint is fixed
        isPackageBillingProfile () {
            return this.billingProfile === 'package' && !this.billing_profile_id && (!this.billingProfileIntervals || this.billingProfileIntervals.length < 1)
        },
        initialContactOption () {
            if (this.contact) {
                return {
                    label: this.contact.email,
                    value: this.contact.id
                }
            }
            return null
        },
        initialBillingProfileOption () {
            if (this.initialBillingProfile) {
                return {
                    label: `#${this.initialBillingProfile.id} ${this.initialBillingProfile.name} (${i18n.t('Reseller Id')}: ${this.initialBillingProfile.reseller_id})`,
                    value: this.initialBillingProfile.id
                }
            }
            return null
        },
        initialSubscriberEmailTemplateOption () {
            if (this.initialSubscriberEmailTemplate) {
                return {
                    label: `#${this.initialSubscriberEmailTemplate.id} (${i18n.t('Reseller Id')}: ${this.initialSubscriberEmailTemplate.reseller_id}) ${this.initialSubscriberEmailTemplate.name}`,
                    value: this.initialSubscriberEmailTemplate.id
                }
            }
            return null
        },
        initialPasswordResetEmailTemplateOption () {
            if (this.initialPassresetEmailTemplate) {
                return {
                    label: `#${this.initialPassresetEmailTemplate.id} (${i18n.t('Reseller Id')}: ${this.initialPassresetEmailTemplate.reseller_id}) ${this.initialPassresetEmailTemplate.name}`,
                    value: this.initialPassresetEmailTemplate.id
                }
            }
            return null
        },
        initialInvoiceEmailTemplateOption () {
            if (this.initialInvoiceEmailTemplate) {
                return {
                    label: `#${this.initialInvoiceEmailTemplate.id} (${i18n.t('Reseller Id')}: ${this.initialInvoiceEmailTemplate.reseller_id}) ${this.initialInvoiceEmailTemplate.name}`,
                    value: this.initialInvoiceEmailTemplate.id
                }
            }
            return null
        },
        initialInvoiceTemplateOption () {
            if (this.initialInvoiceTemplate) {
                return {
                    label: `#${this.initialInvoiceTemplate.id} (${i18n.t('Reseller Id')}: ${this.initialInvoiceTemplate.reseller_id}) ${this.initialInvoiceTemplate.name}`,
                    value: this.initialInvoiceTemplate.id
                }
            }
            return null
        },
        hasUnsavedData () {
            const initialData = _.omit(this.getCustomerInitialData(), ['productOptions', 'resellerId'])
            const currentData = _.omit(this.getCustomerCurrentData(), ['productOptions', 'resellerId'])
            const isFormEqual = _.isEqual(initialData, currentData)
            if (this.customer && this.customer.billing_profiles) {
                this.customer.billing_profiles.forEach(profile => {
                    delete profile.effective_start_time
                    profile = sortObjectByKey(profile)
                })
                this.billingProfileIntervals.forEach(profile => {
                    delete profile.effective_start_time
                    profile = sortObjectByKey(profile)
                })
                const intervalsAreEqual = compareArrayOfObjects(this.customer.billing_profiles, this.billingProfileIntervals)
                return isFormEqual && intervalsAreEqual
            }
            return isFormEqual
        }
    },
    watch: {
        processingCreateCustomer (value) {
            this.$emit('processing', value)
        },
        processingUpdateCustomer (value) {
            this.$emit('processing', value)
        },
        contact_id (value) {
            this.contactChanged(value)
        },
        customer () {
            this.data = this.getCustomerInitialData()
        },
        hasUnsavedData (value) {
            this.$emit('has-unsaved-data', value)
        }
    },
    async mounted () {
        this.resellerId = this.reseller_id
        this.initialiseProductOptions()
        if (this.customer) {
            // populate the billing profile intervals
            this.fetchBillingProfiles()
            this.fetchBillingNetworks()
            this.initialiseBillingProfile()
        }
    },
    methods: {
        ...mapWaitingActions('customers', {
            createCustomer: 'processing createCustomer',
            updateCustomer: 'processing updateCustomer',
            fetchProductsList: 'loading Products'
        }),
        ...mapActions('billing', [
            'addInterval',
            'resetIntervals',
            'editInterval',
            'deleteInterval',
            'fetchBillingProfiles',
            'fetchBillingNetworks'
        ]),
        getEmptyCustomer () {
            return {
                max_subscribers: null,
                status: 'active',
                external_id: null,
                vat_rate: 0,
                add_vat: false,
                contact_id: null,
                invoice_email_template_id: null,
                invoice_template_id: null,
                passreset_email_template_id: null,
                billingProfile: 'single',
                billing_profile_id: null,
                profile_package_id: null,
                subscriber_email_template_id: null,
                type: null,
                resellerId: null,
                productOptions: []
            }
        },
        getCustomerInitialData () {
            const initialData = this.getEmptyCustomer()
            if (this.customer !== undefined && this.customer !== null) {
                Object.keys(initialData).filter(key => key in this.customer).forEach(key => {
                    initialData[key] = this.customer[key]
                })
            }
            return { ...initialData }
        },
        getCustomerCurrentData () {
            return {
                max_subscribers: this.max_subscribers,
                status: this.status,
                external_id: this.external_id,
                vat_rate: this.vat_rate,
                add_vat: this.add_vat,
                contact_id: this.contact_id,
                invoice_email_template_id: this.invoice_email_template_id,
                invoice_template_id: this.invoice_template_id,
                passreset_email_template_id: this.passreset_email_template_id,
                billingProfile: this.billingProfile,
                billing_profile_id: this.billing_profile_id,
                profile_package_id: this.profile_package_id,
                subscriber_email_template_id: this.subscriber_email_template_id,
                type: this.type,
                resellerId: this.resellerId,
                productOptions: this.productOptions
            }
        },
        getSubmitData (dataObj) {
            return { ...dataObj }
        },
        initialIntervalBillingProfile (index) {
            if (this.billingProfileIntervals[index].profile_id) {
                const billingProfile = this.billingProfiles.filter(profile => profile.id === this.billingProfileIntervals[index].profile_id)[0]
                if (billingProfile) {
                    return {
                        label: `#${billingProfile.id} ${billingProfile.name} (${i18n.t('Reseller Id')}: ${billingProfile.reseller_id})`,
                        value: billingProfile.id
                    }
                }
                return null
            }
            return null
        },
        initialIntervalNetwork (index) {
            if (this.billingProfileIntervals[index].network_id) {
                const network = this.billingNetworks.filter(network => network.id === this.billingProfileIntervals[index].network_id)[0]
                if (network) {
                    return {
                        label: `#${network.id} ${network.name} ${network.reseller_id}`,
                        value: network.id
                    }
                }
                return null
            }
            return null
        },
        async initialiseProductOptions () {
            // TODO: Product loading code should be replaced with proper API call when it will be implemented
            const productList = await this.fetchProductsList()
            this.productOptions = productList.map(({ name }) => {
                return {
                    label: name,
                    value: (name === 'Cloud PBX Account') ? 'pbxaccount' : 'sipaccount'
                }
            })
        },
        async initialiseBillingProfile () {
            await this.resetIntervals()
            if (this.customer.billing_profiles && this.customer.billing_profiles.length > 0) {
                this.billingProfile = 'schedule'
                this.customer.billing_profiles.forEach((index, profile) => this.addExistingInterval(index, profile))
            } else if (this.customer && this.customer.profile_package_id) {
                this.billingProfile = 'package'
            } else {
                this.billingProfile = 'single'
            }
        },
        async billingProfileChanged (val) {
            await this.resetIntervals()
            switch (val) {
            case 'single':
                this.profile_package_id = null
                break
            case 'schedule':
                this.addInterval({ profileId: null, networkId: null, start: null, stop: null })
                this.billing_profile_id = null
                break
            case 'package':
                this.billing_profile_id = null
                break
            }
        },
        addExistingInterval (interval) {
            this.addInterval({
                profileId: interval.profile_id,
                networkId: interval.network_id,
                start: interval.start,
                stop: interval.stop
            })
        },
        onStartInput ({ value, index }) {
            this.editInterval({ index: index, field: 'start', value: value })
        },
        onEndInput ({ value, index }) {
            this.editInterval({ index: index, field: 'stop', value: value })
        },
        billingProfileSelected ({ value, index }) {
            this.editInterval({ index: index, field: 'profile_id', value: value })
        },
        billingNetworkSelected ({ value, index }) {
            this.editInterval({ index: index, field: 'network_id', value: value })
        },
        contactChanged (value) {
            let contactInfo
            if (this.customerContacts) {
                contactInfo = this.customerContacts.find(customer => customer.id === value) || {}
            }
            this.resellerId = contactInfo && contactInfo.reseller_id ? contactInfo.reseller_id : 0
            this.subscriber_email_template_id = null
            this.passreset_email_template_id = null
            this.invoice_email_template_id = null
            this.invoice_template_id = null
        },
        async submit () {
            this.$v.$touch()
            let areIntervalsValid = true
            if (this.$refs.intervals) {
                this.$refs.intervals.forEach((comp) => {
                    comp.touch()
                    if (comp.$v.$invalid) {
                        areIntervalsValid = false
                    }
                })
            }
            if (this.$refs.billingProfile) {
                this.$refs.billingProfile.forEach((comp) => {
                    comp.touch()
                    if (comp.$v.$invalid) {
                        areIntervalsValid = false
                    }
                })
            }
            if (!this.$v.$invalid && areIntervalsValid) {
                let submitData = {
                    max_subscribers: this.max_subscribers,
                    status: this.status,
                    external_id: this.external_id,
                    vat_rate: this.vat_rate,
                    add_vat: this.add_vat,
                    contact_id: this.contact_id,
                    invoice_email_template_id: this.invoice_email_template_id,
                    invoice_template_id: this.invoice_template_id,
                    passreset_email_template_id: this.passreset_email_template_id,
                    billing_profile_id: this.billing_profile_id,
                    // billing_profile_definition is required by the endpoint to distinguish
                    // between single (id), schedule (profiles) and profilePackage (profilePackage)
                    billing_profile_definition: this.billingProfileDefinition,
                    //
                    profile_package_id: this.profile_package_id,
                    subscriber_email_template_id: this.subscriber_email_template_id,
                    type: this.type
                }

                if (this.billingProfile === 'schedule') {
                    if (this.customer) {
                        submitData = {
                            ...submitData,
                            ...{
                                billing_profiles: [...this.billingProfileIntervals]
                            }
                        }
                    } else {
                        submitData = {
                            ...submitData,
                            ...{
                                // in case of new customer, the endpoint requires
                                // an empty interval as fallback
                                billing_profiles: [{
                                    // here, as fallback (i.e. when all intervals are expired),
                                    // profile_id of the first interval is taken
                                    profile_id: this.billingProfileIntervals[0].profile_id
                                }, ...this.billingProfileIntervals]
                            }
                        }
                    }
                } else {
                    submitData = {
                        ...submitData,
                        ...{
                            billing_profiles: []
                        }
                    }
                }
                if (this.customer) {
                    await this.updateCustomer({
                        resourceId: this.customer.id,
                        data: submitData
                    })
                    showGlobalSuccessMessage(this.$t('Customer updated successfully'))
                } else {
                    await this.createCustomer(submitData)
                    showGlobalSuccessMessage(this.$t('New customer created successfully'))
                }
                this.$emit('saved', submitData)
            }
        },
        async reset () {
            const initialData = this.getCustomerInitialData()
            this.max_subscribers = initialData.max_subscribers
            this.status = initialData.status
            this.external_id = initialData.external_id
            this.vat_rate = initialData.vat_rate
            this.add_vat = initialData.add_vat
            this.contact_id = initialData.contact_id
            this.invoice_email_template_id = initialData.invoice_email_template_id
            this.invoice_template_id = initialData.invoice_template_id
            this.passreset_email_template_id = initialData.passreset_email_template_id
            this.billingProfile = initialData.billingProfile
            this.billing_profile_id = initialData.billing_profile_id
            this.profile_package_id = initialData.profile_package_id
            this.subscriber_email_template_id = initialData.subscriber_email_template_id
            this.type = initialData.type
            this.resellerId = initialData.resellerId
            if (this.customer) {
                this.initialiseBillingProfile()
            }
        }
    }
}
</script>
