<template>
	<base-dialog
		:value="value"
		:title="title"
		:text="text"
		title-color="negative"
		title-text-color="white"
		title-icon="delete"
		@input="$emit('input')"
	>
		<template
			v-slot:actions
		>
			<slot
				name="actions"
			/>
		</template>
	</base-dialog>
</template>

<script>
import BaseDialog from './BaseDialog'
export default {
	name: 'DeleteConfirmationDialog',
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
		text: {
			type: String,
			default: 'Text'
		}
	}
}
</script>
