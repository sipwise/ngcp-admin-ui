<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="table"
            table-id="callrecordings"
            row-key="id"
            resource="callrecordings"
            resource-base-path="callrecordings"
            resource-type="api"
            :resource-default-filters="() => ({
                subscriber_id: subscriberContext.id
            })"
            :resource-singular="$t('Call Recording')"
            title=""
            :columns="columns"
            :searchable="false"
            :editable="true"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiSubscriberDetailsSpeedDial',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        subscriberContextMixin
    ],
    computed: {
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('ID'),
                    field: 'id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'starttime',
                    label: this.$t('Time'),
                    field: 'start_time',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'callid',
                    label: this.$t('Call ID'),
                    field: 'callid',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            const callIdBase64Encoded = btoa(row.callid).replace(/=+$/, '')
            route.params.id = this.subscriberContext.id
            route.params.callId = callIdBase64Encoded
            route.params.recordingId = row.id
            return route
        },
        rowActions () {
            return [
                'subscriberDetailsCallDetails',
                'subscriberDetailsRecordedFiles'
            ]
        }
    }
}
</script>
