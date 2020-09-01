<template>
	<q-page
		class="flex flex-center"
	>
		<change-password-dialog
			v-model="changePasswordDialog"
			title="Recover password"
			:loading="isDialogRequesting"
			@change-password="recoverPassword($event)"
			@dialog-hidden="redirectToLogin()"
		/>
	</q-page>
</template>

<script>
import {
	mapActions,
	mapGetters
} from 'vuex'
import ChangePasswordDialog from '../components/dialog/ChangePasswordDialog'
export default {
	name: 'RecoverPassword',
	components: {
		ChangePasswordDialog
	},
	props: {
		token: {
			type: String,
			default: () => {
				return null
			}
		}
	},
	data () {
		return {
			logo: false,
			changePasswordDialog: true
		}
	},
	computed: {
		...mapGetters('user', [
			'isDialogRequesting',
			'hasDialogSucceeded',
			'hasDialogFailed'
		])
	},
	watch: {
		hasDialogSucceeded (value) {
			if (value === true) {
				this.$q.notify({
					position: 'top',
					color: 'positive',
					icon: 'check',
					message: this.$t('notify.passwordChangedSuccessfully')
				})
				this.redirectToLogin()
			}
		},
		hasDialogFailed (value) {
			if (value === true) {
				this.$q.notify({
					position: 'top',
					color: 'negative',
					icon: 'error',
					message: this.$t('notify.errorPasswordReset')
				})
			}
		}
	},
	mounted () {
		if (!this.token) {
			this.redirectToLogin()
		}
	},
	methods: {
		...mapActions('administrators', [
			'recoverAdministratorPassword'
		]),
		redirectToLogin () {
			this.$router.push({ path: '/login/admin' })
		},
		async recoverPassword (data) {
			await this.recoverAdministratorPassword({ password: data.password, token: this.token })
		}
	}
}
</script>

<style>
</style>
