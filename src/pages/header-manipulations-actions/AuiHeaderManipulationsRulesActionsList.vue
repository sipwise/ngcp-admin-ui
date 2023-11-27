<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="headerRulesContext"
            ref="dataTable"
            table-id="headerruleactions"
            row-key="id"
            resource="headerruleactions"
            resource-type="api"
            :resource-default-filters="() => ({
                rule_id: headerRulesContext.id
            })"
            :resource-singular="$t('Header Rule Actions')"
            title=""
            :columns="columns"
            :resource-search-wildcard="true"
            :addable="true"
            :editable="true"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :add-action-routes="[
                { name: 'headerRulesActionsCreate'}
            ]"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>

<script>
import _ from 'lodash'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import dataTableColumn from 'src/mixins/data-table-column'
import dataTable from 'src/mixins/data-table'
import { mapGetters } from 'vuex'
import { numeric, required } from '@vuelidate/validators'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-rule'
import { mapWaitingActions } from 'vue-wait'
import { WAIT_PAGE } from 'src/constants'
import { setDataTableSortBy, setDataTableDescending } from 'src/helpers/dataTable'
export default {
    name: 'AuiHeaderManipulationsRulesActionsList',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn,
        headerRuleSetContextMixin
    ],
    computed: {
        ...mapGetters('headerRuleSets', [
            'matchPart',
            'actionType'
        ]),
        columns () {
            return [
                this.getIdColumn(),
                {
                    name: 'priority',
                    label: this.$t('Priority'),
                    field: 'priority',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'numeric',
                            validator: numeric,
                            error: this.$t('Only digits are allowed')
                        }
                    ]
                },
                {
                    name: 'header',
                    label: this.$t('Header'),
                    field: 'header',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Header must not be empty')
                        }
                    ]
                },
                {
                    name: 'header_part',
                    label: this.$t('Part'),
                    field: 'header_part',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.matchPart
                },
                {
                    name: 'action_type',
                    label: this.$t('Type'),
                    field: 'action_type',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.actionType
                },
                {
                    name: 'value_part',
                    label: this.$t('Value Part'),
                    field: 'value_part',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.matchPart
                },
                {
                    name: 'value',
                    label: this.$t('Value'),
                    field: 'value',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input'
                },
                {
                    name: 'rwr_set_id',
                    label: this.$t('Rewrite Rules Set'),
                    field: 'rwr_set_id_expand.name',
                    expand: 'rwr_set_id',
                    sortable: true,
                    align: 'left'
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
    mounted () {
        setDataTableSortBy({ tableId: this.$route.name + '_headerruleactions_headerruleactions', sortBy: 'priority' })
        setDataTableDescending({ tableId: this.$route.name + '_headerruleactions_headerruleactions', descending: false })
    },
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            actionMoveUpDown: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            if (_.includes(['headerRulesActionsEdit', 'actionsUp', 'actionsDown'], route?.name)) {
                route.params.id = this.headerRuleSetContext.id
                route.params.headerruleId = this.headerRulesContext.id
                route.params.headeruleactionsId = row.id
            }
            return route
        },
        async moveUp (id) {
            await this.actionMoveUpDown({
                headerRuleSetId: this.headerRuleSetContext.id,
                headerRuleId: this.headerRulesContext.id,
                headeruleactionsId: id,
                move: 'up'
            })
            await this.refresh()
        },
        async moveDown (id) {
            await this.actionMoveUpDown({
                headerRuleSetId: this.headerRuleSetContext.id,
                headerRuleId: this.headerRulesContext.id,
                headeruleactionsId: id,
                move: 'down'
            })
            await this.refresh()
        },
        rowActions ({ row }) {
            return [
                'headerRulesActionsEdit',
                {
                    id: 'actionsUp',
                    color: 'primary',
                    icon: 'move_up',
                    label: this.$t('Move Up'),
                    visible: true,
                    click: async () => {
                        await this.moveUp(row.id)
                        await this.reloadDataContext('headerRuleActionContext')
                        this.$refs.dataTable.refresh({ force: true })
                    }
                },
                {
                    id: 'actionsDown',
                    color: 'primary',
                    icon: 'move_down',
                    label: this.$t('Move Down'),
                    visible: true,
                    click: async () => {
                        await this.moveDown(row.id)
                        await this.reloadDataContext('headerRuleActionContext')
                        this.$refs.dataTable.refresh({ force: true })
                    }
                }
            ]
        }
    }
}
</script>
