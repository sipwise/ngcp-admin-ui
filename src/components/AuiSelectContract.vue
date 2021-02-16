<template>
	<div
		class="row items-baseline q-col-gutter-sm"
	>
		<div
			class="col"
		>
			<aui-select-lazy
				icon="fas fa-handshake"
				:label="$t('Contract')"
				clearable
				store-getter="contracts/filteredContractOptions"
				store-action="contracts/filterContracts"
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
				:label="$t('Create')"
			>
				<aui-popup-menu>
					<aui-popup-menu-item
						icon="add"
						color="primary"
						:to="'/contract/peering/create'"
						:label="$t('Add peering contract')"
					/>
					<aui-popup-menu-item
						icon="add"
						color="primary"
						:to="'/contract/reseller/create'"
						:label="$t('Add reseller contract')"
					/>
				</aui-popup-menu>
			</q-btn>
		</div>
	</div>
</template>

<script>
import AuiSelectLazy from 'components/input/AuiSelectLazy'
import AuiPopupMenu from 'components/AuiPopupMenu'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
export default {
	name: 'AuiSelectContract',
	components: {
		AuiPopupMenuItem,
		AuiPopupMenu,
		AuiSelectLazy
	}
}
</script>
