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
                expand: 'contact_id'
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
            :add-action-routes="[{ name: 'customerCreation' }]"
            :deletable="true"
            :deletion-label="terminationLabel"
            :deletion-title="terminationTitle"
            :deletion-text="terminationText"
            deletion-subject="id"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
            :show-header="false"
            :row-menu-route-names="rowActionRouteNames"
            :search-criteria-config="[
                {
                    criteria: 'status',
                    label: $t('Status'),
                    component: 'customerStatus'
                },
                {
                    criteria: 'not_status',
                    label: $t('Not Status'),
                    component: 'customerStatus'
                }
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import dataTableColumn from 'src/mixins/data-table-column'
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
        dataTableColumn
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
        },
        rowActionRouteNames () {
            return [
                'customerEdit',
                'customerDetails'
            ]
        }
    }
}
</script>
