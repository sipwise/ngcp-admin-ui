<template>
    <q-form>
        <div
            class="row"
        >
            <div
                class="col-4"
            >
                <q-list
                    dense
                >
                    <q-item>
                        <q-item-section>
                            <aui-select-contact
                                v-model="contactId"
                                dense
                                :error="$v.contactId.$error"
                                :error-message="$errMsg($v.contactId)"
                                @blur="$v.contactId.$touch()"
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
                                v-model.trim="maxSubscribers"
                                clearable
                                dense
                                :label="$t('Max Subscribers')"
                                :error="$v.maxSubscribers.$error"
                                :error-message="$errMsg($v.maxSubscribers)"
                                :disable="loading"
                                @blur="$v.maxSubscribers.$touch()"
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
                                v-model.trim="externalId"
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
                                v-model.trim="vatRate"
                                dense
                                :label="$t('VAT Rate')"
                                :disable="loading"
                                :error="$v.vatRate.$error"
                                :error-message="$errMsg($v.vatRate)"
                                @blur="$v.vatRate.$touch()"
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
                                v-model="addVatFlag"
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
                class="col-4"
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
                        v-if="billingProfile === 'single'"
                    >
                        <q-item-section>
                            <aui-select-lazy
                                v-model="billingProfileId"
                                :label="$t('Billing Profile')"
                                store-getter="billing/billingProfilesAsOptions"
                                store-action="billing/fetchBillingProfiles"
                                dense
                                :disable="loading"
                                :error="$v.billingProfileId.$error"
                                :error-message="$errMsg($v.billingProfileId)"
                                :load-initially="false"
                            />
                        </q-item-section>
                    </q-item>
                    <q-item
                        v-if="billingProfile === 'package'"
                    >
                        <q-item-section>
                            <aui-select-lazy
                                v-model="profilePackageId"
                                :label="$t('Package')"
                                store-getter="profilePackage/profilePackagesAsOptions"
                                store-action="profilePackage/fetchProfilePackages"
                                dense
                                :disable="loading"
                                :error="$v.profilePackageId.$error"
                                :error-message="$errMsg($v.profilePackageId)"
                                :load-initially="false"
                            />
                        </q-item-section>
                    </q-item>
                    <template
                        v-for="(profile, index) in billingProfileIntervals"
                    >
                        <q-item
                            :key="index + '-profile'"
                        >
                            <q-item-section>
                                <aui-select-billing-profile
                                    ref="billingProfile"
                                    :index="index"
                                    :disable="loading"
                                    @billingProfileSelected="billingProfileSelected"
                                />
                            </q-item-section>
                        </q-item>
                        <q-item
                            :key="index + '-network'"
                        >
                            <q-item-section>
                                <aui-select-network
                                    :index="index"
                                    :disable="loading"
                                    @billingNetworkSelected="billingNetworkSelected"
                                />
                            </q-item-section>
                        </q-item>
                        <q-item
                            :key="index + '-interval'"
                        >
                            <q-item-section>
                                <aui-input-billing-profile-interval
                                    ref="intervals"
                                    :index="index"
                                    :disable="loading"
                                    @startInput="onStartInput"
                                    @endInput="onEndInput"
                                />
                            </q-item-section>
                        </q-item>
                        <q-item
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
                                    @click="addInterval"
                                />
                            </q-item-section>
                        </q-item>
                    </template>
                </q-list>
            </div>
            <div
                class="col-4"
            >
                <q-list
                    dense
                >
                    <q-item>
                        <q-item-section>
                            <aui-select-lazy
                                v-model="subscriberEmailTemplateId"
                                :label="$t('Subscriber Creation Email Template')"
                                store-getter="emailTemplates/filteredEmailTemplatesAsOptions"
                                store-action="emailTemplates/filterEmailTemplatesByReseller"
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
                                v-model="passResetEmailTemplateId"
                                :label="$t('Password Reset Email Template')"
                                store-getter="emailTemplates/filteredEmailTemplatesAsOptions"
                                store-action="emailTemplates/filterEmailTemplatesByReseller"
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
                                v-model="invoiceEmailTemplateId"
                                :label="$t('Invoice Email Template')"
                                store-getter="emailTemplates/filteredEmailTemplatesAsOptions"
                                store-action="emailTemplates/filterEmailTemplatesByReseller"
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
                                v-model="invoiceTemplateId"
                                :label="$t('Invoice Template')"
                                store-getter="emailTemplates/filteredInvoiceTemplatesAsOptions"
                                store-action="emailTemplates/filterInvoiceTemplatesByReseller"
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
        }
    },
    data () {
        return {
            maxSubscribers: null,
            status: 'active',
            externalId: null,
            vatRate: 0,
            addVatFlag: false,
            contactId: null,
            invoiceEmailTemplateId: null,
            invoiceTemplateId: null,
            passResetEmailTemplateId: null,
            billingProfile: 'single',
            billingProfileId: null,
            profilePackageId: null,
            subscriberEmailTemplateId: null,
            type: null,
            resellerId: 0,
            productOptions: []
        }
    },
    validations () {
        let additionalFields
        if (this.billingProfileDefinition === 'id') {
            additionalFields = {
                billingProfileId: {
                    required
                }
            }
        }
        if (this.billingProfileDefinition === 'package') {
            additionalFields = {
                profilePackageId: {
                    required
                }
            }
        }
        return {
            ...additionalFields,
            ...{
                contactId: {
                    required
                },
                billingProfile: {
                    required
                },
                type: {
                    required
                },
                maxSubscribers: {
                    numeric
                },
                vatRate: {
                    required,
                    between: between(0, 100)
                }
            }
        }
    },
    computed: {
        ...mapWaitingGetters({
            processingCreateCustomer: 'processing createCustomer',
            loadingProducts: 'loading Products'
        }),
        ...mapGetters('customers', [
            'customerStatusOptions'
        ]),
        ...mapState('contracts', [
            'customerContacts'
        ]),
        ...mapState('billing', [
            'billingProfileIntervals'
        ]),
        ...mapGetters('billing', [
            'billingProfileTypeOptions'
        ]),
        billingProfileDefinition () {
            const selectedProfile = this.billingProfileTypeOptions.filter(billingProfile => billingProfile.value === this.billingProfile)[0]
            return selectedProfile ? selectedProfile.definition : null
        }
    },
    watch: {
        processingCreateCustomer (value) {
            this.$emit('processing', value)
        },
        contactId (value) {
            const contactInfo = this.customerContacts.find(customer => customer.id === value) || {}
            this.resellerId = contactInfo.reseller_id || 0
            this.subscriberEmailTemplateId = null
            this.passResetEmailTemplateId = null
            this.invoiceEmailTemplateId = null
            this.invoiceTemplateId = null
        }
    },
    beforeMount () {
        this.resetIntervals()
    },
    async mounted () {
        // TODO: Product loading code should be replaced with proper API call when it will be implemented
        const productList = await this.fetchProductsList()
        this.productOptions = productList.map(({ name }) => {
            return {
                label: name,
                value: (name === 'Cloud PBX Account') ? 'pbxaccount' : 'sipaccount'
            }
        })
    },
    methods: {
        ...mapWaitingActions('customers', {
            createCustomer: 'processing createCustomer',
            fetchProductsList: 'loading Products'
        }),
        ...mapActions('billing', [
            'addInterval',
            'resetIntervals',
            'editInterval',
            'deleteInterval'
        ]),
        getResellerId () {
            return this.resellerId
        },
        billingProfileChanged (val) {
            if (val === 'schedule') {
                this.addInterval()
            } else {
                this.resetIntervals()
            }
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
                    max_subscribers: this.maxSubscribers,
                    status: this.status,
                    external_id: this.externalId,
                    vat_rate: this.vatRate,
                    add_vat: this.addVatFlag,
                    contact_id: this.contactId,
                    invoice_email_template_id: this.invoiceEmailTemplateId,
                    invoice_template_id: this.invoiceTemplateId,
                    passreset_email_template_id: this.passResetEmailTemplateId,
                    billing_profile_id: this.billingProfileId,
                    // billing_profile_definition is required by the endpoint to distinguish
                    // between single (id), schedule (profiles) and profilePackage (profilePackage)
                    billing_profile_definition: this.billingProfileDefinition,
                    //
                    profile_package_id: this.profilePackageId,
                    subscriber_email_template_id: this.subscriberEmailTemplateId,
                    type: this.type
                }

                if (this.billingProfile === 'schedule') {
                    submitData = {
                        ...submitData,
                        ...{
                            // the endpoint requires an empty interval as fallback
                            billing_profiles: [{
                                // here, as fallback (i.e. when all intervals are expired),
                                // profile_id of the first interval is taken
                                profile_id: this.billingProfileIntervals[0].profile_id
                            }, ...this.billingProfileIntervals]
                        }
                    }
                }
                await this.createCustomer(submitData)
                this.$emit('saved', submitData)
                showGlobalSuccessMessage(this.$t('New customer created successfully'))
            }
        }
    }
}
</script>
