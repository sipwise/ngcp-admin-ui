<template>
	<q-select
		:value="value"
		:options="options"
		emit-value
		v-bind="$attrs"
		v-on="$listeners"
	/>
</template>

<script>
export default {
	name: 'AuiSelectionResellerStatus',
	props: {
		value: {
			type: String,
			required: true
		}
	},
	computed: {
		options () {
			return [
				{
					value: 'active',
					label: this.$t('Active')
				},
				{
					value: 'locked',
					label: this.$t('Locked')
				},
				{
					value: 'terminated',
					label: this.$t('Terminated')
				}
			]
		}
	}
}
</script>
