<template>
	<aui-data-table
		ref="table"
		table-id="bannedips"
		row-key="ip"
		resource="bannedips"
		resource-base-path="bannedips"
		resource-type="ajax"
		resource-alt="security/ip"
		:resource-singular="$t('ip')"
		:resource-plural="$t('ips')"
		:title="$t('Banned IPs')"
		:columns="columns"
		:deletable="true"
		:searchable="true"
		:deletion-label="$t('Unban')"
		deletion-icon="delete_forever"
		deletion-subject="ip"
		deletion-title-i18n-key="Unban {resource}"
		deletion-text-i18n-key="You are about to unban {resource} {subject}"
		:local="true"
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
					sortable: true,
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
