<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="table"
            row-key="id"
            table-id="trustedsources"
            resource="trustedsources"
            resource-base-path="trustedources"
            :resource-default-filters="() => ({
                subscriber_id: subscriberContext.id
            })"
            resource-type="api"
            :resource-singular="$t('trusted source')"
            title=""
            :columns="columns"
            :addable="true"
            :add-action-routes="[{ name: 'subscriberTrustedSourcesCreation' }]"
            :editable="true"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :searchable="false"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
            :show-more-menu="true"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiSubscriberDetailsTrustedSources',
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
                    name: 'src_ip',
                    label: this.$t('Source IP'),
                    field: 'src_ip',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'protocol',
                    label: this.$t('Protocol'),
                    field: 'protocol',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'from_pattern',
                    label: this.$t('From-Pattern'),
                    field: 'from_pattern',
                    sortable: true,
                    align: 'left'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.subscriberContext.id
            route.params.trustedSourceId = row.id
            return route
        },
        rowActions () {
            return [
                'subscriberTrustedSourcesEdit'
            ]
        }
    }
}
</script>
