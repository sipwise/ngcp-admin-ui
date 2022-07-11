<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            table-id="upnrewritesets"
            row-key="id"
            resource="upnrewritesets"
            :resource-default-filters="{
                subscriber_id: subscriberContext.id
            }"
            resource-type="api"
            :resource-singular="$t('Upn Rewrite')"
            title=""
            :columns="columns"
            :searchable="false"
            :addable="true"
            :editable="true"
            :add-action-routes="[
                { name: 'subscriberUpnRewriteCreate'}
            ]"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>

<script>
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataTableColumn from 'src/mixins/data-table-column'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
export default {
    name: 'AuiResellerDetailsDomain',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTableColumn,
        subscriberContextMixin
    ],
    computed: {
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'new_cli',
                    label: this.$t('New CLI'),
                    field: 'new_cli',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'upn_rewrite_sources',
                    label: this.$t('Patterns'),
                    field: 'upn_rewrite_sources',
                    sortable: true,
                    align: 'left',
                    format: val => val.map(source => source.pattern).join(', ')
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.subscriberContext.id
            route.params.upnRewriteId = row.id
            return route
        },
        rowActions () {
            return [
                'subscriberUpnRewriteEdit'
            ]
        }
    }
}
</script>
