<template>
	<q-page
		class="q-pa-md"
	>
		<aui-data-table
			ref="table"
			table-id="billing"
			row-key="id"
			resource="billing"
			resource-base-path="billing"
			resource-type="ajax"
			resource-alt="billing/ajax"
			resource-singular=""
			resource-plural=""
			:title="$t('Billing Profiles')"
			:columns="columns"
		/>
	</q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
export default {
	name: 'AuiBillingProfiles',
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
					name: 'name',
					label: this.$t('Name'),
					field: 'name',
					sortable: true,
					align: 'left'
				},
				{
					name: 'handle',
					label: this.$t('Reseller'),
					field: 'handle',
					sortable: true,
					align: 'left'
				},
				{
					name: 'prepaid',
					label: this.$t('Prepaid'),
					field: 'prepaid',
					sortable: true,
					align: 'left'
				},
				{
					name: 'package_cnt',
					label: this.$t('Used (contracts)'),
					field: 'package_cnt',
					sortable: true,
					align: 'left'
				},
				{
					name: 'contract_cnt',
					label: this.$t('Used (packages)'),
					field: 'contract_cnt',
					sortable: true,
					align: 'left'
				}
			]
		}
	}
}
</script>
