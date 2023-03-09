<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="peeringContext"
            ref="inboundRuleTab"
            table-id="peeringinboundrules"
            row-key="id"
            resource="peeringinboundrules"
            resource-search-field="name"
            :resource-search-wildcard="true"
            resource-base-path="peeringinboundrules"
            resource-type="api"
            :resource-singular="$t('Inbound Rules')"
            title=""
            :columns="columns"
            :searchable="true"
            :editable="true"
            :addable="true"
            :add-action-routes="[{ name: 'peeringGroupDetailsInboundRuleCreation' }]"
            :deletable="true"
            deletion-subject="id"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :show-header="false"
            :search-criteria-config="[
                {
                    criteria: 'field',
                    label: $t('Field'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-sub-context>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import peeringContextMixin from 'src/mixins/data-context-pages/peering'
import peeringInboundContextMixin from 'src/mixins/data-context-pages/peering-details-inbound'
import { setDataTableSortBy, setDataTableDescending } from 'src/helpers/dataTable'
import { WAIT_PAGE } from 'src/constants'
import { mapWaitingActions } from 'vue-wait'
export default {
    name: 'AuiPeeringGroupDetailsInboundRule',
    components: { AuiBaseSubContext, AuiDataTable },
    mixins: [peeringContextMixin, peeringInboundContextMixin],
    computed: {
        ...mapGetters('peering', [
            'inboundFieldList'
        ]),
        columns () {
            return [
                {
                    name: 'priority',
                    label: this.$t('Priority'),
                    field: 'priority',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'id',
                    label: this.$t('Id'),
                    field: 'id',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'field',
                    label: this.$t('Field'),
                    field: 'field',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.inboundFieldList
                },
                {
                    name: 'pattern',
                    label: this.$t('Pattern'),
                    field: 'pattern',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'reject_code',
                    label: this.$t('Reject Code'),
                    field: 'reject_code',
                    sortable: true,
                    align: 'left'
                },
                {
                    name: 'reject_reason',
                    label: this.$t('Reject Reason'),
                    field: 'reject_reason',
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
                }
            ]
        }
    },
    mounted () {
        setDataTableSortBy({ tableId: this.$route.name + '_peeringinboundrules_peeringinboundrules', sortBy: 'priority' })
        setDataTableDescending({ tableId: this.$route.name + '_peeringinboundrules_peeringinboundrules', descending: false })
    },
    methods: {
        ...mapWaitingActions('peering', {
            inboundRuleMoveDown: WAIT_PAGE,
            inboundRuleMoveUp: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            const peeringId = this.peeringContext?.id
            if (_.includes(['peeringGroupDetailsInboundRuleEdit', 'peeringGroupDetailsInboundRuleUp'], route?.name)) {
                route.params.id = peeringId
                route.params.inboundrulesId = row.id
            }
            return route
        },
        async moveUp (id) {
            const peeringId = this.peeringContext?.id
            await this.inboundRuleMoveUp({
                peeringId: peeringId,
                inboundrulesId: id
            })
        },
        async moveDown (id) {
            const peeringId = this.peeringContext?.id
            await this.inboundRuleMoveDown({
                peeringId: peeringId,
                inboundrulesId: id
            })
        },
        rowActions ({ row }) {
            return [
                'peeringGroupDetailsInboundRuleEdit',
                {
                    id: 'peeringGroupDetailsInboundRuleUp',
                    color: 'primary',
                    icon: 'move_up',
                    label: this.$t('Move Up'),
                    visible: true,
                    click: async () => {
                        await this.moveUp(row.id)
                        await this.reloadDataContext('peeringGroupDetailsInboundRuleContext')
                        this.$refs.inboundRuleTab.refresh({ force: true })
                    }
                },
                {
                    id: 'peeringGroupDetailsInboundRuleDown',
                    color: 'primary',
                    icon: 'move_down',
                    label: this.$t('Move Down'),
                    visible: true,
                    click: async () => {
                        await this.moveDown(row.id)
                        await this.reloadDataContext('peeringGroupDetailsInboundRuleContext')
                        this.$refs.inboundRuleTab.refresh({ force: true })
                    }
                }
            ]
        }
    }
}
</script>
