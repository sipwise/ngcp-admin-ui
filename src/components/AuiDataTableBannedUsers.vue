<template>
	<aui-data-table
		ref="table"
		table-id="bannedusers"
		row-key="username"
		resource="bannedusers"
		resource-type="ajax"
		resource-alt="security/user"
		resource-singular="banneduser"
		resource-plural="bannedusers"
		:title="$t('Banned Users')"
		:deletable="true"
		:searchable="true"
		:deletion-title="$t('Unban User')"
		:deletion-label="$t('Unban')"
		deletion-icon="delete_forever"
		deletion-subject="username"
		deletion-text-i18n-key="You are about to unban {username}"
		:columns="columns"
		v-bind="$attrs"
		v-on="$listeners"
		@rows-selected="rowsSelected"
	/>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
export default {
	name: 'AuiDataTableBannedUsers',
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
					name: 'username',
					field: 'username',
					label: this.$t('Username'),
					sortable: false,
					align: 'left'
				},
				{
					name: 'auth_count',
					field: 'auth_count',
					label: this.$t('Fail Count'),
					sortable: false,
					align: 'left'
				},
				{
					name: 'last_auth',
					field: 'last_auth',
					label: this.$t('Last Attempt'),
					sortable: false,
					align: 'left'
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
