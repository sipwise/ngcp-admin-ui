<template>
	<entity-list-page
		entity-singular="reseller"
		entity-plural="resellers"
		add-icon="group_add"
		:columns="columns"
		:entities="resellerList"
		:pagination="resellerListPagination"
		:filter="resellerListFilter"
		:is-table-loading="resellerListState === 'requesting'"
		@request="fetchResellerList"
		@toggle-cell="toggleCell"
	/>
</template>

<script>
import {
	mapActions,
	mapState
} from 'vuex'
import EntityListPage from '../components/EntityListPage'
export default {
	name: 'Resellers',
	components: {
		EntityListPage
	},
	computed: {
		...mapState('resellers', [
			'resellerList',
			'resellerListPagination',
			'resellerListFilter',
			'resellerListState'
		]),
		columns () {
			return [
				{
					name: 'menu',
					label: '',
					field: 'menu',
					align: 'center'
				},
				{
					name: 'id',
					label: 'Id',
					field: 'id',
					sortable: true,
					align: 'center'
				},
				{
					name: 'contract_id',
					label: 'Contract',
					field: 'contract_id',
					sortable: true,
					align: 'center'
				},
				{
					name: 'name',
					label: 'Name',
					field: 'name',
					sortable: true,
					align: 'left'
				},
				{
					name: 'status',
					label: 'Status',
					field: 'status',
					sortable: true,
					align: 'left'
				},
				{
					name: 'enable_rtc',
					label: 'WebRTC',
					field: 'enable_rtc',
					sortable: true,
					align: 'center',
					component: 'toggle'
				}
			]
		}
	},
	methods: {
		...mapActions('resellers', [
			'fetchResellerList',
			'toggleEnableRTC'
		]),
		toggleCell (event) {
			if (event.column === 'enable_rtc') {
				this.toggleEnableRTC({
					id: event.row,
					value: event.value
				})
			}
		}
	}
}
</script>
