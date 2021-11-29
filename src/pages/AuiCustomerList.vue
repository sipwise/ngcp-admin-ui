<template>
    <aui-base-list-page>
        <aui-data-table
            ref="table"
            table-id="customers"
            row-key="id"
            resource="customers"
            resource-base-path="customer"
            resource-type="ajax"
            resource-alt="customer/ajax"
            :resource-singular="$t('Customer')"
            :title="$t('Customers')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'customerCreation' }]"
            :deletable="true"
            :show-header="false"
            :deletion-label="terminationLabel"
            :deletion-title="terminationTitle"
            :deletion-text="terminationText"
            deletion-subject="id"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
            :row-menu-route-names="rowActionRouteNames"
        />
    </aui-base-list-page>
</template>

<script>
import dataTableColumn from 'src/mixins/data-table-column'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiCustomerList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    mixins: [
        dataTable,
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
