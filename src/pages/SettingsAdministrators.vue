<template>
	<q-page
		class="q-pa-lg"
	>
		<div
			class="q-pa-lg"
		>
			<q-btn
				icon="add"
				outline
				size="md"
				color="primary"
				:disable="loading"
				label="Add administrator"
				@click="addRow"
			/>
		</div>
		<q-table
			row-key="id"
			flat
			:loading="isAdministratorsLoading"
			:columns="columns"
			:data="administrators"
			:fullscreen="tableFullscreen"
			:pagination.sync="pagination"
			@row-click="rowClick"
			@request="request"
		/>
	</q-page>
</template>

<script>
import {
	mapActions,
	mapState
} from 'vuex'
import {
	QPage,
	QTable
} from 'quasar'
export default {
	name: 'Login',
	components: {
		QPage,
		QTable
	},
	data () {
		return {
			tableFullscreen: false
		}
	},
	computed: {
		...mapState('administrators', [
			'administrators',
			'administratorsState'
		]),
		isAdministratorsLoading () {
			return this.administratorsState === 'requesting'
		},
		columns () {
			return [
				{ name: 'id', label: 'Id', field: 'id', sortable: true },
				{ name: 'reseller_name', label: 'Reseller', field: 'reseller_name', sortable: true },
				{ name: 'login', label: 'Login', field: 'login', sortable: true },
				{ name: 'is_master', label: 'Master', field: 'is_master', sortable: true },
				{ name: 'is_ccare', label: 'Customer Care', field: 'is_ccare', sortable: true },
				{ name: 'is_active', label: 'Active', field: 'is_active', sortable: true },
				{ name: 'read_only', label: 'Read Only', field: 'read_only', sortable: true },
				{ name: 'show_passwords', label: 'Show Passwords', field: 'show_passwords', sortable: true },
				{ name: 'call_data', label: 'Show CDRs', field: 'call_data', sortable: true },
				{ name: 'billing_data', label: 'Show Billing Info', field: 'billing_data', sortable: true },
				{ name: 'lawful_intercept', label: 'Lawful Intercept', field: 'lawful_intercept', sortable: true }
			]
		}
	},
	mounted () {
		this.fetchAdministrators()
	},
	methods: {
		...mapActions('administrators', [
			'fetchAdministrators'
		]),
		rowClick (event, row) {
			console.log(row)
		},
		request (prop) {
			console.log(prop)
		},
		pagination (field) {
			console.log(field)
		}
	}
}
</script>
