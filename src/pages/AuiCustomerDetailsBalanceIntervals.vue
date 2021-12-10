<template>
    <aui-base-sub-context>
        <template
            #default="props"
        >
            <aui-data-table
                v-if="props.resourceObject"
                ref="dataTable"
                table-id="customerBalanceIntervals"
                :title="$t('Balance Intervals')"
                resource="balanceintervals"
                :resource-path="'balanceintervals/' + props.resourceObject.id"
                resource-type="api"
                :resource-default-filters="{
                    contact_id: props.resourceObject.contact_id
                }"
                :resource-singular="$t('Balance Interval')"
                :columns="columns"
                :show-header="false"
            />
        </template>
    </aui-base-sub-context>
</template>
<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import { currencyLike } from 'src/filters/resource'
export default {
    name: 'AuiCustomerDetailsBalanceIntervals',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn
    ],
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'start',
                    label: this.$t('From'),
                    field: 'start',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'stop',
                    label: this.$t('To'),
                    field: 'stop',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'initial_cash_balance',
                    label: this.$t('Initial Cash Balance'),
                    field: 'initial_cash_balance',
                    sortable: true,
                    align: 'left',
                    formatter: ({ row }) => {
                        return currencyLike(row.initial_cash_balance)
                    }
                },
                {
                    name: 'cash_balance',
                    label: this.$t('Cash Balance'),
                    field: 'cash_balance',
                    sortable: true,
                    align: 'left',
                    formatter: ({ row }) => {
                        return currencyLike(row.cash_balance)
                    }
                },
                {
                    name: 'cash_debit',
                    label: this.$t('Debit'),
                    field: 'cash_debit',
                    sortable: true,
                    align: 'left',
                    formatter: ({ row }) => {
                        return currencyLike(row.cash_debit)
                    }
                },
                {
                    name: 'initial_free_time_balance',
                    label: this.$t('Initial Free-Time'),
                    field: 'initial_free_time_balance',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'free_time_balance',
                    label: this.$t('Free-Time Balance'),
                    field: 'free_time_balance',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'free_time_spent',
                    label: this.$t('Free-Time Spent'),
                    field: 'free_time_spent',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'topup_count',
                    label: this.$t('Top-ups (timely)'),
                    field: 'topup_count',
                    formatter: ({ row }) => {
                        return row.topup_count + ' (' + row.timely_topup_count + ')'
                    },
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'Underrun Profiles',
                    label: this.$t('Last Underrun (Profiles)'),
                    field: 'underrun_profiles',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'underrun_lock',
                    label: this.$t('Last Underrun (Lock)'),
                    field: 'underrun_lock',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    }
}
</script>
