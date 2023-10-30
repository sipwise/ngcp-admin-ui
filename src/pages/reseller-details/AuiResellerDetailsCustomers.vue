<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            table-id="customers"
            row-key="id"
            resource="customers"
            :resource-default-filters="{
                reseller_id: resourceObject.id,
                expand: 'contact_id',
                status: 'active,locked,pending'
            }"
            resource-base-path="customer"
            resource-type="api"
            resource-alt="customer/ajax"
            :resource-singular="$t('Customer')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'resellerDetailsCustomerCreation' }]"
            :deletable="true"
            :deletion-label="terminationLabel"
            :deletion-title="terminationTitle"
            :deletion-text="terminationText"
            deletion-subject="id"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
            :show-header="false"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
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
    </aui-base-sub-context>
</template>

<script>
import dataTableColumn from 'src/mixins/data-table-column'
import dataTableCustomer from 'src/mixins/data-table-customer'
import AuiDataTable from 'components/AuiDataTable'
import { mapState } from 'vuex'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiResellerDetailsCustomers',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn,
        dataTableCustomer
    ],
    data () {
        return {
        }
    },
    computed: {
        ...mapState('page', [
            'resourceObject'
        ]),
        columns () {
            return [
                this.getIdColumn(),
                this.getCustomerExternalIdColumn(),
                this.getCustomerProductNameColumn(false),
                this.getCustomerContactEmailColumn(false),
                this.getCustomerStatusColumn()
            ]
        },
        tableLoading () {
            return this.$wait.is('aui-data-table-customers')
        }
    },
    methods: {
        rowActions () {
            return [
                'customerDetails',
                'resellerDetailsCustomerEdit'
            ]
        },
        rowActionRouteIntercept ({ route, row }) {
            if (route?.name === 'resellerDetailsCustomerEdit') {
                route.params.id = this.resourceObject.id
                route.params.customerId = row.id
            }
            return route
        }
    }
}
</script>
