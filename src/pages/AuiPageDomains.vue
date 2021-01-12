<template>
	<q-page
		class="q-pa-md"
	>
		<aui-data-table
			ref="table"
			table-id="domains"
			resource="domains"
			resource-base-path="domain"
			resource-type="ajax"
			resource-alt="domain/ajax"
			resource-singular="domain"
			resource-plural="domains"
			row-key="id"
			:title="$t('Domains')"
			:columns="columns"
			:searchable="true"
			:editable="false"
			:addable="false"
			:deletable="true"
			deletion-subject="domain"
		>
			<template
				v-slot:actions="props"
			>
				<q-btn
					class="q-mr-xs"
					icon="add"
					color="primary"
					unelevated
					:disable="props.loading"
					:label="$t('Add')"
				>
					<aui-form-popup-proxy>
						<aui-new-domain
							@saved="$refs.table.triggerReload()"
						/>
					</aui-form-popup-proxy>
				</q-btn>
				<q-btn
					class="q-mr-xs"
					icon="settings_applications"
					color="primary"
					unelevated
					:to="'/domain/' + props.row.id + '/preferences'"
					:disable="props.loading || props.selected"
					:label="$t('Preferences')"
				/>
			</template>
			<template
				v-slot:row-more-menu="props"
			>
				<aui-popup-menu-item
					color="primary"
					icon="settings_applications"
					:label="$t('Preferences')"
					:to="'/domain/' + props.row.id + '/preferences'"
				/>
			</template>
		</aui-data-table>
	</q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiPopupMenuItem from 'components/AuiPopupMenuItem'
import AuiNewDomain from 'components/edit-forms/AuiNewDomain'
import AuiFormPopupProxy from 'components/dialog/AuiFormPopupProxy'
export default {
	name: 'AuiPageDomains',
	components: {
		AuiFormPopupProxy,
		AuiNewDomain,
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
					name: 'domain_resellers_reseller_name',
					label: this.$t('Reseller'),
					field: 'domain_resellers_reseller_name',
					sortable: true,
					align: 'left'
				},
				{
					name: 'domain',
					label: this.$t('Domain'),
					field: 'domain',
					sortable: true,
					align: 'left'
				}
			]
		}
	},
	methods: {

	}
}
</script>
