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
			deletion-subject="name"
			deletion-title-i18n-key="Terminate {resource}"
			deletion-text-i18n-key="You are about to terminate {resource} {subject}"
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
					:to="'/customer/create'"
					:disable="props.loading"
					:label="$t('Add')"
				/>
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
export default {
	name: 'AuiPageCustomers',
	components: {
		AuiPopupMenuItem,
		AuiDataTable
	},
	data () {
		return {
		}
	},
	computed: {
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
					align: 'center'
				},
				{
					name: 'contact_reseller_name',
					label: this.$t('Reseller'),
					field: 'contact_reseller_name',
					sortable: true,
					align: 'center'
				},
				{
					name: 'contact_email',
					label: this.$t('Contact Email'),
					field: 'contact_email',
					sortable: true,
					align: 'center'
				},
				{
					name: 'contact_lastname',
					label: this.$t('Name'),
					field: 'contact_lastname',
					sortable: true,
					align: 'center'
				},
				{
					name: 'product_name',
					label: this.$t('Product'),
					field: 'product_name',
					sortable: true,
					align: 'center'
				},
				{
					name: 'billing_profile_name',
					label: this.$t('Billing Profile'),
					field: 'billing_profile_name',
					sortable: true,
					align: 'center'
				},
				{
					name: 'status',
					label: this.$t('Status'),
					field: 'status',
					sortable: true,
					align: 'center'
				},
				{
					name: 'max_subscribers',
					label: this.$t('Max. Subscribers'),
					field: 'max_subscribers',
					sortable: true,
					align: 'center'
				}
			]
		}
	}
}
</script>
