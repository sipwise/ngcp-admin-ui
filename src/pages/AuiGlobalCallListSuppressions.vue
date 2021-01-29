<template>
	<q-page
		class="q-pa-md"
	>
		<aui-data-table
			ref="table"
			table-id="globalcalllistsuppressions"
			row-key="id"
			resource="calllistsuppression"
			resource-base-path="calllistsuppression"
			resource-type="ajax"
			resource-alt="calllistsuppression/ajax"
			:resource-singular="$t('global call list suppression')"
			:resource-plural="$t('global call list suppressions')"
			:title="$t('Global Call List Suppressions')"
			:columns="columns"
			:searchable="true"
		>
		</aui-data-table>
	</q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
export default {
	name: 'AuiGlobalCallListSuppressions',
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
					align: 'left'
				},
				{
					name: 'domain',
					label: this.$t('Domain'),
					field: 'domain',
					sortable: true,
					align: 'left'
				},
				{
					name: 'direction',
					label: this.$t('Direction'),
					field: 'direction',
					sortable: true,
					align: 'left'
				},
				{
					name: 'pattern',
					label: this.$t('Pattern'),
					field: 'pattern',
					sortable: true,
					align: 'left'
				},
				{
					name: 'mode',
					label: this.$t('Mode'),
					field: 'mode',
					sortable: true,
					align: 'left'
				},
				{
					name: 'label',
					label: this.$t('Label'),
					field: 'label',
					sortable: true,
					align: 'left'
				}
			]
		}
	}
}
</script>
