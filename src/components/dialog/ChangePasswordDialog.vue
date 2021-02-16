<template>
	<base-dialog
		ref="dialog"
		:loading="$wait.is('aui-administrator-change-password')"
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
				:loading="$wait.is('aui-administrator-change-password')"
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
				:disable="$wait.is('aui-administrator-change-password')"
				:loading="$wait.is('aui-administrator-change-password')"
				@click="$refs.changePasswordForm.submit()"
			/>
		</template>
	</base-dialog>
</template>
<script>
import ChangePasswordForm from '../ChangePasswordForm'
import BaseDialog from './BaseDialog'
import {
	mapWaitingActions
} from 'vue-wait'
import { showGlobalErrorMessage } from 'src/helpers/ui'
export default {
	name: 'ChangePasswordDialog',
	components: {
		BaseDialog,
		ChangePasswordForm
	},
	methods: {
		...mapWaitingActions('administrators', {
			changeAdministratorPassword: 'aui-administrator-change-password'
		}),
		validationSucceeded (payload) {
			this.changeAdministratorPassword(payload).then(() => {
				this.hide()
				showGlobalErrorMessage(this.$t('Password changed successfully'))
			})
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
