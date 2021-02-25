<template>
	<q-page
		class="q-pa-md"
	>
		<aui-data-table
			ref="table"
			table-id="billing"
			row-key="id"
			resource="billingprofiles"
			resource-base-path="billing"
			resource-type="ajax"
			resource-alt="billing/ajax"
			resource-singular=""
			resource-plural=""
			:title="$t('Billing Profiles')"
			:columns="columns"
			:searchable="true"
			:deletable="true"
			:row-deletable="(row) => row.contract_cnt < 1"
			:deletion-label="$t('Terminate')"
			deletion-subject="id"
			deletion-title-i18n-key="Terminate billing profile"
			deletion-text-i18n-key="You are about to delete billing profile # {subject}"
		>
			<template
				v-slot:actions="props"
			>
				<q-btn
					class="q-mr-xs"
					icon="add"
					color="primary"
					unelevated
					:to="'/billing/create'"
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
					:to="'/billing/' + props.row.id + '/edit'"
					:disable="props.loading || props.selected"
					:label="$t('Edit')"
				>
					<q-list
						class="bg-white"
					>
						<aui-popup-menu-item
							icon="content_copy"
							color="primary"
							:to="'/billing/'+ props.row.id +'/duplicate'"
							:disable="props.loading || props.selected"
							:label="$t('Duplicate')"
						/>
						<aui-popup-menu-item
							icon="shopping_cart"
							color="primary"
							:to="'/billing/'+ props.row.id +'/fees'"
							:disable="props.loading || props.selected"
							:label="$t('Fees')"
						/>
						<aui-popup-menu-item
							icon="query_builder"
							color="primary"
							:to="'/billing/'+ props.row.id +'/peaktimes'"
							:disable="props.loading || props.selected"
							:label="$t('Off-Peaktimes')"
						/>
					</q-list>
				</q-btn-dropdown>
			</template>
			<template
				v-slot:row-more-menu="props"
			>
				<q-list
					class="bg-white"
				>
					<aui-popup-menu-item
						icon="edit"
						color="primary"
						:to="'/billing/'+ props.row.id +'/duplicate'"
						:label="$t('Edit')"
					/>
					<aui-popup-menu-item
						icon="content_copy"
						color="primary"
						:to="'/billing/'+ props.row.id +'/duplicate'"
						:label="$t('Duplicate')"
					/>
					<aui-popup-menu-item
						icon="shopping_cart"
						color="primary"
						:to="'/billing/'+ props.row.id +'/fees'"
						:label="$t('Fees')"
					/>
					<aui-popup-menu-item
						icon="query_builder"
						color="primary"
						:to="'/billing/'+ props.row.id +'/peaktimes'"
						:label="$t('Off-Peaktimes')"
					/>
				</q-list>
			</template>
		</aui-data-table>
	</q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import { required } from 'vuelidate/lib/validators'
export default {
	name: 'AuiBillingProfiles',
	components: {
		AuiDataTable,
		AuiPopupMenuItem
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
					align: 'left'
				},
				{
					name: 'name',
					label: this.$t('Name'),
					field: 'name',
					sortable: true,
					editable: true,
					align: 'left',
					component: 'input',
					componentValidations: [
						{
							name: 'required',
							validator: required,
							error: this.$t('Name must not be empty')
						}
					]
				},
				{
					name: 'handle',
					label: this.$t('Reseller'),
					field: 'handle',
					sortable: true,
					align: 'left'
				},
				{
					name: 'prepaid',
					label: this.$t('Prepaid'),
					field: 'prepaid',
					sortable: true,
					editable: true,
					align: 'left',
					component: 'toggle'
				},
				{
					name: 'contract_cnt',
					label: this.$t('Used (contracts)'),
					field: 'contract_cnt',
					sortable: true,
					align: 'left'
				},
				{
					name: 'package_cnt',
					label: this.$t('Used (packages)'),
					field: 'package_cnt',
					sortable: true,
					align: 'left'
				}
			]
		}
	}
}
</script>
