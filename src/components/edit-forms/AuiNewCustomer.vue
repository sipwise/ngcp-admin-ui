<template>
	<q-form>
		<q-list
			dense
		>
			<q-item>
				<q-input
					v-model.trim="maxSubscribers"
					class="col"
					clearable
					dense
					:label="$t('Max Subscribers')"
					:error="$v.maxSubscribers.$error"
					:error-message="$errorMessage($v.maxSubscribers)"
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
				<q-input
					v-model.trim="vatRate"
					class="col"
					dense
					:label="$t('VAT Rate')"
					:error="$v.vatRate.$error"
					:error-message="$errorMessage($v.vatRate)"
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
import { mapGetters } from 'vuex'
export default {
	name: 'AuiNewCustomer',
	components: {
	},
	data () {
		return {
			maxSubscribers: null,
			status: 'active',
			externalId: null,
			vatRate: 0,
			addVatFlag: false
		}
	},
	validations: {
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
			processingCreateCustomer: 'processing createCustomer'
		}),
		...mapGetters('customers', [
			'customerStatusOptions'
		])
	},
	watch: {
		processingCreateCustomer (value) {
			this.$emit('processing', value)
		}
	},
	methods: {
		...mapWaitingActions('customers', {
			createCustomer: 'processing createCustomer'
		}),
		async submit () {
			this.$v.$touch()
			if (!this.$v.$invalid) {
				try {
					const submitData = {
						max_subscribers: this.maxSubscribers,
						status: this.status,
						external_id: this.externalId,
						vat_rate: this.vatRate,
						add_vat: this.addVatFlag
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
