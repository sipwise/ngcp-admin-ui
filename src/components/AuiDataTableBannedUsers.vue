<template>
	<aui-data-table
		ref="table"
		table-id="bannedusers"
		row-key="id"
		resource="bannedusers"
		:title="$t('Banned Users')"
		:deletion-title="$t('Unban User')"
		:deletion-label="$t('Unban')"
		deletion-icon="delete_forever"
		deletion-subject="username"
		deletion-text-i18n-key="You are about to unban {username}"
		:columns="columns"
		v-bind="$attrs"
		v-on="$listeners"
		@rows-selected="rowsSelected"
	>
		<template
			v-slot:actions
		>
			<q-btn
				v-if="selectedRows.length > 0"
				flat
				dense
				icon="delete_forever"
				:label="$t('Unban')"
				color="negative"
				:disable="$wait.is('aui-data-table-bannedusers*')"
				@click="confirmUnban()"
			/>
			<q-btn
				class="q-ml-sm"
				flat
				dense
				icon="refresh"
				:label="$t('Refresh')"
				color="primary"
				:disable="$wait.is('aui-data-table-bannedusers*')"
				@click="$refs.table.triggerReload()"
			/>
		</template>
	</aui-data-table>
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
