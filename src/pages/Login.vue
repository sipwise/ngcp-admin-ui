<template>
	<q-page>
		<div
			class="row justify-center"
		>
			<q-form
				class="col col-3 q-gutter-y-md"
			>
				<div>
					{{ $t('login.title') }}
				</div>
				<q-input
					v-model="username"
					autocomplete="username"
					dense
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
					dense
					color="primary"
					clearable
					:label="$t('login.passwordLabel')"
				>
					<template v-slot:prepend>
						<q-icon name="lock" />
					</template>
				</q-input>
				<div
					class="row justify-end"
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
export default {
	name: 'Login',
	components: {
		QPage,
		QInput,
		QIcon,
		QForm
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
