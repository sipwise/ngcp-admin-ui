<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="table"
            row-key="id"
            table-id="subscriberlocationmappings"
            resource="subscriberlocationmappings"
            resource-base-path="subscriberlocationmappings"
            :resource-default-filters="() => ({
                subscriber_id: subscriberContext.id
            })"
            resource-type="api"
            :resource-singular="$t('location mappings')"
            title=""
            :columns="columns"
            :addable="true"
            :add-action-routes="[{ name: 'subscriberLocationMappingsCreation' }]"
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
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import dataTable from 'src/mixins/data-table-column'
export default {
    name: 'AuiSubscriberDetailsLocationMappings',
    components: {
        AuiDataTable,
        AuiBaseSubContext
    },
    mixins: [
        dataTable,
        subscriberContextMixin
    ],
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'location',
                    label: this.$t('Location SIP-URI'),
                    field: 'location',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'caller_pattern',
                    label: this.$t('Caller Pattern'),
                    field: 'caller_pattern',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'callee_pattern',
                    label: this.$t('Callee Pattern'),
                    field: 'callee_pattern',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'mode',
                    label: this.$t('Mode'),
                    field: 'mode',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'to_username',
                    label: this.$t('To Username'),
                    field: 'to_username',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'external_id',
                    label: this.$t('External ID'),
                    field: 'external_id',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'enabled',
                    label: this.$t('Enabled'),
                    field: 'enabled',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'toggle'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.subscriberContext.id
            route.params.locationMappingId = row.id
            return route
        },
        rowActions () {
            return [
                'subscriberLocationMappingsEdit'
            ]
        }
    }
}
</script>
