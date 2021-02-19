<template>
	<aui-select-lazy
		v-model="network"
		:label="$t('Network')"
		store-getter="billing/billingNetworksAsOptions"
		store-action="billing/fetchBillingNetworks"
		dense
		:load-initially="false"
		:error="false"
		@input="$emit('billingNetworkSelected', {value: network, index: index})"
	/>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
	name: 'AuiSelectReseller',
	components: {
		AuiSelectLazy
	},
	props: {
		index: {
			type: Number,
			default: undefined
		}
	},
	data () {
		return {
			network: null
		}
	}
}
</script>
