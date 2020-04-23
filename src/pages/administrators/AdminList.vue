<template>
	<q-page
		class="q-pa-lg"
	>
		<q-table
			title="Administrators"
			:columns="columns"
			:data="data"
			row-key="id"
			dense
			flat
		/>
	</q-page>
</template>

<script>
import data from '../../data/administrators'
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
		}
	},
	computed: {
		data () {
			return data.aaData
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
	methods: {
	}
}
</script>
