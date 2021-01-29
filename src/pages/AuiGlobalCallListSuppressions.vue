<template>
	<q-page
		class="q-pa-md"
	>
		<aui-data-table
			ref="table"
			table-id="globalcalllistsuppressions"
			row-key="id"
			resource=""
			resource-base-path=""
			resource-type="ajax"
			resource-alt=""
			:resource-singular="$t('global call list suppression')"
			:resource-plural="$t('global call list suppressions')"
			:title="$t('Global Call List Suppressions')"
			:columns="columns"
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
			return []
		}
	}
}
</script>
