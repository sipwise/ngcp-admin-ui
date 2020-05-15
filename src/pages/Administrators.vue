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
		@toggle-cell="toggleCell"
	>
		<info-dialog
			v-model="actionNotAllowedDialog"
			:title="$t('dialogs.actionNotAllowedTitle')"
			:text="$t('dialogs.actionNotAllowedText')"
		/>
		<template
			v-slot:more-menu="props"
		>
			<entity-list-menu-item
				v-if="props.row.id === userId"
				color="primary"
				icon="vpn_key"
				:label="$t('actions.changePassword')"
				@click="changePasswordEvent(props)"
			/>
		</template>
		<change-password-dialog
			v-model="changePasswordDialog"
			:loading="isDialogRequesting"
			@change-password="changeAdministratorPassword({ password: $event.password })"
		/>
	</entity-list-page>
</template>

<script>
import {
	mapActions,
	mapState,
	mapGetters
} from 'vuex'
import EntityListPage from '../components/EntityListPage'
import InfoDialog from '../components/dialog/InfoDialog'
import EntityListMenuItem from '../components/EntityListMenuItem'
import ChangePasswordDialog from '../components/dialog/ChangePasswordDialog'
export default {
	name: 'Administrators',
	components: {
		ChangePasswordDialog,
		EntityListMenuItem,
		InfoDialog,
		EntityListPage
	},
	data () {
		return {
			actionNotAllowedDialog: false,
			changePasswordDialog: false
		}
	},
	computed: {
		...mapState('administrators', [
			'administrators',
			'administratorsPagination',
			'administratorsFilter',
			'administratorsState'
		]),
		...mapGetters('user', [
			'dialogError'
		]),
		...mapGetters('user', [
			'userId',
			'isDialogRequesting',
			'hasDialogSucceeded',
			'hasDialogFailed'
		]),
		isAdministratorsLoading () {
			return this.administratorsState === 'requesting'
		},
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
					name: 'reseller_name',
					label: 'Reseller',
					field: 'reseller_name',
					sortable: true,
					align: 'left'
				},
				{
					name: 'login',
					label: 'Login',
					field: 'login',
					sortable: true,
					align: 'left'
				},
				{
					name: 'is_master',
					label: 'Master',
					field: 'is_master',
					sortable: true,
					align: 'center',
					component: 'toggle'
				},
				{
					name: 'is_ccare',
					label: 'Customer Care',
					field: 'is_ccare',
					sortable: true,
					align: 'center',
					component: 'toggle'
				},
				{
					name: 'is_active',
					label: 'Active',
					field: 'is_active',
					sortable: true,
					align: 'center',
					component: 'toggle'
				},
				{
					name: 'read_only',
					label: 'Read Only',
					field: 'read_only',
					sortable: true,
					align: 'center',
					component: 'toggle'
				},
				{
					name: 'show_passwords',
					label: 'Show Passwords',
					field: 'show_passwords',
					sortable: true,
					align: 'center',
					component: 'toggle',
					toggleIcon: 'visibility'
				},
				{
					name: 'call_data',
					label: 'Show CDRs',
					field: 'call_data',
					sortable: true,
					align: 'center',
					component: 'toggle',
					toggleIcon: 'call'
				},
				{
					name: 'billing_data',
					label: 'Show Billing Info',
					field: 'billing_data',
					sortable: true,
					align: 'center',
					component: 'toggle',
					toggleIcon: 'attach_money'
				},
				{
					name: 'lawful_intercept',
					label: 'Lawful Intercept',
					field: 'lawful_intercept',
					sortable: true,
					align: 'center',
					component: 'toggle'
				}
			]
		}
	},
	watch: {
		hasDialogSucceeded (value) {
			if (value === true) {
				this.changePasswordDialog = false
			}
		}
	},
	methods: {
		...mapActions('administrators', [
			'fetchAdministrators',
			'deleteAdministrator',
			'toggleAdministratorField',
			'changeAdministratorPassword'
		]),
		toggleCell (cell) {
			const forbiddenFields = ['is_master', 'is_ccare', 'is_active']
			if (forbiddenFields.indexOf(cell.column) > -1 && cell.row === this.userId) {
				this.actionNotAllowedDialog = true
			} else {
				this.toggleAdministratorField({
					id: cell.row,
					field: cell.column,
					value: cell.value
				})
			}
		},
		changePasswordEvent (props) {
			this.changePasswordDialog = true
		}
	}
}
</script>
s
