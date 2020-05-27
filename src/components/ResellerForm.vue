<template>
	<q-form
		ref="form"
		class="col col-5"
		greedy
		@validation-success="validationSuccess"
	>
		<q-banner
			v-if="error"
			dense
			inline-actions
			class="text-white bg-negative q-mb-lg"
			transition-show="fade"
			transition-hide="fade"
		>
			{{ errorMessage }}
			<template
				v-slot:avatar
			>
				<q-icon
					name="error"
					color="white"
				/>
			</template>
		</q-banner>
		<q-list
			dense
		>
			<q-item>
				<q-item-section>
					<contract-selection
						v-model="contract"
						:error="$v.data.contract_id.$error"
						:error-message="$errorMessage($v.data.contract_id)"
					/>
				</q-item-section>
			</q-item>
			<q-item>
				<q-item-section>
					<q-input
						v-model.trim="data.name"
						clearable
						dense
						autocomplete="none"
						:label="$t('resellers.tcName')"
						:disable="loading"
						:error="$v.data.name.$error"
						:error-message="$errorMessage($v.data.name)"
						@blur="$v.data.name.$touch()"
					>
						<template
							v-slot:prepend
						>
							<q-icon
								name="fas fa-user-tie"
							/>
						</template>
					</q-input>
				</q-item-section>
			</q-item>
		</q-list>
	</q-form>
</template>

<script>
import {
	required
} from 'vuelidate/lib/validators'
import ContractSelection from './ContractSelection'
export default {
	name: 'ResellerForm',
	components: {
		ContractSelection
	},
	props: {
		error: {
			type: Boolean,
			default: false
		},
		errorMessage: {
			type: String,
			default: ''
		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	data () {
		return {
			contract: null,
			data: {
				contract_id: null
			}
		}
	},
	computed: {
	},
	validations: {
		data: {
			contract_id: {
				required
			},
			name: {
				required
			}
		}
	},
	watch: {
	},
	methods: {
		validationSuccess () {

		}
	}
}
</script>
