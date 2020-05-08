<template>
	<q-item
		v-ripple
		v-close-popup
		clickable
		:to="to"
		@click="$emit('click')"
	>
		<q-item-section
			side
		>
			<q-icon
				:color="color"
				:name="icon"
			/>
		</q-item-section>
		<q-item-section
			:class="'text-' + color"
		>
			{{ label }}
		</q-item-section>
	</q-item>
</template>

<script>
export default {
	name: 'EntityListMenuItem',
	props: {
		color: {
			type: String,
			default: 'primary'
		},
		icon: {
			type: String,
			default: ''
		},
		label: {
			type: String,
			default: 'Label'
		},
		to: {
			type: String,
			default: null
		}
	}
}
</script>
