<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            table-id="cfsourcesets"
            row-key="id"
            resource="cfsourcesets"
            :resource-default-filters="() => ({
                subscriber_id: subscriberContext.id
            })"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-base-path="cfsourcesets"
            resource-type="api"
            :title="$t('Source Set')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[
                { name: 'subscriberDetailsCallForwardingSourceSetCreation'}
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
                    name: 'sources',
                    label: this.$t('Values'),
                    field: 'sources',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            if (_.includes(['subscriberDetailsCallForwardingSourceSetEdit'], route?.name)) {
                route.params.id = this.subscriberContext?.id
                route.params.sourcesetId = row.id
            }
            return route
        },
        rowActions () {
            return [
                'subscriberDetailsCallForwardingSourceSetEdit'
            ]
        }
    }
}
</script>
