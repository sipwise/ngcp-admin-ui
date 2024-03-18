<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            table-id="cfbnumbersets"
            row-key="id"
            resource="cfbnumbersets"
            :resource-default-filters="() => ({
                subscriber_id: subscriberContext.id
            })"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-base-path="cfbnumbersets"
            resource-type="api"
            :title="$t('BNumberSet')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[
                { name: 'subscriberDetailsCallForwardingBNumberSetCreation'}
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
import _ from 'lodash'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberDetailsCallForwardingSource',
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
                    name: 'mode',
                    label: this.$t('Mode'),
                    field: 'mode',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'bnumbers',
                    label: this.$t('Values'),
                    field: 'bnumbers',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            if (_.includes(['subscriberDetailsCallForwardingBNumberSetEdit'], route?.name)) {
                route.params.id = this.subscriberContext?.id
                route.params.bnumbersetId = row.id
            }
            return route
        },
        rowActions () {
            return [
                'subscriberDetailsCallForwardingBNumberSetEdit'
            ]
        }
    }
}
</script>
