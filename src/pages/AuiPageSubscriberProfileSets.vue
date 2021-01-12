<template>
	<q-page
		class="q-pa-md"
	>
		<aui-data-table
			ref="table"
			table-id="subscribers"
			row-key="id"
			resource="subscriberprofile"
			resource-base-path="subscriberprofile"
			resource-type="ajax"
			resource-alt="subscriberprofile/ajax"
			resource-singular=""
			resource-plural=""
			:title="$t('Subscriber Profile Sets')"
			:columns="columns"
			:searchable="true"
			deletion-subject="name"
		>
		</aui-data-table>
	</q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
export default {
	name: 'AuiPageSubscriberProfileSet',
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
					name: 'reseller_name',
					label: this.$t('Reseller'),
					field: 'reseller_name',
					sortable: true,
					component: 'select-lazy',
					componentIcon: 'fas fa-user-tie',
					componentField: 'reseller_id',
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
					name: 'description',
					label: this.$t('Description'),
					field: 'description',
					sortable: true,
					align: 'left'
				}
			]
		}
	}
}
</script>
