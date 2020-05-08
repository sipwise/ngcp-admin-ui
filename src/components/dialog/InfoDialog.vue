<template>
	<base-dialog
		:value="value"
		:title="title"
		:text="text"
		title-color="info"
		title-text-color="white"
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
	name: 'InfoDialog',
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
