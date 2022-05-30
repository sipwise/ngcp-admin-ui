<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            row-key="id"
            table-id="topuplogs"
            resource="topuplogs"
            resource-base-path="topuplogs"
            :resource-default-filters="() => ({
                customer_id: resourceObject.id
            })"
            resource-type="api"
            :resource-singular="$t('Top-up Log')"
            title=""
            :columns="columns"
            :searchable="true"
            resource-search-field="folder"
            :resource-search-wildcard="true"
            :search-criteria-config="[
                {
                    criteria: 'outcome',
                    label: $t('Outcome'),
                    component: 'input'
                },
                {
                    criteria: 'message',
                    label: $t('Message'),
                    component: 'input'
                }
            ]"
            :addable="false"
            :editable="false"
            :deletable="false"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiDataTable from 'components/AuiDataTable'
import subContext from 'src/mixins/sub-context'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiCustomerDetailsTopUpLogs',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        dataTableColumn,
        subContext
    ],
    computed: {
        columns () {
            return [
                {
                    name: 'timestamp',
                    label: this.$t('Timestamp'),
                    field: 'timestamp',
                    sortable: true,
                    editable: false,
                    align: 'left'
                },
                {
                    name: 'subscriber_id',
                    label: this.$t('Subscriber'),
                    field: 'subscriber_id_expand.name',
                    expand: 'subscriber_id',
                    sortable: true,
                    editable: false,
                    align: 'left'
                },
                {
                    name: 'type',
                    label: this.$t('Type'),
                    field: 'type',
                    sortable: true,
                    editable: false,
                    align: 'left'
                },
                {
                    name: 'outcome',
                    label: this.$t('Outcome'),
                    field: 'outcome',
                    sortable: true,
                    editable: false,
                    align: 'left'
                },
                {
                    name: 'message',
                    label: this.$t('Message'),
                    field: 'message',
                    sortable: true,
                    editable: false,
                    align: 'left'
                },
                {
                    name: 'voucher_id',
                    label: this.$t('Voucher ID'),
                    field: 'voucher_id',
                    sortable: true,
                    editable: false,
                    align: 'left'
                },
                {
                    name: 'amount',
                    label: this.$t('Amount'),
                    field: 'amount',
                    sortable: true,
                    editable: false,
                    align: 'left'
                },
                {
                    name: 'cash_balance_before',
                    label: this.$t('Balance before'),
                    field: 'cash_balance_before',
                    sortable: true,
                    editable: false,
                    align: 'left'
                },
                {
                    name: 'cash_balance_after',
                    label: this.$t('Balance after'),
                    field: 'cash_balance_after',
                    sortable: true,
                    editable: false,
                    align: 'left'
                },
                {
                    name: 'package_before_id',
                    label: this.$t('Package before'),
                    field: 'package_before_id_expand.name',
                    expand: 'package_before_id',
                    sortable: true,
                    editable: false,
                    align: 'left'
                },
                {
                    name: 'package_after_id',
                    label: this.$t('Package after'),
                    field: 'package_after_id_expand.name',
                    expand: 'package_after_id',
                    sortable: true,
                    editable: false,
                    align: 'left'
                }
            ]
        }
    }
}
</script>
