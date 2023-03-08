<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="peeringContext"
            table-id="peeringrules"
            row-key="id"
            resource="peeringrules"
            resource-search-field="rules"
            :resource-search-wildcard="true"
            resource-base-path="peeringrules"
            resource-type="api"
            :resource-singular="$t('Outbound Rules')"
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'peeringGroupDetailsOutboundRuleCreation' }]"
            :deletable="true"
            deletion-subject="id"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :show-header="false"
            :search-criteria-config="[
                {
                    criteria: 'description',
                    label: $t('Description'),
                    component: 'input'
                },
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import _ from 'lodash'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import peeringContextMixin from 'src/mixins/data-context-pages/peering'
export default {
    name: 'AuiPeeringGroupDetailsOutboundRule',
    components: { AuiBaseSubContext, AuiDataTable },
    mixins: [peeringContextMixin],
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
                    name: 'callee_prefix',
                    label: this.$t('Callee Prefix'),
                    field: 'callee_prefix',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'callee_pattern',
                    label: this.$t('Callee Pattern'),
                    field: 'callee_pattern',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'caller_pattern',
                    label: this.$t('Caller Pattern'),
                    field: 'caller_pattern',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'enabled',
                    label: this.$t('Enabled'),
                    field: 'enabled',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                },
                {
                    name: 'stopper',
                    label: this.$t('Stopper'),
                    field: 'stopper',
                    sortable: true,
                    align: 'center',
                    editable: true,
                    component: 'toggle'
                }
            ]
        }
    },
    methods: {
        rowActionRouteIntercept ({ route, row }) {
            const peeringId = this.peeringContext?.id
            if (_.includes(['peeringGroupDetailsOutboundRuleEdit'], route?.name)) {
                route.params.id = peeringId
                route.params.outboundrulesId = row.id
            }
            return route
        },
        rowActions () {
            return [
                'peeringGroupDetailsOutboundRuleEdit'
            ]
        }
    }
}
</script>
