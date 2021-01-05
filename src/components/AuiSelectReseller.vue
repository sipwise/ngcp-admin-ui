<template>
	<aui-select-lazy
		icon="fas fa-users"
		:label="$t('Reseller')"
		store-getter="resellers/filteredResellerOptions"
		store-action="resellers/filterResellers"
		v-bind="$attrs"
		v-on="$listeners"
	/>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
export default {
	name: 'AuiSelectReseller',
	components: {
		AuiSelectLazy
	}
}
</script>
