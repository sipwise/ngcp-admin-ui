<template>
	<q-page
		class="q-pa-md"
	>
		<aui-data-table
			ref="table"
			table-id="admins"
			resource="admins"
			resource-type="ajax"
			resource-alt="administrator/ajax"
			resource-singular="administrator"
			resource-plural="administrators"
			row-key="id"
			:title="$t('Administrators')"
			:columns="columns"
			:searchable="true"
			:editable="true"
			:addable="true"
			:deletable="true"
		>
			<template
				v-slot:custom-component-reseller_name="props"
			>
				<reseller-popup-edit
					:reseller-name="props.row.reseller_name"
					@save="$refs.table.patchField('reseller_id', $event.value, props)"
				/>
			</template>
			<template
				v-slot:custom-component-login="props"
			>
				<login-popup-edit
					:administrator="props.row"
					@save="$refs.table.patchField($event.field, $event.value, props)"
				/>
			</template>
			<template
				v-slot:custom-component-email="props"
			>
				<email-popup-edit
					:administrator="props.row"
					@save="$refs.table.patchField($event.field, $event.value, props)"
				/>
			</template>
			<template
				v-slot:row-more-menu="props"
			>
				<aui-popup-menu-item
					v-if="props.row.id === userId"
					color="primary"
					icon="vpn_key"
					:label="$t('Change password')"
					@click="showDialogChangePassword(props)"
				/>
				<aui-popup-menu-item
					color="primary"
					icon="fas fa-file-contract"
					:label="$t('Certificate Management')"
					@click="showDialogAdminCert(props.row)"
				/>
				<q-separator />
			</template>
		</aui-data-table>
	</q-page>
</template>

<script>
import {
	mapActions,
	mapState,
	mapGetters
} from 'vuex'
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import ChangePasswordDialog from '../components/dialog/ChangePasswordDialog'
import AuiDialogAdminCert from 'components/dialog/AuiDialogAdminCert'
import ResellerPopupEdit from 'components/popup-edit/ResellerPopupEdit'
import LoginPopupEdit from 'components/popup-edit/LoginPopupEdit'
import EmailPopupEdit from 'components/popup-edit/EmailPopupEdit'
export default {
	name: 'AuiPageAdministrators',
	components: {
		EmailPopupEdit,
		LoginPopupEdit,
		ResellerPopupEdit,
		AuiPopupMenuItem,
		AuiDataTable
	},
	data () {
		return {
			dialogAdminCert: true,
			dialogAdminCertAdmin: null,
			actionNotAllowedDialog: false,
			confirmCertificateRevocation: false,
			resellerPopupEditValue: {
				label: '',
				value: null
			},
			loginPopupEditValue: null
		}
	},
	computed: {
		...mapState('administrators', [
			'administrators',
			'administratorsPagination',
			'administratorsFilter',
			'administratorsState',
			'adminCertHasCert'
		]),
		...mapGetters('administrators', [
			'hasAdminUpdateSucceeded',
			'adminCertRequesting'
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
					label: this.$t('Id'),
					field: 'id',
					sortable: true,
					align: 'center'
				},
				{
					name: 'reseller_name',
					label: this.$t('Reseller'),
					field: 'reseller_name',
					sortable: true,
					align: 'left',
					editable: true,
					component: 'custom'
				},
				{
					name: 'login',
					label: this.$t('Login'),
					field: 'login',
					sortable: true,
					align: 'left',
					editable: true,
					component: 'custom'
				},
				{
					name: 'email',
					label: this.$t('Email'),
					field: 'email',
					sortable: true,
					align: 'left',
					editable: true,
					component: 'custom'
				},
				{
					name: 'is_master',
					label: this.$t('Is Master'),
					field: 'is_master',
					sortable: true,
					align: 'center',
					editable: true,
					component: 'toggle'
				},
				{
					name: 'is_ccare',
					label: this.$t('Is CCare'),
					field: 'is_ccare',
					sortable: true,
					align: 'center',
					editable: true,
					component: 'toggle'
				},
				{
					name: 'is_active',
					label: this.$t('Is Active'),
					field: 'is_active',
					sortable: true,
					align: 'center',
					editable: true,
					component: 'toggle'
				},
				{
					name: 'read_only',
					label: this.$t('Is Read Only'),
					field: 'read_only',
					sortable: true,
					align: 'center',
					editable: true,
					component: 'toggle'
				},
				{
					name: 'show_passwords',
					label: this.$t('Show Passwords'),
					field: 'show_passwords',
					sortable: true,
					align: 'center',
					editable: true,
					component: 'toggle',
					icon: 'visibility'
				},
				{
					name: 'call_data',
					label: this.$t('Show CDRs'),
					field: 'call_data',
					sortable: true,
					align: 'center',
					editable: true,
					component: 'toggle',
					icon: 'call'
				},
				{
					name: 'billing_data',
					label: this.$t('Show Billing Info'),
					field: 'billing_data',
					sortable: true,
					align: 'center',
					editable: true,
					component: 'toggle',
					icon: 'attach_money'
				},
				{
					name: 'can_reset_password',
					label: this.$t('Can Reset Password'),
					field: 'can_reset_password',
					sortable: true,
					align: 'center',
					editable: true,
					component: 'toggle'
				},
				{
					name: 'lawful_intercept',
					label: this.$t('Lawful Intercept'),
					field: 'lawful_intercept',
					sortable: true,
					align: 'center',
					editable: true,
					component: 'toggle'
				},
				{
					name: 'is_system',
					label: this.$t('Is System'),
					field: 'is_system',
					sortable: true,
					align: 'center',
					editable: true,
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
		},
		hasAdminUpdateSucceeded (value) {
			if (value === true) {
				this.$q.notify({
					position: 'top',
					color: 'positive',
					icon: 'check',
					message: this.$t('notify.administratorUpdatedSuccessfully')
				})
			}
		}
	},
	methods: {
		...mapActions('dataTable', [
			'patchResource'
		]),
		...mapActions('administrators', [
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
		showDialogChangePassword (admin) {
			this.$q.dialog({
				component: ChangePasswordDialog,
				parent: this,
				admin: admin
			})
		},
		showDialogAdminCert (admin) {
			this.$q.dialog({
				component: AuiDialogAdminCert,
				parent: this,
				admin: admin
			})
		}
	}
}
</script>
