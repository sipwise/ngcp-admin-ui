<template>
	<div
		class="row items-baseline q-col-gutter-sm"
	>
		<div
			class="col"
		>
			<aui-select-lazy
				icon="fas fa-users"
				:label="$t('Reseller')"
				clearable
				store-getter="resellers/filteredResellerOptions"
				store-action="resellers/filterResellers"
				:load-initially="false"
				v-bind="$attrs"
				v-on="$listeners"
			/>
		</div>
		<div
			class="col col-auto"
		>
			<q-btn
				size="sm"
				icon="add"
				color="primary"
				unelevated
				to="/reseller/create"
				:label="$t('Create')"
				:disable="$attrs.disable"
			/>
		</div>
	</div>
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
