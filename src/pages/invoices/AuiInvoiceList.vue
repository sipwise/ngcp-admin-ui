<template>
    <aui-base-list-page
        @refresh="refresh"
    >
        <aui-data-table
            ref="dataTable"
            table-id="invoices"
            row-key="id"
            resource="invoices"
            resource-base-path="invoice"
            resource-type="ajax"
            resource-alt="invoice/ajax"
            :resource-singular="$t('Invoice')"
            :title="$t('Invoices')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'invoiceCreation'}]"
            :deletable="true"
            :show-header="false"
            :row-actions="rowActions"
        />
    </aui-base-list-page>
</template>

<script>
import {
    mapGetters
} from 'vuex'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseListPage from 'pages/AuiBaseListPage'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiResellerList',
    components: {
        AuiBaseListPage,
        AuiDataTable
    },
    mixins: [
        dataTable
    ],
    data () {
        return {
            selectedRows: []
        }
    },
    computed: {
        ...mapGetters('resellers', [
            'resellerStatusOptions'
        ]),
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
                    name: 'contract_id',
                    label: this.$t('Contract Id'),
                    field: 'contract_id',
                    sortable: true,
                    component: 'custom',
                    align: 'left'
                },
                {
                    name: 'contract_contact_email',
                    label: this.$t('Contract Email'),
                    field: 'contract_contact_email',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'contract_product_name',
                    label: this.$t('Product Name'),
                    field: 'contract_product_name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'serial',
                    label: this.$t('Serial'),
                    field: 'serial',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActions () {
            return [
                'invoiceDownload'
            ]
        }
    }
}
</script>
