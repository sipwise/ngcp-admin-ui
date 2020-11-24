<template>
	<q-page
		class="q-pa-md"
	>
		<aui-data-table
			ref="table"
			table-id="customers"
			row-key="id"
			resource="customers"
			resource-base-path="customer"
			resource-type="ajax"
			resource-alt="customer/ajax"
			resource-singular="customer"
			resource-plural="customers"
			:deletion-label="$t('Terminate')"
			:title="$t('Customers')"
			:columns="columns"
			:searchable="true"
			:editable="false"
			:addable="false"
			:deletable="true"
			deletion-subject="name"
			deletion-title-i18n-key="Terminate {resource}"
			deletion-text-i18n-key="You are about to terminate {resource} {subject}"
		/>
	</q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
export default {
	name: 'AuiPageCustomers',
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
					name: 'contact_reseller_name',
					label: this.$t('Reseller'),
					field: 'contact_reseller_name',
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
					name: 'contact_lastname',
					label: this.$t('Name'),
					field: 'contact_lastname',
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
				},
				{
					name: 'max_subscribers',
					label: this.$t('Max. Subscribers'),
					field: 'max_subscribers',
					sortable: true,
					align: 'center'
				}
			]
		}
	}
}
</script>
