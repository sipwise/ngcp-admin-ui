<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="customers"
            row-key="id"
            resource="customers"
            resource-type="api"
            :resource-singular="$t('Customer')"
            :resource-default-filters="{ status: 'active,locked,pending' }"
            :title="$t('Customers')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'customerCreation' }]"
            :deletable="true"
            :show-header="false"
            :show-more-menu="!canEdit"
            :deletion-label="terminationLabel"
            :deletion-title="terminationTitle"
            :deletion-text="terminationText"
            deletion-subject="id"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'status',
                    label: $t('Status'),
                    wildcard: false,
                    component: 'customerStatus',
                    exclude: ['not_status']
                },
                {
                    criteria: 'not_status',
                    label: $t('Not Status'),
                    wildcard: false,
                    component: 'customerStatus',
                    exclude: ['status']
                },
                {
                    criteria: 'external_id',
                    label: $t('External #'),
                    wildcard: false,
                    component: 'input'
                }
            ]"
        />
    </aui-base-list-page>
</template>

<script>
import dataTableColumn from 'src/mixins/data-table-column'
import dataTableCustomer from 'src/mixins/data-table-customer'
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
        dataTableColumn,
        dataTableCustomer
    ],
    data () {
        return {
            selectedRows: []
        }
    },
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                this.getCustomerExternalIdColumn(),
                this.getCustomerResellerNameColumn(),
                this.getCustomerContactEmailColumn(),
                this.getCustomerContactFirstnameColumn(),
                this.getCustomerContactLastnameColumn(),
                this.getCustomerProductNameColumn(),
                this.getCustomerBillingProfileNameColumn(),
                this.getCustomerStatusColumn(),
                this.getCustomerMaxSubscribersColumn()
            ]
        },
        canEdit () {
            return this.$aclCan('update', 'entity.subscribers')
        }
    },
    methods: {
        rowActions () {
            return [
                'customerDetailsSubscribers',
                'customerEdit',
                'customerDetails',
                'customerPreferences',
                'customerJournal'
            ]
        }
    }
}
</script>
