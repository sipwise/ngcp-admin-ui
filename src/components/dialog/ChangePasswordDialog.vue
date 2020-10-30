<template>
	<base-dialog
		ref="dialog"
		:loading="isDialogRequesting"
		title-icon="vpn_key"
		:title="$t('Change password')"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<template
			v-slot:content
		>
			<change-password-form
				ref="changePasswordForm"
				:loading="isDialogRequesting"
				@validation-succeeded="validationSucceeded"
			/>
		</template>
		<template
			v-slot:actions
		>
			<q-btn
				icon="check"
				unelevated
				color="primary"
				:label="'Save'"
				:disable="isDialogRequesting"
				:loading="isDialogRequesting"
				@click="$refs.changePasswordForm.submit()"
			/>
		</template>
	</base-dialog>
</template>
<script>
import ChangePasswordForm from '../ChangePasswordForm'
import BaseDialog from './BaseDialog'
import { mapActions, mapGetters } from 'vuex'
export default {
	name: 'ChangePasswordDialog',
	components: {
		BaseDialog,
		ChangePasswordForm
	},
	computed: {
		...mapGetters('user', [
			'isDialogRequesting',
			'hasDialogSucceeded',
			'hasDialogFailed',
			'dialogError'
		])
	},
	watch: {
		hasDialogSucceeded (succeded) {
			if (succeded) {
				this.hide()
			}
		}
	},
	methods: {
		...mapActions('administrators', [
			'changeAdministratorPassword'
		]),
		validationSucceeded (payload) {
			this.changeAdministratorPassword(payload)
		},
		show () {
			this.$refs.dialog.show()
		},
		hide () {
			this.$refs.dialog.hide()
		}
	}
}
</script>
