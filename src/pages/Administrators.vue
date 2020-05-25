<template>
	<entity-list-page
		add-icon="fas fa-user-cog"
		:entity-singular="$t('administrators.singular')"
		:entity-plural="$t('administrators.plural')"
		:columns="columns"
		:entities="administrators"
		:pagination="administratorsPagination"
		:filter="administratorsFilter"
		:is-table-loading="isAdministratorsLoading"
		@request="fetchAdministrators"
		@delete="deleteAdministrator"
		@toggle-cell="toggleCell"
		@save-cell="saveCell"
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
		<template
			v-slot:component-reseller_name="props"
		>
			{{ props.value }}
			<q-popup-edit
				v-model="resellerPopupEditValue"
				buttons
				:title="props.col.label"
				:label-set="$t('actions.save')"
				@before-show="resellerPopupEditValue={label:props.row.reseller_name, value:null}"
				@save="updateRelatedReseller(props.row.id)"
			>
				<reseller-selection
					v-model="resellerPopupEditValue"
				/>
			</q-popup-edit>
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
import ResellerSelection from '../components/ResellerSelection'
export default {
	name: 'Administrators',
	components: {
		ResellerSelection,
		ChangePasswordDialog,
		EntityListMenuItem,
		InfoDialog,
		EntityListPage
	},
	data () {
		return {
			actionNotAllowedDialog: false,
			changePasswordDialog: false,
			resellerPopupEditValue: null
		}
	},
	computed: {
		...mapState('administrators', [
			'administrators',
			'administratorsPagination',
			'administratorsFilter',
			'administratorsState'
		]),
		...mapGetters('administrators', [
			'hasAdminUpdateSucceeded'
		]),
		...mapGetters('user', [
			'userId',
			'isDialogRequesting',
			'hasDialogSucceeded',
			'hasDialogFailed',
			'dialogError'
		]),
		isAdministratorsLoading () {
			return this.administratorsState === 'requesting'
		},
		columns () {
			return [
				{
					name: 'id',
					label: this.$t('administrators.tcId'),
					field: 'id',
					sortable: true,
					align: 'center'
				},
				{
					name: 'reseller_name',
					label: this.$t('administrators.tcReseller'),
					field: 'reseller_name',
					sortable: true,
					align: 'left',
					component: 'component-reseller_name'
				},
				{
					name: 'login',
					label: this.$t('administrators.tcLogin'),
					field: 'login',
					sortable: true,
					align: 'left',
					component: 'input'
				},
				{
					name: 'is_master',
					label: this.$t('administrators.tcMaster'),
					field: 'is_master',
					sortable: true,
					align: 'center',
					component: 'toggle'
				},
				{
					name: 'is_ccare',
					label: this.$t('administrators.tcCustomerCare'),
					field: 'is_ccare',
					sortable: true,
					align: 'center',
					component: 'toggle'
				},
				{
					name: 'is_active',
					label: this.$t('administrators.tcActive'),
					field: 'is_active',
					sortable: true,
					align: 'center',
					component: 'toggle'
				},
				{
					name: 'read_only',
					label: this.$t('administrators.tcReadOnly'),
					field: 'read_only',
					sortable: true,
					align: 'center',
					component: 'toggle'
				},
				{
					name: 'show_passwords',
					label: this.$t('administrators.tcShowPasswords'),
					field: 'show_passwords',
					sortable: true,
					align: 'center',
					component: 'toggle',
					toggleIcon: 'visibility'
				},
				{
					name: 'call_data',
					label: this.$t('administrators.tcShowCDRs'),
					field: 'call_data',
					sortable: true,
					align: 'center',
					component: 'toggle',
					toggleIcon: 'call'
				},
				{
					name: 'billing_data',
					label: this.$t('administrators.tcShowBillingInfo'),
					field: 'billing_data',
					sortable: true,
					align: 'center',
					component: 'toggle',
					toggleIcon: 'attach_money'
				},
				{
					name: 'lawful_intercept',
					label: this.$t('administrators.tcLawfulIntercept'),
					field: 'lawful_intercept',
					sortable: true,
					align: 'center',
					component: 'toggle'
				},
				{
					name: 'menu',
					label: '',
					field: 'menu',
					align: 'center'
				}
			]
		}
	},
	watch: {
		hasDialogSucceeded (value) {
			if (value === true) {
				this.changePasswordDialog = false
			}
		},
		hasAdminUpdateSucceeded (value) {
			if (value === true) {
				this.$q.notify({
					color: 'primary',
					icon: 'check',
					message: this.$t('notify.administratorUpdatedSuccessfully')
				})
			}
		}
	},
	methods: {
		...mapActions('administrators', [
			'fetchAdministrators',
			'deleteAdministrator',
			'updateAdministratorField',
			'changeAdministratorPassword'
		]),
		toggleCell (cell) {
			const forbiddenFields = ['is_master', 'is_ccare', 'is_active']
			if (forbiddenFields.indexOf(cell.column) > -1 && cell.row === this.userId) {
				this.actionNotAllowedDialog = true
			} else {
				this.updateAdministratorField({
					id: cell.row,
					field: cell.column,
					value: cell.value
				})
			}
		},
		saveCell (cell) {
			this.updateAdministratorField({
				id: cell.row,
				field: cell.column,
				value: cell.value
			})
		},
		changePasswordEvent () {
			this.changePasswordDialog = true
		},
		updateRelatedReseller (resellerId) {
			this.updateAdministratorField({
				id: resellerId,
				field: 'reseller_id',
				value: this.resellerPopupEditValue.value,
				reload: true
			})
		}
	}
}
</script>
s
