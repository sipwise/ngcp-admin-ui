<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            table-id="cftimesets"
            row-key="id"
            resource="cftimesets"
            :resource-default-filters="() => ({
                subscriber_id: subscriberContext.id
            })"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-base-path="cftimesets"
            resource-type="api"
            :title="$t('Time Set')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[
                { name: 'subscriberDetailsCallForwardingTimeSetCreation'}
            ]"
            :deletable="true"
            deletion-subject="id"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import _ from 'lodash'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberDetailsCallForwardingTime',
    components: { AuiBaseSubContext, AuiDataTable },
    mixins: [subscriberContextMixin],
    computed: {
        columns () {
            return [
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'times',
                    label: this.$t('Values'),
                    field: 'times',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            if (_.includes(['subscriberDetailsCallForwardingTimeSetEdit'], route?.name)) {
                route.params.id = this.subscriberContext?.id
                route.params.timesetId = row.id
            }
            return route
        },
        rowActions () {
            return [
                'subscriberDetailsCallForwardingTimeSetEdit'
            ]
        }
    }
}
</script>
