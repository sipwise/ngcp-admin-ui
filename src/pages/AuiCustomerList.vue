<template>
    <aui-base-list-page
        acl-resource="entity.customers"
        :add-button-routes="[{ name: 'customerCreation' }]"
        :row-action-split="true"
        :row-action-route-names="rowActionRouteNames"
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
            :show-header="false"
            deletion-subject="id"
            deletion-title-i18n-key="Terminate {resource}"
            deletion-text-i18n-key="You are about to terminate {resource} {subject}"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
            :row-menu-route-names="rowActionRouteNames"
        />
    </aui-base-list-page>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import { mapGetters } from 'vuex'
import AuiBaseListPage from 'pages/AuiBaseListPage'
export default {
    name: 'AuiPageCustomers',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    data () {
        return {
            selectedRows: []
        }
    },
    computed: {
        ...mapGetters('customers', [
            'customerStatusOptions'
        ]),
        rowActionRouteNames () {
            return [
                'customerEdit',
                'customerDetails',
                'customerPreferences'
            ]
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
