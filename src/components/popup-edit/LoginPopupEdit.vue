<template>
	<div
		class="cursor-pointer"
	>
		{{ administrator.login }}
		<q-popup-edit
			v-model="currentLogin"
			buttons
			:label-set="$t('actions.save')"
			@save="save"
		>
			<q-input
				v-model.trim="currentLogin"
				clearable
				dense
				:label="$t('administrators.tcLogin')"
				autocomplete="none"
			>
				<template
					v-slot:prepend
				>
					<q-icon
						name="fas fa-user-cog"
					/>
				</template>
			</q-input>
		</q-popup-edit>
	</div>
</template>
<script>
export default {
	name: 'LoginPopupEdit',
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
			currentLogin: this.administrator.login
		}
	},
	methods: {
		save () {
			this.$emit('save', {
				id: this.administrator.id,
				field: 'login',
				value: this.currentLogin
			})
		},
		inputEvent (payload) {
			this.$emit('input', payload)
		}
	}
}
</script>
