<template>
	<q-page
		class="q-pa-lg"
	>
		<div
			class="q-mb-xl"
		>
			<q-btn
				class="q-mr-sm"
				icon="clear"
				outline
				label="Cancel"
				color="primary"
				to="/administrator"
			/>
			<q-btn
				class="q-mr-sm"
				icon="save"
				unelevated
				label="Save"
				color="primary"
				:disable="isEntityCreationRequesting"
				:loading="isEntityCreationRequesting"
				@click="$refs.adminCreateForm.submit()"
			/>
			<q-btn
				class="q-mr-sm"
				icon="save"
				icon-right="arrow_back"
				unelevated
				label="Save and back"
				color="primary"
				:disable="isEntityCreationRequesting"
				:loading="isEntityCreationRequesting"
				@click="$refs.adminCreateForm.submit()"
			/>
			<q-btn
				class="q-mr-sm"
				icon="delete"
				:label="$t('actions.delete')"
				unelevated
				color="negative"
			/>
		</div>
		<div
			class="row"
		>
			<q-form
				ref="adminCreateForm"
				class="col col-5"
				greedy
				@validation-success="validationSuccess"
			>
				<q-banner
					v-if="hasEntityCreationFailed"
					dense
					inline-actions
					class="text-white bg-negative q-mb-lg"
				>
					{{ entityCreationError }}
					<template v-slot:avatar>
						<q-icon
							name="report"
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
								:options="filteredResellerOptions"
								:disable="isEntityCreationRequesting"
								:error="$v.data.reseller_id.$error"
								:error-message="$errorMessage($v.data.login)"
								@blur="$v.data.reseller_id.$touch()"
								@filter="filterResellersEvent"
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
								:disable="isEntityCreationRequesting"
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
					<q-item>
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
								:disable="isEntityCreationRequesting"
								:error="$v.data.password.$error"
								:error-message="$errorMessage($v.data.password)"
								@blur="$v.data.password.$touch()"
							>
								<template v-slot:prepend>
									<q-icon name="lock" />
								</template>
							</q-input>
							<div>
								<password-strength-meter
									v-model="data.password"
									class="q-psm"
									:strength-meter-only="true"
									@feedback="strengthMeterFeedbackUpdate"
									@score="strengthMeterScoreUpdate"
								/>
							</div>
						</q-item-section>
					</q-item>
					<q-item
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
								:disable="isEntityCreationRequesting"
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
													:disable="isEntityCreationRequesting"
												/>
											</q-item-section>
										</q-item>
										<q-item>
											<q-item-section>
												<q-toggle
													v-model="data.is_master"
													dense
													label="Is master"
													:disable="isEntityCreationRequesting"
												/>
											</q-item-section>
										</q-item>
										<q-item>
											<q-item-section>
												<q-toggle
													v-model="data.is_ccare"
													dense
													label="Is ccare"
													:disable="isEntityCreationRequesting"
												/>
											</q-item-section>
										</q-item>
										<q-item>
											<q-item-section>
												<q-toggle
													v-model="data.is_active"
													dense
													label="Is active"
													:disable="isEntityCreationRequesting"
												/>
											</q-item-section>
										</q-item>
										<q-item>
											<q-item-section>
												<q-toggle
													v-model="data.read_only"
													dense
													label="Read only"
													:disable="isEntityCreationRequesting"
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
													:disable="isEntityCreationRequesting"
												/>
											</q-item-section>
										</q-item>
										<q-item>
											<q-item-section>
												<q-toggle
													v-model="data.call_data"
													dense
													label="Call data"
													:disable="isEntityCreationRequesting"
												/>
											</q-item-section>
										</q-item>
										<q-item>
											<q-item-section>
												<q-toggle
													v-model="data.billing_data"
													dense
													label="Billing data"
													:disable="isEntityCreationRequesting"
												/>
											</q-item-section>
										</q-item>
										<q-item>
											<q-item-section>
												<q-toggle
													v-model="data.lawful_intercept"
													dense
													label="Lawful intercept"
													:disable="isEntityCreationRequesting"
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
		</div>
	</q-page>
</template>

<script>
import PasswordStrengthMeter from 'vue-password-strength-meter'
import {
	required,
	alphaNum
} from 'vuelidate/lib/validators'
import {
	mapActions,
	mapGetters,
	mapMutations
} from 'vuex'
export default {
	name: 'AdministratorsEdit',
	components: {
		PasswordStrengthMeter
	},
	data () {
		return {
			passwordStrengthScore: null,
			passwordRetype: '',
			reseller: null,
			data: {
				is_active: true,
				login: '',
				password: '',
				reseller_id: null,
				lawful_intercept: false,
				call_data: true,
				is_ccare: false,
				is_superuser: false,
				read_only: false,
				billing_data: true,
				show_passwords: true,
				is_master: false
			}
		}
	},
	validations: {
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
	},
	computed: {
		...mapGetters('user', [
			'isEntityCreationRequesting',
			'hasEntityCreationFailed',
			'entityCreationError'
		]),
		...mapGetters('administrators', [
			'filteredResellerOptions'
		]),
		resellerRules () {
			return [
				this.$validators.required
			]
		},
		loginRules () {
			return [
				this.$validators.required
			]
		},
		passwordRules () {
			return [
				this.$validators.required
			]
		},
		passwordRetypeRules () {
			return [
				this.$validators.required
			]
		}
	},
	watch: {
		reseller (reseller) {
			if (reseller !== null && reseller !== undefined) {
				this.data.reseller_id = reseller.value
			} else {
				this.data.reseller_id = null
			}
		}
	},
	mounted () {
		this.entityCreationInitialized()
	},
	methods: {
		...mapActions('administrators', [
			'filterResellers',
			'createAdmin'
		]),
		...mapMutations('user', [
			'entityCreationInitialized'
		]),
		validationSuccess () {
			this.createAdmin(this.data)
		},
		filterResellersEvent (filter, update, abort) {
			this.filterResellers({
				filter: filter,
				update: update,
				abort: abort
			})
		},
		strengthMeterFeedbackUpdate (feedback) {
			console.log(feedback)
		},
		strengthMeterScoreUpdate (score) {
			this.passwordStrengthScore = score
		}
	}
}

</script>

<style lang="sass" rel="stylesheet/sass">
.q-psm.Password
	width: 100%
	max-width: none
	.Password__strength-meter
		margin-top: 8px
		margin-bottom: 8px
</style>
