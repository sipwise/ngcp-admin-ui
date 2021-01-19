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
					<aui-select-reseller
						v-model="reseller"
						dense
						:error="$v.data.reseller_id.$error"
						:error-message="$errorMessage($v.data.reseller_id)"
					/>
				</q-item-section>
			</q-item>
			<q-item>
				<q-item-section>
					<q-input
						v-model.trim="data.login"
						clearable
						dense
						:label="$t('Login')"
						autocomplete="none"
						:disable="loading"
						:error="$v.data.login.$error"
						:error-message="$errorMessage($v.data.login)"
						@blur="$v.data.login.$touch()"
						@input="emitInputEqual"
					>
						<template
							v-slot:prepend
						>
							<q-icon
								name="fas fa-user-cog"
							/>
						</template>
					</q-input>
				</q-item-section>
			</q-item>
			<q-item>
				<q-item-section>
					<q-input
						v-model.trim="data.email"
						clearable
						dense
						:label="$t('Email')"
						autocomplete="none"
						:disable="loading"
						:error="$v.data.email.$error"
						:error-message="$errorMessage($v.data.email)"
						@blur="$v.data.email.$touch()"
						@input="emitInputEqual"
					>
						<template
							v-slot:prepend
						>
							<q-icon
								name="email"
							/>
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
											:label="$t('Superuser')"
											:disable="loading"
											@input="emitInputEqual"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.is_master"
											dense
											:label="$t('Master')"
											:disable="loading"
											@input="emitInputEqual"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.is_ccare"
											dense
											:label="$t('Customer Care')"
											:disable="loading"
											@input="emitInputEqual"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.is_active"
											dense
											:label="$t('Active')"
											:disable="loading"
											@input="emitInputEqual"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.read_only"
											dense
											:label="$t('Read Only')"
											:disable="loading"
											@input="emitInputEqual"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.show_passwords"
											dense
											:label="$t('Show Passwords')"
											:disable="loading"
											@input="emitInputEqual"
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
											v-model="data.can_reset_password"
											dense
											:label="$t('Can Reset Password')"
											:disable="loading"
											@input="emitInputEqual"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.call_data"
											dense
											:label="$t('Show CDRs')"
											:disable="loading"
											@input="emitInputEqual"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.billing_data"
											dense
											:label="$t('Show Billing Info')"
											:disable="loading"
											@input="emitInputEqual"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.lawful_intercept"
											dense
											:label="$t('Lawful Intercept')"
											:disable="loading"
											@input="emitInputEqual"
										/>
									</q-item-section>
								</q-item>
								<q-item>
									<q-item-section>
										<q-toggle
											v-model="data.is_system"
											dense
											:label="$t('System')"
											:disable="loading"
											@input="emitInputEqual"
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
	required,
	email
} from 'vuelidate/lib/validators'
import AuiSelectReseller from './AuiSelectReseller'
const defaultAdmin = {
	reseller_id: null,
	login: '',
	email: '',
	is_active: true,
	lawful_intercept: false,
	call_data: true,
	is_ccare: false,
	is_superuser: false,
	read_only: false,
	billing_data: true,
	show_passwords: true,
	is_master: false,
	is_system: false,
	can_reset_password: false
}
export default {
	name: 'AdministratorForm',
	components: {
		AuiSelectReseller,
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
		let data = defaultAdmin
		if (this.admin !== undefined && this.admin !== null) {
			data = this.getAdminData()
		}
		return {
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
		const validations = {
			data: {
				reseller_id: {
					required
				},
				login: {
					required
				},
				email: {
					email
				}
			}
		}
		if (this.enablePassword) {
			validations.data.password = {
				required,
				passwordStrength () {
					return this.passwordStrengthScore >= 2
				}
			}
			validations.passwordRetype = {
				required,
				sameAsPassword (val) {
					return val === this.data.password
				}
			}
		}
		return validations
	},
	watch: {
		reseller (reseller) {
			if (reseller !== null && reseller !== undefined) {
				this.data.reseller_id = reseller
			} else {
				this.data.reseller_id = null
			}
			this.emitInputEqual()
		},
		admin () {
			this.data = this.getAdminData()
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
				this.$emit('submit', this.data)
			}
		},
		reset () {
			this.data = this.getAdminData()
			this.reseller = this.relatedResellerOption
			this.emitInputEqual()
		},
		emitInputEqual () {
			this.$emit('input-equal', _.isEqual(this.getAdminData(), this.data))
		},
		getAdminData () {
			return {
				reseller_id: this.admin.reseller_id,
				login: this.admin.login,
				email: this.admin.email,
				is_active: this.admin.is_active,
				lawful_intercept: this.admin.lawful_intercept,
				call_data: this.admin.call_data,
				is_ccare: this.admin.is_ccare,
				is_superuser: this.admin.is_superuser,
				read_only: this.admin.read_only,
				billing_data: this.admin.billing_data,
				show_passwords: this.admin.show_passwords,
				is_master: this.admin.is_master,
				is_system: this.admin.is_system,
				can_reset_password: this.admin.can_reset_password
			}
		}
	}
}
</script>
