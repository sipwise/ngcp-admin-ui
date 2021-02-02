<template>
	<q-form>
		<q-list
			dense
		>
			<q-item>
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
			<q-item>
				<q-select
					v-model="billingProfile"
					class="col"
					:options="billingProfileTypeOptions"
					:label="$t('Set Billing Profiles')"
					emit-value
					map-options
					dense
					:error="$v.billingProfile.$error"
					:error-message="$errorMessage($v.billingProfile)"
				>
					<q-tooltip>
						{{ $t('Choose to set a billing profile package or set billing profiles directly.') }}
					</q-tooltip>
				</q-select>
			</q-item>
			<q-item
				v-if="billingProfile === 'single'"
			>
				<aui-select-lazy
					v-model="billingProfileId"
					class="col"
					:label="$t('Billing Profile')"
					store-getter="billing/billingProfilesAsOptions"
					store-action="billing/fetchBillingProfiles"
					dense
					:error="$v.billingProfileId.$error"
					:error-message="$errorMessage($v.billingProfileId)"
					:load-initially="false"
				/>
			</q-item>
			<q-item>
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
			<q-item>
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
			<q-item>
				<q-select
					v-model="status"
					class="col"
					:options="customerStatusOptions"
					:label="$t('Status')"
					emit-value
					map-options
					dense
				/>
			</q-item>
			<q-item>
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
			<q-item>
				<aui-select-lazy
					v-model="subscriberEmailTemplateId"
					class="col"
					:label="$t('Subscriber Creation Email Template')"
					store-getter="emailTemplates/filteredEmailTemplatesAsOptions"
					store-action="emailTemplates/filterEmailTemplatesByReseller"
					:filter-customization-function="getResellerId"
					:load-initially="false"
					dense
					clearable
				/>
			</q-item>
			<q-item>
				<aui-select-lazy
					v-model="passResetEmailTemplateId"
					class="col"
					:label="$t('Password Reset Email Template')"
					store-getter="emailTemplates/filteredEmailTemplatesAsOptions"
					store-action="emailTemplates/filterEmailTemplatesByReseller"
					:filter-customization-function="getResellerId"
					:load-initially="false"
					dense
					clearable
				/>
			</q-item>
			<q-item>
				<aui-select-lazy
					v-model="invoiceEmailTemplateId"
					class="col"
					:label="$t('Invoice Email Template')"
					store-getter="emailTemplates/filteredEmailTemplatesAsOptions"
					store-action="emailTemplates/filterEmailTemplatesByReseller"
					:filter-customization-function="getResellerId"
					:load-initially="false"
					dense
					clearable
				/>
			</q-item>
			<q-item>
				<aui-select-lazy
					v-model="invoiceTemplateId"
					class="col"
					:label="$t('Invoice Template')"
					store-getter="emailTemplates/filteredInvoiceTemplatesAsOptions"
					store-action="emailTemplates/filterInvoiceTemplatesByReseller"
					:filter-customization-function="getResellerId"
					:load-initially="false"
					dense
					clearable
				/>
			</q-item>
			<q-item>
				<q-input
					v-model.trim="vatRate"
					class="col"
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
			</q-item>
			<q-item>
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
import { mapGetters, mapState } from 'vuex'
export default {
	name: 'AuiNewCustomer',
	components: {
		AuiSelectLazy
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
			billingProfileId: null,
			billingProfile: null,
			profilePackageId: null,
			subscriberEmailTemplateId: null,
			type: null,
			resellerId: 0,
			productOptions: []
		}
	},
	validations: {
		contactId: {
			required
		},
		billingProfile: {
			required
		},
		billingProfileId: {
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
		...mapGetters('billing', [
			'billingProfileTypeOptions'
		])
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
		getResellerId () {
			return this.resellerId
		},
		async submit () {
			this.$v.$touch()
			if (!this.$v.$invalid) {
				try {
					const submitData = {
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
						profile_package_id: this.profilePackageId,
						subscriber_email_template_id: this.subscriberEmailTemplateId,
						type: this.type
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
