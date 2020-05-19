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
					<q-select
						v-model="reseller"
						clearable
						dense
						use-input
						hide-selected
						fill-input
						input-debounce="800"
						label="Reseller"
						:options="resellerOptions"
						:disable="loading"
						:error="$v.data.reseller_id.$error"
						:error-message="$errorMessage($v.data.login)"
						@blur="$v.data.reseller_id.$touch()"
						@filter="filterResellers"
						@input="detectInput"
					>
						<template
							v-slot:after
						>
							<q-btn
								icon="group_add"
								color="primary"
								unelevated
								:to="'/reseller/create'"
							/>
						</template>
					</q-select>
				</q-item-section>
			</q-item>
			<q-item>
				<q-item-section>
					<q-input
						v-model.trim="data.login"
						clearable
						dense
						label="Login"
						autocomplete="none"
						:disable="loading"
						:error="$v.data.login.$error"
						:error-message="$errorMessage($v.data.login)"
						@blur="$v.data.login.$touch()"
						@input="detectInput"
					>
						<template v-slot:prepend>
							<q-icon name="person" />
						</template>
					</q-input>
				</q-item-section>
			</q-item>
			<q-item
				v-if="enablePassword"
			>
				<q-item-section>
					<q-input
						ref="passwordInput"
						v-model.trim="data.password"
						clearable
						icon="lock"
						dense
						label="Password"
						type="password"
						autocomplete="new-password"
						:disable="loading"
						:error="$v.data.password.$error"
						:error-message="$errorMessage($v.data.password)"
						@blur="$v.data.password.$touch()"
					>
						<template
							v-slot:prepend
						>
							<q-icon
								name="lock"
							/>
						</template>
					</q-input>
					<div>
						<password-strength-meter
							v-model="data.password"
							class="q-psm"
							:strength-meter-only="true"
							@score="strengthMeterScoreUpdate"
						/>
					</div>
				</q-item-section>
			</q-item>
			<q-item
				v-if="enablePassword"
				class="q-mb-lg"
			>
				<q-item-section>
					<q-input
						ref="passwordRetypeInput"
						v-model.trim="passwordRetype"
						clearable
						icon="lock"
						dense
						label="Password Retype"
						type="password"
						autocomplete="new-password"
						:disable="loading"
						:error="$v.passwordRetype.$error"
						:error-message="$errorMessage($v.passwordRetype)"
						@blur="$v.passwordRetype.$touch()"
					>
						<template v-slot:prepend>
							<q-icon name="lock" />
						</template>
					</q-input>
				</q-item-section>
			</q-item>
			<q-item>
				<q-item-section>
					<div
						class="row"
					>
						<div
							class="col"
						>
							<q-list>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.is_superuser"
											dense
											label="Is superuser"
											:disable="loading"
											@input="detectInput"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.is_master"
											dense
											label="Is master"
											:disable="loading"
											@input="detectInput"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.is_ccare"
											dense
											label="Is ccare"
											:disable="loading"
											@input="detectInput"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.is_active"
											dense
											label="Is active"
											:disable="loading"
											@input="detectInput"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.read_only"
											dense
											label="Read only"
											:disable="loading"
											@input="detectInput"
										/>
									</q-item-section>
								</q-item>
							</q-list>
						</div>
						<div
							class="col"
						>
							<q-list>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.show_passwords"
											dense
											label="Show passwords"
											:disable="loading"
											@input="detectInput"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.call_data"
											dense
											label="Call data"
											:disable="loading"
											@input="detectInput"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.billing_data"
											dense
											label="Billing data"
											:disable="loading"
											@input="detectInput"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.lawful_intercept"
											dense
											label="Lawful intercept"
											:disable="loading"
											@input="detectInput"
										/>
									</q-item-section>
								</q-item>
							</q-list>
						</div>
					</div>
				</q-item-section>
			</q-item>
		</q-list>
	</q-form>
</template>

<script>
import _ from 'lodash'
import PasswordStrengthMeter from 'vue-password-strength-meter'
import {
	required
} from 'vuelidate/lib/validators'
const defaultAdmin = {
	reseller_id: null,
	login: '',
	password: '',
	is_active: true,
	lawful_intercept: false,
	call_data: true,
	is_ccare: false,
	is_superuser: false,
	read_only: false,
	billing_data: true,
	show_passwords: true,
	is_master: false
}
export default {
	name: 'AdministratorForm',
	components: {
		PasswordStrengthMeter
	},
	props: {
		admin: {
			type: Object,
			default: () => {
				return defaultAdmin
			}
		},
		relatedReseller: {
			type: Object,
			default: () => {
				return null
			}
		},
		enablePassword: {
			type: Boolean,
			default: true
		},
		resellerOptions: {
			type: Array,
			default () {
				return []
			}
		},
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
		let data = _.cloneDeep(this.admin)
		if (data === undefined || data === null) {
			data = defaultAdmin
		}
		return {
			passwordEnabled: this.enablePassword,
			passwordStrengthScore: null,
			passwordRetype: '',
			reseller: this.relatedResellerOption,
			data: data
		}
	},
	computed: {
		relatedResellerOption () {
			if (this.relatedReseller !== null) {
				return {
					label: this.relatedReseller.name,
					value: this.relatedReseller.id
				}
			} else {
				return null
			}
		}
	},
	validations () {
		return {
			data: {
				reseller_id: {
					required
				},
				login: {
					required
				},
				password: {
					required,
					passwordStrength () {
						return this.passwordStrengthScore >= 2
					}
				}
			},
			passwordRetype: {
				required,
				sameAsPassword (val) {
					return val === this.data.password
				}
			}
		}
	},
	watch: {
		reseller (reseller) {
			if (reseller !== null && reseller !== undefined) {
				this.data.reseller_id = reseller.value
			} else {
				this.data.reseller_id = null
			}
		},
		admin (data) {
			this.data = _.cloneDeep(data)
		},
		relatedReseller (data) {
			this.reseller = {
				label: data.name,
				value: data.id
			}
		}
	},
	methods: {
		validationSuccess () {
			this.$emit('submit', this.data)
		},
		strengthMeterScoreUpdate (score) {
			this.passwordStrengthScore = score
		},
		submit () {
			this.$v.$touch()
			if (!this.$v.$invalid) {
				this.$refs.form.submit()
			}
		},
		filterResellers (filter, update, abort) {
			this.$emit('filter-resellers', {
				filter: filter,
				update: update,
				abort: abort
			})
		},
		detectInput () {
			if (!_.isEqual(this.admin, this.data)) {
				this.$emit('input-equal', false)
			} else {
				this.$emit('input-equal', true)
			}
		}
	}
}
</script>
