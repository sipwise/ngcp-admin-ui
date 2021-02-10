<template>
	<q-page
		class="q-pa-md"
	>
		<aui-data-table
			ref="table"
			table-id="customers"
			row-key="id"
			resource="customers"
			resource-base-path="customer"
			resource-type="ajax"
			resource-alt="customer/ajax"
			resource-singular="customer"
			resource-plural="customers"
			:deletion-label="$t('Terminate')"
			:title="$t('Customers')"
			:columns="columns"
			:searchable="true"
			:editable="false"
			:addable="false"
			:deletable="true"
			deletion-subject="id"
			deletion-title-i18n-key="Terminate {resource}"
			deletion-text-i18n-key="You are about to terminate {resource} {subject}"
			deletion-action="dataTable/deleteResourceByTerminatedStatus"
		>
			<template
				v-slot:actions="props"
			>
				<q-btn
					class="q-mr-xs"
					icon="add"
					color="primary"
					unelevated
					size="md"
					:disable="props.loading"
					:label="$t('Add')"
				>
					<aui-form-popup-proxy>
						<aui-new-customer
							@saved="$refs.table.triggerReload()"
						/>
					</aui-form-popup-proxy>
				</q-btn>
				<q-btn-dropdown
					class="q-mr-xs"
					icon="edit"
					color="primary"
					unelevated
					split
					size="md"
					:to="'/customer/' + props.row.id + '/edit'"
					:disable="props.loading || props.selected"
					:label="$t('Edit')"
				>
					<q-list
						class="bg-white"
					>
						<aui-popup-menu-item
							icon="article"
							color="primary"
							:to="'/customer/' + props.row.id + '/details'"
							:disable="props.loading || props.selected"
							:label="$t('Details')"
						/>
						<aui-popup-menu-item
							icon="settings_applications"
							color="primary"
							:to="'/customer/' + props.row.id + '/preferences'"
							:disable="props.loading || props.selected"
							:label="$t('Preferences')"
						/>
					</q-list>
				</q-btn-dropdown>
			</template>
			<template
				v-slot:row-more-menu="props"
			>
				<aui-popup-menu-item
					color="primary"
					icon="edit"
					:label="$t('Edit')"
					:to="'/customer/' + props.row.id + '/edit'"
				/>
				<aui-popup-menu-item
					color="primary"
					icon="article"
					:label="$t('Details')"
					:to="'/customer/' + props.row.id + '/details'"
				/>
				<aui-popup-menu-item
					color="primary"
					icon="settings_applications"
					:label="$t('Preferences')"
					:to="'/customer/' + props.row.id + '/preferences'"
				/>
			</template>
		</aui-data-table>
	</q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import { mapGetters } from 'vuex'
import AuiFormPopupProxy from 'components/dialog/AuiFormPopupProxy'
import AuiNewCustomer from 'components/edit-forms/AuiNewCustomer'
export default {
	name: 'AuiPageCustomers',
	components: {
		AuiNewCustomer,
		AuiFormPopupProxy,
		AuiPopupMenuItem,
		AuiDataTable
	},
	data () {
		return {
		}
	},
	computed: {
		...mapGetters('customers', [
			'customerStatusOptions'
		]),
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
					name: 'external_id',
					label: this.$t('External #'),
					field: 'external_id',
					sortable: true,
					editable: true,
					component: 'input',
					align: 'left'
				},
				{
					name: 'contact_reseller_name',
					label: this.$t('Reseller'),
					field: 'contact_reseller_name',
					sortable: true,
					align: 'left'
				},
				{
					name: 'contact_email',
					label: this.$t('Contact Email'),
					field: 'contact_email',
					sortable: true,
					align: 'left',
					editable: true,
					component: 'select-lazy',
					componentIcon: 'fas fa-envelope',
					componentField: 'contact_id',
					componentOptionsGetter: 'contracts/customerContactsAsOptions',
					componentOptionsAction: 'contracts/fetchCustomerContacts'
				},
				{
					name: 'contact_lastname',
					label: this.$t('Name'),
					field: 'contact_lastname',
					sortable: true,
					align: 'left'
				},
				{
					name: 'product_name',
					label: this.$t('Product'),
					field: 'product_name',
					sortable: true,
					align: 'left'
				},
				{
					name: 'billing_profile_name',
					label: this.$t('Billing Profile'),
					field: 'billing_profile_name',
					sortable: true,
					align: 'left'
				},
				{
					name: 'status',
					label: this.$t('Status'),
					field: 'status',
					sortable: true,
					align: 'left',
					editable: true,
					component: 'select',
					componentOptions: this.customerStatusOptions
				},
				{
					name: 'max_subscribers',
					label: this.$t('Max. Subscribers'),
					field: 'max_subscribers',
					sortable: true,
					editable: true,
					component: 'input',
					align: 'left'
				}
			]
		}
	}
}
</script>
