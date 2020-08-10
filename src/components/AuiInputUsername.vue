<template>
	<q-input
		:value="value"
		autocomplete="username"
		color="primary"
		label-color="primary"
		v-bind="$attrs"
		v-on="$listeners"
		@input="$emit('input', $event)"
	>
		<template
			v-slot:prepend
		>
			<q-icon
				color="primary"
				name="fas fa-user-cog"
			/>
		</template>
		<template
			v-if="value !== ''"
			v-slot:append
		>
			<q-btn
				color="primary"
				icon="close"
				flat
				round
				size="sm"
				tabindex="-1"
				@click="$emit('input-clear')"
			/>
		</template>
	</q-input>
</template>

<script>
export default {
	name: 'AuiInputUsername',
	props: {
		value: {
			type: String,
			default: ''
		}
	}
}
</script>
