<template>
	<base-dialog
		:value="value"
		:loading="loading"
		title-icon="vpn_key"
		title="Change password"
		@input="$emit('input')"
	>
		<template
			v-slot:content
		>
			<change-password-form
				ref="changePasswordForm"
				:loading="loading"
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
				:disable="loading"
				:loading="loading"
				@click="$refs.changePasswordForm.submit()"
			/>
		</template>
	</base-dialog>
</template>
<script>
import ChangePasswordForm from '../ChangePasswordForm'
import BaseDialog from './BaseDialog'
export default {
	name: 'ChangePasswordDialog',
	components: {
		BaseDialog,
		ChangePasswordForm
	},
	props: {
		value: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		validationSucceeded (payload) {
			this.$emit('change-password', payload)
		}
	}
}
</script>
