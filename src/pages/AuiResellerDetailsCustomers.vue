<template>
    <div>
        <q-linear-progress
            v-if="!resourceObject || tableLoading"
            indeterminate
            size="2px"
        />
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            class="q-ma-lg"
            table-id="customers"
            row-key="id"
            resource="customers"
            :resource-default-filters="{ reseller_id: resourceObject.id, expand: 'contact_id' }"
            resource-base-path="customer"
            resource-type="api"
            resource-alt="customer/ajax"
            resource-singular="customer"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="false"
            :addable="false"
            :deletable="false"
            :deletion-label="$t('Terminate')"
            :deletion-title="$t('Terminate {resource}')"
            :deletion-text="$t('You are about to terminate {resource} {subject}')"
            deletion-subject="id"
            deletion-action="dataTable/deleteResourceByTerminatedStatus"
            :show-header="true"
            :show-more-menu-search="false"
            :row-menu-route-names="rowActionRouteNames"
        />
    </div>
</template>

<script>
import dataTableColumn from 'src/mixins/data-table-column'
import AuiDataTable from 'components/AuiDataTable'
import { mapState } from 'vuex'
export default {
    name: 'AuiResellerDetailsCustomers',
    components: {
        AuiDataTable
    },
    mixins: [
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
