<template>
	<entity-list-page
		entity-singular="administrator"
		entity-plural="administrators"
		add-icon="person_add"
		:columns="columns"
		:entities="administrators"
		:pagination="administratorsPagination"
		:filter="administratorsFilter"
		:is-table-loading="isAdministratorsLoading"
		@request="fetchAdministrators"
		@delete="deleteAdministrator"
	/>
</template>

<script>
import {
	mapActions,
	mapState
} from 'vuex'
import EntityListPage from '../components/EntityListPage'
export default {
	name: 'Administrators',
	components: {
		EntityListPage
	},
	computed: {
		...mapState('administrators', [
			'administrators',
			'administratorsPagination',
			'administratorsFilter',
			'administratorsState'
		]),
		isAdministratorsLoading () {
			return this.administratorsState === 'requesting'
		},
		columns () {
			return [
				{
					name: 'id',
					label: 'Id',
					field: 'id',
					sortable: true
				},
				{
					name: 'reseller_name',
					label: 'Reseller',
					field: 'reseller_name',
					sortable: true
				},
				{
					name: 'login',
					label: 'Login',
					field: 'login',
					sortable: true
				},
				{
					name: 'is_master',
					label: 'Master',
					field: 'is_master',
					sortable: true
				},
				{
					name: 'is_ccare',
					label: 'Customer Care',
					field: 'is_ccare',
					sortable: true
				},
				{
					name: 'is_active',
					label: 'Active',
					field: 'is_active',
					sortable: true
				},
				{
					name: 'read_only',
					label: 'Read Only',
					field: 'read_only',
					sortable: true
				},
				{
					name: 'show_passwords',
					label: 'Show Passwords',
					field: 'show_passwords',
					sortable: true
				},
				{
					name: 'call_data',
					label: 'Show CDRs',
					field: 'call_data',
					sortable: true
				},
				{
					name: 'billing_data',
					label: 'Show Billing Info',
					field: 'billing_data',
					sortable: true
				},
				{
					name: 'lawful_intercept',
					label: 'Lawful Intercept',
					field: 'lawful_intercept',
					sortable: true
				}
			]
		}
	},
	methods: {
		...mapActions('administrators', [
			'fetchAdministrators',
			'deleteAdministrator'
		])
	}
}
</script>
