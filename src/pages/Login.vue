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
			<q-form
				class="q-col-gutter-y-md"
			>
				<div
					class="text-h5"
				>
					{{ $t('login.title') }}
				</div>
				<q-input
					v-model="username"
					autocomplete="username"
					color="primary"
					clearable
					:label="$t('login.usernameLabel')"
				>
					<template v-slot:prepend>
						<q-icon name="person" />
					</template>
				</q-input>
				<q-input
					v-model="password"
					autocomplete="current-password"
					type="password"
					color="primary"
					clearable
					:label="$t('login.passwordLabel')"
				>
					<template v-slot:prepend>
						<q-icon name="lock" />
					</template>
				</q-input>
				<div
					class="row justify-end q-py-lg"
				>
					<q-btn
						color="primary"
						@click="login({username: username, password: password})"
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
	mapActions
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
			password: ''
		}
	},
	methods: {
		...mapActions('user', [
			'login'
		])
	}
}
</script>
