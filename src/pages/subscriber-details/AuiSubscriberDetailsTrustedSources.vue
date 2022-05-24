<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="resourceObject"
            ref="table"
            row-key="id"
            table-id="trustedsources"
            resource="trustedsources"
            resource-base-path="trustedources"
            :resource-default-filters="() => ({
                subscriber_id: resourceObject.id
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
        />
    </aui-base-sub-context>
</template>

<script>
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import AuiDataTable from 'components/AuiDataTable'
import subContext from 'src/mixins/sub-context'
export default {
    name: 'AuiSubscriberDetailsTrustedSources',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        subContext
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
            route.params.id = row.subscriber_id
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
