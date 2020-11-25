<template>
	<q-page
		class="q-pa-md"
	>
		<aui-data-table
			ref="table"
			table-id="contracts"
			row-key="id"
			resource="contracts"
			resource-base-path="contract"
			resource-type="ajax"
			resource-alt="contract/ajax"
			resource-singular="contract"
			resource-plural="contracts"
			:deletion-label="$t('Terminate')"
			:title="$t('Contracts')"
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
					:to="'/contract/peering/create'"
					:disable="props.loading"
					:label="$t('Create peering contract')"
				/>
				<q-btn
					class="q-mr-xs"
					icon="add"
					color="primary"
					unelevated
					size="md"
					:to="'/contract/reseller/create'"
					:disable="props.loading"
					:label="$t('Create reseller contract')"
				/>
				<q-btn
					class="q-mr-xs"
					icon="edit"
					color="primary"
					unelevated
					size="md"
					:to="'/contract/' + props.row.id + '/edit'"
					:disable="props.loading || props.selected"
					:label="$t('Edit')"
				/>
			</template>
		</aui-data-table>
	</q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
export default {
	name: 'AuiPageContracts',
	components: {
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
					name: 'external_id',
					label: this.$t('External #'),
					field: 'external_id',
					sortable: true,
					align: 'center'
				},
				{
					name: 'contact_email',
					label: this.$t('Contact Email'),
					field: 'contact_email',
					sortable: true,
					align: 'center'
				},
				{
					name: 'product_name',
					label: this.$t('Product'),
					field: 'product_name',
					sortable: true,
					align: 'center'
				},
				{
					name: 'billing_profile_name',
					label: this.$t('Billing Profile'),
					field: 'billing_profile_name',
					sortable: true,
					align: 'center'
				},
				{
					name: 'status',
					label: this.$t('Status'),
					field: 'status',
					sortable: true,
					align: 'center'
				}
			]
		}
	}
}
</script>
