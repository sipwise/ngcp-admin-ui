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
                subscriber_id: subscriberContext.id,
                wildcards: true
            })"
            :resource-singular="$t('Call Recording')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
            :show-more-menu="true"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :resource-search-wildcard="true"
            :clear-filter-on-change="true"
            :search-criteria-config="[
                {
                    criteria: 'caller',
                    label: $t('Caller'),
                    component: 'input',
                    wildcard: true
                },
                {
                    criteria: 'callee',
                    label: $t('Callee'),
                    component: 'input',
                    wildcard: true
                },
                {
                    criteria: 'call_id',
                    label: $t('Call ID'),
                    component: 'input',
                    wildcard: true
                },
                {
                    criteria: 'start_time',
                    label: $t('Start Time'),
                    component: 'input_date',
                    wildcard: false
                },
                {
                    criteria: 'end_time',
                    label: $t('End Time'),
                    component: 'input_date',
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
import dataTable from 'src/mixins/data-table'
export default {
    name: 'AuiSubscriberDetailsCallRecordings',
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
                },
                {
                    name: 'caller',
                    label: this.$t('Caller'),
                    field: 'caller',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'callee',
                    label: this.$t('Callee'),
                    field: 'callee',
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
            route.params.unencodedCallId = row.callId
            route.params.recordingId = row.id
            return route
        },
        rowActions () {
            return [
                'subscriberDetailsCall',
                'subscriberDetailsRecordedFiles'
            ]
        }
    }
}
</script>
