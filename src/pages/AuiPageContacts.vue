<template>
	<q-page
		class="q-pa-md"
	>
		<aui-data-table
			ref="table"
			table-id="contacts"
			row-key="id"
			resource="contacts"
			resource-base-path="contact"
			resource-type="ajax"
			resource-alt="contact/ajax"
			resource-singular="contact"
			resource-plural="contacts"
			:title="$t('Contacts')"
			:columns="columns"
			:searchable="true"
			:editable="true"
			:addable="false"
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
					:to="'/contact/create'"
					:disable="props.loading"
					:label="$t('Create contact')"
				/>
			</template>
		</aui-data-table>
	</q-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
export default {
	name: 'AuiPageContact',
	components: {
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
					align: 'left'
				},
				{
					name: 'reseller_name',
					label: this.$t('Reseller'),
					field: 'reseller_name',
					sortable: true,
					align: 'left'
				},
				{
					name: 'firstname',
					label: this.$t('First Name'),
					field: 'firstname',
					sortable: true,
					align: 'left'
				},
				{
					name: 'lastname',
					label: this.$t('Last Name'),
					field: 'lastname',
					sortable: true,
					align: 'left'
				},
				{
					name: 'company',
					label: this.$t('Company'),
					field: 'company',
					sortable: true,
					align: 'left'
				},
				{
					name: 'email',
					label: this.$t('Email'),
					field: 'email',
					sortable: true,
					align: 'left'
				}
			]
		}
	}
}
</script>
