<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            table-id="invoices"
            row-key="id"
            resource="invoices"
            :resource-default-filters="{ customer_id: resourceObject.id }"
            resource-base-path="invoice"
            resource-type="api"
            resource-alt="invoice/ajax"
            :resource-singular="$t('Invoice')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="false"
            :deletable="false"
            :show-header="false"
            :row-menu-route-names="rowActionRouteNames"
            :search-criteria-config="[
                {
                    criteria: 'serial',
                    label: $t('Serial'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import {
    date
} from 'quasar'
import {
    INTERNAL_DATE_TIME_SECONDS_FORMAT
} from 'src/constants'
import dataTableColumn from 'src/mixins/data-table-column'
import AuiDataTable from 'components/AuiDataTable'
import { mapState } from 'vuex'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
export default {
    name: 'AuiCustomerDetailsInvoices',
    components: {
        AuiBaseSubContext,
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
                {
                    name: 'serial',
                    label: this.$t('Serial'),
                    field: 'serial',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'period_start',
                    label: this.$t('Start'),
                    field: 'period_start',
                    sortable: true,
                    align: 'left',
                    format: (val) => {
                        return date.formatDate(val, INTERNAL_DATE_TIME_SECONDS_FORMAT)
                    }
                },
                {
                    name: 'period_end',
                    label: this.$t('End'),
                    field: 'period_end',
                    sortable: true,
                    align: 'left',
                    format: (val) => {
                        return date.formatDate(val, INTERNAL_DATE_TIME_SECONDS_FORMAT)
                    }
                },
                {
                    name: 'amount_net',
                    label: this.$t('Net Amount'),
                    field: 'amount_net',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'amount_vat',
                    label: this.$t('Vat Amount'),
                    field: 'amount_vat',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'amount_total',
                    label: this.$t('Total Amount'),
                    field: 'amount_total',
                    sortable: true,
                    align: 'left'
                }
            ]
        },
        rowActionRouteNames () {
            return [
                'invoiceDownload'
            ]
        }
    }
}
</script>