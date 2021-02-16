<template>
	<q-form>
		<q-list>
			<q-item
				class="row q-pb-none"
				dense
			>
				<aui-select-lazy
					v-model="contactId"
					class="col"
					icon="fas fa-address-card"
					:label="$t('Contact')"
					store-getter="contracts/customerContactsAsOptions"
					store-action="contracts/fetchCustomerContacts"
					dense
					:error="$v.contactId.$error"
					:error-message="$errMsg($v.contactId)"
					:load-initially="false"
				/>
			</q-item>
			<q-item
				class="row q-pb-none q-pt-none"
			>
				<q-select
					v-model="billingProfile"
					class="col"
					:options="billingProfileTypeOptions"
					:label="$t('Set Billing Profiles')"
					emit-value
					map-options
					dense
					:error="$v.billingProfile.$error"
					:error-message="$errMsg($v.billingProfile)"
					@input="billingProfileChanged"
				>
					<q-tooltip>
						{{ $t('Choose to set a billing profile package or set billing profiles directly.') }}
					</q-tooltip>
				</q-select>
			</q-item>
			<div
				v-for="(profile, index) in billingProfileIntervals"
				:key="index"
			>
				<q-item
					class="row q-pb-none q-pt-none"
				>
					<aui-select-billing-profile
						ref="billingProfile"
						class="col q-mr-md"
						:index="index"
						@billingProfileSelected="billingProfileSelected"
					/>
					<aui-select-network
						class="col q-pb-md"
						:index="index"
						@billingNetworkSelected="billingNetworkSelected"
					/>
				</q-item>
				<aui-input-billing-profile-interval
					ref="intervals"
					:index="index"
					@startInput="onStartInput"
					@endInput="onEndInput"
				/>
				<q-item
					class="row q-pb-md q-pt-none"
				>
					<q-btn
						class="col-6 q-mr-sm"
						icon="delete"
						:label="$t('Delete interval')"
						color="negative"
						:disable="billingProfileIntervals.length === 1"
						dense
						@click="deleteInterval(index)"
					/>
					<q-btn
						v-if="index === billingProfileIntervals.length-1"
						class="col"
						icon="add"
						:label="$t('Add another interval')"
						color="primary"
						dense
						@click="addInterval"
					/>
				</q-item>
			</div>
			<q-item
				class="row q-pb-none q-pt-none"
			>
				<aui-select-lazy
					v-if="billingProfile === 'single'"
					v-model="billingProfileId"
					class="col q-mr-md"
					:label="$t('Billing Profile')"
					store-getter="billing/billingProfilesAsOptions"
					store-action="billing/fetchBillingProfiles"
					dense
					:error="$v.billingProfileId.$error"
					:error-message="$errMsg($v.billingProfileId)"
					:load-initially="false"
				/>
				<aui-select-lazy
					v-if="billingProfile === 'package'"
					v-model="profilePackageId"
					class="col q-mr-md"
					:label="$t('Package')"
					store-getter="profilePackage/profilePackagesAsOptions"
					store-action="profilePackage/fetchProfilePackages"
					dense
					:error="$v.profilePackageId.$error"
					:error-message="$errMsg($v.profilePackageId)"
					:load-initially="false"
				/>
				<q-select
					v-model="type"
					class="col"
					:options="productOptions"
					:label="$t('Product')"
					:loading="loadingProducts"
					emit-value
					map-options
					dense
					:error="$v.type.$error"
					:error-message="$errMsg($v.type)"
				/>
			</q-item>
			<q-item
				class="row q-pb-none q-pt-none"
			>
				<q-input
					v-model.trim="maxSubscribers"
					class="col"
					clearable
					dense
					:label="$t('Max Subscribers')"
					:error="$v.maxSubscribers.$error"
					:error-message="$errMsg($v.maxSubscribers)"
					@blur="$v.maxSubscribers.$touch()"
				>
					<q-tooltip>
						{{ $t('Optionally set the maximum number of subscribers for this contract. Leave empty for unlimited.') }}
					</q-tooltip>
				</q-input>
			</q-item>
			<q-item
				class="row q-pb-md q-pt-none"
			>
				<q-select
					v-model="status"
					class="col q-mr-md"
					:options="customerStatusOptions"
					:label="$t('Status')"
					emit-value
					map-options
					dense
				/>
				<q-input
					v-model.trim="externalId"
					class="col"
					clearable
					dense
					:label="$t('External #')"
				>
					<q-tooltip>
						{{ $t('A non-unique external ID e.g., provided by a 3rd party provisioning') }}
					</q-tooltip>
				</q-input>
			</q-item>
			<q-item
				class="row q-pb-md q-pt-none"
			>
				<aui-select-lazy
					v-model="subscriberEmailTemplateId"
					class="col q-mr-md"
					:label="$t('Subscriber Creation Email Template')"
					store-getter="emailTemplates/filteredEmailTemplatesAsOptions"
					store-action="emailTemplates/filterEmailTemplatesByReseller"
					:filter-customization-function="val => ({ filter: val, resellerId: resellerId })"
					:load-initially="false"
					dense
					clearable
				/>
				<aui-select-lazy
					v-model="passResetEmailTemplateId"
					class="col"
					:label="$t('Password Reset Email Template')"
					store-getter="emailTemplates/filteredEmailTemplatesAsOptions"
					store-action="emailTemplates/filterEmailTemplatesByReseller"
					:filter-customization-function="val => ({ filter: val, resellerId: resellerId })"
					:load-initially="false"
					dense
					clearable
				/>
			</q-item>
			<q-item
				class="row q-pb-md q-pt-none"
			>
				<aui-select-lazy
					v-model="invoiceEmailTemplateId"
					class="col q-mr-md"
					:label="$t('Invoice Email Template')"
					store-getter="emailTemplates/filteredEmailTemplatesAsOptions"
					store-action="emailTemplates/filterEmailTemplatesByReseller"
					:filter-customization-function="val => ({ filter: val, resellerId: resellerId })"
					:load-initially="false"
					dense
					clearable
				/>
				<aui-select-lazy
					v-model="invoiceTemplateId"
					class="col"
					:label="$t('Invoice Template')"
					store-getter="emailTemplates/filteredInvoiceTemplatesAsOptions"
					store-action="emailTemplates/filterInvoiceTemplatesByReseller"
					:filter-customization-function="val => ({ filter: val, resellerId: resellerId })"
					:load-initially="false"
					dense
					clearable
				/>
			</q-item>
			<q-item
				class="row q-pb-none q-pt-none"
			>
				<q-input
					v-model.trim="vatRate"
					class="col q-mr-md"
					dense
					:label="$t('VAT Rate')"
					:error="$v.vatRate.$error"
					:error-message="$errMsg($v.vatRate)"
					@blur="$v.vatRate.$touch()"
				>
					<q-tooltip>
						{{ $t('The VAT rate in percentage (e.g. 20).') }}
					</q-tooltip>
				</q-input>
				<q-toggle
					v-model="addVatFlag"
					class="col"
					dense
					:label="$t('Charge VAT')"
				>
					<q-tooltip>
						{{ $t('Whether to charge VAT in invoices.') }}
					</q-tooltip>
				</q-toggle>
			</q-item>
		</q-list>
	</q-form>
</template>

<script>
import {
	required,
	between,
	numeric
} from 'vuelidate/lib/validators'
import { mapWaitingActions, mapWaitingGetters } from 'vue-wait'
import { showGlobalErrorMessage, showGlobalSuccessMessage } from 'src/helpers/ui'
import AuiSelectLazy from 'components/input/AuiSelectLazy'
import AuiSelectBillingProfile from 'components/AuiSelectBillingProfile'
import AuiInputBillingProfileInterval from 'components/AuiInputBillingProfileInterval'
import AuiSelectNetwork from 'components/AuiSelectNetwork'
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
	name: 'AuiNewCustomer',
	components: {
		AuiSelectLazy,
		AuiSelectBillingProfile,
		AuiInputBillingProfileInterval,
		AuiSelectNetwork
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
				try {
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
				} catch (err) {
					showGlobalErrorMessage(err)
				}
			}
		}
	}
}
</script>
