<template>
    <aui-base-sub-context>
        <aui-data-table
            v-if="headerSetContext"
            ref="dataTable"
            table-id="headerrules"
            row-key="id"
            resource="headerrules"
            :resource-path="`header-manipulations/sets/${headerSetContextResourceId}/rules`"
            :use-api-v2="true"
            resource-type="api"
            :resource-singular="$t('header manipulation')"
            title=""
            :resource-default-filters="() => ({
                order_by: 'priority'
            })"
            :columns="columns"
            :searchable="true"
            resource-search-field="name"
            :resource-search-wildcard="true"
            :addable="true"
            :editable="true"
            :row-actions="rowActions"
            :row-menu-route-intercept="rowActionRouteIntercept"
            :add-action-routes="[
                { name: 'headerRuleCreate'}
            ]"
            :deletable="true"
            deletion-subject="id"
            :show-header="false"
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
import headerRuleSetContextMixin from 'src/mixins/data-context-pages/header-set-rule'
import dataTable from 'src/mixins/data-table'
import dataTableColumn from 'src/mixins/data-table-column'
import { mapWaitingActions } from 'vue-wait'
import { mapGetters } from 'vuex'
export default {
    name: 'AuiHeaderManipulationsRulesList',
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
            if (['headerRuleEdit', 'headerRuleConditions', 'headerRuleActions', 'actionsUp', 'actionsDown'].includes(route?.name)) {
                route.params.id = this.headerSetContextResourceId
                route.params.headerRuleId = row.id
            }
            return route
        },
        async moveUp (id) {
            await this.moveHeaderRuleUp({
                setId: this.headerSetContextResourceId,
                headerRuleId: id
            })
            await this.refresh()
        },
        async moveDown (id) {
            await this.moveHeaderRuleDown({
                setId: this.headerSetContextResourceId,
                headerRuleId: id
            })
            await this.refresh()
        },
        rowActions ({ row }) {
            return [
                'headerRuleEdit',
                'headerRuleConditions',
                'headerRuleActions',
                {
                    id: 'actionsUp',
                    color: 'primary',
                    icon: 'move_up',
                    label: this.$t('Move Up'),
                    visible: true,
                    click: async () => {
                        await this.moveUp(row.id)
                        await this.reloadDataContext('headerRuleContext')
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
                        await this.reloadDataContext('headerRuleContext')
                        this.$refs.dataTable.refresh({ force: true })
                    }
                }
            ]
        }
    }
}
</script>
