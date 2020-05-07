<template>
	<q-page
		class="q-pa-lg"
	>
		<q-dialog
			v-model="confirmDeletion"
			persistent
		>
			<q-card>
				<q-card-section class="row items-center">
					<q-avatar
						icon="delete"
						color="negative"
						text-color="white"
					/>
					<span
						v-if="selectedRows.length === 1"
						class="q-ml-sm"
					>
						You are about to delete the administrator {{ selectedRows[0].login }}
					</span>
				</q-card-section>

				<q-card-actions align="right">
					<q-btn
						v-close-popup
						flat
						label="Cancel"
						color="primary"
					/>
					<q-btn
						v-close-popup
						unelevated
						label="Delete"
						color="negative"
						@click="deleteAdminAction"
					/>
				</q-card-actions>
			</q-card>
		</q-dialog>

		<q-table
			row-key="id"
			flat
			:loading="isAdministratorsLoading"
			:columns="columns"
			:data="administrators"
			:fullscreen="tableFullscreen"
			:pagination="administratorsPagination"
			selection="single"
			:selected.sync="selectedRows"
			@request="request"
		>
			<template
				v-slot:top-left
			>
				<q-btn
					class="q-mr-sm"
					icon="person_add"
					unelevated
					size="md"
					color="primary"
					:disable="isAdministratorsLoading"
					label="Add administrator"
					to="/administrator/create"
				/>
				<q-btn
					v-if="selectedRows.length > 0"
					class="q-mr-sm"
					icon="delete"
					label="Delete"
					unelevated
					color="negative"
					@click="confirmDeletion = true"
				/>
				<q-btn
					v-if="selectedRows.length === 1"
					icon="edit"
					label="Edit"
					unelevated
					color="primary"
				/>
			</template>
			<template
				v-slot:top-right
			>
				<q-input
					:value="administratorsFilter"
					:loading="isAdministratorsLoading"
					class="q-mr-md"
					debounce="1000"
					filled
					square
					dense
					placeholder="Search"
					@input="inputSearch"
				>
					<template v-slot:prepend>
						<q-icon
							name="search"
						/>
					</template>
				</q-input>
				<q-icon
					class="cursor-pointer"
					:name="fullscreenIcon"
					color="primary"
					size="sm"
					@click="toggleFullscreen"
				/>
			</template>
		</q-table>
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
			tableFullscreen: false,
			selectedRows: [],
			confirmDeletion: false
		}
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
		},
		fullscreenIcon () {
			if (!this.tableFullscreen) {
				return 'fullscreen'
			}
			return 'fullscreen_exit'
		}
	},
	mounted () {
		this.fetchAdministrators({
			pagination: this.administratorsPagination,
			filter: this.administratorsFilter
		})
	},
	methods: {
		...mapActions('administrators', [
			'fetchAdministrators',
			'deleteAdmin'
		]),
		rowClick (event, row) {
			console.log(row)
		},
		request (prop) {
			this.fetchAdministrators({
				pagination: prop.pagination,
				filter: this.administratorsFilter
			})
		},
		toggleFullscreen () {
			this.tableFullscreen = !this.tableFullscreen
		},
		inputSearch (search) {
			this.fetchAdministrators({
				pagination: this.administratorsPagination,
				filter: search
			})
		},
		deleteAdminAction () {
			this.deleteAdmin(this.selectedRows[0].id)
			this.selectedRows = []
		}
	}
}
</script>
