<template>
	<base-dialog
		:value="value"
		:title="title"
		:text="text"
		title-color="negative"
		title-text-color="white"
		:title-icon="icon"
		@input="$emit('input')"
	>
		<template
			v-slot:actions
		>
			<q-btn
				v-close-popup
				unelevated
				:label="buttonLabel"
				:icon="buttonIcon"
				color="negative"
				@click="$emit('confirmed')"
			/>
			<slot
				name="actions"
			/>
		</template>
	</base-dialog>
</template>

<script>
import BaseDialog from './BaseDialog'
export default {
	name: 'NegativeConfirmationDialog',
	components: { BaseDialog },
	props: {
		value: {
			type: Boolean,
			default: false
		},
		title: {
			type: String,
			default: 'Title'
		},
		icon: {
			type: String,
			default: 'delete'
		},
		text: {
			type: String,
			default: 'Text'
		},
		buttonIcon: {
			type: String,
			default: 'delete'
		},
		buttonLabel: {
			type: String,
			default: 'Button'
		}
	}
}
</script>
