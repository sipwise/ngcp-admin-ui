<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="calllists"
            row-key="id"
            table-id="calllists"
            resource="calllists"
            resource-base-path="calllists"
            :resource-default-filters="() => ({
                subscriber_id: subscriberContext.id,
                direction: 'out'
            })"
            resource-type="api"
            :resource-singular="$t('Call History')"
            title=""
            :columns="columns"
            :searchable="true"
            :resource-search-wildcard="true"
            :addable="false"
            :editable="false"
            :show-header="false"
            selection="none"
            :show-more-menu="true"
            :clear-filter-on-change="true"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :row-actions="rowActions"
            :search-criteria-config="[
                {
                    criteria: 'call_id',
                    label: $t('Call ID'),
                    component: 'input',
                    wildcard: false
                },
                {
                    criteria: 'other_cli',
                    label: $t('Callee'),
                    component: 'input',
                    wildcard: false
                },
                {
                    criteria: ['start_ge','start_le'],
                    label: $t('Date Range'),
                    component: 'input_date_range',
                    wildcard: false
                },
                {
                    criteria: 'start_ge',
                    label: $t('From Date'),
                    component: 'input_date',
                    wildcard: false
                },
                {
                    criteria: 'start_le',
                    label: $t('To Date'),
                    component: 'input_date',
                    wildcard: false
                },
                {
                    criteria: 'duration_ge',
                    label: $t('From Duration'),
                    component: 'input',
                    wildcard: false
                },
                {
                    criteria: 'duration_le',
                    label: $t('To Duration'),
                    component: 'input',
                    wildcard: false
                }
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import dataTableColumn from 'src/mixins/data-table-column'
export default {
    name: 'AuiSubscriberOutgoingCallList',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        dataTableColumn,
        subscriberContextMixin
    ],
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'own_cli',
                    label: this.$t('Caller'),
                    field: 'own_cli',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'other_cli',
                    label: this.$t('Callee'),
                    field: 'other_cli',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'clir',
                    label: this.$t('CLIR'),
                    field: 'clir',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'status',
                    label: this.$t('Status'),
                    field: 'status',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'start_time',
                    label: this.$t('Start Time'),
                    field: 'start_time',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'duration',
                    label: this.$t('Duration'),
                    field: 'duration',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'mos_average',
                    label: this.$t('MOS avg'),
                    field: 'mos_average',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'mos_average_packetloss',
                    label: this.$t('MOS packetloss'),
                    field: 'mos_average_packetloss',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'mos_average_jitter',
                    label: this.$t('MOS jitter'),
                    field: 'mos_average_jitter',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'mos_average_roundtrip',
                    label: this.$t('MOS roundtrip'),
                    field: 'mos_average_roundtrip',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'call_id',
                    label: this.$t('Call ID'),
                    field: 'call_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'total_customer_cost',
                    label: this.$t('Cost'),
                    field: 'total_customer_cost',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.subscriberContext.id
            route.params.rowId = row.id
            return route
        },
        rowActions () {
            return [
                'subscriberOutgoingCallDetails'
            ]
        }
    }
}
</script>
