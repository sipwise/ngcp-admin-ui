<template>
    <aui-base-sub-context>
        <aui-data-table
            table-id="cfmappings"
            row-key="id"
            resource="cfmappings"
            :resource-path="'cfmappings/' + subscriberContextResourceId"
            :resource-singular="$t('Call Forwarding')"
            resource-type="api"
            :columns="columns"
            :searchable="true"
            :editable="false"
            :deletable="true"
            :showbutton-delete="false"
            deletion-action="dataTable/deleteCf"
            data-request-action="dataTable/requestMapping"
            :show-header="false"
            :show-header-actions="false"
            :show-more-menu="canEdit"
            selection="none"
            :on-row-click-select="false"
            :disable-pagination="true"
            :row-actions="rowActions"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import {
    formatBNumber,
    formatDestination,
    formatEnable,
    formatPSTN,
    formatSource,
    formatTimeset
} from 'src/filters/resource'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
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
                    align: 'left'
                },
                {
                    name: 'cft_ringtimeout',
                    label: this.$t('Answer Timeout'),
                    field: 'cft_ringtimeout',
                    formatter: ({ row }) => row.type === 'Timeout' ? row.cft_ringtimeout : '',
                    align: 'left'
                },
                {
                    name: 'mappings',
                    label: this.$t('Time Set'),
                    field: 'mappings',
                    formatter: ({ row }) => formatTimeset(row.mappings),
                    align: 'left'
                },
                {
                    name: 'mappings',
                    label: this.$t('To (B-Numbers)'),
                    field: 'mappings',
                    formatter: ({ row }) => formatBNumber(row.mappings),
                    align: 'left'
                },
                {
                    name: 'mappings',
                    label: this.$t('Sources'),
                    field: 'mappings',
                    formatter: ({ row }) => formatSource(row.mappings),
                    align: 'left'
                },
                {
                    name: 'mappings',
                    label: this.$t('Destinations'),
                    field: 'mappings',
                    formatter: ({ row }) => formatDestination(row.mappings),
                    align: 'left'
                },
                {
                    name: 'mappings',
                    label: this.$t('Redirection'),
                    field: 'mappings',
                    formatter: ({ row }) => formatPSTN(row.mappings),
                    align: 'left'
                },
                {
                    name: 'mappings',
                    label: this.$t('Enabled'),
                    field: 'mappings',
                    formatter: ({ row }) => formatEnable(row.mappings),
                    align: 'left'
                }
            ]
        },
        canEdit () {
            return this.$aclCan('update', 'entity.subscribers')
        }
    },
    methods: {
        rowActions ({ row }) {
            switch (row.type) {
            case 'Unconditional':
                return ['subscriberDetailsCallForwardingUnconditionalEdit']
            case 'Busy':
                return ['subscriberDetailsCallForwardingBusyEdit']
            case 'Timeout':
                return ['subscriberDetailsCallForwardingTimeOutEdit']
            case 'SMS':
                return ['subscriberDetailsCallForwardingSmsEdit']
            case 'Response':
                return ['subscriberDetailsCallForwardingOnResponseEdit']
            case 'Overflow':
                return ['subscriberDetailsCallForwardingOnOverflowEdit']
            case 'Unavailable':
                return ['subscriberDetailsCallForwardingUnavailableEdit']
            default:
            }
        }
    }
}
</script>
