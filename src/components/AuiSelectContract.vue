<template>
	<aui-select-lazy
		icon="fas fa-handshake"
		:label="$t('Contract')"
		store-getter="contracts/filteredContractOptions"
		store-action="contracts/filterContracts"
		v-bind="$attrs"
		v-on="$listeners"
	/>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
	name: 'AuiSelectContract',
	components: {
		AuiSelectLazy
	}
}
</script>
