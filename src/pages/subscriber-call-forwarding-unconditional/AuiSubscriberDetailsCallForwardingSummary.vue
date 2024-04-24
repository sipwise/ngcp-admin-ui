<template>
    <aui-base-sub-context>
        <aui-data-table
            table-id="cfmappings"
            row-key="id"
            resource="cfmappings"
            :resource-path="'cfmappings/' + subscriberContextResourceId"
            resource-type="api"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="false"
            :deletable="true"
            :showbutton-delete="false"
            deletion-action="dataTable/deleteCf"
            data-request-action="dataTable/requestMapping"
            :show-header="false"
            :show-header-actions="false"
            :show-more-menu="true"
            selection="none"
            :on-row-click="onRowClick"
            :on-row-click-select="false"
            :disable-pagination="true"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import dataTableColumn from 'src/mixins/data-table-column'
import dataTable from 'src/mixins/data-table'
import { formatTimeset, formatBNumber, formatSource, formatDestination, formatEnable } from 'src/filters/resource'
export default {
    name: 'AuiSubscriberDetailsCallForwardingSummary',
    components: { AuiBaseSubContext, AuiDataTable },
    mixins: [dataTable,
             dataTableColumn, subscriberContextMixin],
    computed: {
        columns () {
            return [
                {
                    name: 'type',
                    label: this.$t('Type'),
                    field: 'type',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'cft_ringtimeout',
                    label: this.$t('Answer Timeout'),
                    field: 'cft_ringtimeout',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'mappings',
                    label: this.$t('Timeset'),
                    field: 'mappings',
                    formatter: ({ row }) => formatTimeset(row.mappings),
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'mappings',
                    label: this.$t('To (B-Numbers)'),
                    field: 'mappings',
                    formatter: ({ row }) => formatBNumber(row.mappings),
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'mappings',
                    label: this.$t('Sources'),
                    field: 'mappings',
                    formatter: ({ row }) => formatSource(row.mappings),
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'mappings',
                    label: this.$t('Destinations'),
                    field: 'mappings',
                    formatter: ({ row }) => formatDestination(row.mappings),
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'mappings',
                    label: this.$t('Enabled'),
                    field: 'mappings',
                    formatter: ({ row }) => formatEnable(row.mappings),
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        onRowClick (row, rowIndex) {
            if (rowIndex === 0) {
                this.$router.push({ name: 'subscriberDetailsCallForwardingUnconditionalEdit', params: { id: row.id } })
            } else if (rowIndex === 1) {
                this.$router.push({ name: 'subscriberDetailsCallForwardingBusyEdit', params: { id: row.id } })
            } else if (rowIndex === 2) {
                this.$router.push({ name: 'subscriberDetailsCallForwardingTimeOutEdit', params: { id: row.id } })
            } else if (rowIndex === 3) {
                this.$router.push({ name: 'subscriberDetailsCallForwardingSmsEdit', params: { id: row.id } })
            } else if (rowIndex === 4) {
                this.$router.push({ name: 'subscriberDetailsCallForwardingOnResponseEdit', params: { id: row.id } })
            } else if (rowIndex === 5) {
                this.$router.push({ name: 'subscriberDetailsCallForwardingOnOverflowEdit', params: { id: row.id } })
            } else if (rowIndex === 6) {
                this.$router.push({ name: 'subscriberDetailsCallForwardingUnavailableEdit', params: { id: row.id } })
            }
        }
    }
}
</script>
