<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="headerRuleContext"
            ref="dataTable"
            table-id="headerruleactions"
            row-key="id"
            resource="headerruleactions"
            :resource-path="`header-manipulations/sets/${headerSetContextResourceId}/rules/${headerRuleContextResourceId}/actions`"
            :use-api-v2="true"
            resource-type="api"
            :resource-singular="$t('Header Rule Actions')"
            :resource-default-filters="() => ({
                order_by: 'priority'
            })"
            title=""
            :columns="columns"
            :resource-search-wildcard="true"
            :addable="true"
            :editable="true"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :add-action-routes="[
                { name: 'headerRuleActionCreate' }
            ]"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
        />
    </aui-base-sub-context>
</template>

<script>
import { numeric, required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import { setDataTableDescending, setDataTableSortBy } from 'src/helpers/dataTable'
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import { mapWaitingActions } from 'vue-wait'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiHeaderManipulationsRuleActionsList',
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
        setDataTableSortBy({ tableId: `${this.$route.name}_headerruleactions_headerruleactions`, sortBy: 'priority' })
        setDataTableDescending({ tableId: `${this.$route.name}_headerruleactions_headerruleactions`, descending: false })
    },
    methods: {
        ...mapWaitingActions('headerRuleSets', {
            moveHeaderRuleActionUp: WAIT_PAGE,
            moveHeaderRuleActionDown: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            if (['headerRuleActionEdit', 'actionsUp', 'actionsDown'].includes(route?.name)) {
                route.params.id = this.headerSetContextResourceId
                route.params.headerRuleId = this.headerRuleContextResourceId
                route.params.headerRuleActionId = row.id
            }
            return route
        },
        async moveUp (id) {
            await this.moveHeaderRuleActionUp({
                setId: this.headerSetContextResourceId,
                headerRuleId: this.headerRuleContextResourceId,
                headerRuleActionId: id
            })
            await this.refresh()
        },
        async moveDown (id) {
            await this.moveHeaderRuleActionDown({
                setId: this.headerSetContextResourceId,
                headerRuleId: this.headerRuleContextResourceId,
                headerRuleActionId: id
            })
            await this.refresh()
        },
        rowActions ({ row }) {
            return [
                'headerRuleActionEdit',
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
