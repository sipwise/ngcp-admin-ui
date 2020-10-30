<template>
	<aui-data-table
		ref="table"
		table-id="bannedips"
		row-key="ip"
		resource="security/ip"
		resource-type="ajax"
		:title="$t('Banned IPs')"
		:columns="columns"
		:deletion-title="$t('Unban IP')"
		:deletion-label="$t('Unban')"
		deletion-subject="ip"
		deletion-text-i18n-key="You are about to unban {ip}"
		deletion-icon="delete_forever"
		v-bind="$attrs"
		v-on="$listeners"
		@rows-selected="rowsSelected"
	/>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
export default {
	name: 'AuiDataTableBannedIps',
	components: {
		AuiDataTable
	},
	data () {
		return {
			selectedRows: []
		}
	},
	computed: {
		columns () {
			return [
				{
					name: 'ip',
					field: 'ip',
					label: this.$t('Ip'),
					sortable: false,
					align: 'left',
					editable: true,
					component: 'input'
				}
			]
		}
	},
	methods: {
		rowsSelected (rows) {
			this.selectedRows = rows
		}
	}
}
</script>
