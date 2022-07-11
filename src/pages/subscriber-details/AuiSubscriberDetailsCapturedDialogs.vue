<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="table"
            row-key="timestamp"
            table-id="sipcaptures"
            resource="sipcaptures"
            resource-base-path="sipcaptures"
            :resource-default-filters="() => ({
                subscriber_id: subscriberContext.id
            })"
            resource-type="api"
            :resource-singular="$t('sip capture')"
            title=""
            :columns="columns"
            :searchable="true"
            resource-search-field="call_id"
            :resource-search-wildcard="false"
            :search-criteria-config="[
                {
                    criteria: 'call_id',
                    label: $t('Call-ID'),
                    component: 'input'
                },
                {
                    criteria: 'method',
                    label: $t('Method'),
                    component: 'input'
                }
            ]"
            :addable="false"
            :editable="true"
            :deletable="false"
            :show-header="false"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiDataTable from 'components/AuiDataTable'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberDetailsCapturedDialogs',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        subscriberContextMixin
    ],
    computed: {
        columns () {
            return [
                {
                    name: 'timestamp',
                    label: this.$t('Timestamp'),
                    field: 'timestamp',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'call_id',
                    label: this.$t('Call-ID'),
                    field: 'call_id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'method',
                    label: this.$t('Method'),
                    field: 'cseq_method',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            const callIdBase64Encoded = btoa(row.call_id).replace(/=+$/, '')
            route.params.id = this.resourceObject.id
            route.params.callId = callIdBase64Encoded
            return route
        },
        rowActions () {
            return [
                'subscriberDetailsCallMap'
            ]
        }
    }
}
</script>
