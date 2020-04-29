<template>
	<q-page
		class="flex flex-center"
	>
		<div
			class="q-col-gutter-y-lg"
			style="margin-top: -160px"
		>
			<sipwise-logo
				style="width: 300px"
			/>
			<q-form>
				<div
					id="login-title"
					class="text-h5 q-pa-md"
				>
					{{ $t('login.title') }}
				</div>
				<q-input
					v-model="username"
					autocomplete="username"
					color="primary"
					:label="$t('login.usernameLabel')"
					:disable="isLoginRequesting"
					label-color="primary"
					outlined
					:error="usernameError"
					@input="focusUsername"
					@keypress.enter="loginAction"
				>
					<template
						v-slot:prepend
					>
						<q-icon
							color="primary"
							name="person"
						/>
					</template>
					<template
						v-if="username!=''"
						v-slot:append
					>
						<q-btn
							color="primary"
							icon="close"
							flat
							round
							size="sm"
							tabindex="-1"
							@click="clearUsername"
						/>
					</template>
				</q-input>
				<q-input
					v-model="password"
					autocomplete="current-password"
					type="password"
					color="primary"
					:label="$t('login.passwordLabel')"
					:disable="isLoginRequesting"
					label-color="primary"
					outlined
					:error="passwordError"
					:error-message="$t('login.wrongCredentials')"
					@input="focusPassword"
					@keypress.enter="loginAction"
				>
					<template
						v-slot:prepend
					>
						<q-icon
							color="primary"
							name="lock"
						/>
					</template>
					<template
						v-if="password!=''"
						v-slot:append
					>
						<q-btn
							color="primary"
							icon="close"
							flat
							round
							size="sm"
							tabindex="-1"
							@click="clearPassword"
						/>
					</template>
				</q-input>
				<div
					class="row justify-end"
				>
					<q-btn
						outline
						color="primary"
						icon="arrow_forward"
						:loading="isLoginRequesting"
						:disable="isLoginRequesting"
						@click="loginAction"
					>
						{{ $t('login.signInActionLabel') }}
					</q-btn>
				</div>
			</q-form>
		</div>
	</q-page>
</template>

<script>
import {
	QPage,
	QInput,
	QIcon,
	QForm
} from 'quasar'
import {
	mapActions,
	mapState
} from 'vuex'
import SipwiseLogo from '../components/SipwiseLogo'
export default {
	name: 'Login',
	components: {
		QPage,
		QInput,
		QIcon,
		QForm,
		SipwiseLogo
	},
	data () {
		return {
			username: '',
			password: '',
			usernameError: false,
			passwordError: false
		}
	},
	computed: {
		isLoginRequesting () {
			return this.loginState === 'requesting'
		},
		hasLoginError () {
			return this.loginError !== null
		},
		...mapState('user', [
			'loginState',
			'loginError'
		])
	},
	watch: {
		loginError (err) {
			if (err !== null) {
				this.usernameError = true
				this.passwordError = true
			}
		}
	},
	methods: {
		...mapActions('user', [
			'login'
		]),
		focusUsername () {
			this.usernameError = false
		},
		focusPassword () {
			this.passwordError = false
		},
		clearUsername () {
			this.username = ''
			this.usernameError = false
		},
		clearPassword () {
			this.password = ''
			this.passwordError = false
		},
		loginAction () {
			this.login({
				username: this.username,
				password: this.password
			})
		}
	}
}
</script>

<style>
	#login-title {
		padding-left: 0
	}
</style>
