<template>
	<q-btn
		icon="delete"
		:label="$t('actions.delete')"
		unelevated
		color="negative"
		:disable="disable"
		:loading="loading"
		@click="$emit('delete')"
	/>
</template>
<script>
export default {
	name: 'DeleteButton',
	props: {
		disable: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		}
	}
}
</script>
