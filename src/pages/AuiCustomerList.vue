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
            :deletion-label="$t('Terminate')"
            :title="$t('Customers')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="false"
            :deletable="true"
            :show-header="false"
            deletion-subject="id"
            :deletion-title="$t('Terminate {resource}')"
            :deletion-text="$t('You are about to terminate {resource} {subject}')"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
            :row-menu-route-names="rowActionRouteNames"
        />
    </aui-base-list-page>
</template>

<script>
import dataTableColumn from 'src/mixins/data-table-column'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
export default {
    name: 'AuiPageCustomers',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    mixins: [
        dataTableColumn
    ],
    data () {
        return {
            selectedRows: []
        }
    },
    computed: {
        rowActionRouteNames () {
            return [
                'customerEdit',
                'customerDetails',
                'customerPreferences'
            ]
        },
        columns () {
            return [
                this.getIdColumn(),
                this.getCustomerExternalIdColumn(),
                {
                    name: 'contact_reseller_name',
                    label: this.$t('Reseller'),
                    field: 'contact_reseller_name',
                    sortable: true,
                    align: 'left'
                },
                this.getCustomerContactEmailColumn(true),
                {
                    name: 'contact_firstname',
                    label: this.$t('First Name'),
                    field: 'contact_firstname',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'contact_lastname',
                    label: this.$t('Last Name'),
                    field: 'contact_lastname',
                    sortable: true,
                    align: 'left'
                },
                this.getCustomerProductNameColumn(true),
                {
                    name: 'billing_profile_name',
                    label: this.$t('Billing Profile'),
                    field: 'billing_profile_name',
                    sortable: true,
                    align: 'left'
                },
                this.getCustomerStatusColumn(),
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
