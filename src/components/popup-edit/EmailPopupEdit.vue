<template>
	<div
		class="cursor-pointer full-width full-height"
	>
		{{ administrator.email }}
		<q-popup-edit
			v-model="currentEmail"
			buttons
			:label-set="$t('actions.save')"
			:validate="validate"
			@save="save"
		>
			<q-input
				v-model.trim="currentEmail"
				clearable
				dense
				:label="$t('administrators.tcEmail')"
				autocomplete="none"
				:error="$v.currentEmail.$error"
				:error-message="$errorMessage($v.currentEmail)"
				@blur="$v.currentEmail.$touch()"
			>
				<template
					v-slot:prepend
				>
					<q-icon
						name="email"
					/>
				</template>
			</q-input>
		</q-popup-edit>
	</div>
</template>
<script>
import {
	email
} from 'vuelidate/lib/validators'
export default {
	name: 'EmailPopupEdit',
	components: {
	},
	props: {
		administrator: {
			type: Object,
			default: null
		}
	},
	data () {
		return {
			currentEmail: this.administrator.email
		}
	},
	validations: {
		currentEmail: {
			email
		}
	},
	methods: {
		save () {
			this.$emit('save', {
				id: this.administrator.id,
				field: 'email',
				value: this.currentEmail
			})
		},
		validate () {
			this.$v.$touch()
			return !this.$v.$invalid
		},
		inputEvent (payload) {
			this.$emit('input', payload)
		}
	}
}
</script>
