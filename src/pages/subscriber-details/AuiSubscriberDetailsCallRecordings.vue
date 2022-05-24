<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            table-id="callrecordings"
            row-key="id"
            resource="callrecordings"
            resource-base-path="callrecordings"
            resource-type="api"
            :resource-default-filters="() => ({
                subscriber_id: resourceObject.id
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
import subContext from 'src/mixins/sub-context'
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiSubscriberDetailsSpeedDial',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        subContext
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
            route.params.id = this.resourceObject.id
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
