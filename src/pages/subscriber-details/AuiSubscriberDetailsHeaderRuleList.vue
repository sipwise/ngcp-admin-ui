<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="subscriberContext"
            ref="dataTable"
            table-id="headerrules"
            row-key="id"
            resource="headerrules"
            resource-path="header-manipulations/sets/rules"
            :use-api-v2="true"
            :resource-default-filters="() => ({
                subscriber_id: subscriberContext.id,
                order_by: 'priority'
            })"
            resource-type="api"
            :resource-singular="$t('header manipulation')"
            title=""
            :columns="columns"
            :searchable="true"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :addable="true"
            :editable="true"
            :add-action-routes="[{ name: 'subscriberHeaderRuleCreate'}]"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
            :show-more-menu="true"
            :search-criteria-config="[
                {
                    criteria: 'name',
                    label: $t('Name'),
                    component: 'input'
                }
            ]"
        />
    </aui-base-sub-context>
</template>

<script>
import { numeric, required } from '@vuelidate/validators'
import AuiDataTable from 'components/AuiDataTable'
import AuiBaseSubContext from 'pages/AuiBaseSubContext'
import { WAIT_PAGE } from 'src/constants'
import subscriberContextMixin from 'src/mixins/data-context-pages/subscriber'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import { mapWaitingActions } from 'vue-wait'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiSubscriberDetailsHeaderRuleList',
    components: {
        AuiBaseSubContext,
        AuiDataTable
    },
    mixins: [
        dataTable,
        dataTableColumn,
        subscriberContextMixin
    ],
    computed: {
        ...mapGetters('headerRuleSets', [
            'directionOptions'
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
                            name: 'required',
                            validator: required,
                            error: this.$t('Priority must not be empty')
                        },
                        {
                            name: 'numeric',
                            validator: numeric,
                            error: this.$t('Only digits are allowed')
                        }
                    ]
                },
                {
                    name: 'name',
                    label: this.$t('Name'),
                    field: 'name',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Name must not be empty')
                        }
                    ]
                },
                {
                    name: 'direction',
                    label: this.$t('Direction'),
                    field: 'direction',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'select',
                    componentOptions: this.directionOptions
                },
                {
                    name: 'description',
                    label: this.$t('Description'),
                    field: 'description',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'input',
                    componentValidations: [
                        {
                            name: 'required',
                            validator: required,
                            error: this.$t('Description must not be empty')
                        }
                    ]
                },
                {
                    name: 'stopper',
                    label: this.$t('Stopper'),
                    field: 'stopper',
                    sortable: true,
                    align: 'left',
                    editable: true,
                    component: 'toggle'
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
        ...mapWaitingActions('headerRuleSets', {
            moveHeaderRuleUp: WAIT_PAGE,
            moveHeaderRuleDown: WAIT_PAGE
        }),
        rowActionRouteIntercept ({ route, row }) {
            route.params.id = this.subscriberContext.id
            route.params.headerRuleId = row.id
            return route
        },
        async moveUp (id, setId) {
            await this.moveHeaderRuleUp({
                subscriberId: this.subscriberContext.id,
                setId,
                headerRuleId: id
            })
            await this.refresh()
        },
        async moveDown (id, setId) {
            await this.moveHeaderRuleDown({
                subscriberId: this.subscriberContext.id,
                setId,
                headerRuleId: id
            })
            await this.refresh()
        },
        rowActions ({ row }) {
            return [
                'subscriberHeaderRuleEdit',
                'subscriberHeaderRuleCondition',
                'subscriberHeaderRuleAction',
                {
                    id: 'actionsUp',
                    color: 'primary',
                    icon: 'move_up',
                    label: this.$t('Move Up'),
                    visible: true,
                    click: async () => {
                        await this.moveUp(row.id, row.set_id)
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
                        await this.moveDown(row.id, row.set_id)
                        this.$refs.dataTable.refresh({ force: true })
                    }
                }
            ]
        }
    }
}
</script>
