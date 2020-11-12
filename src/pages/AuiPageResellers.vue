<template>
	<q-page
		class="q-pa-md"
	>
		<aui-data-table
			ref="table"
			table-id="resellers"
			row-key="id"
			resource="resellers"
			resource-base-path="reseller"
			resource-type="ajax"
			resource-alt="reseller/ajax"
			resource-singular="reseller"
			resource-plural="resellers"
			:deletion-label="$t('Terminate')"
			:title="$t('Resellers')"
			:columns="columns"
			:searchable="true"
			:editable="false"
			:addable="false"
			:deletable="true"
			deletion-subject="name"
			deletion-title-i18n-key="Terminate {resource}"
			deletion-text-i18n-key="You are about to terminate {resource} {subject}"
		>
			<template
				v-slot:actions="props"
			>
				<q-btn
					class="q-mr-xs"
					icon="add"
					color="primary"
					unelevated
					size="md"
					:to="'/reseller/create'"
					:disable="props.loading"
					:label="$t('Add')"
				/>
				<q-btn-dropdown
					class="q-mr-xs"
					icon="edit"
					color="primary"
					unelevated
					split
					size="md"
					:to="'/reseller/' + props.row.id + '/edit'"
					:disable="props.loading || props.selected"
					:label="$t('Edit')"
				>
					<q-list
						class="bg-white"
					>
						<aui-popup-menu-item
							icon="article"
							color="primary"
							:to="'/reseller/' + props.row.id + '/details'"
							:disable="props.loading || props.selected"
							:label="$t('Details')"
						/>
						<aui-popup-menu-item
							icon="settings_applications"
							color="primary"
							:to="'/reseller/' + props.row.id + '/preferences'"
							:disable="props.loading || props.selected"
							:label="$t('Preferences')"
						/>
					</q-list>
				</q-btn-dropdown>
				<!--				<q-btn-->
				<!--					class="q-mr-sm"-->
				<!--					icon="article"-->
				<!--					color="primary"-->
				<!--					unelevated-->
				<!--					:to="'/reseller/' + props.row.id + '/details'"-->
				<!--					:disable="props.loading || props.selected"-->
				<!--					:label="$t('Details')"-->
				<!--				/>-->
				<!--				<q-btn-->
				<!--					class="q-mr-sm"-->
				<!--					icon="settings_applications"-->
				<!--					color="primary"-->
				<!--					unelevated-->
				<!--					:to="'/reseller/' + props.row.id + '/preferences'"-->
				<!--					:disable="props.loading || props.selected"-->
				<!--					:label="$t('Preferences')"-->
				<!--				/>-->
			</template>
			<template
				v-slot:row-more-menu="props"
			>
				<aui-popup-menu-item
					color="primary"
					icon="edit"
					:label="$t('Edit')"
					:to="'/reseller/' + props.row.id + '/edit'"
				/>
				<aui-popup-menu-item
					color="primary"
					icon="article"
					:label="$t('Details')"
					:to="'/reseller/' + props.row.id + '/details'"
				/>
				<aui-popup-menu-item
					color="primary"
					icon="settings_applications"
					:label="$t('Preferences')"
					:to="'/reseller/' + props.row.id + '/preferences'"
				/>
			</template>
			<template
				v-slot:custom-component-contract_id="props"
			>
				<aui-popup-edit-contract
					:label="props.row.contract_id + ''"
					:value="props.row.contract_id"
					@save="$refs.table.patchField('contract_id', $event.value, props)"
				/>
			</template>
			<template
				v-slot:custom-component-status="props"
			>
				<aui-popup-edit-reseller-status
					:status="props.row.status"
					@save="$refs.table.patchField('status', $event.value, props)"
				/>
			</template>
		</aui-data-table>
	</q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import AuiPopupEditResellerStatus from 'components/popup-edit/AuiPopupEditResellerStatus'
import AuiPopupEditContract from 'components/popup-edit/AuiPopupEditContract'
export default {
	name: 'AuiPageResellers',
	components: {
		AuiPopupEditContract,
		AuiPopupEditResellerStatus,
		AuiPopupMenuItem,
		AuiDataTable
	},
	data () {
		return {
		}
	},
	computed: {
		columns () {
			return [
				{
					name: 'id',
					label: this.$t('Id'),
					field: 'id',
					sortable: true,
					align: 'center'
				},
				{
					name: 'contract_id',
					label: this.$t('Contract'),
					field: 'contract_id',
					sortable: true,
					editable: false,
					component: 'custom',
					align: 'left'
				},
				{
					name: 'name',
					label: this.$t('Name'),
					field: 'name',
					sortable: true,
					editable: true,
					component: 'input',
					align: 'left'
				},
				{
					name: 'status',
					label: this.$t('Status'),
					field: 'status',
					sortable: true,
					editable: true,
					component: 'custom',
					align: 'left'
				},
				{
					name: 'enable_rtc',
					label: this.$t('WebRTC'),
					field: 'enable_rtc',
					sortable: true,
					editable: true,
					component: 'toggle',
					align: 'left'
				}
			]
		}
	}
}
</script>
