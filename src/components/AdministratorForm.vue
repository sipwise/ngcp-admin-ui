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
					/>
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
					>
						<template v-slot:prepend>
							<q-icon name="person" />
						</template>
					</q-input>
				</q-item-section>
			</q-item>
			<q-item
				v-if="!enablePassword"
			>
				<q-item-section>
					<q-btn
						class="q-mt-md q-mb-md"
						icon="lock"
						label="Change password"
						unelevated
						color="primary"
					/>
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
const defaultFormData = {
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
import PasswordStrengthMeter from 'vue-password-strength-meter'
import {
	required,
	alphaNum
} from 'vuelidate/lib/validators'
export default {
	name: 'AdministratorForm',
	components: {
		PasswordStrengthMeter
	},
	props: {
		formData: {
			type: Object,
			default () {
				return defaultFormData
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
		let currentFormData = defaultFormData
		if (this.formData !== null) {
			currentFormData = this.formData
		}
		return {
			passwordEnabled: this.enablePassword,
			passwordStrengthScore: null,
			passwordRetype: '',
			reseller: null,
			data: currentFormData
		}
	},
	validations () {
		return {
			data: {
				reseller_id: {
					required
				},
				login: {
					required,
					alphaNum
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
		formData (data) {
			this.data = data
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
		togglePassword () {
			this.passwordEnabled = !this.passwordEnabled
		}
	}
}
</script>
